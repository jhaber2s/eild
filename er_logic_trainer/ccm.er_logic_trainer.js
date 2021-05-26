/**
 * @overview ccmjs-based web component for ER model to logical scheme training
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (27.05.2021)
 */

( () => {

  const component = {
    name: 'er_logic_trainer',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.0.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/er_logic_trainer/resources/styles.css"
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "default": {
        "format": "svg",
        "images": [ "e", "1", "c", "n", "cn", "r" ],
        "left": "copied",
        "notation": "abrial",
        "path": "https://ccmjs.github.io/eild/er_logic_trainer/resources/img/"
      },
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.1.0.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/er_logic_trainer/resources/templates.mjs" ],
//    "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
      "feedback": true,
      "legend": true,
      "modal": {
        "attr": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.0.0.js", {
          "backdrop_close": true,
          "content": "",
          "closed": true,
          "breakpoints": false,
          "buttons": [
            { "html": "<button class='btn btn-secondary' data-close>Abbrechen</button>" },
            { "html": "<input type='submit' class='btn btn-primary' form='attr-form' value='Hinzufügen'>" }
          ]
        } ],
        "legend": [ "ccm.start", "https://ccmjs.github.io/tkless-components/modal/versions/ccm.modal-3.0.0.js", {
          "backdrop_close": true,
          "content": "",
          "closed": true,
          "buttons": ""
        } ]
      },
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
          "comment": "In der Chen-Notation kann zur Spezifikation der Kardinalitäten jeder Entitätstyp entweder mit einer Kardinalität 1 oder mit einer Kardinalität N am Beziehungstyp partizipieren. (In dieser Grundform werden die Beziehungsmengen nur mit ihrer Maximalaussage genannt.)"
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
//    "number": 5,
//    "oncancel": ( instance, phrase_nr ) => {},
      "onfinish": { "restart": true },
      "phrases": [
        {
          "text": "Ein Fahrzeug kann einen Anhänger haben.",
          "relationship": [ "Fahrzeug", "hat", "Anhänger" ],
          "solution": [ "c", "c" ],
          "hints": [
            `Es handelt sich um eine 1:1-Beziehung, daher wird keine "hat"-Tabelle benötigt.
             Da "Fahrzeug" und "Anhänger" über exakt identische Kardinalitäten verfügen, wird der Fremdschlüssel bei der Hauptentität "Fahrzeug" hinzugefügt.
             Die Hauptentität (hier immer auf der linken Seite) ist die Entität, auf die in der zukünftigen Anwendung in der Regel zuerst zugegriffen wird.
             Da ein Fahrzeug auch keinen Anhänger haben kann, muss der Fremdschlüssel optional sein.
             Da der Fremdschlüssel auf "Anhänger" verweist, geht der Pfeil von "Fahrzeug" nach "Anhänger".`,
            `Normalerweise muss bei einer 1:1-Beziehung der Fremdschlüssel ein Alternativschlüssel sein, dies geht aber nicht, da dieser bereits optional ist.
             Wegen der Eindeutigkeit kann ein Fremdschlüssel nicht gleichzeitig ein Alternativschlüssel und optional sein.
             Dadurch kann es aber vorkommen, dass es mehrere Fahrzeuge gibt, die auf den gleichen Anhänger verweisen und somit ein Anhänger mehrere Fahrzeuge hat.
             Dies lässt sich im relationalen Schema nicht besser darstellen und muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        },
        {
          "text": "Zu jedem Topf gibt es einen Deckel, es gibt allerdings auch Töpfe ohne Deckel (z.B. Wok).",
          "relationship": [ "Topf", "hat", "Deckel" ],
          "solution": [ "1", "c" ],
          "hints": [
            `Es handelt sich um eine 1:1-Beziehung, daher wird keine "hat"-Tabelle benötigt.
             Da "Topf" und "Deckel" über unterschiedliche Kardinalitäten verfügen, wird der Fremdschlüssel bei der schwächeren Entität "Deckel" hinzugefügt.
             Eine Entität ist eine schwache Entität, wenn ihre Existenz von der jeweils anderen Entität abhängt.
             Hier kann der Deckel nicht ohne Topf existieren, der Topf aber ohne Deckel.
             Bei einer 1:1-Beziehung muss der Fremdschlüssel ein Alternativschlüssel sein, damit nicht mehrere Deckel auf den gleichen Topf verweisen können.
             Da der Fremdschlüssel auf "Topf" verweist, geht der Pfeil von "Deckel" nach "Topf".`,
            ""
          ]
        },
        {
          "text": "Zu jedem Patienten gibt es eine Patientenakte.",
          "relationship": [ "Patient", "hat", "Patientenakte" ],
          "solution": [ "1", "1" ],
          "hints": [
            `Es handelt sich um eine 1:1-Beziehung, daher wird keine "hat"-Tabelle benötigt.
             Da "Patient" und "Patientenakte" über exakt identische Kardinalitäten verfügen, wird der Fremdschlüssel bei der Hauptentität "Patient" hinzugefügt.
             Die Hauptentität (hier immer auf der linken Seite) ist die Entität, auf die in der zukünftigen Anwendung in der Regel zuerst zugegriffen wird.
             Bei einer 1:1-Beziehung muss der Fremdschlüssel ein Alternativschlüssel sein, damit nicht mehrere Patienten auf die gleiche Patientenakte verweisen können.
             Da der Fremdschlüssel auf "Patientenakte" verweist, geht der Pfeil von "Patient" nach "Patientenakte".`,
            `In der Praxis werden 1:1-Beziehungen häufig zu einer Tabelle zusammengefasst.
             Es kann vorkommen, dass es eine Patientenakte gibt, zu der kein Patient existiert, der auf die Patientenakte verweist.
             Das es zu jeder Patientenakte immer genau einen Patienten gibt, lässt sich hier im relationalen Schema nicht darstellen.
             Dies muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        },
        {
          "text": "Ein Rucksack kann mehrere Gegenstände enthalten.",
          "relationship": [ "Rucksack", "enthält", "Gegenstand" ],
          "solution": [ "c", "cn" ],
          "hints": [
            `Es handelt sich um eine 1:N-Beziehung, daher wird keine "enthält"-Tabelle benötigt.
             Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität, also hier bei "Gegenstand", hinzugefügt.
             Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.
             In diesem Fall kann ein Gegenstand immer nur in einem Rucksack enthalten sein.
             Da ein Gegenstand sich auch in keinem Rucksack befinden kann, muss der Fremdschlüssel optional sein.
             Da der Fremdschlüssel auf "Rucksack" verweist, geht der Pfeil von "Gegenstand" nach "Rucksack".`,
            `Die Lösung ist korrekt, sofern es darum geht den aktuellen Zustand eines Rucksacks festzuhalten.
             Die Historie, was für Gegenstände ein Rucksack jemals enthalten hat, könnte man so aber nicht ermitteln.`
          ]
        },
        {
          "text": "Ein Wald hat Bäume.",
          "relationship": [ "Wald", "hat", "Baum" ],
          "solution": [ "c", "n" ],
          "hints": [
            `Es handelt sich um eine 1:N-Beziehung, daher wird keine "hat"-Tabelle benötigt.
             Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität, also hier bei "Baum", hinzugefügt.
             Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.
             In diesem Fall kann ein Baum zu höchstens einem Wald gehören.
             Da ein Baum sich auch in keinem Wald befinden kann, muss der Fremdschlüssel optional sein.
             Da der Fremdschlüssel auf "Wald" verweist, geht der Pfeil von "Baum" nach "Wald".`,
            `Es kann vorkommen, dass es einen Wald gibt, zu dem kein Baum existiert, der auf den Wald verweist und somit der Wald keine Bäume hat.
             Das ein Wald immer mindestens einen Baum hat, lässt sich im relationalen Schema nicht darstellen und muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        },
        {
          "text": "Ein Sonne kann Planeten haben, die sie umkreisen.",
          "relationship": [ "Sonne", "hat", "Planet" ],
          "solution": [ "1", "cn" ],
          "hints": [
            `Es handelt sich um eine 1:N-Beziehung, daher wird keine "hat"-Tabelle benötigt.
             Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität, also hier bei "Planet", hinzugefügt.
             Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.
             In diesem Fall umkreist ein Planet immer genau eine Sonne.
             Da der Fremdschlüssel auf "Sonne" verweist, geht der Pfeil von "Planet" nach "Sonne".`,
            `Die NASA hat inzwischen einen Planeten entdeckt der zwei Sonnen umkreist.
             Dies wurde in dieser Aufgabe nicht berücksichtigt.
             Es sei aber zumindest an dieser Stelle erwähnt, falls es jemand ganz genau nimmt.`
          ]
        },
        {
          "text": "Ein Buch hat mehrere Seiten.",
          "relationship": [ "Buch", "hat", "Seite" ],
          "solution": [ "1", "n" ],
          "hints": [
            `Es handelt sich um eine 1:N-Beziehung, daher wird keine "hat"-Tabelle benötigt.
             Bei einer 1:N-Beziehung wird der Fremdschlüssel bei der einfachen Entität, also hier bei "Seite", hinzugefügt.
             Eine einfache Entität ist die Entität, die höchstens einmal mit der jeweils anderen Entität verbunden ist.
             In diesem Fall gehört eine Seite immer genau zu einem Buch.
             Da der Fremdschlüssel auf "Buch" verweist, geht der Pfeil von "Seite" nach "Buch".`,
            `Es kann vorkommen, dass es ein Buch gibt, zu dem keine Seite existiert, die auf das Buch verweist und somit das Buch keine Seiten hat.
             Das ein Buch immer mindestens eine Seite hat, lässt sich im relationalen Schema nicht darstellen und muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        },
        {
          "text": "Kunden kaufen Produkte.",
          "relationship": [ "Kunde", "hat gekauft", "Produkt" ],
          "solution": [ "cn", "cn" ],
          "hints": [
            `Es handelt sich um eine N:M-Beziehung, daher muss eine "hat gekauft"-Tabelle angelegt werden, um die N:M-Beziehung in zwei 1:N-Beziehungen zu überführen.
             Dieser Tabelle muss dann je ein Fremdschlüssel für jede der beiden Entitäten "Kunde" und "Produkt" hinzugefügt werden.
             Damit jede Kombination aus "Kunde" und "Produkt" nur einmal vorkommen kann, müssen die beiden Fremdschlüssel einen zusammengesetzten Alternativschlüssel bilden.
             Da die beiden Fremdschlüssel der mittleren "hat gekauft"-Tabelle auf die beiden äußeren Tabellen "Kunde" und "Produkt" verweisen, gehen die Pfeile von der mittleren Tabelle zu den äußeren Tabellen.`,
            ""
          ]
        },
        {
          "text": "Auf einem Rezept stehen Zutaten.",
          "relationship": [ "Rezept", "hat", "Zutat" ],
          "solution": [ "cn", "n" ],
          "hints": [
            `Es handelt sich um eine N:M-Beziehung, daher muss eine "hat"-Tabelle angelegt werden, um die N:M-Beziehung in zwei 1:N-Beziehungen zu überführen.
             Dieser Tabelle muss dann je ein Fremdschlüssel für jede der beiden Entitäten "Rezept" und "Zutat" hinzugefügt werden.
             Damit jede Kombination aus "Rezept" und "Zutat" nur einmal vorkommen kann, müssen die beiden Fremdschlüssel einen zusammengesetzten Alternativschlüssel bilden.
             Da die beiden Fremdschlüssel der mittleren "hat"-Tabelle auf die beiden äußeren Tabellen "Rezept" und "Zutat" verweisen, gehen die Pfeile von der mittleren Tabelle zu den äußeren Tabellen.`,
            `Es ist möglich, dass ein Rezept keine Zutat hat.
             Das ein Rezept mindestens eine Zutat hat, lässt sich im relationalen Schema nicht darstellen und muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        },
        {
          "text": "Ein Haus hat Eigentümer und Eigentümer haben Häuser.",
          "relationship": [ "Haus", "hat", "Eigentümer" ],
          "solution": [ "n", "n" ],
          "hints": [
            `Es handelt sich um eine N:M-Beziehung, daher muss eine "hat"-Tabelle angelegt werden, um die N:M-Beziehung in zwei 1:N-Beziehungen zu überführen.
             Dieser Tabelle muss dann je ein Fremdschlüssel für jede der beiden Entitäten "Haus" und "Eingentümer" hinzugefügt werden.
             Damit jede Kombination aus "Haus" und "Eingentümer" nur einmal vorkommen kann, müssen die beiden Fremdschlüssel einen zusammengesetzten Alternativschlüssel bilden.
             Da die beiden Fremdschlüssel der mittleren "hat"-Tabelle auf die äußeren beiden Tabellen "Rezept" und "Zutat" verweisen, gehen die Pfeile von der mittleren Tabelle zu den äußeren Tabellen.`,
            `Es ist möglich, dass ein Haus keinen Eigentümer hat und ein Eigentümer kein Haus hat.
             Das ein Haus mindestens einen Eigentümer und ein Eigentümer mindestens ein Haus hat, lässt sich im relationalen Schema nicht darstellen und muss später in der Datenbank mit anderen Mitteln sichergestellt werden.`
          ]
        }
      ],
      "show_solution": true,
      "shuffle": true,
      "text": {
        "cancel": "Abbrechen",
        "correct": "Ihre Antwort war richtig!",
        "correct_solution": "Richtige Lösung:",
        "current_state": "Sie haben %% von %% Aufgaben richtig beantwortet!",
        "entity1": "Entity 1",
        "entity2": "Entity 2",
        "failed": "Ihre letzte Antwort war falsch!",
        "finish": "Neustart",
        "heading": "Lösen Sie die gezeigte Beziehung zwischen den beiden Entitäten auf!",
        "notation": "ER-Notation:",
        "legend": "Legende",
        "next": "Weiter",
        "phrase": "Phrase [%%]:",
        "selection": [ "Bitte auswählen", "einfach", "bedingt", "mehrfach", "bedingt mehrfach" ],
        "show_feedback": "Zeige Feedback",
        "show_solution": "Zeige Lösung",
        "submit": "Antworten",
        "table": "-Tabelle",
        "title": "ER-zu-relationales-Schema-Trainer"
      },
      "values": [ "1", "c", "n", "cn" ]
    },

    Instance: function () {

      let $, dataset, notation, phrase_nr, phrases;

      this.init = async () => {

        // set shortcut to help functions
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );

        // set title for modal dialogs
        this.modal.legend.title = this.text.legend;
        this.modal.attr.title = 'Neuer Fremdschlüssel';

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
        if ( $.isObject( this.phrases ) ) this.phrases = Object.values( this.phrases );
        this.phrases = this.phrases.filter( phrase => { delete phrase.key; return phrase.relationship[ 0 ] !== phrase.relationship[ 2 ]; } );

      };

      this.ready = async () => {

        // clone and shuffle original phrases
        phrases = $.clone( this.phrases );
        this.shuffle && $.shuffleArray( phrases );

        // no number of phrases? => use all phrases
        if ( !this.number ) this.number = phrases.length;

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
        this.html.render( this.html.legend( this ), this.modal.legend.element.querySelector( 'main' ) );

        // logging of 'start' event
        this.logger && this.logger.log( 'start', { dataset: $.clone( dataset ), phrases: $.clone( phrases ) } );

      };

      /**
       * returns current app state data
       * @returns {Object}
       */
      this.getValue = () => $.clone( dataset );

      /** starts the next phrase */
      const nextPhrase = () => {
        phrase_nr++;
        dataset.sections.push( {
          input: {
            keys: [ null, null, null ],
            arrows: [
              [ false, false, false ],
              [ false, false, false ],
              [ false, false, false ]
            ]
          },
          relationship: phrases[ 0 ].relationship,
          solution: phrases[ 0 ].solution,
          text: phrases[ 0 ].text
        } );
        render();
      };

      /** renders current phrase */
      const render = () => {
        this.html.render( this.html.main( this, dataset, phrases[ 0 ], phrase_nr, events ), this.element );
        this.element.querySelectorAll( '[selected]' ).forEach( option => option.selected = true );  // workaround for lit-html bug
      };

      /**
       * contains all event handlers
       * @type Object.<string,Function>
       */
      const events = {

        /** when selected entry for displayed notation changes */
        onNotationChange: event => {
          dataset.notation = notation = event.target.value;
          render();
        },

        /** when 'legend' button is clicked */
        onLegendClick: () => this.modal.legend.open(),

        /** when an 'add table' button is clicked */
        onAddTable: table => {
          dataset.sections[ phrase_nr - 1 ].input.keys[ table ] = [ null, null, null ];
          render();
        },

        /** when a 'remove table' icon is clicked */
        onRemoveTable: table => {
          const keys = dataset.sections[ phrase_nr - 1 ].input.keys;
          keys[ table ] = null;
          keys.forEach( fks => fks && ( fks[ table ] = null ) );
          render();
        },

        /** when a 'add attribute' icon is clicked */
        onAddAttr: table => {
          const section = dataset.sections[ phrase_nr - 1 ];
          const modal = this.modal.attr;
          const onSubmit = event => {
            event.preventDefault();
            const fk = $.formData( modal.element.querySelector( 'form' ) );
            section.input.keys[ table ][ fk.table ] = { opt: fk.opt, ak: fk.ak };
            render();
            modal.close();
          };
          this.html.render( this.html.fkForm( section, table, onSubmit ), modal.element.querySelector( 'main' ) );
          modal.element.querySelectorAll( 'input[type="checkbox"]' ).forEach( checkbox => checkbox.checked = false );
          modal.open();
        },

        /** when a 'remove attribute' icon is clicked */
        onRemoveAttr: ( from, to ) => {
          dataset.sections[ phrase_nr - 1 ].input.keys[ from ][ to ] = null;
          render();
        },

        /** when an arrowhead is changed */
        onArrowChange: event => {
          dataset.sections[ phrase_nr - 1 ].input.arrows[ event.target.dataset.from ][ event.target.dataset.to ] = !!parseInt( event.target.value );
          render();
        },

        /** when 'cancel' button is clicked */
        onCancelButton: () => this.oncancel && this.oncancel( this, phrase_nr ),

        /** when 'submit' button is clicked */
        onSubmitButton: () => {
          const section = dataset.sections[ phrase_nr - 1 ];
          const left = section.solution[ 0 ];
          const right = section.solution[ 1 ];
          const single_left = left === 'c' || left === '1';
          const single_right = right === 'c' || right === '1';
          const multi = ( left === 'cn' || left === 'n' ) && ( right === 'cn' || right === 'n' );
          section.feedback = {
            keys: [
              [ null, null, ( !single_left || !( left === '1' && right === 'c' ) ) && single_right ? { opt: right === 'c', ak: single_left && single_right && !( left === 'c' && right === 'c' ) } : null ],
              multi ? [ { opt: false, ak: true }, null, { opt: false, ak: true } ] : null,
              [ single_left && ( !single_right || ( left === '1' && right === 'c' ) ) ? { opt: left === 'c', ak: single_left && single_right } : null, null, null ]
            ],
            arrows: [
              [ false, false, ( !single_left || !( left === '1' && right === 'c' ) ) && single_right ],
              [ multi, false, multi ],
              [ single_left && ( !single_right || ( left === '1' && right === 'c' ) ), false, false ]
            ]
          };
          section.correct = JSON.stringify( section.input ) === JSON.stringify( section.feedback );
          section.correct && dataset.correct++;
          this.feedback && this.element.classList.add( section.correct ? 'correct' : 'failed' );
          render();
          !this.feedback && events.onNextButton();
        },

        /** when 'solution' button is clicked */
        onSolutionButton: () => {
          const feedback = dataset.sections[ phrase_nr - 1 ].feedback;
          feedback.show_solution = !feedback.show_solution;
          render();
        },

        /** when 'next' button is clicked */
        onNextButton: () => {

          const section = dataset.sections[ phrase_nr - 1 ];
          delete section.feedback.show_solution;
          section.solution = section.feedback;
          delete section.feedback;

          this.element.classList.remove( 'correct' );
          this.element.classList.remove( 'failed' );

          phrases.shift();
          nextPhrase();

          // logging of 'next' event
          this.logger && this.logger.log( 'next', { nr: phrase_nr, phrase: $.clone( phrases[ 0 ] ) } );

        },

        /** when 'finish' button is clicked */
        onFinishButton: () => {

          const section = dataset.sections[ phrase_nr - 1 ];
          delete section.feedback.show_solution;
          section.solution = section.feedback;
          delete section.feedback;

          this.element.classList.remove( 'correct' );
          this.element.classList.remove( 'failed' );

          phrases.shift();
          this.onfinish && $.onFinish( this );

          // logging of 'finish' event
          this.logger && this.logger.log( 'finish', this.getValue() );
        }

      };

    }
  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();