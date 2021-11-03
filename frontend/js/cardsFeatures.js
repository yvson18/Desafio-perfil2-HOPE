// Listar todos os cards
const cardsFields = document.querySelector(".CardsFileds");
const botaoListarCards = document.querySelector("#listarcards");
const url_get_cards = "http://localhost:3000/api/cards/reads";

// get card por id
const getCardByIdForm = document.querySelector(".get-card-form");
const card_id_get = document.querySelector("#getCardsByid");
const getCardField = document.querySelector(".CardsFiled");
const url_get_cards_by_id = "http://localhost:3000/api/cards/read/";

// delete card por id

const deleteCardByIdForm = document.querySelector(".delete-cards-form");
const card_id_delete = document.querySelector("#deleteCardbyId");
const deleteCardField = document.querySelector(".deleteUser");
const url_delete_cards_by_id = "http://localhost:3000/api/cards/delete/"

// update card po id
const updateCardByIdForm = document.querySelector(".update-cards-form");
const updateCampoValue = document.querySelector("#cards-campo-value");
const card_id_update = document.querySelector("#updateCardsById");
const updateValue = document.querySelector("#conteudo_Cards_up");
const url_update_cards_by_id = "http://localhost:3000/api/cards/update/"


//Create Cards
const addCardsForm = document.querySelector(".add-cards-form");
const url_post_cards = "http://localhost:3000/api/cards/create_esp/";


//Cards content for especialistas
const titulo_Value = document.getElementById("titulo-value");
const subtitulo_Value = document.getElementById("subtitulo-value");
const descricao_Value = document.getElementById("descricao-value");
const conteudo_Value = document.getElementById("conteudo-value");
const imgs_Value = document.getElementById("imgs-value");
const videos_Value = document.getElementById("videos-value");
const link_ext_Value = document.getElementById("link_ext-value");
const tipo_Value = document.getElementById("tipo-value");
const user_Value = document.getElementById("user-value");


//Create esp
addCardsForm.addEventListener("submit",async (e) =>{
    e.preventDefault(); // elimina reload ao submeter form
    var corpo = {
          titulo:titulo_Value.value,
          subtitulo: subtitulo_Value.value,
          descricao: descricao_Value.value,
          conteudo: conteudo_Value.value,
          imgs: imgs_Value.value,
          videos: videos_Value.value,
          link_ext: link_ext_Value.value,
          tipo: tipo_Value.value,
    }

    console.log(corpo);
  
    var newCorpo = Object.keys(corpo).reduce((object, key) => {
      if(corpo[key] !== "") {
        object[key] = corpo[key]
      }
      return object
    }, {})
  
    fetch(url_post_cards + user_Value.value,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCorpo)
    }).then(res => res.json())
  
});

//Create geral
const addCardsGeralForm = document.querySelector(".add-cards-geral-form");
const url_post_cards_geral = "http://localhost:3000/api/cards/create_geral/";

//Cards content for geral
const titulo_Geral_Value = document.getElementById("titulo-geral-value");
const conteudo_Geral_Value = document.getElementById("conteudo-geral-value");
const user_Geral_Value = document.getElementById("user-geral-value");


addCardsGeralForm.addEventListener("submit",async (e) =>{
    e.preventDefault(); // elimina reload ao submeter form
    var corpo = {
          titulo:titulo_Geral_Value.value,
          conteudo: conteudo_Geral_Value.value,
          tipo: 9,
    }

    console.log(corpo);
  
    var newCorpo = Object.keys(corpo).reduce((object, key) => {
      if(corpo[key] !== "") {
        object[key] = corpo[key]
      }
      return object
    }, {})
  
    fetch(url_post_cards_geral + user_Geral_Value.value,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCorpo)
    }).then(res => res.json())
  
});

// Get nos cards
function renderCards(data){
    let output = "";
    for(let card of data.Cards){
        let titulo = card.titulo === undefined ? "empty field" : card.titulo;
        let subtitulo = card.subtitulo === undefined ? "empty field" : card.subtitulo;
        let descricao = card.descricao === undefined ? "empty field" : card.descricao;
        let conteudo = card.conteudo === undefined ? "empty field" : card.conteudo;
        let imgs = card.imgs === undefined ? "empty field" : card.imgs;
        let videos = card.videos === undefined ? "empty field" : card.videos;
        let link_ext = card.link_ext === undefined ? "empty field" : card.link_ext;
        let thumbsup = card.thumbsup === undefined ? "empty field" : card.thumbsup;
// Buscando as informações do usuario que criou
        output += `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title"><b>Titulo: </b> ${titulo}</h5>
            <h5 class="card-title"><b>Subtitulo: </b> ${subtitulo}</h5>
            <h5 class="card-title"><b>Descricao:</h5>
            <p class="card-text">${descricao}</p>
            <h5 class="card-title"><b>Conteúdo:</h5>
            <p class="card-text">${conteudo}</p>
            <h5 class="card-title"><b>Imagens: </b> ${imgs}</h5>
            <h5 class="card-title"><b>Videos: </b> ${videos}</h5>
            <h5 class="card-title"><b>Links externos: </b> ${link_ext}</h5>
            <h5 class="card-title"><b>Thumbs up: </b> ${thumbsup}</h5>
        </div>
        </div>
        <br>
        `;
    }
    cardsFields.innerHTML = ""; // limpa a div de listagem 
    cardsFields.innerHTML = output;
}

