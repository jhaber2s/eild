/**
 * @overview data-based resources of ccmjs-based web component for building a ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css.1.1.1": "./resources/default.css",
    "data": {
      "store": [ "ccm.store", { "local": [ "ccm.load", "./../er_trainer/resources/resources.js" ] } ],
      "key": "local"
    },
    "html.1": "./resources/templates.mjs",
    "onfinish": { "log": true },
    "results": { "store": { "name": "er_trainer-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } },
    "tool": [ "ccm.component", "./../er_trainer/ccm.er_trainer.js", [ "ccm.get", "./../er_trainer/resources/resources.js", "local" ] ]
  },

  "demo": {
    "data": {
      "store": [ "ccm.store", { "local": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/resources.js" ] } ],
      "key": "demo"
    },
    "onfinish": { "log": true },
    "results": { "store": { "name": "er_trainer-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } }
  },

  "dms": {
    "css": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer_builder/resources/default.css" ],
    "libs": null,
    "preview": null,
    "results": { "store": { "name": "er_trainer-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } },
    "submit": null
  },

  "dbs-ss21": {
    "data": {
      "store": [ "ccm.store", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "1617572240691X6582447302605123"
    },
    "onfinish": { "log": true, "store": true, "alert": "Saved!" },
    "results": { "store": { "name": "er_trainer-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } }
  },

  "eild": {
    "data": {
      "store": [ "ccm.store", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "1621582970875X5476706877170028"
    },
    "onfinish": { "log": true, "store": true, "alert": "Saved!" },
    "results": { "store": { "name": "er_trainer-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } }
  },

  "playground": {
    "data": {
      "store": [ "ccm.store", { "name": "dms-configs", "url": "https://ccm2.inf.h-brs.de" } ],
      "key": "1624283532040X746466302845141"
    },
    "onfinish": { "log": true, "store": true, "alert": "Saved!" },
    "results": { "store": { "name": "er_trainer-results", "url": "https://ccm2.inf.h-brs.de" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } }
  }

};