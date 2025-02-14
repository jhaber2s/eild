/**
 * @overview ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version 1.0.0
 * @changes
 * version 1.0.0 (19.04.2021)
 */

( () => {

  const component = {
    name: 'er_trainer',
    version: [ 1, 0, 0 ],
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.3.0.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/er_trainer/resources/default.css"
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r" ],
        "left": "copied",
        "notation": "crow",
        "path": "https://ccmjs.github.io/eild/er_trainer/resources/img/"
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://github.com/ccmjs/eild/blob/e37d520c9b815283cb1b2496992a7ef1568599b0/er_trainer/resources/templates.mjs" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "feedback": true,
      "legend": true,
      "modal": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.0.0.js", {
        "backdrop_close": true,
        "content": "",
        "closed": true,
        "buttons": ""
      } ],
      "notations": {
        "abrial": {
          "key": "abrial",
          "title": "Abrial",
          "swap": true,
          "centered": true,
          "comment": "Die Abrial bzw. (min,max)-Notation gibt für jeden an einer Beziehung beteiligten Entitätstyp an, mit wie vielen Entitäten auf der anderen Seite eine Entität dieses Typs mindestens und höchstens in Beziehung steht."
        },
        "arrow": {
          "key": "arrow",
          "title": "Pfeilnotation",
          "left": "mirrored"
        },
        "chen": {
          "key": "chen",
          "title": "Chen",
          "centered": true,
          "comment": "In der Chen-Notation sind nur einfache und mehrfache Beziehungstypen (1 und N) darstellbar, da die Beziehungsmengen bei Chen nur in ihrer Maximalaussage genannt werden. Bei Phrasen die auf einen bedingten oder mehrfach bedingten Beziehungstyp hindeuten, sollte besser zu einer anderen Notation gewechselt werden."
        },
        "crow": {
          "key": "crow",
          "title": "Krähenfuß",
          "left": "mirrored"
        },
        "mc": {
          "key": "mc",
          "title": "MC"
        },
        "uml": {
          "key": "uml",
          "title": "UML"
        }
      },
      "number": 5,
//    "oncancel": ( instance, phrase_nr ) => {},
//    "onchange": event => console.log( event ),
//    "onstart": instance => console.log( instance ),
      "onfinish": { "restart": true },
      "phrases": [ "ccm.get", { "name": "eild-er_trainer-phrases", "url": "https://ccm2.inf.h-brs.de" } ],
      "show_solution": true,
      "shuffle": true,
      "text": {
        "cancel": "Abbrechen",
        "correct": "Ihre letzte Antwort war richtig!",
        "correct_solution": "Richtige Lösung:",
        "current_state": "Sie haben %% von %% Phrasen richtig beantwortet!",
        "entity1": "Entity 1",
        "entity2": "Entity 2",
        "failed": "Ihre letzte Antwort war falsch!",
        "finish": "Neustart",
        "heading": "Bitte wählen Sie den zu der Phrase passenden Beziehungstyp in der Auswahlbox aus!",
        "input1": "Auswahl 1:",
        "input2": "Auswahl 2:",
        "notation": "Notation:",
        "legend": "Legende",
        "next": "Weiter",
        "phrase": "Phrase [%%]:",
        "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
        "submit": "Antworten",
        "title": "ER-Trainer"
      },
      "values": [ "1", "c", "n", "cn" ]
    },

    Instance: function () {

      let $, dataset, notation, phrase_nr, phrases;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // set title of modal dialog
        this.modal.title = this.text.legend;

        // uniform notations data
        for ( const key in this.notations ) {
          let notation = this.notations[ key ];
          this.notations[ key ] = {
            key: notation.key,
            title: notation.title,
            swap: !!notation.swap,
            centered: !!notation.centered,
            left: notation.left || this.default.left,
            images: ( notation.images || this.default.images ).map( image => image.includes( '.' ) ? image : ( notation.path || this.default.path ) + notation.key + '/' + image + '.' + ( notation.format || this.default.format ) ),
            comment: notation.comment
          };
        }

        // uniform phrases data
        if ( $.isObject( this.phrases ) ) this.phrases = Object.values( this.phrases ).map( phrase => { delete phrase.key; return phrase; } );

      };

      this.ready = async () => {

        // clone and shuffle original phrases
        phrases = $.clone( this.phrases );
        this.shuffle && $.shuffleArray( phrases );

        // logging of 'ready' event
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );

      };

      this.start = async () => {

        // not enough phrases left? => clone and shuffle original phrases
        if ( phrases.length < this.number ) {
          phrases = $.clone( this.phrases );
          this.shuffle && $.shuffleArray( phrases );
        }

        // get already existing app state data
        dataset = await $.dataset( this.data );
        dataset = Object.assign( dataset, {
          correct: 0,
          notation: notation || dataset.notation || this.default.notation,
          sections: [],
          total: this.number
        } );

        // render first phrase
        phrase_nr = 0;
        nextPhrase();

        // set content of modal dialog for legend table
        this.html.render( this.html.legend( this ), this.modal.element.querySelector( 'main' ) );

        this.onstart && await this.onstart( this );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', { dataset: $.clone( dataset ), phrases: $.clone( phrases ) } );

      };

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;
        dataset.sections.push( {
          input: [ '', '' ],
          relationship: phrases[ 0 ].relationship,
          solution: phrases[ 0 ].solution,
          text: phrases[ 0 ].text
        } );
        render();
      };

      /** renders current phrase */
      const render = () => {
        this.html.render( this.html.main( this, dataset, phrases[ 0 ], phrase_nr, onNotationChange, onLegendClick, onLeftInputChange, onRightInputChange, onCancelClick, onSubmitClick, onNextClick, onFinishClick ), this.element );
        this.element.querySelectorAll( '[selected]' ).forEach( option => option.selected = true );  // workaround for lit-html bug
      };

      /**
       * returns current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

      /** when selected entry for displayed notation changes */
      const onNotationChange = event => {
        dataset.notation = notation = event.target.value;
        render();
        this.onchange && this.onchange( { event: 'notation', instance: this } );
      };

      /** when 'legend' button is clicked */
      const onLegendClick = () => {
        this.modal.open();
        this.onchange && this.onchange( { event: 'legend', instance: this } );
      }

      /** when selected entry of left selector box changes */
      const onLeftInputChange = event => {
        setInput( false, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'left', instance: this, phrase: phrase_nr } );
      };

      /** when selected entry of right selector box changes */
      const onRightInputChange = event => {
        setInput( true, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'right', instance: this, phrase: phrase_nr } );
      };

      /** when 'cancel' button is clicked */
      const onCancelClick = () => {
        this.oncancel && this.oncancel( this, phrase_nr );
        this.onchange && this.onchange( { event: 'cancel', instance: this, phrase: phrase_nr } );
      }

      /** when 'submit' button is clicked */
      const onSubmitClick = () => {
        const section = dataset.sections[ phrase_nr - 1 ];
        section.input = [
          this.element.querySelector( '#input' + ( this.notations[ dataset.notation ].swap ? 2 : 1 ) ).value,
          this.element.querySelector( '#input' + ( this.notations[ dataset.notation ].swap ? 1 : 2 ) ).value
        ];
        section.correct = section.input.toString() === section.solution.toString();
        if ( section.correct ) dataset.correct++;
        this.feedback && this.element.classList.add( section.correct ? 'correct' : 'failed' );
        render();
        this.onchange && this.onchange( { event: 'submit', instance: this, phrase: phrase_nr } );
        !this.feedback && onNextClick();
      };

      /** when 'next' button is clicked */
      const onNextClick = () => {
        this.element.classList.remove( 'correct' );
        this.element.classList.remove( 'failed' );
        phrases.shift();
        nextPhrase();
        this.onchange && this.onchange( { event: 'next', instance: this, phrase: phrase_nr } );

        // logging of 'next' event
        this.logger && this.logger.log( 'next', { nr: phrase_nr, phrase: $.clone( phrases[ 0 ] ) } );
      };

      /** when 'finish' button is clicked */
      const onFinishClick = () => {
        this.element.classList.remove( 'correct' );
        this.element.classList.remove( 'failed' );
        phrases.shift();
        this.onfinish && $.onFinish( this );

        // logging of 'finish' event
        this.logger && this.logger.log( 'finish', this.getValue() );
      };

      /**
       * updates selected value of left or right selector box in app state data
       * @param {boolean} left_or_right - left: false, right: true
       * @param {string} value - selected value
       */
      const setInput = ( left_or_right, value ) => {
        const section = dataset.sections[ phrase_nr - 1 ];
        if ( !section.input ) section.input = [];
        section.input[ left_or_right ? 1 : 0 ] = value;
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();