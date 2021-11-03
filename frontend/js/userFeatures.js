//QUERY ELEMENTS

const addUserForm = document.querySelector(".add-user-form");
const getUserForm = document.querySelector(".get-user-form");
const deleteUserForm = document.querySelector(".delete-user-form");
const updateUserForm = document.querySelector(".update-user-form");

const usersList = document.querySelector(".userFileds");
const userfield = document.querySelector(".getUser");
const deleteUserfield = document.querySelector(".deleteUser");
const updateField = document.querySelector(".updateField");

//Inputs from User
const nomeValue = document.getElementById("nome-value");
const sobrenomeValue = document.getElementById("sobrenome-value");
const idadeValue = document.getElementById("idade-value");
const cpfValue = document.getElementById("cpf-value");
const emailValue = document.getElementById("email-value");
const passwordValue = document.getElementById("password-value");
const ocupacaoValue = document.getElementById("ocupacao-value");
const descricaoValue = document.getElementById("descricao-value");
const perfilValue = document.getElementById("perfil-value");
const imagemValue = document.getElementById("img-value");
const pubViValue = document.getElementById("pub-men-value");
const diasSobrioValue = document.getElementById("dias_sobrio-value");
const dependenciaValue = document.getElementById("dependencia-value");
const relacaoFamiliaValue = document.getElementById("relacao_familia-value");

//user id input
const userId = document.getElementById("getUserByid");
const userDeleteId = document.getElementById("deleteUserbyId");
const userUpdateId = document.getElementById("updateUserById");

//campo update
const campoUpdate =  document.getElementById("campo-value");
const conteudoUpdate = document.getElementById("conteudo_up");

//botoes
const botaoListarUsers = document.querySelector("#listarusers");

//staus online
const statusOnline = document.querySelector(".status_online_form");
const status_id_Online = document.getElementById("Id_status");
const status_value = document.getElementById("status-value");

//visibilidade publica
const visiPublica = document.querySelector(".visi_pub_form");
const visiPublica_id = document.getElementById("Id_visi_pub");
const visiPublica_value = document.getElementById("visi_pub-value");

//permissao especialista

const permEsp = document.querySelector(".perm_esp_form");
const permEsp_id = document.getElementById("Id_perm_esp");

//Sobrio checkin
const sobrioCheckin = document.querySelector(".sobrio_form");
const sobrioCheckin_id = document.getElementById("Id_sobrio");

//URLS
const url_get_users = "http://localhost:3000/api/users/reads";
const url_post_users = "http://localhost:3000/api/users/create";
const url_get_user = "http://localhost:3000/api/users/read/";
const url_delete_user = "http://localhost:3000/api/users/delete/";
const url_update_user = "http://localhost:3000/api/users/update/";
const url_permitir_especialista = "http://localhost:3000/api/users/permitir_especialista/";
const url_sobrio_checkin = "http://localhost:3000/api/users/sobrio_checkin/";


function renderUsers(data){
  let output = "";
  for(let user of data.User){
    let nome = user.nome + " " + user.sobrenome;
    let idade = user.idade === undefined ? "" : user.idade;
    let ocupacao = user.ocupacao === undefined ? "" : user.ocupacao;
    let descricao = user.descricao === undefined ? "" : user.descricao;
    output += `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title"><b>Nome: </b> ${nome}</h5>
        <h5 class="card-title"><b>Idade: </b> ${idade}</h5>
        <h5 class="card-title"><b>Ocupacao: </b> ${ocupacao}</h5>
        <h5 class="card-title"><b>Ocupacao: </b> ${ocupacao}</h5>
        <h5 class="card-title"><b>Descricao:</h5>
        <p class="card-text">${descricao}</p>
      </div>
    </div>
    <br>
    `;
  }
  usersList.innerHTML = ""; // limpa a div de listagem 
  usersList.innerHTML = output;
}

botaoListarUsers.addEventListener("click",async () =>{
// Get nos users
fetch(url_get_users)
  .then(res => res.json())
  .then(data => renderUsers(data));
});

