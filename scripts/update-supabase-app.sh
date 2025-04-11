#!/bin/bash

COLOR_RESET="\e[0m"
COLOR_YELLOW="\e[33m"
COLOR_RED="\e[31m"
COLOR_GREEN="\e[32m"
COLOR_GREY="\e[90m"

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

git-merge-subpath() {
    # see https://stackoverflow.com/a/30386041/14826938
    local SQUASH
    if [[ $1 == "--squash" ]]; then
        SQUASH=1
        shift
    fi
    if (($# != 3)); then
        local PARAMS="[--squash] SOURCE_COMMIT SOURCE_PREFIX DEST_PREFIX"
        echo "USAGE: ${FUNCNAME[0]} $PARAMS"
        return 1
    fi

    # Friendly parameter names; strip any trailing slashes from prefixes.
    local SOURCE_COMMIT="$1" SOURCE_PREFIX="${2%/}" DEST_PREFIX="${3%/}"

    local SOURCE_SHA1
    SOURCE_SHA1=$(git rev-parse --verify "$SOURCE_COMMIT^{commit}") || return 1

    local OLD_SHA1
    local GIT_ROOT
    GIT_ROOT=$(git rev-parse --show-toplevel)
    if [[ -n "$(ls -A "$GIT_ROOT/$DEST_PREFIX" 2>/dev/null)" ]]; then
        # OLD_SHA1 will remain empty if there is no match.
        local RE="^${FUNCNAME[0]}: [0-9a-f]{40} $SOURCE_PREFIX $DEST_PREFIX\$"
        OLD_SHA1=$(git log -1 --format=%b -E --grep="$RE" |
            grep --color=never -E "$RE" | tail -1 | awk '{print $2}')
    fi

    local OLD_TREEISH
    if [[ -n $OLD_SHA1 ]]; then
        OLD_TREEISH="$OLD_SHA1:$SOURCE_PREFIX"
        echo -e "${COLOR_YELLOW}${COLOR_GREY}git-merge-subpath:${COLOR_RESET} Diffing latest commit for $SOURCE_COMMIT:$SOURCE_PREFIX against $OLD_TREEISH${COLOR_RESET}"
    else
        # This is the first time git-merge-subpath is run, so diff against the
        # empty commit instead of the last commit created by git-merge-subpath.
        OLD_TREEISH=$(git hash-object -t tree /dev/null)
        echo -e "${COLOR_YELLOW}${COLOR_GREY}git-merge-subpath:${COLOR_RESET} First ever run; diffing against /dev/null${COLOR_RESET}"
    fi &&
        if [[ -z $SQUASH ]]; then
            git merge -s ours --no-commit "$SOURCE_COMMIT"
            echo -e "${COLOR_YELLOW}${COLOR_GREY}git-merge-subpath:${COLOR_RESET} Merging $SOURCE_COMMIT (no commit)${COLOR_RESET}"
        fi &&
        git diff --color=never "$OLD_TREEISH" "$SOURCE_COMMIT:$SOURCE_PREFIX" |
        git apply -3 --directory="$DEST_PREFIX" || git mergetool

    if (($? == 1)); then
        echo -e "${COLOR_RED}${COLOR_GREY}git-merge-subpath:${COLOR_RESET} Uh-oh! Try cleaning up with |git reset --merge|.${COLOR_RESET}"
        echo -e "${COLOR_RED}${COLOR_GREY}git-merge-subpath:${COLOR_RED} Merge failed${COLOR_RESET}"
    else
        if git diff --cached --quiet; then
            # No changes to commit
            echo -e "${COLOR_RED}${COLOR_GREY}git-merge-subpath:${COLOR_RED} Merge aborted (no changes to commit)${COLOR_RESET}"
        else
            echo -e "${COLOR_GREEN}${COLOR_GREY}git-merge-subpath:${COLOR_RESET} Begin merge${COLOR_RESET}"
            git commit -m "chore: Merge $SOURCE_COMMIT:$SOURCE_PREFIX/ to $DEST_PREFIX/" \
                -m "${FUNCNAME[0]}: $SOURCE_SHA1 $SOURCE_PREFIX $DEST_PREFIX"
            echo -e "${COLOR_GREEN}${COLOR_GREY}git-merge-subpath:${COLOR_GREEN} Merge successful${COLOR_RESET}"
        fi
    fi
}

# set git mergetool to opendiff temporarily
MERGETOOL=$(git config merge.tool)
git config merge.tool opendiff

# check if the supabase remote exists locally, and create it if it doesn't, otherwise fetch
# the latest changes
if ! git remote get-url supabase-selfhosted >/dev/null 2>&1; then
    git remote add -f -t main --no-tags supabase-selfhosted https://github.com/noahstuesser/supabase-selfhosted.git
    echo -e "${COLOR_YELLOW}Added the supabase-selfhosted remote repository${COLOR_RESET}"
fi

echo -e "Fetching the latest changes from the supabase-selfhosted remote repository"
git fetch supabase-selfhosted

# transfer the supabase-staging/ folder to local apps/supabase-staging/
echo -e "Running git-merge-subpath for source branch supabase-selfhosted/main (path: ./) and target branch \
$(basename "$ROOT_DIR")/$(git symbolic-ref --short HEAD 2>/dev/null || true) \
(path: apps/supabase-staging/)"

cd "$ROOT_DIR" && HUSKY=0 git-merge-subpath --squash supabase-selfhosted/main / apps/supabase-staging && (cd - >/dev/null || true)

# restore git mergetool to its previous value or unset it if it was unset
if [[ -z $MERGETOOL ]]; then
    git config --unset merge.tool
else
    git config merge.tool "$MERGETOOL"
fi