botaoListarCards.addEventListener("click",async ()=>{
    console.log("Entrei");
    fetch(url_get_cards)
    .then(res => res.json())
    .then(data => renderCards(data));
});

// Get Card by Id
getCardByIdForm.addEventListener("submit", async(e)=>{
    e.preventDefault(); // elimina reload ao submeter form
    console.log(card_id_get.value);
    var output = "";
  // Get nos users
    fetch(url_get_cards_by_id + card_id_get.value)
    .then(res => res.json())
    .then((data) => {
        var card = data.Cards
        let titulo = card.titulo === undefined ? "empty field" : card.titulo;
        let subtitulo = card.subtitulo === undefined ? "empty field" : card.subtitulo;
        let descricao = card.descricao === undefined ? "empty field" : card.descricao;
        let conteudo = card.conteudo === undefined ? "empty field" : card.conteudo;
        let imgs = card.imgs === undefined ? "empty field" : card.imgs;
        let videos = card.videos === undefined ? "empty field" : card.videos;
        let link_ext = card.link_ext === undefined ? "empty field" : card.link_ext;
        let thumbsup = card.thumbsup === undefined ? "empty field" : card.thumbsup;
      
        output = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"><b>Titulo: </b> ${titulo}</h5>
                <h5 class="card-title"><b>Subtitulo: </b> ${subtitulo}</h5>
                <h5 class="card-title"><b>Descricao:</h5>
                <p class="card-text">${descricao}</p>
                <h5 class="card-title"><b>Conteúdo:</h5>
                <p class="card-text">${conteudo}</p>
                <h5 class="card-title"><b>Imagens: </b> ${imgs}</h5>
                <h5 class="card-title"><b>Videos: </b> ${videos}</h5>
                <h5 class="card-title"><b>Links externos: </b> ${link_ext}</h5>
                <h5 class="card-title"><b>Thumbs up: </b> ${thumbsup}</h5>
            </div>
            </div>
            <br>
        `;
        getCardField.innerHTML = ""; // limpa a div de listagem 
        getCardField.innerHTML = output;
    });
});

// Delete Cards
deleteCardByIdForm.addEventListener("submit",async(e)=>{
    e.preventDefault(); // elimina reload ao submeter form
    console.log(url_delete_cards_by_id + card_id_delete.value);
    fetch(url_delete_cards_by_id + card_id_delete.value, {
      method: "DELETE",
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then((data) => {
        var card = data.results;
        console.log(card);
        let titulo = card.titulo === undefined ? "empty field" : card.titulo;
        let subtitulo = card.subtitulo === undefined ? "empty field" : card.subtitulo;
        let descricao = card.descricao === undefined ? "empty field" : card.descricao;
        let conteudo = card.conteudo === undefined ? "empty field" : card.conteudo;
        let imgs = card.imgs === undefined ? "empty field" : card.imgs;
        let videos = card.videos === undefined ? "empty field" : card.videos;
        let link_ext = card.link_ext === undefined ? "empty field" : card.link_ext;
      
        output = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"><b>Titulo: </b> ${titulo}</h5>
                <h5 class="card-title"><b>Subtitulo: </b> ${subtitulo}</h5>
                <h5 class="card-title"><b>Descricao:</h5>
                <p class="card-text">${descricao}</p>
                <h5 class="card-title"><b>Conteúdo:</h5>
                <p class="card-text">${conteudo}</p>
                <h5 class="card-title"><b>Imagens: </b> ${imgs}</h5>
                <h5 class="card-title"><b>Videos: </b> ${videos}</h5>
                <h5 class="card-title"><b>Links externos: </b> ${link_ext}</h5>
            </div>
            </div>
            <br>
        `;
        deleteCardField.innerHTML = ""; // limpa a div de listagem 
        deleteCardField.innerHTML = output;
    });
});

// Update Cards
updateCardByIdForm.addEventListener("submit", async(e) =>{
    e.preventDefault(); // elimina reload ao submeter form
    
    var object_update = JSON.parse(`{"${updateCampoValue.value}" : "${updateValue.value}"}`);
    console.log(object_update);
    fetch(url_update_cards_by_id + card_id_update.value, {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object_update)
    }).then(res => res.json())
    .then(data => {
      console.log(data);
    });
});