/**
 * @overview ccmjs-based web component for multiple choice
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (23.08.2021)
 */

( () => {
  const component = {
    name: 'mc',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.4.js',
    config: {
      "css": [ "ccm.load", [
        "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
        "https://ccmjs.github.io/eild/mc/resources/styles.css"
      ] ],
//    "data": { "store": [ "ccm.store" ] },
//    "escape": true,
//    "feedback": true,
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.5.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/mc/resources/templates.mjs" ],
//    "number": 5,
//    "onfinish": instance => console.log( instance.getValue() ),
      "questions": [],
      "random": true,
      "shuffle": true,
      "text": {
        "buttons": [ "TRUE", "", "FALSE" ],
        "finish": "Finish",
        "next": "Next",
        "question": "Question %nr%/%total%",
        "submit": "Submit"
      },
//    "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
    },
    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * current app state data
       * @type {Object}
       */
      let data;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // set identifier and original order number for each question and each answer
        this.questions = $.clone( this.questions );
        if ( $.isObject( this.questions ) )
          this.questions = Object.values( this.questions );
        this.questions.forEach( ( question, i ) => {
          if ( !question.key ) question.key = $.toKey( question.text );
          question.nr = i + 1;
          if ( $.isObject( question.answers ) )
            question.answers = Object.values( question.answers );
          question.answers.forEach( ( answer, i ) => {
            if ( !answer.key ) answer.key = $.toKey( answer.text );
            answer.nr = i + 1;
          } );
        } );

      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // set initial app state data
        data = await $.dataset( this.data );
        if ( !data.nr ) {
          data.questions = $.clone( this.questions );
          this.shuffle && $.shuffleArray( data.questions );
          if ( this.number && this.number <= data.questions.length ) data.questions = data.questions.slice( 0, this.number );
          this.random && data.questions.forEach( question => $.shuffleArray( question.answers ) );
          data.nr = 1;
        }

        // render current app state and trigger optional 'onstart' callback
        render();
        this.element.querySelectorAll( '[checked]' ).forEach( input => input.checked = true );  // prevent lit-html bug
        this.onstart && this.onstart( this );

      };

      /**
       * returns current app state data
       * @returns {Object} current app state data
       */
      this.getValue = () => $.clone( data );

      /** renders current app state */
      const render = () => this.html.render( this.html.question( this, events ), this.element );

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /**
         * when 'submit' button is clicked
         * @param {Object} event
         */
        onSubmit: event => {
          event.preventDefault();
          const question = data.questions[ data.nr - 1 ];
          if ( !question.answers.length || question.answers[ 0 ].input !== undefined ) return;
          const input = $.formData( this.element.querySelector( 'form' ) ).input;
          input.forEach( ( input, i ) => data.questions[ data.nr - 1 ].answers[ i ].input = input );
          this.feedback ? render() : events.onNext();
        },

        /** when 'next' button is clicked */
        onNext: () => {
          const question = data.questions[ data.nr - 1 ];
          if ( data.questions.length <= 1 || question.answers.length && data.questions[ data.nr - 1 ].answers[ 0 ].input === undefined || data.nr === data.questions.length ) return;
          data.nr++;
          render();
        },

        /** when 'finish' button is clicked */
        onFinish: () => {
          const question = data.questions[ data.nr - 1 ];
          if ( !this.onfinish || question.answers.length && question.answers[ 0 ].input === undefined || data.nr !== data.questions.length ) return;
          delete data.nr;
          $.onFinish( this );
        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();