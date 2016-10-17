# Your password sucks

## Overview 

A tool to check your password against dictionary attacks. Uses a password dictionary and rule set to attack your password. Runs in a browser so that no-one has to trust my server with their passwords.

The same principle as a [Hashcat Rule-based Attack](https://hashcat.net/wiki/doku.php?id=rule_based_attack). The difference is that this is a tool to checks a supplied plaintext passwords, rather than attempting to recover/crack passwords.

Rule support is not complete, currently 99.58319456639116% of the rule-combinations in the dive ruleset are fully supported. Check out [ruleDoco.txt](/YourPasswordSucks/src/services/rules/ruleDoco.txt) to check supported rules. Unknown rules will be treated as no-ops. Eg `se3 5XX ss$` (5 is unsupported/unknown), will be treated as `se3 : ss$` (`:` is a noop). 


> *!! Currently, the performance of this solution is pretty bad. Rule sets and dictionaries have to be quite big to be useful. Javascript is a bit of a drag here. I might look into web workers or something. In the meantime, I would suggest maybe using a larger dictionary, but smaller ruleset than currently in the main.ts file. There are no progress bars here: start small, and scale up from there.*

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
