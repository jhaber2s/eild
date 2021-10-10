/**
 * @overview HTML templates of ccmjs-based web component for ER model training
 * @author André Kless <andre.kless@web.de> 2021
 */

import { html, render } from 'https://ccmjs.github.io/akless-components/libs/lit/lit.js';
export { render };

/**
 * returns the main HTML template
 * @param {Object} app - app instance
 * @param {Object} data - app state data
 * @param {Object} phrase - phrase data
 * @param {number} phrase_nr - number of current phrase
 * @param {function} onNotationChange - when selected entry for displayed notation changes
 * @param {function} onLegendClick - when 'legend' button is clicked
 * @param {function} onLeftInputChange - when selected entry of left selector box changes
 * @param {function} onRightInputChange - when selected entry of right selector box changes
 * @param {function} onCancelClick - when 'cancel' button is clicked
 * @param {function} onSubmitClick - when 'submit' button is clicked
 * @param {function} onNextClick - when 'next' button is clicked
 * @param {function} onFinishClick - when 'finish' button is clicked
 * @returns {TemplateResult} main HTML template
 */
export function main( app, data, phrase, phrase_nr, onNotationChange, onLegendClick, onLeftInputChange, onRightInputChange, onFirstInputChange, onSecondInputChange, onThirdInputChange, onFourthInputChange, onFifthInputChange, onSixthInputChange, onSeventhInputChange, onEighthInputChange, onCancelClick, onSubmitClick, onNextClick, onFinishClick ) {
  let { centered, comment, images, left, swap } = app.notations[ data.notation ];
  const section = data.sections[ phrase_nr - 1 ];
  return html`
    <h1 class="mx-3">${app.text.title}</h1> <!-- Title -->
    <header class="bg-light border rounded-top d-flex flex-wrap justify-content-between align-items-center p-2">
      <div id="heading" class="p-2 pr-3">${section.correct===undefined?app.text.heading:(section.correct?app.text.correct:app.text.failed)}</div> <!-- Heading -->
      <div class="d-flex align-items-center text-nowrap px-2">

        <!-- Notation Selection -->
        <section ?data-hidden=${Object.keys(app.notations).length===1}>
          <div class="d-flex align-items-center">
            <label for="notation-input" class="m-0 text-nowrap"><b>${app.text.notation}</b></label>
            <select id="notation-input" class="form-control ml-2" @change=${onNotationChange}>
              ${Object.keys(phrase).length === 7 ? Object.values(app.notations).sort( ( a, b ) => a.title.localeCompare( b.title ) ).map(({key,title})=>html`<option value="${key}" ?selected=${data.notation===key}>${title}</option>`) : html`<option value="Abrial" ?selected=Abrial>Abrial</option>`}
            </select>
          </div>
        </section>

        <!-- Legend -->
        <section class="ml-2" ?data-hidden=${!app.legend}>
          <button class="btn btn-link" @click=${onLegendClick}>${app.text.legend}</button>
        </section>
        
      </div>
    </header>
    <main class="border rounded-bottom border-top-0 px-4 py-2">
      <div>
        
        <!-- Phrase -->
        <section class="lead text-nowrap px-2 py-3">
          <b>${app.ccm.helper.html(app.text.phrase,phrase_nr.toString())}</b>
          <span class="text-wrap">${phrase.text}</span>
        </section>
        
        <!-- Diagram -->
        <section class="px-2 py-3">
          <div id="diagram" class="d-flex justify-content-between align-items-center" style="visibility:${Object.keys(phrase).length === 7 ?'visible':'hidden'}">
            ${Object.keys(phrase).length === 7 ? binaryDiagram(phrase, app, section,swap,images,centered,left) : html``}
          </div>
          <div id="ndiagram" class="d-flex justify-content-between align-items-center" style="visibility:${Object.keys(phrase).length === 7 ?'hidden':'visible'}">
            ${Object.keys(phrase).length === 7 ? html`` : nnaryDiagram(phrase,app,section,images,centered)}
          </div>
        </section>

        <!-- Selector Boxes -->
        <div style="visibility:${Object.keys(phrase).length === 7 ?'visible':'hidden'}">
          <section class="d-flex justify-content-between align-items-center px-2 py-3" ?data-hidden=${section.correct!==undefined}>
            <div class="d-flex align-items-center pr-2">
              <label for="input1" class="m-0 text-nowrap"><b>${app.text.input1}</b></label>
              <select id="input1" class="form-control ml-2" @change=${swap?onRightInputChange:onLeftInputChange}>
                ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[swap?1:0])+1===i}>${caption}</option>`)}
              </select>
            </div>
            <div class="d-flex align-items-center pl-2">
              <label for="input2" class="m-0 text-nowrap"><b>${app.text.input2}</b></label>
              <select id="input2" class="form-control ml-2" @change=${swap?onLeftInputChange:onRightInputChange}>
                ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[swap?0:1])+1===i}>${caption}</option>`)}
              </select>
            </div>
          </section>
        </div>
       <div style="visibility:${Object.keys(phrase).length === 7 ?'hidden':'visible'}">
       ${Object.keys(phrase).length === 7 ? html`` : nnarySelector(phrase, app,section, onFirstInputChange, onSecondInputChange, onThirdInputChange, onFourthInputChange, onFifthInputChange, onSixthInputChange, onSeventhInputChange, onEighthInputChange)}
       </div>

        <!-- Notation Comment -->
        <section ?data-hidden=${!comment||app.feedback&&section.correct!==undefined}>
          <div class="alert alert-info mt-3 mb-0" role="alert">${comment}</div>
        </section>

        <!-- Phrase Comments -->
        <section class="d-flex justify-content-between" ?data-hidden=${!app.feedback||section.correct===undefined||section.correct||!phrase.comment||!phrase.comment[0]&&!phrase.comment[1]}>
          <div class="mr-2 phrase-comment">
            <div class="alert alert-info" role="alert" ?data-hidden=${section.input[swap?1:0]===section.solution[swap?1:0]||phrase.comment&&!phrase.comment[swap?1:0]}>${phrase.comment&&phrase.comment[swap?1:0]}</div>
          </div>
          <div class="ml-2 phrase-comment">
            <div class="alert alert-info" role="alert" ?data-hidden=${section.input[swap?0:1]===section.solution[swap?0:1]||phrase.comment&&!phrase.comment[swap?0:1]}>${phrase.comment&&phrase.comment[swap?0:1]}</div>
          </div>
        </section>
        
       
        ${Object.keys(phrase).length === 7 ? binarySolution(app,section,images,left,centered,phrase,swap) :narySolution(app,section,images,left,centered,phrase)}

        <!-- Buttons -->
        <section class="d-flex justify-content-center flex-wrap px-2 py-3">
          <button class="btn btn-outline-danger m-1" id="cancel" @click=${onCancelClick} ?data-hidden=${!app.oncancel}>${app.text.cancel}</button>
          <button class="btn btn-primary m-1" @click=${onSubmitClick} ?data-hidden=${section.input.filter(String).length !== section.solution.length}>${app.text.submit}</button>
          <button class="btn btn-primary m-1" @click=${onNextClick} ?data-hidden=${section.correct===undefined||phrase_nr===app.number}>${app.text.next}</button>
          <button class="btn btn-success m-1" @click=${onFinishClick} ?data-hidden=${section.correct===undefined||phrase_nr<app.number||!app.onfinish}>${app.text.finish}</button>
        </section>

        <!-- Current State -->
        <section class="text-center px-2 pb-2" ?data-hidden=${!app.feedback}>
          <small id="current_state">${app.ccm.helper.html(app.text.current_state,data.correct.toString(),data.total.toString())}</small>
        </section>
        
        <!-- Logos -->
        <section class="mx-3 mt-3 text-center">
          <img src="https://ccmjs.github.io/eild/logos.jpg">
        </section>
        
      </div>
    </main>
  `;
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
          ${app.text.selection.map((selection,i)=>!i?'':html`<th scope="col">${selection}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${Object.values(app.notations).map(notation=>html`
          <tr>
            <th scope="row" style="vertical-align: middle">${notation.title}</th>
            ${app.text.selection.map((selection,i)=>!i?'':html`<td><img src="${notation.images[i]}"></td>`)}
          </tr>
        `)}
      </tbody>
    </table>
  `;
}

export function naryNotation( app ) {
  return html`
    <div>
      <h2>Aufgrund der Unterschiedlichen Bedeutung von n-ären Bezeihungen in unterschiedlichen Notationen ist eine Übersetzung nicht Semantisch korekt möglich</h2>
      <h3>Für n-äre Bezeihungen steht nur die Abrial Notation zur verfügung</h3>
    </div>
  `;
}

export function binaryDiagram(phrase, app, section,swap,images,centered,left){
  return html`
    <div class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[swap?1:0]===section.solution[swap?1:0]?'correct':'failed')}">
      ${phrase.relationship[0]}
    </div>
    <div>
      <img id="left" class="${left}" src="${images[app.values.indexOf(section.input[swap?1:0])+1]}">
    </div>
    <div class="filler"></div>
    <div id="name">
    <img id="middle" src="${images[5]}">
    <div class="text-nowrap" ?data-centered=${centered}>${phrase.relationship[1]}</div>
    </div>
    <div class="filler"></div>
    <div>
      <img id="right" src="${images[app.values.indexOf(section.input[swap?0:1])+1]}">
    </div>
    <div class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[swap?0:1]===section.solution[swap?0:1]?'correct':'failed')}">
      ${phrase.relationship[2]}
    </div>`
}

export function nnarySelector(phrase, app,section, onFirstInputChange, onSecondInputChange, onThirdInputChange, onFourthInputChange, onFifthInputChange, onSixthInputChange, onSeventhInputChange, onEighthInputChange){
  return html`
  <div id = "narySelection">
    <section id = "firstSelectionRow" class="d-flex justify-content-between align-items-center px-2 py-3" ?data-hidden=${section.correct!==undefined}>
      <div style="visibility:${Object.values(phrase.objects).length >=5 ?'visible':'hidden'}" class="firstSelection align-items-center pr-2">
        <label for="input5" class="m-0 text-nowrap"><b>Auswahl ${phrase.objects[4]}:</b></label>
        <select id="input5" class="form-control ml-2" @change=${onFifthInputChange}>
          ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[4])+1===i}>${caption}</option>`)}
        </select>
      </div>
      <div style="visibility:${Object.values(phrase.objects).length >=3 ?'visible':'hidden'}" class="secondSelection align-items-center pr-2">
        <label for="input3" class="m-0 text-nowrap"><b>Auswahl ${phrase.objects[2]}:</b></label>
        <select id="input3" class="form-control ml-2" @change=${onThirdInputChange}>
          ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[2])+1===i}>${caption}</option>`)}
        </select>
      </div>          
      <div style="visibility:${Object.values(phrase.objects).length >=6 ?'visible':'hidden'}" class="thirdSelection align-items-center pl-2">
        <label for="input6" class="m-0 text-nowrap"><b>Auswahl ${phrase.objects[5]}:</b></label>
        <select id="input6" class="form-control ml-2" @change=${onSixthInputChange}>
          ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[5])+1===i}>${caption}</option>`)}
        </select>
      </div>
    </section>

    <section id = "secondSelectionRow" class="d-flex justify-content-between align-items-center px-2 py-3" ?data-hidden=${section.correct!==undefined}>
      <div style="visibility:${Object.values(phrase.objects).length >=1 ?'visible':'hidden'}" class="firstSelection align-items-center pr-2">
        <label for="input1" class="m-0 text-nowrap"><b>Auswahl ${phrase.objects[0]}:</b></label>
        <select id="input1" class="form-control ml-2" @change=${onFirstInputChange}>
          ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[0])+1===i}>${caption}</option>`)}
        </select>
      </div>
      <div style="visibility:${Object.values(phrase.objects).length >=2 ?'visible':'hidden'}" class="thirdSelection align-items-center pl-2">
        <label for="input2" class="m-0 text-nowrap"><b>Auswahl ${phrase.objects[1]}:</b></label>
        <select id="input2" class="form-control ml-2" @change=${onSecondInputChange}>
          ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[1])+1===i}>${caption}</option>`)}
        </select>
      </div>
    </section>

    <section id = "thirdSelectionRow" style="visibility:${Object.values(phrase.objects).length >=7 ?'visible':'hidden'}" class="d-flex justify-content-between align-items-center px-2 py-3" ?data-hidden=${section.correct!==undefined}>
      <div style="visibility:${Object.values(phrase.objects).length >=7 ?'visible':'hidden'}" class="firstSelection align-items-center pr-2">
        <label for="input7" class="m-0 text-nowrap"><b>Auswahl ${phrase.objects[6]}:</b></label>
        <select id="input7" class="form-control ml-2" @change=${onSeventhInputChange}>
          ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[6])+1===i}>${caption}</option>`)}
        </select>
      </div>
      <div style="visibility:${Object.values(phrase.objects).length >=4 ?'visible':'hidden'}" class="secondSelection align-items-center pr-2">
        <label for="input4" class="m-0 text-nowrap"><b>Auswahl ${phrase.objects[3]}:</b></label>
        <select id="input4" class="form-control ml-2" @change=${onFourthInputChange}>
          ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[3])+1===i}>${caption}</option>`)}
        </select>
      </div>          
      <div style="visibility:${Object.values(phrase.objects).length >=8 ?'visible':'hidden'}" class="thirdSelection align-items-center pl-2">
        <label for="input8" class="m-0 text-nowrap"><b>Auswahl ${phrase.objects[7]}:</b></label>
        <select id="input8" class="form-control ml-2" @change=${onEighthInputChange}>
          ${app.text.selection.map((caption,i)=>html`<option value="${app.values[i-1]||''}" ?selected=${app.values.indexOf(section.input[7])+1===i}>${caption}</option>`)}
        </select>
      </div>
    </section>
  </div>
