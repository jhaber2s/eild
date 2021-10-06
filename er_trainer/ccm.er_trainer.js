/**
 * @overview ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (19.04.2021)
 */

( () => {

  const component = {
    name: 'er_trainer',
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
        "images": [ "e", "1", "c", "n", "cn", "r", "eVertical", "1Vertical", "cVertical", "nVertical", "cnVertical", "rVertical" ],
        "left": "copied",
        "notation": "crow",
        "path": "./resources/img/"
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_trainer/resources/templates.mjs" ],
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
      "phrases": [
        {
          "text": "Ein Kontinent besteht aus mehreren Staaten. Es gibt allerdings auch Staaten, die auf mehreren Kontinenten liegen.",
          "relationship": [
            "Kontinent",
            "besteht aus",
            "Staat"
          ],
          "solution": [
            "n",
            "n"
          ],
          "updated_at": "2021-04-12T14:19:10+02:00",
          "created_at": "2021-03-24T11:57:00+01:00",
          "comment": [
            "Ein Staat liegt auf einem oder auch mehreren Kontinenten.",
            "Ein Kontinent besteht aus einem bis hin zu mehreren Staaten."
          ],
          "key": "1616583419943X07816238718167612"
        },
        {
          "text": "Ein Orchester hat genau einen Dirigenten.",
          "relationship": [
            "Dirigent",
            "dirigiert",
            "Orchester"
          ],
          "solution": [
            "1",
            "1"
          ],
          "updated_at": "2021-04-12T14:19:10+02:00",
          "created_at": "2021-03-24T11:57:00+01:00",
          "comment": [
            "Ein Orchester wird von genau einem Dirigenten dirigiert.",
            "Ein Dirigent dirigiert genau ein Orchester."
          ],
          "key": "1616583420033X8090030402725776"
        },
        {
          "text": "Eine Stadt kann eine Hauptstadt sein. Jeder Staat hat genau eine Hauptstadt.",
          "relationship": [
            "Staat",
            "hauptstadt von",
            "Stadt"
          ],
          "solution": [
            "c",
            "1"
          ],
          "updated_at": "2021-04-12T14:19:10+02:00",
          "created_at": "2021-03-24T11:57:00+01:00",
          "comment": [
            "Stadt kann nur Hauptstadt von genau einem Staat sein.",
            "Die Beziehung ist Hauptstadt ist nur für höchstens eine Stadt in einem Staat richtig und für alle anderen falsch."
          ],
          "key": "1616583420056X5457200187602396"
        },
        {
          "text": "Ein Musiker spielt ein oder mehrere Instrumete. Ein Instrument wird von mehreren Musikern gespielt.",
          "relationship": [
            "Musiker",
            "spielt",
            "Instrument"
          ],
          "solution": [
            "n",
            "n"
          ],
          "updated_at": "2021-04-12T14:19:10+02:00",
          "created_at": "2021-03-24T11:57:00+01:00",
          "comment": [
            "Ein Instrument wird von mindestens einem bis hin zu mehreren Musikern gespielt.",
            "Musiker spielt mindestens ein bis hin zu mehreren Instrumenten."
          ],
          "key": "1616583420078X07000891364194728"
        },
        {
          "text": "Test bezeihung zwischen Objekten",
          "objects": [
            "Objekt1",
            "Objekt2",
            "Objekt3",
            "Objekt4",
            "Objekt5",
          ],
		      "relationship":["beziehung","","","",""],
          "solution": [
            "1",
            "n",
		      	"cn",
            "n",
		      	"cn",
          ],
          "updated_at": "2021-04-12T14:19:10+02:00",
          "created_at": "2021-03-24T11:57:00+01:00",
          "comment": [
            "Objekt1 nimmt 1 mal teil",
            "Objekt2 nimmt n mal teil ",
			      "Objekt3 nimmt 1-n mal teil",
            "Objekt4 nimmt 1-n mal teil",
            "Objekt5 nimmt 1-n mal teil",
          ],
          "key": "1616583420099X766745849644219"
        },
        {
          "text": "Test bezeihung zwischen Objekten",
          "objects": [
            "Objekt1",
            "Objekt2",
            "Objekt3",
            "Objekt4",
            "Objekt5",
            "Objekt6",
            "Objekt7",
            "Objekt8"
          ],
		      "relationship":["beziehung","","","",""],
          "solution": [
            "1",
            "n",
		      	"cn",
            "n",
		      	"cn",
            "cn",
            "n",
		      	"cn"
          ],
          "updated_at": "2021-04-12T14:19:10+02:00",
          "created_at": "2021-03-24T11:57:00+01:00",
          "comment": [
            "Objekt1 nimmt 1 mal teil",
            "Objekt2 nimmt n mal teil ",
			      "Objekt3 nimmt 1-n mal teil",
            "Objekt4 nimmt 1-n mal teil",
            "Objekt5 nimmt 1-n mal teil",
            "Objekt6 nimmt 1-n mal teil",
            "Objekt7 nimmt 1-n mal teil",
            "Objekt8 nimmt 1-n mal teil"
          ],
          "key": "1616583420099X766745849644219"
        }

      ],
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
          input: [],
          relationship: phrases[ 0 ].relationship,
          solution: phrases[ 0 ].solution,
          text: phrases[ 0 ].text
        } );
        render();
      };

      /** renders current phrase */
      const render = () => {
        this.html.render( this.html.main( this, dataset, phrases[ 0 ], phrase_nr, onNotationChange, onLegendClick, onLeftInputChange, onRightInputChange, onFirstInputChange, onSecondInputChange, onThirdInputChange, onFourthInputChange, onFifthInputChange, onSixthInputChange, onSeventhInputChange, onEighthInputChange, onCancelClick, onSubmitClick, onNextClick, onFinishClick ), this.element );
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

      /** when selected entry of left selector box changes */
      const onFirstInputChange = event => {
        setNInput( 0, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'first', instance: this, phrase: phrase_nr } );
      };    
      
      /** when selected entry of left selector box changes */
      const onSecondInputChange = event => {
        setNInput( 1, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'second', instance: this, phrase: phrase_nr } );
      };  
      
      /** when selected entry of left selector box changes */
      const onThirdInputChange = event => {
        setNInput( 2, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'third', instance: this, phrase: phrase_nr } );
      };  

      /** when selected entry of left selector box changes */
      const onFourthInputChange = event => {
        setNInput( 3, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'fourth', instance: this, phrase: phrase_nr } );
      };    
      
      /** when selected entry of left selector box changes */
      const onFifthInputChange = event => {
        setNInput( 4, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'fifth', instance: this, phrase: phrase_nr } );
      };  
      
      /** when selected entry of left selector box changes */
      const onSixthInputChange = event => {
        setNInput( 5, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'sixth', instance: this, phrase: phrase_nr } );
      };  
      /** when selected entry of left selector box changes */
      const onSeventhInputChange = event => {
        setNInput( 6, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'seventh', instance: this, phrase: phrase_nr } );
      };    
      
      /** when selected entry of left selector box changes */
      const onEighthInputChange = event => {
        setNInput( 7, event.target.value );
        render();
        this.onchange && this.onchange( { event: 'Eighth', instance: this, phrase: phrase_nr } );
      };  
      

      /** when 'cancel' button is clicked */
      const onCancelClick = () => {
        this.oncancel && this.oncancel( this, phrase_nr );
        this.onchange && this.onchange( { event: 'cancel', instance: this, phrase: phrase_nr } );
      }

      /** when 'submit' button is clicked */
      const onSubmitClick = () => {
        const section = dataset.sections[ phrase_nr - 1 ];
        if(section.input.length<3){
          section.input = [
            this.element.querySelector( '#input' + ( this.notations[ dataset.notation ].swap ? 2 : 1 ) ).value,
            this.element.querySelector( '#input' + ( this.notations[ dataset.notation ].swap ? 1 : 2 ) ).value
          ];
        }
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

      const setNInput = (objectNumber, value) => {
        const section = dataset.sections[ phrase_nr - 1 ];
        if ( !section.input ) section.input = [];
        section.input[ objectNumber ] = value;
      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();