# Self-Hosted Supabase using Docker

This is an expanded Docker setup for self-hosting Supabase, which builds upon the work done by @activenode in [his Supabase self-hosting guide](https://blog.activeno.de/the-ultimate-supabase-self-hosting-guide).

[![YouTube](https://markdown-videos-api.jorgenkh.no/youtube/wyUr_U6Cma4?width=1280&height=720&filetype=webp)](https://www.youtube.com/watch?v=wyUr_U6Cma4)

- [Blog post](https://blog.activeno.de/the-ultimate-supabase-self-hosting-guide)
- [Video](https://www.youtube.com/watch?v=wyUr_U6Cma4)
- [Official Supabase self-hosting guide](https://supabase.com/docs/guides/self-hosting)

You obviously need to have Docker installed on your machine before proceeding.

## Setup

These are the points of interest from the blog post:

- [Self-hosted S3 via minio](https://blog.activeno.de/the-ultimate-supabase-self-hosting-guide#heading-option-2-s3-storage-self-hosted-miniohttpsminio)
- [Setting up the Supabase server](https://blog.activeno.de/the-ultimate-supabase-self-hosting-guide#heading-2-setting-up-the-supabase-server)
  - Note: To ease setting up credentials from [`.env.example`](./.env.example) (after running `cp .env.example .env`), the most important credentials have been marked with `TODO` comments.
- [Setting up Nginx Proxy Manager](https://blog.activeno.de/the-ultimate-supabase-self-hosting-guide#heading-4-make-it-run)
  - Note: This part is best done by watching the video, starting from [here](https://www.youtube.com/watch?v=wyUr_U6Cma4&t=21m17s). If not planning to use Authelia, remember to add Basic Auth!
- [Setting up Authelia](https://blog.activeno.de/the-ultimate-supabase-self-hosting-guide#heading-5-more-than-basic-auth-authelia)
  - Note: [5.1](https://blog.activeno.de/the-ultimate-supabase-self-hosting-guide#heading-51-adapt-the-default-configuration) can be done by copying [`authelia/config/configuration.yml.example`](./authelia/config/configuration.yml.example) to `configuration.yml` before making changes: `cp ./authelia/config/configuration.yml.example ./authelia/config/configuration.yml`
  - Note: [5.3](https://blog.activeno.de/the-ultimate-supabase-self-hosting-guide#heading-53-adapt-the-default-configuration) has already been done for you under [`ngnix/snippets/`](./nginx/snippets/), however you'll need to copy [`nginx/snippets/authelia-authrequest.conf.example`](./nginx/snippets/authelia-authrequest.conf.example) to `nginx/snippets/authelia-authrequest.conf` before making changes: `cp ./nginx/snippets/authelia-authrequest.conf.example ./nginx/snippets/authelia-authrequest.conf` (you need to change `auth.yourdomain.com` to your domain)

Watch the video for an easier to follow walkthrough.

## Launching Supabase

[`scripts/launcher.sh`](./scripts/launcher.sh) is a helpful wrapper for `docker compose` that includes some additional CLI flags for our self-hosted Supabase setup.

```bash
Usage:  ./launcher.sh COMMAND [OPTIONS]

A wrapper for docker compose with predefined CLI inputs for our self-hosted Supabase setup.

Extraneous flags not specified below are passed through to docker compose. 

Commands:
  up          Create and start containers (docker compose up)
  dev:up      (same as 'up' but with '-f ./dev/docker-compose.dev.yml')
  down        Stop and remove containers, networks (docker compose down)
  dev:down    (same as 'down' but with '-f ./dev/docker-compose.dev.yml')
  pull        Pull service images (docker compose pull)
  stop        Stop services (docker compose stop)

Options:
      --s3               Include S3 configuration (docker-compose.s3.yml)
      --nginx            Include Nginx configuration (docker-compose.nginx.yml)
      --authelia         Include Authelia configuration (docker-compose.authelia.yml)
                         (automatically includes Nginx configuration)

Examples:
    ./launcher.sh pull --s3 --nginx
    ./launcher.sh up --s3 --authelia
    ./launcher.sh down --volumes
    ./launcher.sh dev:up --nginx
    ./launcher.sh dev:down -v --remove-orphans
```

## Keeping this up to date

The [`update-supabase-app.sh`](./scripts/update-supabase-app.sh) script can be used to keep your repository up to date with the latest changes made to the [`docker/`](https://github.com/supabase/supabase/tree/master/docker/) folder within the official [supabase](https://github.com/supabase/supabase) repository. Merge conflicts may arise, so resolve them as needed.
