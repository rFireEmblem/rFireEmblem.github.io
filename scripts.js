/*function generate() {
  let keys = Object.keys(data)
  tempStr = ""
  for (let i = 0; i < keys.length; i++) {
    tempStr += `<button class="test"> <img src="./test/${keys[i]}">`
  }
  document.getElementById("main").innerHTML = tempStr
}

*/
const NUMBER_OF_ARRAYS = 42
const games = ['threehouses', 'archanea', 'sov', 'genealogy', 'thracia', 'seals', 'sword', 'stones', 'por', 'rd', 'awakening', 'fates', 'feh', 'tms', 'warriors', 'cipher', 'engage', 'shadows']
const buttons = ['archanea', 'sov', 'genealogy', 'thracia', 'seals', 'sword', 'stones', 'por', 'rd', 'awakening', 'fates', 'threehouses', 'engage', 'feh', 'tms', 'warriors', 'cipher', 'shadows']
//const themes = ['archanea', 'sov', 'genealogy', 'thracia', 'seals', 'sword', 'stones', 'por', 'rd', 'awakening', 'fates', 'threehouses','engage', 'feh', 'tms']
const themes = ['sov', 'stones', 'awakening', 'fates', 'threehouses', 'feh', 'sword', 'archanea', 'genealogy', 'por', 'tms', 'engage']
let current = 'engage';
let theme = 'engage';
//cipher
let arrays = {};
let selected = [];
arrkeys = []

function clearSelects() {
  console.log('start')
  selected.pop();

   buttonhtml1= `<button id='clear' onclick='clearSelects()'><img id='clearimg' src="./title_cards/${theme}/clear.png"></button>`
    buttonhtml2= `<button id='go' onclick='request()'><img id='goimg' src="./title_cards/${theme}/go.png"></button>`

  flairhtml = document.getElementById('portraitBox').innerHTML

  let index = flairhtml.indexOf('</button>');
  flairhtml = flairhtml.substring(index+9, flairhtml.length);
  flairhtml = flairhtml.split('<button')
  flairhtml = flairhtml[0] 

  arr = flairhtml.split('>');
  arr.pop();
    arr.pop();

  if(arr.length == 0){
    flairhtml = "";
  }
  else {
     flairhtml = arr.join('>')
     flairhtml += '>'
  }

  document.getElementById('portraitBox').innerHTML =    buttonhtml1 + flairhtml + buttonhtml2
  
}

function generateButtonBar() {
  let element = document.getElementById('buttonBox');
  let str = " "
  for (let j = 0; j < buttons.length; j++) {
    str += `<button onclick="filter('${buttons[j]}')">`
    for (let i = 0; i < themes.length; i++) {
      str += `<img class='${themes[i]}theme' src="title_cards/${themes[i]}/${buttons[j]}.png" style="display:none;"`
      if (themes[i] == buttons[j] || 
        (themes[i] == 'sov' && buttons[j] == 'cipher') || 
        (themes[i] == 'feh' && buttons[j] == 'shadows') || 
        (themes[i] == 'awakening' && buttons[j] == 'warriors') ||
        (themes[i] == 'por' && buttons[j] == 'rd') ||
        (themes[i] == 'genealogy' && buttons[j] == 'thracia') ||
        (themes[i] == 'sword' && buttons[j] == 'seals')
        ) {
        str += `id="${buttons[j]}img">`
      }
      else {
        str += '>'
      }
    }
    str += `</button>`
  }
  element.innerHTML = str;
}

/*
function generateSmallButtons() {
    

  let element = document.getElementById('portraitBox');
  let flairhtml = document.getElementById('flairs').innerHTML;

  let str =`<button id='clear' onclick='clearSelects()'>`
  let str2 = `<button id='go' onclick='request()'>`

    for (let i = 0; i < themes.length; i++) {
      str += `<img class='${themes[i]}theme' src="title_cards/${themes[i]}/clear.png" style="display:none;">`
      str2 += `<img class='${themes[i]}theme' src="title_cards/${themes[i]}/go.png" style="display:none;">`
      
    }
    str += `</button>`
     str2 += `</button>`
  
  element.innerHTML = str + "<div id='flairs'>" + flairhtml +  "</div>" + str2;
}
*/



