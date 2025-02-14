/**
 * @overview data-based resources of ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 */

ccm.files[ 'resources.js' ] = {

  "local": {
    "css.1.1": "./../er_trainer/resources/default.css",
    "html.1": "./../er_trainer/resources/templates.mjs",
    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
    "oncancel": [ "ccm.load", "./../er_trainer/helper/helper.mjs#oncancel" ],
    "onchange": [ "ccm.load", "./../er_trainer/helper/helper.mjs#onchange" ],
    "onstart": [ "ccm.load", "./../er_trainer/helper/helper.mjs#onstart" ],
    "onfinish": { "log": true, "restart": true },
    "text.cancel": "ER-REL-Trainer",
    "default.notation": "abrial"
  },

  "demo": {}

};
