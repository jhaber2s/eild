/**
 * @overview ccmjs-based web component for building a multiple choice
 * @author André Kless <andre.kless@web.de> 2021
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 (24.08.2021)
 */

( () => {
  const component = {
    name: 'mc_builder',
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-26.4.4.js',
    config: {
      "css": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/css/bootstrap.min.css",
          "https://ccmjs.github.io/eild/mc_builder/resources/default.css"
        ]
      ],
//    "data": { "store": [ "ccm.store" ] },
      "defaults": {
//      "number": 1
      },
      "editor": [ "ccm.component", "https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-4.0.0.js", {
        "editor": [ "ccm.load",
          "https://ccmjs.github.io/tkless-components/libs/quill/quill.js",
          "https://cdn.quilljs.com/1.2.0/quill.snow.css"
        ],
        "settings": {
          "modules": {
            "toolbar": [
              [ "bold", "italic", "underline", "strike" ],
              [ { "list": "ordered" }, { "list": "bullet" } ],
              [ "link", "image" ]
            ]
          },
          "theme": "snow"
        }
      } ],
      "helper": [ "ccm.load", "https://ccmjs.github.io/akless-components/modules/versions/helper-7.4.1.mjs" ],
      "html": [ "ccm.load", "https://ccmjs.github.io/eild/mc_builder/resources/templates.mjs" ],
      "ignore": {
        "css": {
          "default": {
            "key": "default",
            "title": "Default",
            "value": [ "ccm.load", [
              "https://ccmjs.github.io/akless-components/libs/bootstrap-5/css/bootstrap.min.css",
              "https://ccmjs.github.io/eild/mc/resources/styles.css"
            ] ]
          }
        },
        "user": {
          "guest": {
            "key": "guest",
            "title": "Guest Mode",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "guest" ] ]
          },
          "cloud": {
            "key": "cloud",
            "title": "Digital Makerspace Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "cloud" ] ]
          },
          "hbrsinfkaul": {
            "key": "hbrsinfkaul",
            "title": "H-BRS FB02 Account",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfkaul" ] ]
          },
          "hbrsinfpseudo": {
            "key": "hbrsinfpseudo",
            "title": "H-BRS FB02 Account with Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.2.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "hbrsinfpseudo" ] ]
          },
          "pseudo": {
            "key": "pseudo",
            "title": "One-time Pseudonym",
            "value": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.7.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/resources.js", "pseudo" ] ]
          }
        }
      },
      "libs": [ "ccm.load",
        [  // serial
          "https://ccmjs.github.io/akless-components/libs/jquery-3/jquery.min.js",
          "https://ccmjs.github.io/akless-components/libs/bootstrap-4/js/bootstrap.bundle.min.js"
        ]
      ],
  //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-5.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],
  //  "onfinish": { "restart": true },
      "results": { "store": { "name": "mc-results" }, "permissions": { "access": { "get": "all", "set": "creator", "del": "creator" } } },
      "shadow": "none",
      "text": {
        "general_settings": "General Settings",
        "css": "Layout",
        "css_info": "Choose between a layout format. Use the preview button below to see what the selected layout will look like.",
        "number": "Number of Questions",
        "number_info": "How many questions should be randomly selected and questioned? By default, all questions are questioned.",
        "shuffle": "Shuffle Questions",
        "shuffle_info": "If enabled, the questions are mixed so that they are questioned in a different order each time.",
        "random": "Random Answers",
        "random_info": "If enabled, the answers to a question are shown in random order.",
        "feedback": "Enable Feedback",
        "feedback_info": "If enabled, the user is shown what is right and what is wrong when answering a question.",
        "escape": "Escape HTML",
        "escape_info": " If enabled, HTML contained in questions and answers is not evaluated and the HTML code is displayed as it is.",
        "questions": "Questions and Answers",
        "question_preview": "Show Question Preview",
        "edit_question": "Edit Text",
        "delete_question": "Delete Question",
        "solution": "Indicates whether the answer is correct. Click to change state.",
        "edit_answer": "Edit Text",
        "delete_answer": "Delete Answer",
        "add_answer": "Add Answer",
        "add_question": "Add Question",
        "import": "Import",
        "export": "Export",
        "texts_heading": "Texts and Labels",
        "numbering_questions": "Numbering of Questions",
        "numbering_questions_info": "Choose the displayed numbering of questions. The placeholders <code>%nr%</code> and <code>%total%</code> will later be automatically replaced by the number of the current question and the total amount of questions.",
        "true_switch": "TRUE Switch",
        "true_switch_info": "Choose the label of the TRUE switch that marks an answer as true.",
        "ignore_switch": "IGNORE Switch",
        "ignore_switch_info": "Choose the label of the IGNORE switch that marks an answer as ignored.",
        "false_switch": "FALSE Switch",
        "false_switch_info": "Choose the label of the FALSE switch that marks an answer as false.",
        "next_button": "Next Button",
        "next_button_info": "Choose the label of the button that starts the next question.",
        "submit_button": "Submit Button",
        "submit_button_info": "Choose the label of the button that submits the solution selected by the user.",
        "finish_button": "Finish Button",
        "finish_button_info": "Choose the label for the finish button.",
        "finish_actions": "Enable Finish Actions",
        "finish_actions_info": "If enabled, there is a finish button when all questions are answered for which individual actions such as saving solutions and displaying another app can be set.",
        "save_solutions": "Save submitted Solutions",
        "save_solutions_info": "The results are stored on a server of the computer science department of the Bonn-Rhein-Sieg University of Applied Sciences.<ul class='m-0 pl-4'><li><b>Collective Solution:</b> Everyone is working on a common solution. When the app is started, the last submitted solution is restored.</li><li><b>User Specific:</b> Each user has their own solution that is restored when the app starts. Anyone can correct their submitted solution afterwards. A user must log in to submit a solution.</li><li><b>User Specific without Override:</b> The same as the previous option, except that each submitted solution is saved separately. Previously submitted solutions will not be overwritten. A user must log in to submit a solution.</li></ul>",
        "user_authentication": "User Authentication",
        "user_authentication_info": "Choose here how a user has to authenticate when submitting a solution.<ul class=\"m-0 pl-4\"><li><b>Guest Mode:</b> The user can authenticate with any username and without a password.</li><li><b>Digital Makerspace Account:</b> The user must log in with a Digital Makerspace account.</li><li><b>H-BRS FB02 Account:</b> The user has to authenticate with an account from the Department of Computer Sciences at Hochschule Bonn-Rhein-Sieg University of Applied Sciences.</li><li><b>H-BRS FB02 Account with Pseudonym:</b> The same as the previous option, but the username is replaced with a pseudonym.</li><li><b>One-time Pseudonym:</b> The user is automatically logged in with a one-time pseudonym. Each login returns a different pseudonym.</li></ul>",
        "confirm_dialog": "Confirmation Dialog",
        "confirm_dialog_info": "If active, the user must explicitly confirm before saving a solution. To activate this, specify the text that will be displayed to the user in the confirm dialog.",
        "success_message": "Success Message",
        "success_message_info": "Here you can specify a message that will be displayed to the user when the submitted solution has been saved successfully.",
        "next_content": "Next Content",
        "next_content_info": "Specify which content should be displayed next after a solution has been submitted.",
        "embed_code": "Embed Code of App",
        "embed_code_info": "Enter the embed code of the app that should be displayed after submitting a solution. The app must be an app created in the Digital Makerspace.",
        "preview": "Preview",
        "submit": "Submit"
      },
      "tool": [ "ccm.component", "https://ccmjs.github.io/eild/mc/versions/ccm.mc-1.0.0.js" ]
    },

    Instance: function () {

      /**
       * shortcut to help functions
       * @type {Object.<string,Function>}
       */
      let $;

      /**
       * resulting multiple choice configuration
       * @type {Object}
       */
      let mc_config;

      /**
       * modal dialog
       * @type {Element}
       */
      let modal;

      /**
       * WYSIWYG online text editor to edit the text of a question
       * @type {Object}
       */
      let editor;

      /**
       * when all dependencies are solved after creation and before the app starts
       * @returns {Promise<void>}
       */
      this.ready = async () => {
        $ = Object.assign( {}, this.ccm.helper, this.helper ); $.use( this.ccm );  // set shortcut to help functions
        delete this.tool.config.parent;                                            // remove no needed parent reference
        this.logger && this.logger.log( 'ready', $.privatize( this, true ) );      // logging of 'ready' event
      };

      /**
       * starts the app
       * @returns {Promise<void>}
       */
      this.start = async () => {

        // get initial multiple choice configuration (priority order: [high] this.data -> this.defaults -> this.tool.config [low])
        mc_config = await adjustDataset( await $.integrate( await $.dataset( this.data ), await $.integrate( this.defaults, this.tool.config ) ) );

        this.logger && this.logger.log( 'start', $.clone( mc_config ) );  // logging of 'start' event
        this.render( mc_config );                                         // render webpage area
        jQuery( '[data-toggle=popover]' ).popover();                      // initialize popovers for info icons
        modal = this.element.querySelector( '#mcb-edit-modal' );          // set reference to modal dialog
        jQuery( modal ).on( 'hide.bs.modal', events.onClose );            // set 'onclose' event for modal dialog

        // listen to change events of the input fields => update webpage area
        this.element.querySelectorAll( '*[name]' ).forEach( input => input.addEventListener( 'change', () => this.render( mc_config = this.getValue() ) ) );

        // listen to submit event of the main HTML form
        this.text.submit && this.element.querySelector( '#mcb-main-form' ).addEventListener( 'submit', event => {
          event.preventDefault();
          const config = this.getValue();                                 // get resulting multiple choice configuration
          this.logger && this.logger.log( 'finish', $.clone( config ) );  // logging of 'finish' event
          $.onFinish( this, config );                                     // trigger finish actions
        } );

      };

      /**
       * renders the webpage area
       * @param {Object} [mc_config = this.getValue()] - initial multiple choice configuration
       */
      this.render = ( mc_config = this.getValue() ) => this.html.render( this.html.main( mc_config, this, events ), this.element );

      /**
       * returns current resulting multiple choice configuration
       * @returns {Object} current resulting multiple choice configuration
       */
      this.getValue = () => {
        const result = Object.assign( {}, mc_config, $.formData( this.element.querySelector( '#mcb-main-form' ) ) );
        result.css = this.ignore.css[ result.css ].value;
        result.questions = $.clone( mc_config.questions );
        if ( !result.finish ) result.onfinish = ''; delete result.finish;
        if ( result.onfinish ) {
          const key = this.results.key || $.deepValue( mc_config, 'data.key' ) || $.deepValue( mc_config, 'onfinish.store.key' ) || $.generateKey();
          switch ( result.store ) {
            case 'collective': result.onfinish.store = true; result.data = { store: [ 'ccm.store', this.results.store ], key: key }; break;
            case 'user': result.onfinish.store = true; result.data = { store: [ 'ccm.store', this.results.store ], key: key, login: true, user: true, permissions: this.results.permissions }; break;
            case 'unique': result.onfinish.login = true; result.onfinish.store = { settings: [ 'ccm.store', this.results.store ], key: key, login: true, user: true, unique: true, permissions: this.results.permissions }; result.data = ''; break;
            default:
              result.data = {};
          }
          if ( !result.store || result.store === 'collective' ) result.user = '';
          if ( result.user ) result.user = this.ignore.user[ result.user ].value;
          switch ( result.render ) {
            case 'clear': result.onfinish.clear = true; break;
            case 'restart': result.onfinish.restart = true; break;
            case 'app':
              result.onfinish.render = {};
              if ( result.app ) {
                result.onfinish.render = $.decomposeEmbedCode( result.app );
                result.onfinish.render.config = [ 'ccm.get', result.onfinish.render.config.store, result.onfinish.render.config.key ];
              }
              break;
          }
        }
        else
          delete result.user;
        delete result.store;
        delete result.render;
        delete result.app;
        return result;
      };

      /**
       * adjusts initial questions data
       * @param {Object} mc_config - initial multiple choice configuration
       * @returns {Promise<Object>}
       */
      const adjustDataset = async mc_config => {

        // load and clone questions data
        mc_config.questions = $.clone( await $.solveDependency( mc_config.questions ) );

        // transform questions data and answers data from array to object
        if ( Array.isArray( mc_config.questions ) ) {
          const questions = {};
          mc_config.questions.forEach( question => {
            question.key = question.key || $.generateKey();
            questions[ question.key ] = question;
            const answers = {};
            question.answers.forEach( answer => {
              answer.key = answer.key || $.generateKey();
              answers[ answer.key ] = answer;
            } );
            question.answers = answers;
          } );
          mc_config.questions = questions;
        }

        return mc_config;
      }

      /**
       * contains all event handlers
       * @type {Object.<string,Function>}
       */
      const events = {

        /**
         * when 'add' button for a question or an answer is clicked
         * @param {string} [question_key] - unique key of the question (only when adding an answer)
         */
        onAdd: question_key => {
          const key = $.generateKey();
          if ( question_key )
            mc_config.questions[ question_key ].answers[ key ] = {
              key: key,
              solution: false,
              text: ''
            };
          else
            mc_config.questions[ key ] = {
              key: key,
              answers: {},
              text: ''
            };
          this.render( mc_config );
        },

        /**
         * when 'show' button of a question is clicked
         * @param {string} question_key - unique key of the question
         */
        onShowQuestion: question_key => {
          const config = this.getValue();
          Object.assign( config, {
            data: {},
            logger: '',
            number: '',
            onfinish: { log: true, restart: true },
            questions: [ config.questions[ question_key ] ],
            shuffle: '',
            user: ''
          } );
          events.onShowPreview( config );
        },

        /**
         * switches whether an answer is correct or wrong
         * @param {string} question_key - unique key of the question
         * @param {string} answer_key - unique key of the answer
         */
        onSwitch: ( question_key, answer_key ) => {
          const answer = mc_config.questions[ question_key ].answers[ answer_key ];
          answer.solution = !answer.solution;
          this.render( mc_config );
        },

        /**
         * shows modal dialog with a WYSIWYG online text editor to edit the text of a question or an answer
         * @param {string} question_key - unique key of the question
         * @param {string} [answer_key = ''] - unique key of the answer
         */
        onEdit: async ( question_key, answer_key = '' ) => {
          const question = mc_config.questions[ question_key ];
          editor = await this.editor.start( {
            data: answer_key ? question.answers[ answer_key ].text : question.text,
            root: modal.querySelector( '.modal-content' )
          } );
          modal.dataset.question = question_key;
          modal.dataset.answer = answer_key;
          jQuery( modal ).modal( 'show' );
        },

        /** when modal dialog is closed */
        onClose: () => {
          const answer_key = modal.dataset.answer;
          const question = mc_config.questions[ modal.dataset.question ];
          const text = editor.getValue().inner;
          if ( answer_key )
            question.answers[ answer_key ].text = text;
          else
            question.text = text;
          this.render( mc_config );
        },

        /**
         * when 'delete' button of a question or an answer is clicked
         * @param {string} question_key - unique key of the question
         * @param {string} [answer_key] - unique key of the answer
         */
        onDelete: ( question_key, answer_key ) => {
          if ( answer_key )
            delete mc_config.questions[ question_key ].answers[ answer_key ];
          else
            delete mc_config.questions[ question_key ];
          this.render( mc_config );
        },

        /** imports questions from a CSV file */
        onImportQuestions: () => this.element.querySelector( 'input[type=file]' ).click(),

        /** reads the CSV file and extracts contained questions and answers */
        onFileSelected: event => {
          const reader = new FileReader();
          reader.onload = () => {
            let data = reader.result;
            data = data.split( '\n' );
            const questions = {};
            const readQuestion = () => {
              const question = {
                key: $.generateKey(),
                text: data.shift().split( ';' )[ 0 ],
                answers: {}
              };
              if ( question.text.startsWith( '"' ) )
                question.text = question.text.substring( 1, question.text.lastIndexOf( '"' ) ).replaceAll( '""', '"' );
              question.text = question.text.trim();
              while ( data.length && !data[ 0 ].startsWith( ';' ) )
                readAnswer( question );
              questions[ question.key ] = question;
              data.shift();
            };
            const readAnswer = question => {
              let answer = data.shift().split( ';' );
              answer = {
                key: $.generateKey(),
                solution: answer[ 0 ] === '1',
                text: answer[ 1 ]
              };
              if ( answer.text.startsWith( '"' ) )
                answer.text = answer.text.substring( 1, answer.text.lastIndexOf( '"' ) ).replaceAll( '""', '"' );
              answer.text = answer.text.trim();
              question.answers[ answer.key ] = answer;
            };
            while ( data.length && !data[ 0 ].startsWith( ';' ) )
              readQuestion();
            mc_config.questions = questions;
            this.render( mc_config );
          };
          reader.readAsText( event.target.files[ 0 ], 'UTF-8' );
        },

        /** exports the questions and answers as CSV file */
        onExportQuestions: () => {
          let result = '';
          const questions = Object.values( this.getValue().questions );
          questions.forEach( question => {
            result += question.text + ';\r\n'
            const answers = Object.values( question.answers );
            answers.forEach( answer => {
              result += ( answer.solution ? '1' : '0' ) + ';' + answer.text + '\r\n';
            } );
            result += ';\r\n';
          } );
          result = result.slice( 0, -2 );
          window.open( encodeURI( 'data:text/csv;charset=utf-8,\uFEFF' + result ) );
        },

        /**
         * shows the preview in the modal dialog for multiple choice preview
         * @param {Object} [config = this.getValue()] - multiple choice configuration
         */
        onShowPreview: ( config = this.getValue() ) => {
          this.element.querySelector( '#mcb-preview-body' ).innerHTML = '';
          jQuery( '#mcb-preview' ).modal( 'show' );
          this.tool.start( Object.assign( config, { root: this.element.querySelector( '#mcb-preview-body' ) } ) );
        }

      };

    }
  };
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||[""])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){(c="latest"?window.ccm:window.ccm[c]).component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();