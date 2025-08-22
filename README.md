[![main branch](https://github.com/christopherriley/config2env/actions/workflows/on_main_push.yml/badge.svg)](https://github.com/christopherriley/config2env/actions/workflows/on_main_push.yml)

## config2env - github action to build environment variables from config files

`Config2env` is a GitHub action that takes a config file (json, yaml, properties) and emits environment varialbes that can be used by the current action.

### example - json

Let's say the source repo has a config file:

```json
{
    "version": {
        "windows": 1.21,
        "linux": 1.22,
        "macos": 1.23
    }
}
```

The action can be called like the following:

```yaml
jobs:
  my-example-build:
    name: an example!
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: create env vars from config
        uses: christopherriley/config2env@main
        with:
          config-file: ./build_config.json
          prefix: config

      - name: do some stuff
      - run |
          echo windows version: $config_version_windows
          echo linux version: $config_version_linux
          # etc...
```

the file `./build_config.json` from the repo will be read, and environment variables which can be consumed by subsequent action steps will be created:

```bash
$config_version_windows = 1.21
$config_version_linux = 1.22
$config_version_macos = 1.23
```

### action inputs

| name | required | description |
| -------: | :------: | :------- |
| `config-file`  | `Yes`  | location of a config file to process from the current repo |
| `format`  | no  | can be one of `json`, `yaml`, `props` to force the config file type, instead of detecting |
| `prefix`  | no  | prefix to append to the environment variables |
| `include-keys`  | no  | comma-separated list of specific keys (paths) to include (do not include any prefix here) |


### usecases

this action can be helpful when it's necessary to keep a local build and a CI build in sync from a single config file, for example.

### runner platform support

This is a JavaScript action - windows, linux and macos supported and tested.
