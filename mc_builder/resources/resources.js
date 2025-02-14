/**
 * @overview data-based resources of ccmjs-based web component for building a multiple choice
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css.1.1": "./resources/default.css",
    "data": {
      "store": [ "ccm.store", { "local": [ "ccm.load", "./../mc/resources/resources.js" ] } ],
      "key": "local"
    },
    "html.1": "./resources/templates.mjs",
    "onfinish": { "log": true },
    "results": { "store": { "name": "mc-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } },
    "tool": [ "ccm.component", "./../mc/ccm.mc.js", [ "ccm.get", "./../mc/resources/resources.js", "local" ] ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "local": [ "ccm.load", "https://ccmjs.github.io/eild/mc/resources/resources.js" ] } ],
      "key": "demo"
    },
    "onfinish": { "log": true },
    "results": { "store": { "name": "mc-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } }
  },

  "dms": {
    "css": [ "ccm.load", "https://ccmjs.github.io/eild/mc_builder/resources/default.css" ],
    "libs": null,
    "results": { "store": { "name": "mc-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } },
    "text.preview": null,
    "text.submit": null
  },

  "dbs-ss21": {
    "data": {
      "store": [ "ccm.store", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "..."
    },
    "onfinish": { "log": true, "store": true, "alert": "Saved!" },
    "results": { "store": { "name": "mc-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } }
  },

  "eild": {
    "data": {
      "store": [ "ccm.store", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "..."
    },
    "onfinish": { "log": true, "store": true, "alert": "Saved!" },
    "results": { "store": { "name": "mc-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } }
  },

  "playground": {
    "data": {
      "store": [ "ccm.store", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "..."
    },
    "onfinish": { "log": true, "store": true, "alert": "Saved!" },
    "results": { "store": { "name": "mc-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } }
  }

};