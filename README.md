# Silex Socket Service

![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

[![CI](https://github.com/ArtFXDev/silex-socket-service/actions/workflows/mocha.yml/badge.svg)](https://github.com/ArtFXDev/silex-socket-service/actions/workflows/mocha.yml)

Silex Socket Service is the Socket.IO websocket and http API that acts as a bridge between [dcc clients](https://github.com/ArtFXDev/silex_client) and [front-end apps](https://github.com/ArtFXDev/silex-front).

## Introduction

In the Silex pipeline, the front-end application is not integrated directly in the DCC software like Maya or Houdini. Instead, [silex-front](https://github.com/ArtFXDev/silex-front) is a web application running in Electron.

Since we need to communicate between the Python client and the interface, we use websockets. The server handles multiple dcc clients connections and forward messages back and forth to the interface.

Using Socket.IO is a good solution for this bidirectional communication.

For additional information go to the [Wiki](https://github.com/ArtFXDev/silex-socket-service/wiki)!

## Installation

The package manager used is [Yarn](https://yarnpkg.com/). Clone the repository and install the dependencies:

```bash
$ git clone https://github.com/ArtFXDev/silex-socket-service
$ cd silex-socket-service
$ yarn install # Install the dependencies
```

## Usage

### Available scripts

- 🚀 `yarn start` -> Start the HTTP server with WS and Express routes listeners

- 🧪 `yarn test` -> Run unit tests

## Libraries

Here are the main libraries and packages used:

| Library                   | Version  |
| ------------------------- | -------- |
| Socket.IO                 | `4.4.0`  |
| [Express](expressjs.com/) | `4.17.1` |

## Contributing

Pull requests and issues are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](./LICENSE.md) [@ArtFX](https://artfx.school/)
