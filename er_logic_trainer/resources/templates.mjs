/**
 * @overview HTML templates of ccmjs-based web component for ER model to logical scheme training
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://esm.run/lit-html';
export { render };

/**
 * returns the main HTML template
 * @param {Object} app - app instance
 * @param {Object} data - app state data
 * @param {Object} phrase - phrase data
 * @param {number} phrase_nr - number of current phrase
 * @param {Object.<string,Function>} events - contains all event handlers
 * @returns {TemplateResult} main HTML template
 */
export function main( app, data, phrase, phrase_nr, events ) {

  let { centered, comment, images, left, swap } = app.notations[ data.notation ];
  const section = data.sections[ phrase_nr - 1 ];
  return html`
    <h1 class="mx-3">${ app.text.title }</h1> <!-- Title -->
    <header class="bg-light border rounded-top d-flex flex-wrap justify-content-between align-items-center p-2">
      <div id="heading" class="p-2 pr-3">${ section.correct === undefined ? app.text.heading : ( section.correct ? app.text.correct : app.text.failed ) }</div> <!-- Heading -->
      <div class="d-flex align-items-center text-nowrap px-2">

        <!-- Notation Selection -->
        <section ?data-hidden=${ Object.keys( app.notations ).length === 1 }>
          <div class="d-flex align-items-center">
            <label for="notation-input" class="m-0 text-nowrap"><b>${ app.text.notation }</b></label>
            <select id="notation-input" class="form-control ml-2" @change=${ events.onNotationChange }>
              ${ Object.values( app.notations ).sort( ( a, b ) => a.title.localeCompare( b.title ) ).map( ( { key, title } ) => html`<option value="${ key }" ?selected=${ data.notation === key }>${ title }</option>`)}
            </select>
          </div>
        </section>

        <!-- Legend -->
        <section class="ml-2" ?data-hidden=${ !app.legend }>
          <button class="btn btn-link" @click=${ events.onLegendClick }>${ app.text.legend }</button>
        </section>
        
      </div>
    </header>
    <main class="border rounded-bottom border-top-0 px-4 py-2">
      <div>

        <!-- Notation Comment -->
        <section ?data-hidden=${ !comment }>
          <div class="alert alert-info mt-3 mb-0" role="alert">${ comment }</div>
        </section>

        <!-- Diagram -->
        <section class="px-2 pt-3">
          <div class="d-flex justify-content-between lead text-nowrap">
            <div class="pr-1">${ app.text.entity1 }</div>
            <div class="pl-1">${ app.text.entity2 }</div>
          </div>
          <div id="diagram" class="text-center">
            <div class="entity border rounded p-3 text-nowrap">
              ${ phrase.relationship[ 0 ] }
            </div>
            <div>
              <img id="left" class="${ left }" src="${ images[ app.values.indexOf( section.solution[ swap ? 1 : 0 ] ) + 1 ] }">
            </div>
            <div class="filler"></div>
            <div id="name">
              <img id="middle" src="${ images[ 5 ] }">
              <div class="text-nowrap" ?data-centered=${ centered }>${ phrase.relationship[ 1 ] }</div>
            </div>
            <div class="filler"></div>
            <div>
              <img id="right" src="${ images[ app.values.indexOf( section.solution[ swap ? 0 : 1 ] ) + 1 ] }">
            </div>
            <div class="entity border rounded p-3 text-nowrap">
              ${ phrase.relationship[ 2 ] }
            </div>
          </div>
        </section>

        <!-- "Add Table" Buttons -->
        <section id="table_buttons" class="p-2 text-nowrap">
          ${ addTableButton( 0 ) }
          ${ addTableButton( 1 ) }
          ${ addTableButton( 2 ) }
       </section>
        
        <!-- Logical Scheme Tables -->
        <section id="tables" class="px-2 text-nowrap">
          <div>
            ${ table( 0 ) }
          </div>
          <div>
            ${ arrow( 2, 0, true ) }
            ${ arrow( 1, 0, true ) }
          </div>
          <div>
            ${ arrow( 2, 0 ) }
            ${ arrow( 0, 1 ) }
          </div>
          <div>
            ${ arrow( 2, 0 ) }
            ${ arrow( 0, 1, true ) }
          </div>
          <div>
            ${ arrow( 2, 0 ) }
            <div>
              ${ table( 1 ) }
            </div>
          </div>
          <div>
            ${ arrow( 0, 2 ) }
            ${ arrow( 2, 1, true ) }
          </div>
          <div>
            ${ arrow( 0, 2 ) }
            ${ arrow( 1, 2 ) }
          </div>
          <div>
            ${ arrow( 0, 2, true ) }
            ${ arrow( 1, 2, true ) }
          </div>
          <div>
            ${ table( 2 ) }
          </div>
        </section>

        <!-- Buttons -->
        <section class="d-flex justify-content-center flex-wrap px-2 py-3">
          <button class="btn btn-outline-danger m-1" @click=${ events.onCancelButton } ?data-hidden=${ !app.oncancel }>${ app.text.cancel }</button>
          <button class="btn btn-primary m-1" @click=${ events.onSubmitButton } ?data-hidden=${ section.correct !== undefined || !tablesConnected() }>${ app.text.submit }</button>
          <button class="btn btn-secondary m-1" @click=${ events.onNextButton } ?data-hidden=${ section.correct === undefined || phrase_nr === app.number }>${ app.text.next }</button>
          <button class="btn btn-success m-1" @click=${ events.onFinishButton } ?data-hidden=${ section.correct === undefined || phrase_nr < app.number || !app.onfinish }>${ app.text.finish }</button>
        </section>

        <!-- Current State -->
        <section class="text-center px-2 pb-2" ?data-hidden=${ !app.feedback || data.total < 2 }>
          <small id="current_state">${ app.ccm.helper.html( app.text.current_state, data.correct.toString(), data.total.toString() ) }</small>
        </section>
        
        <!-- Logos -->
        <section class="mx-3 mt-3 text-center">
          <img src="https://ccmjs.github.io/eild/logos.jpg" title="Diese App ist im Rahmen des EILD-Projekts entstanden.">
        </section>
        
      </div>
    </main>
  `;

  /**
   * returns the HTML template for an 'add table' button
   * @param {number} table - table index (0: left, 1: middle, 2: right)
   * @returns {TemplateResult} HTML template for an 'add table' button
   */
  function addTableButton( table ) {
    return html`
      <div class="text-${ table === 0 ? 'left' : ( table === 1 ? 'center' : 'right' ) }">
        <button class="btn btn-primary btn-sm" @click=${ () => events.onAddTable( table ) } ?data-invisible=${ section.input[ table ] !== null }>+ "${ section.relationship[ table ] }"${ app.text.table }</button>
      </div>
    `;
  }

  /**
   * returns the HTML template for an arrow line
   * @param {number} [from] - index of the table from which the arrow starts
   * @param {number} [to] - table index
   * @param {boolean} [head] - is arrowhead
   * @returns {TemplateResult} HTML template for an arrow line
   */
  function arrow( from, to, head ) {
    return html`<div class="line" ?data-hidden=${ !section.input[ from ] || !section.input[ to ] || !section.input[ from ][ to ] && !section.input[ to ][ from ] }>${ html`<div>${ head && section.input[ from ] && section.input[ from ][ to ] ? html`<svg height="8" width="8" class="${ from - to > 0 ? 'mirrored' : '' }"><polygon points="0,0 8,4 0,8" style="fill:black"></polygon></svg>` : '' }</div>` }</div>`;
  }

  /**
   * returns the HTML template for logical scheme table
   * @param {number} table - table index (0: left, 1: middle, 2: right)
   * @returns {TemplateResult} HTML template for logical scheme table
   */
  function table( table ) {

    const keys = section.input[ table ];
    return html`
      <div class="scheme border" ?data-invisible=${ keys === null }>
        <header class="bg-light border-bottom px-3 py-2 d-inline-flex justify-content-center align-items-center">
          <span title="Name der Tabelle">${ section.relationship[ table ] }</span>
          <span class="icon" title="Tabelle entfernen" ?data-hidden=${ !section.input[ table ] } @click=${ () => events.onRemoveTable( table ) }>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger ml-1" viewBox="0 0 16 16">
              <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
            </svg>
          </span>
        </header>
        <main class="px-3 py-2">
          ${ attr( toID( section.relationship[ table ] ), true, false, false ) }
          ${ keys && keys.map( ( fk, i ) => fk && attr( toID( section.relationship[ i ] ), false, i, fk.opt ) ) }
          <button class="btn btn-link btn-sm mt-1 p-0" title="Fremdschlüssel hinzufügen" ?data-hidden=${ keys && !addableForeignKey() } @click=${ () => events.onAddAttr( table ) }>+ Fremdschlüssel</button>
        </main>
      </div>
    `;

    /**
     * returns the HTML template for attribute of a logical scheme table
     * @param {string} name - attribute name
     * @param {boolean} pk - is primary key
     * @param {boolean|number} fk - is foreign key to table with given index
     * @param {boolean} opt - is optional attribute
     * @returns {TemplateResult} HTML template for attribute
     */
    function attr( name, pk, fk, opt ) {
      return html`
        <div class="attr py-1 d-flex align-items-center">
          <span title="Name des Schlüsselattributs">${ name }</span>
          ${ pk ? html`<span class="badge badge-primary" title="Primärschlüssel: Attribut mit dem sich ein Datensatz dieser Tabelle eindeutig identifizieren lässt.">PK</span>` : '' }
          ${ fk || fk === 0 ? html`<span class="badge badge-warning" title="Fremdschlüssel: Attribut das auf einen Datensatz einer anderen Tabelle verweist.">FK</span>` : '' }
          ${ opt ? html`<span class="badge badge-secondary" title="Optionales Attribut: Muss nicht zwingend einen Wert haben.">OPT</span>` : '' }
          <span class="icon" title="Fremdschlüssel entfernen" ?data-hidden=${ !fk && fk !== 0 } @click=${ () => events.onRemoveAttr( table, fk ) }>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg text-danger ml-1" viewBox="0 0 16 16">
              <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
            </svg>
          </span>
        </div>
      `;
    }

    /**
     * checks whether there are other tables that could be referenced with another foreign key
     * @returns {boolean}
     */
    function addableForeignKey() {
      for ( let i = 0; i <= 2; i++ )              // check for each possible table:
        if ( table !== i )                        // - not the current table?
          if ( section.input[ i ] )               // - table is created?
            if ( !section.input[ table ][ i ] )   // - table is not already referenced by a foreign key in current table?
              return true;                        // => table is referencable with another foreign key
      return false;                               // => there is no other table that could be referenced with a foreign key
    }

    /**
     * converts a string to a key attribute name
     * @param {string} string
     * @returns {string} key attribute name
     */
    function toID( string ) {
      return string.toLowerCase().trim().replace( /ä/g, 'ae' ).replace( /ö/g, 'oe' ).replace( /ü/g, 'ue' ).replace( /ß/g, 'ss' ).replace( /\W/g, '_' ) + '_id';
    }

  }

  function tablesConnected() {
    return false;
  }

}

