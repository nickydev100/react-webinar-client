# Gitlab Runner Notes

## Tweaks for gitlab-runner on an ubuntu host

The docker-in-docker service is tweaky to get working. The following solved the problems encountered (so far):

- Be sure to setup the runner config.toml per https://docs.gitlab.com/runner/executors/docker.html#use-docker-in-docker-with-privileged-mode

- The `DOCKER_TLS_CERTDIR` needs to be blanked out, per https://gitlab.com/gitlab-com/support-forum/issues/4416#note_216039772 for docker:19 to work.
