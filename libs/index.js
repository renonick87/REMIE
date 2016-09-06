/* ************************************************** *
 * ******************** Module Variables & Constants
 * ************************************************** */

var i18next = require('i18next'), 
  EventEmitter = require('events').EventEmitter,
  util = require('util');
const ERROR_LEVEL_FATAL = 'fatal',
  ERROR_LEVEL_ERROR = 'error',
  ERROR_LEVEL_WARN = 'warn',
  ERROR_LEVEL_INFO = 'info',
  ERROR_LEVEL_DEBUG = 'debug',
  ERROR_LEVEL_TRACE = 'trace';
  
const DEFAULT_ERROR_MESSAGE = "Internal server error!",
  DEFAULT_ERROR_LOCALE = "server.500.generic";


/* ************************************************** *
 * ******************** RichError Class
 * ************************************************** */

class REMIE {
  constructor(err = {}, options = {}, locale) {
    console.log('constructor was called')
    this.setDefault();
    let event = 'on-internal-error'
    EventEmitter.call(this)
    this.create(err, options, locale)
  };

  create(err, options, locale) {
    console.log('create was called')
    if (richError.internalMessage) {
      this.on(RichError.internalMessage); //signals listener in example
    }
    return new RichError(err, options, locale)
  }

  static buildInternal(err, options) { 
    console.log('static was called') //temporary
    options.internalOnly = true;
    return new REMIE(err, options);
  };

  copy(remie) {
    console.log('copy was called')
    let self = remie
    return new REMIE(self.toObject());
  };

  /* ************************************************** *
   * ******************** Private Methods
   * ************************************************** */



  toObject(remie) {
    console.log('toObject was called') // temp
    let self = this
    console.log(self)
    return {
      error: {
        code: self.error.code,
        message: self.error.message,
        stack: self.error.stack
      },
      internalOnly: self.internalOnly,
      internalMessage: self.internalMessage,
      level: self.level,
      messageData: self.messageData,
      options: self.options,
      referenceData: self.referenceData,
      statusCode: self.statusCode
    };
  };

  log(logger) {
    console.log('log was called') //temp
    if(this.internalMessage) {
      logger[this.level](this.internalMessage);
    }
    if(this.error) {
      logger[this.level](JSON.stringify(this.error, undefined, 2));
      if(this.error.stack) {
        logger[this.level]("Stack Trace: %s", this.error.stack);
      }
    }
  };

  toResponseObject(options = {}) {
    console.log('toResponseObject was called') //temp
    let self = this,
      obj = {}; 
    if(self.internalOnly !== true && options.internalOnly !== false) {
      if (self.error && options.error !== false) {
        let error = {},
          errorOptions = options.error || {};
        if (self.error.message && errorOptions.message !== false) {
          error.message = self.error.message;
        }
        if (self.error.code && errorOptions.code !== false) {
          error.code = self.error.code;
        }
        if (self.error.stack && errorOptions.stack !== false) {
          error.stack = self.error.stack;
        }
        obj.error = error;
      }
      if(self.referenceData && options.referenceData !== false) {
        obj.referenceData = self.referenceData;
      }
      if(self.level && options.level !== false) {
        obj.level = self.level;
      }
      if(self.messageData && options.messageData !== false) {
        obj.messageData = self.messageData;
      }
      if(self.statusCode && options.statusCode !== false) {
        obj.statusCode = self.statusCode;
      }
      return obj;
    } else {
      return undefined;
    }
  }

  handle(event, data, options, cb) {
    this.emit(event, data, options);
    if (this.handlers[event]) {
      this.handlers[event](data, options, cb, this);
    }
    return this;
  }
  
  onLog(data, options = {}) {
    if (this.log && data) {
      let method = this.log[options.level || "info"];
      method.apply(this.log, data);
    }
  };

  setDefault() {
    console.log('setDefault was called') //temp
    this.i18next = i18next;
    this.log = undefined;

    // adds event listeners
    this.on(REMIE.ON_LOG, this.onLog);
    
    // add default handlers
    this.handlers = {};
    this.use(REMIE.HANDLER_TYPE_ERROR, HANDLER_INTERNAL_ERROR)
    this.use(REMIE.ON_REPLY_ERROR, this.onReplyError);
    this.use(REMIE.ON_REPLY_ERROR_TO_OBJECT, this.onReplyErrorToObject);
    this.use(REMIE.ON_SANITIZE_DATA, this.onSanitizeData);
    this.use(REMIE.ON_TRANSLATE, this.onTranslate);
    return this;
  }

  onSanitizeData(data, options = {}, cb, riposte) {
    cb(undefined, data);
  }

  onTranslate(data, options = {}, cb, riposte) {
    let self = this || self;

    let i18next = self.get("i18next");
    if(i18next) {
      cb(undefined, i18next.t(data, options));
    } else {
      cb(undefined, data);
    }
  }

  use(type, method) {
    console.log('use was called') //temp
    this.handlers[type] = method;
    return this;
  }

  static get ON_LOG() { return "log" }
  static get HANDLER_INTERNAL_ERROR() {return 'internal error'}
  static get ON_REPLY_ERROR() { return "reply-error" }
  static get ON_REPLY_ERROR_TO_OBJECT() { return "reply-error-to-object" }
  static get ON_SANITIZE_DATA() { return "sanitize-data" }
  static get ON_TRANSLATE() { return "translate" }
};

util.inherits(REMIE, EventEmitter)


/* ************************************************** *
 * ******************** Require Other Classes
 * ************************************************** */
let RichError = require('./RichError.js'),
  richError = new RichError()

module.exports = REMIE

const HANDLER_INTERNAL_ERROR = function(err, options, locale) {
  console.log('HANDLER_INTERNAL_ERROR was called') //temp
  if (err.internalMessage) {
    console.log('Internal Error %s', err)
  }
}