/**
 * returns the HTML template for legend table
 * @param {Object} app - app instance
 * @returns {TemplateResult} HTML template for legend table
 */
export function legend( app ) {
  return html`
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col"></th>
          ${ app.text.selection.map( ( selection, i ) => !i ? '' : html`<th scope="col">${ selection }</th>`) }
        </tr>
      </thead>
      <tbody>
        ${ Object.values( app.notations ).map( notation => html`
          <tr>
            <th scope="row" style="vertical-align: middle">${ notation.title }</th>
            ${ app.text.selection.map( ( selection, i ) => !i ? '' : html`<td><img src="${ notation.images[ i ] }"></td>` ) }
          </tr>
        ` ) }
      </tbody>
    </table>
  `;
}

/**
 * returns the HTML template for 'add foreign key' form
 * @param {Object} section - app state data of current section
 * @param {number} table - index of the table that will contain the foreign key (0: left, 1: middle, 2: right)
 * @param {Function} onSubmit - when form is submitted
 * @returns {TemplateResult} HTML template for 'attribute form'
 */
export function fkForm( section, table, onSubmit ) {

  /**
   * referencable tables
   * @type {number[]}
   */
  const tables = [];

  // determine referencable tables
  for ( let i = 0; i <= 2; i++ )              // check for each possible table:
    if ( table !== i )                        // - not the table that will contain the foreign key?
      if ( section.input[ i ] )               // - table is created?
        if ( !section.input[ table ][ i ] )   // - table is not already referenced by the table that will contain the foreign key?
          tables.push( i );                   // => table is referencable

  return html`
    <form id="attr-form" @submit=${ onSubmit }>

      <!-- Referenced Table -->
      <div class="form-group" title="Geben Sie hier an auf welche Tabelle der Fremdschlüssel verweist.">
        <label for="fk-to">Referenzierte Tabelle</label>
        <select class="form-control" name="table" id="fk-to">
          ${ tables.map( table => html`<option value="${ table }">${ section && section.relationship[ table ] }</option>` ) }
        </select>
      </div>

      <!-- Optional Attribute -->
      <div class="form-group" title="Geben Sie hier an, ob es sich bei dem Fremdschlüssel um ein optionales Attribut handelt.">
        <input type="checkbox" name="opt" id="fk-opt">
        <label class="form-check-label pl-1" for="fk-opt">Optional</label>
      </div>
      
    </form>
  `;

}