function addToBar(flaircode) {
  buttonhtml1= `<button id='clear' onclick='clearSelects()'><img id='clearimg' src="./title_cards/${theme}/clear.png"></button>`
   buttonhtml2= `<button id='go' onclick='request()'><img  id='goimg'  src="./title_cards/${theme}/go.png"></button>`
  if (selected.length == 5) {
    window.alert('You can only select up to 5 characters.')
    return;
  } else {
    selected.push(flaircode)
    console.log(selected)
    let tempstr = buttonhtml1;
    for (let i = 0; i < selected.length; i++) {
      tempstr += `<img src="./all/${selected[i].substring(1, selected[i].length-1)}.png">`
    }
    
    document.getElementById('portraitBox').innerHTML = tempstr + buttonhtml2
  }
}

function filter(game) {

  console.log('test')
  let nodes = document.getElementsByClassName(current)

  for (let i = 0; i < nodes.length; i++) {
    let hero = nodes[i];
    hero.style.display = 'none';
  }

  nodes = document.getElementsByClassName(`${theme}theme`)
 
  for (let i = 0; i < nodes.length; i++) {
    let hero = nodes[i];
    hero.style.display = 'none';
  }




  nodes = document.getElementsByClassName(game)
  console.log(nodes)
  for (let i = 0; i < nodes.length; i++) {
    let hero = nodes[i];
    hero.style.display = 'inline-block';
  }





  let id = `${current}img`;
  let file = `title_cards/${theme}/${current}.png`;
  document.getElementById(id).src = file;

  id = `${game}img`;

  theme = game;

  switch(game){
    case 'cipher':{
      theme = 'sov'
    }
    break;
       case 'warriors':{
      theme = 'awakening'
    }
    break;
       case 'thracia':{
      theme = 'genealogy'
    }
    break;

       case 'rd':{
      theme = 'por'
    }
    break;
       case 'seals':{
      theme = 'sword'
    }
    break;
       case 'shadows':{
      theme = 'feh'
    } 
    break;

  }


  nodes = document.getElementsByClassName(`${theme}theme`)

  for (let i = 0; i < nodes.length; i++) {
    let hero = nodes[i];
    hero.style.display = 'inline-block';
  }



  file = `title_cards/${theme}/${game}_sel.png`;
  document.getElementById(id).src = file;
  current = game;

  document.getElementById('clearimg').src = `./title_cards/${theme}/clear.png`
  document.getElementById('goimg').src = `./title_cards/${theme}/go.png`
  document.getElementsByTagName("body")[0].style.backgroundImage = `url(assets/backdrops/${game}.png)`




}
async function generate() {
  let tempStr = ''
  for (let i = 0; i < games.length; i++) {
    tempStr += `<div class="${games[i]}" style="display:none;"><br>`
    let entry = data[games[i]]
    let selects = entry.sections;
    for (let j = 0; j < selects.length; j++) {
      tempStr += `<br><br>${selects[j]}<br><br>`
      let flair = entry.flairs[j]
      for (let k = 0; k < flair.length; k++) {
        let file = flair[k].substring(1, flair[k].length - 1) + '.png'
        tempStr += `<button class="test" onclick="addToBar('${flair[k]}')"> <img src="./all/${file}"> </button>`
      }
    }
    tempStr += "</div>"
  }
  document.getElementById("main").innerHTML = tempStr
  let nodes = document.getElementsByClassName(`engage`)
  for (let i = 0; i < nodes.length; i++) {
    let hero = nodes[i];
    hero.style.display = 'inline-block';
  }

  id = `engageimg`;
  file = `title_cards/engage/engage_sel.png`;
  document.getElementById(id).src = file;

  nodes = document.getElementsByClassName(`engagetheme`)
  for (let i = 0; i < nodes.length; i++) {
    let hero = nodes[i];
    hero.style.display = 'inline-block';
  }

}

function request() {
  let url = `https://www.reddit.com/message/compose/?to=Bot-ta_The_Beast&subject=flair&message=`
  for (let i = 0; i < selected.length; i++) {
    url += selected[i]
    url += '%0a'
  }
  url = url.slice(0, -3)
  window.open(url, '_blank');
}