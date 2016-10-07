# Your password sucks

## Overview 

A tool to check your password against dictionary attacks

## Getting started

- *Get Chocolatey*: `iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))`
- Node.js and npm: `choco install nodejs.install`
- Visual Studio Code: `choco install visualstudiocode`

**Install:**
- Install global dependencies: `npm install -g webpack webpack-dev-server karma-cli`
- Install dependencies: `npm install`

**Run it:**
- `npm start`
- Browse to http://localhost:8080/

**Test it:**
- `npm test`

## Editor Notes ##

- **VSCode** seems to need this for Typescript 2 to work

```javascript
// Place your settings in this file to overwrite default and user settings.
	{
	    "typescript.tsdk": "node_modules/typescript/lib"
	}
```