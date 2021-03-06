const translate=require("translate")
let search_input = document.getElementById("search_input");
let word_id = document.getElementById("word_id");
let pron_li = document.getElementById("pron_li");
let text_trans = document.getElementById("text_trans");
let text_spanish = document.querySelector(".text_trans");
let def_id = document.getElementById("def_id");
let def_strong = document.querySelector(".def_strong");

let fas = document.querySelector(".fass");
let text = document.querySelector(".text");
let search_btn = document.getElementById("search_btn");
let not_found = document.querySelector(".not_found");
let loading = document.querySelector(".loading");
let head = document.querySelector(".head");
let ApiKey = "3e5ee011-b29d-4294-a5eb-3c8d3e54ac96";
search_btn.addEventListener("click", (e) => {
e.preventDefault();

//  clear data 
 
  fas.innerHTML="";
  not_found.innerText="";
  word_id.innerText="";
  def_id.innerText="";
  def_strong.innerText=""
  

  //get input data;
  let word = search_input.value;
  if (word == "") {
    alert("word is required");
    return;
  }
  getData(word,"es");
  word_id.innerText = word;

  //call an api
});

async function getData(word,translateTo) {
    loading.style.display="block";
    word_id.style.display="block";
    head.style.display="none";
    text_spanish.style.display="block";
    text_trans.style.display="block";
    pron_li.style.display="block";
    translate.engine="libre";
    const translated_str= await translate(word, translateTo);
    text_trans.innerText=translated_str;
  //Ajax call

  const Api_response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${ApiKey}`
  );

  const data = await Api_response.json();
  console.log(data);
  //if emplty result
  if (!data.length) {
      word_id.style.display="none";
    loading.style.display="none";
    head.style.display="none";
    text_spanish.style.display="none";   
    text_trans.style.display="none";
    pron_li.style.display="none";
     def_strong.style.display="none";



    not_found.innerText = "No Result Found ????";
    return;
  }

  //if result is suggested
  if (typeof data[0] === "string") {
    pron_li.style.display="none";
    loading.style.display="none";
    head.style.display="none";
    word_id.style.display="block";
    text_spanish.style.display="none"
    text_trans.style.display="none";
    text.style.display="none";
    def_strong.style.display="none";


    let heading = document.createElement("h3");
    heading.innerText = "Did You mean ?";
    not_found.appendChild(heading);
    data.forEach((element) => {
      let suggestion = document.createElement("span");
      suggestion.classList.add("suggested");
      suggestion.innerText = element;
      not_found.appendChild(suggestion);
      

    });
    return;
  }
  //result  found
  loading.style.display="none";
  head.style.display="none";
  word_id.style.display="block";
  text_spanish.style.display="block";
  text_trans.style.display="block";
  pron_li.style.display="block";
  let Defination = data[0].shortdef[0];
  def_id.innerText = Defination;
  def_strong.innerText = "Defination:";

  //get audio
  const sound = data[0].hwi.prs[0].sound.audio;
  const symbol = data[0].hwi.prs[0].ipa;
  if (sound,symbol) {
    renderSound(sound,symbol);
  }

  
}
function renderSound(sound,symbol) {
  // https://media.merriam-webster.com/soundc11
  let subfolder = sound.charAt(0);
  
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${sound}.wav?key=${ApiKey}`;
 
  let aud=document.createElement("audio");
  
  aud.src=soundSrc;
  
  aud.controls=true;
  

  fas.appendChild(aud);
text.innerText=symbol;

}

