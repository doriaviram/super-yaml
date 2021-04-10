# super-yaml

[![Version](https://img.shields.io/npm/v/super-yaml.svg)](https://npmjs.org/package/super-yaml)
[![Downloads/week](https://img.shields.io/npm/dw/super-yaml.svg)](https://npmjs.org/package/super-yaml)
[![codecov](https://codecov.io/gh/doriaviram/super-yaml/branch/master/graph/badge.svg?token=D2ZTCVDOX1)](https://codecov.io/gh/doriaviram/super-yaml)
[![License](https://img.shields.io/npm/l/super-yaml.svg)](https://github.com/doriaviram/super-yaml/blob/master/package.json)
[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

## Intro

super-yaml is a tool that helps you write enhanced yaml's and compile them to regular yaml `.yml` files.

## Features

### Common types

**In**

```yaml
_types:
  Student:
    template:
      name: $name
      class: Math

TestStudent1<Student>:
  name: SuperName1
TestStudent2<Student>:
  name: SuperName2
DummyStudent:
  name: "DummyStudent"
```

**Out**

```yaml
TestStudent1:
  name: "SuperName1"
  class: "Math"
TestStudent2:
  name: "SuperName2"
  class: "Math"
DummyStudent:
  name: "DummyStudent"
```

### Default values

**In**

```yaml
_types:
  Student:
    template:
      name: $name
      class: $class:Math

TestStudent1<Student>:
  name: SuperName1
  class: Geo
TestStudent2<Student>:
  name: SuperName2
DummyStudent:
  name: "DummyStudent"
```

**Out**

```yaml
TestStudent1:
  name: "SuperName1"
  class: "Geo"
TestStudent2:
  name: "SuperName2"
  class: "Math"
DummyStudent:
  name: "DummyStudent"
```

## DRY - Imports

**In**

`shared.syml`
```yaml
_types:
  Student:
    template:
      name: $name
      class: $class:Math
```

`config.syml`
```yaml
_import:
  - ./shared.syml

TestStudent1<Student>:
  name: SuperName1
  class: Geo
TestStudent2<Student>:
  name: SuperName2
DummyStudent:
  name: "DummyStudent"
```

**Out**

```yaml
TestStudent1:
  name: "SuperName1"
  class: "Geo"
TestStudent2:
  name: "SuperName2"
  class: "Math"
DummyStudent:
  name: "DummyStudent"
```

<!-- toc -->

- [super-yaml](#super-yaml)
- [Requirements](#requirements)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Requirements

`nodejs >= 12`

# Usage

<!-- usage -->

```sh-session
$ npm install -g super-yaml
$ super-yaml COMMAND
running command...
$ super-yaml (-v|--version|version)
super-yaml/0.0.0 darwin-x64 node-v12.9.1
$ super-yaml --help [COMMAND]
USAGE
  $ super-yaml COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`super-yaml compile`](#super-yaml-compile)
- [`super-yaml help [COMMAND]`](#super-yaml-help-command)

## `super-yaml compile`

Compile syml to simple yml

```
USAGE
  $ super-yaml compile

OPTIONS
  -s, --source=source  (required)
  -t, --target=target  (required)

EXAMPLES
  $ super-yaml compile -s config.syml -t config.yml
  $ super-yaml compile --source config.syml --target config.yml
```

_See code: [src/commands/compile.ts](https://github.com/doriaviram/super-yaml/blob/v0.0.0/src/commands/compile.ts)_

## `super-yaml help [COMMAND]`

display help for super-yaml

```
USAGE
  $ super-yaml help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

<!-- commandsstop -->
