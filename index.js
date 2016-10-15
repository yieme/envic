'use strict';

!function() {
  var jsonic = require('jsonic');
  var S      = require('string');
  var env    = process.env;

  function envic(key, defaultValue) {
    if (typeof key != 'string') {
      return defaultValue;
    }
    var result = env[key]; // first try literal
    if (result === undefined) {
      var humanKey = S(key).humanize().s; // humanize key for remaining tests
      var underscoreKey = S(humanKey).underscore().s;
      result = env[underscoreKey.toUpperCase()];
      if (result === undefined) {
        result = env[underscoreKey];
        if (result === undefined) {
          var camelKey = S(humanKey).camelize().s
          result = env[camelKey];
          if (result === undefined) {
            result = env[camelKey.toUpperCase()];
            if (result === undefined) {
              var slugKey = S(humanKey).slugify().s;
              result = env[slugKey.toUpperCase()];
              if (result === undefined) {
                result = env[slugKey];
              };
            };
          };
        };
      };
    };
    if (typeof result == 'string') {
      var obj;
      try {
        var obj = jsonic(result)
        result = obj;
      } catch(e) {
        try {
          var obj = JSON.parse(result)
          result = obj;
        } catch(e) {}
      }
    }
    return (result === undefined) ? defaultValue : result;
  }

  module.exports = envic;
}()
