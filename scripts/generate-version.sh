#!/bin/bash

# Get the directory of the script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

# Check if jq is installed
if ! command -v jq &>/dev/null; then
    echo "jq is not installed. Please install it before running this script." >&2
    exit 1
fi

usage() {
    cat <<EOF
Usage: $0 [OPTIONS]

Output a version string, by concatenating the base version specified in the
package.json file, the commit hash, the branch name, the build datetime, and
the GitHub Actions run number and ID.

Format: <MAJOR>.<MINOR>.<PATCH>[-<PRE-RELEASE>][+[[<COMMIT_COUNT>-]<COMMIT_SHORT_HASH>][.b-<BRANCH_NAME>][.gha<GITHUB_RUN_ID>-<GITHUB_RUN_ATTEMPT>.ts<BUILD_TIMESTAMP>]]

Options:
  --debug                       Enable debug mode
  --env-file <FILE> <VARNAME>   .env files and variable names (e.g. --env-file .env.local VERSION --env-file .env APP_VERSION)
  --package-json <PATH>         Path to package.json (default: $(dirname "${BASH_SOURCE[0]}")/../package.json)
  --github-run-id <NUMBER>      GitHub run ID
  --github-run-attempt <ID>     GitHub run number
  -h, --help                    Display this help message
EOF
}

# Default values
PACKAGE_JSON_PATH="$ROOT_DIR/package.json"
GITHUB_RUN_ATTEMPT=""
GITHUB_RUN_ID=""
declare -A ENV_FILES
DEBUG=0

log() {
    if [ "$DEBUG" -eq 1 ]; then
        echo -e "\033[1;33m$*\033[0m" >&2
    fi
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
    --github-run-attempt)
        GITHUB_RUN_ATTEMPT="$2"
        shift 2
        ;;
    --github-run-id)
        GITHUB_RUN_ID="$2"
        shift 2
        ;;
    --package-json)
        PACKAGE_JSON_PATH="$2"
        shift 2
        ;;
    --env-file)
        if [[ $# -lt 3 ]]; then
            echo "Error: --env-file requires two arguments" >&2
            usage
            exit 1
        fi
        ENV_FILES["$2"]="$3"
        shift 3
        ;;
    -h | --help)
        usage
        exit 0
        ;;
    --debug)
        DEBUG=1
        shift
        ;;
    *)
        echo "Unknown argument: $1" >&2
        usage
        exit 1
        ;;
    esac
done

# Check if both --github-run-attempt and --github-run-id are specified together
if { [[ -n "$GITHUB_RUN_ID" ]] && [[ -z "$GITHUB_RUN_ATTEMPT" ]]; } || { [[ -z "$GITHUB_RUN_ID" ]] && [[ -n "$GITHUB_RUN_ATTEMPT" ]]; }; then
    echo "Error: --github-run-id and --github-run-attempt must be specified together" >&2
    usage
    exit 1
fi

generate_version() {
    # Extract version components from package.json
    VERSION_INFO=$(jq -r '.version' <"$PACKAGE_JSON_PATH")
    BASE_VERSION=$(echo "$VERSION_INFO" | cut -d'-' -f1)
    PRE_RELEASE=$(echo "$VERSION_INFO" | cut -s -d'-' -f2-)

    COMMIT_LONG_HASH=$(git -C "$ROOT_DIR" log -1 --format="%H")
    COMMIT_SHORT_HASH=$(git -C "$ROOT_DIR" log -1 --format="%h")

    BRANCH_NAME=$(git -C "$ROOT_DIR" symbolic-ref --short HEAD 2>/dev/null || true)
    # Replace any slashes in the branch name with dashes
    BRANCH_NAME=${BRANCH_NAME//\//-}

    BUILD_TIMESTAMP=$(date +'%Y%m%d%H%M%S')

    LATEST_TAG=$(git -C "$ROOT_DIR" describe --tags --match "v[0-9]*.[0-9]*.[0-9]*" --abbrev=0 2>/dev/null || true)

    DETAILED_VERSION="${BASE_VERSION}"

    if [ -n "$PRE_RELEASE" ]; then
        DETAILED_VERSION="${DETAILED_VERSION}-${PRE_RELEASE}"
    fi

    # Begin adding build metadata

    # Find the most recent tag that matches semver pattern with 'v' prefix

    if [ -n "$LATEST_TAG" ]; then
        LATEST_TAG_LONG_HASH=$(git -C "$ROOT_DIR" rev-list -n 1 "$LATEST_TAG")
        if [ "$COMMIT_LONG_HASH" = "$LATEST_TAG_LONG_HASH" ]; then
            # If the commit hash is the same as the latest tag, we don't need to add the commit count
            COMMIT_COUNT=0
        else
            # Count commits since the latest semver tag, following only the first parent
            COMMIT_COUNT=$(git -C "$ROOT_DIR" rev-list "${LATEST_TAG}"..HEAD --first-parent --count)
            DETAILED_VERSION="${DETAILED_VERSION}+${COMMIT_COUNT}-${COMMIT_SHORT_HASH}.b-${BRANCH_NAME}"
        fi
    else
        # If no semver tag exists, count all commits on the current branch since the root commit, following only the first parent. Store it as a number and subtract 1 from the count
        COMMIT_COUNT=$(($(git -C "$ROOT_DIR" rev-list --first-parent --count HEAD) - 1))

        if [ "$COMMIT_COUNT" -gt 0 ]; then
            DETAILED_VERSION="${DETAILED_VERSION}+${COMMIT_COUNT}-${COMMIT_SHORT_HASH}"
        else
            DETAILED_VERSION="${DETAILED_VERSION}+${COMMIT_SHORT_HASH}"
        fi

        # append the branch name to the version string if it's not empty
        if [ -n "$BRANCH_NAME" ]; then
            DETAILED_VERSION="${DETAILED_VERSION}.b-${BRANCH_NAME}"
        fi
    fi

    # Add GitHub-specific metadata if provided
    if [ -n "$GITHUB_RUN_ATTEMPT" ] && [ -n "$GITHUB_RUN_ID" ]; then
        # Prepend a '+' if the commit count is zero
        if [ "$COMMIT_COUNT" -eq 0 ]; then
            DETAILED_VERSION="${DETAILED_VERSION}+gha${GITHUB_RUN_ATTEMPT}-${GITHUB_RUN_ID}.ts${BUILD_TIMESTAMP}"
        else
            DETAILED_VERSION="${DETAILED_VERSION}.gha${GITHUB_RUN_ATTEMPT}-${GITHUB_RUN_ID}.ts${BUILD_TIMESTAMP}"
        fi
    fi

    echo "$DETAILED_VERSION"
}

update_env_file() {
    local file=$1
    local var_name=$2
    local version=$3

    # Determine absolute path for the env file
    if [[ "$file" != /* ]]; then
        file="$PWD/$file"
    fi

    if [ -f "$file" ]; then
        # Remove existing variable line if it exists
        sed -i "/^$var_name\s*=\s*/d" "$file"
        # Append new variable
        echo "$var_name=$version" >>"$file"
        log "Updated $file with $var_name=$version"
    else
        log "WARNING: $file does not exist. Skipping."
    fi
}

# Main execution
# Generate version string
VERSION=$(generate_version)

# Update .env files if specified
for file in "${!ENV_FILES[@]}"; do
    var_name="${ENV_FILES[$file]}"
    update_env_file "$file" "$var_name" "$VERSION"
done

# Output the version string to stdout
echo "$VERSION"
exit 0
