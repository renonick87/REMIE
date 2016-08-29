let REMY = require('../libs/index.js'),
  remy = new REMY(),
  i18next = require('i18next'),
  EventEmitter = require('events').EventEmitter;
  //EventListener = require('events').EventListener;
  //console.log(EventListener)
  var inherits = require('util').inherits;
  err = {}
  err.code = 'wooh!'
  err.internalMessage = 'internal message1'
//addEventListener here
// needs to be able to listen for when 'on-internal-error' is true, then it can emit signal to log it
// or change richError.on to an eventListener and skip a step
//console.log(richError)
console.log(remy, '2')
inherits(REMY, EventEmitter)
//console.log(richError)
//have to fix this eventually vvvv
//RichError.set({i18next: i18next});

let error = remy.create(err, {})
//let error = richError.create("Something went wrong", {});
//let error2 = richError.create("Something else went wrong", {});
//let error3 = richError.create("Oh crap, what now", {});

remy.on('on-internal-error', function(err){
  console.log("Internal Error %s", err.internalMessage);
});
var event = 'on-internal-error'
remy.emit(event, err)
/*
class EventListener{
  constructor(){
    this.events = [];
  }
  on(event, fn) {
    this.events[event] = this.events[event] || []
    this.events[event].push(fn);
  }
  fire(event) {
    if (this.events[event]) {
      this.events[event].forEach(function(fn) {
        fn()
      })
    }
  }
}

var EvList = new EventListener();

EvList.on('on-internal-error', function() {
  console.log('Internal Error %s', err);
})

EvList.fire('on-internal-error')

/*
// creates a new Error instance
var err = new Error()
var options = {
  internalOnly: false,
  internalMessage: 'This is the internalMessage',
  level: undefined,
  messageData: 'This is the messageData.',
  referenceData: 'This is the referenceData.',
  statusCode: undefined,
  'i18next': 'i18next' // cannot be i18next, gives error 'TypeError: Converting circular structure to JSON'
// buildFromLocale, in index.js, tries to translate the many properties and methods of the i18next object
};

var locale = 'server.400.notFound' 

localeErr = 'server.400.forbidden'

i18next.init({
	lng: "en-US",
  //nsSeparator: false,
	keySeparator: false,
  //load:['en-US', 'fr', 'es'],
  //fallbackLng: 'en-US',
  //backend: {
  //  loadPath: '/language/static/{{lng}}/{{ns}}.json'
  //},
  resources: {
    en: {
      translation: { // did a lot of searching, still unsure how this works
      	// probably have to load JSON file here
      	"server":{
          "400":{
            "forbidden": "this is how it's done"
          }
        }
        "server.400.forbidden" : "it might be working",
        // keySeparator must be set to false else 'server.400' is not recognized with '.'
        "server" : "this one works"
      }
    }
  }
}//, (err, t) => {
  //const hw = i18next.t('key'); // hw = 'hello world'
//}
)

//creates a new instance of RichError
var exampleRichError = new RichError(err, options, i18next, locale)


console.log(exampleRichError)


// creates a new RichError instance with a RichError passed in
console.log(new RichError(exampleRichError, options, i18next, locale))


// creates a new RichError instance with locale error passed in
// tries to find status code for the error
console.log(new RichError(localeErr, options, i18next, locale))


console.log(exampleRichError.toResponseObject(localeErr, options, i18next, locale))

// exists must be sent a string
console.log(i18next.exists('server'))
console.log(i18next.t(localeErr)) // returns "it might be working"
console.log(i18next.exists('server.400.forbidden'))


//					 ||||
//error here vvvv if options.i18next is not a string
console.log(RichError.buildInternal(err, options, localeErr))*/