`
}

export function nnaryDiagram(phrase, app, section,images,centered){
  return html`
    <div id="relation">
      <img id="middle" src="${images[5]}">
      <div class="text-nowrap" ?data-centered=${centered}>${phrase.relationship[0]}</div>
    </div>
    <div id = "first" style="visibility:${Object.values(phrase.objects).length >=1 ?'visible':'hidden'}">
      <div id="firstObject" class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[0]===section.solution[0]?'correct':'failed')}">
        ${phrase.objects[0]}
      </div>
      <div id="firstN"> 
        <img class="leftNotation" class="copied" src="${images[app.values.indexOf(section.input[0])+1]}">
      </div>
      <div id="lineLeft">
        <div class="topCrossLine" style="visibility:${Object.values(phrase.objects).length >=5 ?'visible':'hidden'}"> </div>
        <div class="horizontalLine"> </div>
        <div class="bottomCrossLine" style="visibility:${Object.values(phrase.objects).length >=7 ?'visible':'hidden'}"> </div>
      </div>
    </div>
    <div id = "second" style="visibility:${Object.values(phrase.objects).length >=2 ?'visible':'hidden'}">
      <div id="secondObject" class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[1]===section.solution[1]?'correct':'failed')}">
        ${phrase.objects[1]}
      </div>
      <div id="secondN"> 
        <img class="rightNotation" class="copied" src="${images[app.values.indexOf(section.input[1])+1]}">
      </div>
      <div id="lineRight">
        <div class="topCrossLine" style="visibility:${Object.values(phrase.objects).length >=6 ?'visible':'hidden'}"> </div>
        <div class="horizontalLine"> </div>
        <div class="bottomCrossLine" style="visibility:${Object.values(phrase.objects).length >=8 ?'visible':'hidden'}"> </div>
      </div>
    </div>
    <div id = "third" style="visibility:${Object.values(phrase.objects).length >=3 ?'visible':'hidden'}">
      <div id="thirdObject" class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[2]===section.solution[2]?'correct':'failed')}">
        ${phrase.objects[2]}
      </div>
      <div id="thirdN"> 
        <img class="topNotation" class="copied" src="${images[app.values.indexOf(section.input[2])+7]}">
      </div> 
    </div>
    <div id = "fourth" style="visibility:${Object.values(phrase.objects).length >=4 ?'visible':'hidden'}">
      <div id="fourthObject" class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[3]===section.solution[3]?'correct':'failed')}">
        ${phrase.objects[3]}
      </div>
      <div id="fourthN"> 
        <img class="bottomNotation" class="copied" src="${images[app.values.indexOf(section.input[3])+7]}">
      </div>  
    </div> 
    <div id="fifth" style="visibility:${Object.values(phrase.objects).length >=5 ?'visible':'hidden'}">
    <div id="fifthObject" class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[4]===section.solution[4]?'correct':'failed')}">
      ${phrase.objects[4]}
    </div>
    <div id="fifthN">
        <img class="leftNotation" class="copied" src="${images[app.values.indexOf(section.input[4])+1]}">
      </div>
      <div id="leftDown"> 
        <div class="horizontalLine"> </div>
        <div class="verticlaLine"></div>
      </div>
      <div id="lineDownLeft" class="verticlaLine">  </div>
    </div>
    <div id="sixth" style="visibility:${Object.values(phrase.objects).length >=6 ?'visible':'hidden'}">
      <div id="sixthObject" class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[5]===section.solution[5]?'correct':'failed')}">
        ${phrase.objects[5]}
      </div>
      <div id="sixthN"> 
        <img class="rightNotation" class="copied" src="${images[app.values.indexOf(section.input[5])+1]}">
      </div>
      <div id="rightDown"> 
        <div class="horizontalLine"> </div>
        <div class="verticlaLine"></div>
      </div>
      <div id="lineDownRight" class="verticlaLine">  </div>  
    </div>
    <div id="seventh" style="visibility:${Object.values(phrase.objects).length >=7 ?'visible':'hidden'}">
      <div id="seventhObject" class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[6]===section.solution[6]?'correct':'failed')}">
        ${phrase.objects[6]}
      </div>
      <div id="seventhN"> 
        <img class="leftNotation" class="copied" src="${images[app.values.indexOf(section.input[6])+1]}">
      </div>  
      <div id="leftUp"> 
        <div class="horizontalLine"> </div>
        <div class="verticlaLine"></div>
      </div>
      <div id="lineUpLeft" class="verticlaLine">  </div>
    </div>
    <div id="eighth" style="visibility:${Object.values(phrase.objects).length >=8 ?'visible':'hidden'}">
      <div id="eighthObject" class="entity border rounded p-3 text-nowrap ${app.feedback&&section.correct!==undefined&&(section.input[7]===section.solution[7]?'correct':'failed')}">
        ${phrase.objects[7]}
      </div>
      <div id="eighthN"> 
        <img class="rightNotation" class="copied" src="${images[app.values.indexOf(section.input[7])+1]}">
      </div>
      <div id="rightUp"> 
        <div class="horizontalLine"> </div>
        <div class="verticlaLine"></div>
      </div>
      <div id="lineUpRight" class="verticlaLine">  </div>  
    </div>
    
  `;

}

export function binarySolution(app,section,images,left,centered,phrase,swap){
  return html`
    <!-- Correct Solution -->
    <section class="d-flex flex-column align-items-center px-2" ?data-hidden=${!app.feedback||!app.show_solution||section.correct===undefined||section.correct}>
      <div class="lead">${app.text.correct_solution}</div>
      <div class="d-flex align-items-center mt-3">
        <div>
          <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[swap?1:0])+1]}">
        </div>
        <div id="name">
          <img id="middle" src="${images[5]}">
          <div class="text-nowrap" ?data-centered=${centered}>${phrase.relationship[1]}</div>
        </div>
        <div>
          <img id="right" src="${images[app.values.indexOf(section.solution[swap?0:1])+1]}">
        </div>
      </div>
    </section>  
  `
}

export function narySolution(app,section,images,left,centered,phrase){
  return html`
  <section class="d-flex flex-column align-items-center px-2" ?data-hidden=${!app.feedback||!app.show_solution||section.correct===undefined||section.correct}>
    <div class="lead">${app.text.correct_solution}</div>
    <div id = "narySolution" class="d-flex align-items-center mt-3">
       <div id = "firstN" style="visibility:${Object.values(phrase.objects).length >=1 ?'visible':'hidden'}">
         <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[0])+1]}">
        </div>
        <div id = "secondN" style="visibility:${Object.values(phrase.objects).length >=2 ?'visible':'hidden'}">
          <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[1])+1]}">
        </div>
        <div id = "thirdN" style="visibility:${Object.values(phrase.objects).length >=3 ?'visible':'hidden'}">
          <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[2])+7]}">
        </div>
        <div id = "fourthN" style="visibility:${Object.values(phrase.objects).length >=4 ?'visible':'hidden'}">
          <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[3])+7]}">
        </div>
        <div id = "fithdN" style="visibility:${Object.values(phrase.objects).length >=5 ?'visible':'hidden'}">
          <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[4])+1]}">
        </div>
        <div id = "sixthN" style="visibility:${Object.values(phrase.objects).length >=6 ?'visible':'hidden'}">
          <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[5])+1]}">
        </div>
        <div id = "seventhN" style="visibility:${Object.values(phrase.objects).length >=7 ?'visible':'hidden'}">
          <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[6])+1]}">
        </div>
        <div id = "eighthN" style="visibility:${Object.values(phrase.objects).length >=8 ?'visible':'hidden'}">
          <img class="${left}" id="left" src="${images[app.values.indexOf(section.solution[7])+1]}">
        </div>
        <div id="name">
          <img id="middle" src="${images[5]}">
          <div class="text-nowrap" ?data-centered=${centered}>${phrase.relationship[1]}</div>
        </div>
      </div>
  </section>
  `


}




