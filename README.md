# Your password sucks

## Overview 

A tool to check your password against dictionary attacks. Uses a password dictionary and rule set to attack your password. Runs in a browser so that no-one has to trust my server with their passwords.

The same principle as a [Hashcat Rule-based Attack](https://hashcat.net/wiki/doku.php?id=rule_based_attack). The difference is that this is a tool to checks a supplied plaintext passwords, rather than attempting to recover/crack passwords.

Rule support is not complete, currently 99.58319456639116% of the rule-combinations in the dive ruleset are fully supported. Check out [ruleDoco.txt](/YourPasswordSucks/src/services/rules/ruleDoco.txt) to check supported rules. Unknown rules will be treated as no-ops. Eg `se3 5XX ss$` (5 is unsupported/unknown), will be treated as `se3 : ss$` (`:` is a noop). 

## Performance

> The performance is this app kind of sucks. The size of the downloaded rule set and dictionary are the main levers on performance. These can be changed at the top of main.ts. There are performance related comments in that file. Depending on what you set there, the password check could take between seconds and many hours. Work is split up by the application into "chunks", which are give to WebWorkers. Progress through these chunks is shown on the screen as the app is calaculating.

## Getting started

**Setup (with Chocolately):**

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
	    "typescript.tsdk": "[...CHANGE THIS TO YOUR PATH...]node_modules/typescript/lib"
	}
```
