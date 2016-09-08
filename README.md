# envic

Humanized JSON, JSONIC or string environment variables.

Get strings and expanded JSON and JSONIC variables into objects, for environment keys be the passed humanized key (ex: `Mongo URL`), [underscored](http://stringjs.com/#methods/underscore) key (ex: `MONGO_URL` or `mongo_url`), [camelized](http://stringjs.com/#methods/camelize) key (ex: `mongoUrl` or `MONGOURL`) or [slugified](http://stringjs.com/#methods/slugify) key (ex: `MONGO-URL` or `mongo-url`)

## Detection order

1) passed key
2) uppercased underscored
3) lowercased underscored
4) camelized
5) uppercase camelized
6) uppercase slugified
7) lowercase slugified

## Install

```sh
npm i envic --save
```

## Usage

```js
var envic = require('envic')

console.log(envic('port'))       // default port or undefined
console.log(envic('port', 5000)) // default port or 5000
```

```js
// instead of:
var mongourl = process.env.MONGO_URL || 'mongodb://localhost:27017/mydb'

// use:
var mongourl = envic('Mongo URL', 'mongodb://localhost:27017/mydb')
```

Matches keys: `Mongo URL`, `MONGO_URL`, `mongo_url`, `mongoUrl`, `MONGOURL`, `MONGO-URL`, `mongo-url`


### JSON environment variables

 Ex: env variable MAILGUN = `{"apiKey":"key-DEFAULT_KEY", "domain":"myproject.mailgun.com"}`

```js
// instead of:
var mailgunConfig, defaultConfig = {apiKey: 'key-XXXXXXXXXXXXX', domain: 'example.mailgun.com'}
try {
  mailgunConfig = JSON.parse(process.env.MAILGUN)
} catch(e) {
  mailgunConfig = defaultConfig
}

// use:
var mailgunConfig = envic('MailGun', {apiKey: 'key-DEFAULT_KEY', domain: 'example.mailgun.com'})
```
### JSONIC environment variables

[JSONIC](https://github.com/rjrodger/jsonic) is simplifed JSON

Ex: env variable MAILGUN = `apiKey:key-DEFAULT_KEY, domain:myproject.mailgun.com`


```js
// use:
var mailgunConfig = envic('MailGun', {apiKey: 'key-DEFAULT_KEY', domain: 'example.mailgun.com'})
```

## License

MIT