getUserForm.addEventListener("submit", async(e)=>{
  e.preventDefault(); // elimina reload ao submeter form
  var output = "";
// Get nos users
  fetch(url_get_user + userId.value)
  .then(res => res.json())
  .then(data => {
    let nome = data.result.nome + " " + data.result.sobrenome;
    let online = data.result.online === true ? "Online": "Offline";
    let idade = data.result.idade === undefined ? "" : data.result.idade;
    let ocupacao = data.result.ocupacao === undefined ? "" : data.result.ocupacao;
    let descricao = data.result.descricao === undefined ? "" : data.result.descricao;
    

    output = `<div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title"><b>Nome: </b> ${nome}</h5>
                  <h5 class="card-title"><b>Idade: </b> ${idade}</h5>
                  <h5 class="card-title"><b>Ocupacao: </b> ${ocupacao}</h5>
                  <h5 class="card-title"><b>Status: </b> ${online}</h5>
                  <h5 class="card-title"><b>Descricao:</h5>
                  <p class="card-text">${descricao}</p>
                </div>
              </div>
              <br>
          `;
    userfield.innerHTML = ""; // limpa a div de listagem 
    userfield.innerHTML = output;
  });
  
})

// Create user
addUserForm.addEventListener("submit",async (e) =>{
  e.preventDefault(); // elimina reload ao submeter form
  var corpo = {
        nome: nomeValue.value,
        sobrenome: sobrenomeValue.value,
        idade: idadeValue.value,
        cpf: cpfValue.value,
        email: emailValue.value,
        password: passwordValue.value,
        ocupacao: ocupacaoValue.value,
        descricao: descricaoValue.value,
        perfil: perfilValue.value,
        img: imagemValue.value,
        pub_men:  pubViValue.value,
        dias_sobrio: diasSobrioValue.value,
        dependencia: dependenciaValue.value,
        relacao_familia: relacaoFamiliaValue.value
  }

  var newCorpo = Object.keys(corpo).reduce((object, key) => {
    if(corpo[key] !== "") {
      object[key] = corpo[key]
    }
    return object
  }, {})

  fetch(url_post_users, {
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newCorpo)
  }).then(res => res.json())

});

// Update user
updateUserForm.addEventListener("submit", async(e) =>{
  e.preventDefault(); // elimina reload ao submeter form
  //console.log(campoUpdate.value, userUpdateId.value, conteudoUpdate.value);
  var campos = ["nome","sobrenome","idade","cpf","ocupacao","descricao","perfil",
  "img","link_docs","dependencia", "relacao_familia"];
  
  var object_update = JSON.parse(`{"${campos[campoUpdate.value]}" : "${conteudoUpdate.value}"}`);
  
  fetch(url_update_user + userUpdateId.value, {
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

// Delete User
deleteUserForm.addEventListener("submit",async(e)=>{
  e.preventDefault(); // elimina reload ao submeter form
  console.log(url_delete_user + userDeleteId.value);
  fetch(url_delete_user + userDeleteId.value, {
    method: "DELETE",
    headers:{
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    let nome = data.result.nome;
    let idade = data.result.idade === undefined ? "" : data.result.idade;
    let ocupacao = data.result.ocupacao === undefined ? "" : data.result.ocupacao;
    let descricao = data.result.descricao === undefined ? "" : data.result.descricao;

    output = `<div class="card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title"><b>Nome: </b> ${nome}</h5>
                  <h5 class="card-title"><b>Idade: </b> ${idade}</h5>
                  <h5 class="card-title"><b>Ocupacao: </b> ${ocupacao}</h5>
                  <h5 class="card-title"><b>Descricao:</h5>
                  <p class="card-text">${descricao}</p>
                </div>
              </div>
              <br>
          `;
    deleteUserfield.innerHTML = ""; // limpa a div de listagem 
    deleteUserfield.innerHTML = output;
  });
});

//Status Online
statusOnline.addEventListener("submit",async(e)=>{
  e.preventDefault(); // elimina reload ao submeter form
  console.log(status_id_Online.value, status_value.value);
  var object_update = {online: status_value.value}
  fetch(url_update_user + status_id_Online.value, {
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

visiPublica.addEventListener("submit",async(e)=>{
  e.preventDefault(); // elimina reload ao submeter form
  console.log(visiPublica_id.value, visiPublica_value.value);
  var object_update = {pub_men: visiPublica_value.value}
  fetch(url_update_user + visiPublica_id.value, {
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

permEsp.addEventListener("submit", async(e)=>{
  e.preventDefault(); // elimina reload ao submeter form
  fetch(url_permitir_especialista + permEsp_id.value, {
    method: "PUT",
    headers:{
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
});

sobrioCheckin.addEventListener("submit", async(e)=>{
  e.preventDefault(); // elimina reload ao submeter form
  fetch(url_sobrio_checkin + sobrioCheckin_id.value, {
    method: "PUT",
    headers:{
      "Content-Type": "application/json"
    }
  }).then(res => res.json())
});