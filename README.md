# silex-socket-service
![](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

[![CI](https://github.com/ArtFXDev/silex-socket-service/actions/workflows/mocha.yml/badge.svg)](https://github.com/ArtFXDev/silex-socket-service/actions/workflows/mocha.yml)


Socket-io bridge between front app and dccs

See the [Wiki](https://github.com/ArtFXDev/silex-socket-service/wiki)

## Get Started
On standalone : 
 - get latest release
 - ``` npm i ```
 - ``` npm run start ```

In desktop project:
  - Create .npmrc next to package.json and put that in:
  - ```
    //npm.pkg.github.com/:_authToken=<YOUR_GITHUB_TOKEN>  # only if your repository is private
    @ArtFXDev:registry=https://npm.pkg.github.com/
    ```
    **Dont forget to replace <YOUR_GITHUB_TOKEN> woith your github access token**, ref : [here](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
  - ``` npm install @artfxdev/silex-socket-service ```
