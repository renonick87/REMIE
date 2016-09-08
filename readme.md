# REMIE (Rich Error Module Is Excellent)
standardizes errors across micro-services

```js
let remie = new (require('remie'))(),
	exRemie = remie.create(err, options, locale)
```

## Installation (currently waiting for npm support to transfer ownership)
```bash
$ npm install remie
```

## Examples
First, clone the REMIE repo and install any dependencies:
```bash
$ git clone https://github.com/livio/RichErrorModule.git
$ cd RichErrorModule
$ npm install
```
Then run an example:
```bash
$ node examples/better-example
```

## Tests
To run the tests, start by installing dependencies, then run ```npm test```:
```bash
$ npm install
$ npm test
```


## Parameters
| Parameter | Type | Default | Description | Required |
|-----------|------|---------|-------------|----------|
| options | Object | ```{}``` | Overrides default behaviors | ```no``` |
| err | Object | ??? | Node.js error that ocurred | ```yes``` |
| locale | String | ```server.500.generic``` | Similar to err.code??? |
| err.code | String | default depends on other parameters? | Unique string "server.400.error" | ```no``` |
| err.stack | String | ??? | String stack trace |
| options.internalOnly | Boolean | ```false``` | Specifies an error for the developer only | ```no``` |
| options.internalMessage | String | ```undefined``` | String message for developer | ```no``` |
| options.level | String | ```error``` | String error level (e.g. warning, info, error, trace) | ```no``` |
| options.referenceData | ??? | ```undefined``` | Data that may have caused the error | ```no``` |
| options.statusCode | Number | ```500``` | HTTP status code (e.g. 200, 400, 500) | ```no``` |

## License
[Ford](license)