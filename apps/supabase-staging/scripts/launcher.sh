#!/bin/bash

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

COMPOSE_FILES="-f $ROOT_DIR/docker-compose.yml"
DOCKER_ARGS=()
NGINX_INCLUDED=false
ADDITIONAL_COMPOSE_FILES=()

print_usage() {
    cat <<EOF
Usage:  ./launcher.sh COMMAND [OPTIONS]

A partial wrapper for docker compose with predefined CLI inputs for our self-hosted Supabase setup.

Extraneous flags not specified below are passed through to docker compose. 

Commands:
  up          Create and start containers (docker compose up)
  dev:up      (same as 'up' but with '-f $ROOT_DIR/dev/docker-compose.dev.yml')
  down        Stop and remove containers, networks (docker compose down)
  dev:down    (same as 'down' but with '-f $ROOT_DIR/dev/docker-compose.dev.yml')
  pull        Pull service images (docker compose pull)
  stop        Stop services (docker compose stop)

Options:
      --s3               Include S3 configuration ($ROOT_DIR/docker-compose.s3.yml)
      --nginx            Include Nginx configuration ($ROOT_DIR/docker-compose.nginx.yml)
      --authelia         Include Authelia configuration ($ROOT_DIR/docker-compose.authelia.yml)
                         (automatically includes Nginx configuration)
      -f <file>          Specify an additional docker-compose file (can be repeated)

Examples:
    ./launcher.sh pull --s3 --nginx
    ./launcher.sh up --s3 --authelia
    ./launcher.sh down --volumes
    ./launcher.sh dev:up --nginx
    ./launcher.sh dev:down -v --remove-orphans
    ./launcher.sh up -f docker-compose.custom.yml
EOF
}

# Parse all arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
    up | down | pull | stop | dev:up | dev:down)
        COMMAND="$1"
        shift
        ;;
    --s3)
        COMPOSE_FILES="$COMPOSE_FILES -f $ROOT_DIR/docker-compose.s3.yml"
        shift
        ;;
    --nginx)
        if [ "$NGINX_INCLUDED" = false ]; then
            COMPOSE_FILES="$COMPOSE_FILES -f $ROOT_DIR/docker-compose.nginx.yml"
            NGINX_INCLUDED=true
        fi
        shift
        ;;
    --authelia)
        if [ "$NGINX_INCLUDED" = false ]; then
            COMPOSE_FILES="$COMPOSE_FILES -f $ROOT_DIR/docker-compose.nginx.yml"
            NGINX_INCLUDED=true
        fi
        COMPOSE_FILES="$COMPOSE_FILES -f $ROOT_DIR/docker-compose.authelia.yml"
        shift
        ;;
    -f)
        if [[ -n "$2" && "$2" != -* ]]; then
            ADDITIONAL_COMPOSE_FILES+=("-f" "$2")
            shift 2
        else
            echo "Error: -f flag requires a file argument"
            exit 1
        fi
        ;;
    -h | --help)
        print_usage
        exit 0
        ;;
    *)
        DOCKER_ARGS+=("$1")
        shift
        ;;
    esac
done

# Handle 'dev', 'dev:up', and 'dev:down' commands
if [ "$COMMAND" = "dev:up" ]; then
    COMMAND="up"
    COMPOSE_FILES="$COMPOSE_FILES -f ./dev/docker-compose.dev.yml"
elif [ "$COMMAND" = "dev:down" ]; then
    COMMAND="down"
    COMPOSE_FILES="$COMPOSE_FILES -f ./dev/docker-compose.dev.yml"
fi

# Append additional compose files
COMPOSE_FILES="$COMPOSE_FILES ${ADDITIONAL_COMPOSE_FILES[*]}"

# If no command is provided, print usage and exit with an error
if [ -z "$COMMAND" ]; then
    print_usage
    exit 1
fi

# Print the command that will be executed
printf "$ docker compose %s %s %s\n\n" "$COMPOSE_FILES" "$COMMAND" "${DOCKER_ARGS[*]}"

# Execute docker compose with the processed arguments
exec docker compose $COMPOSE_FILES $COMMAND "${DOCKER_ARGS[@]}"
