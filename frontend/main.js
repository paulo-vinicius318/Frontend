let form = document.getElementById("form");
let nomeInput = document.getElementById("nomeInput");
let cpfInput = document.getElementById("cpfInput");
let senhaInput = document.getElementById("senhaInput")
let msg = document.getElementById("msg");
let cadastro = document.getElementById("cadastro");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
  
  let formValidation = () => {
    if (nomeInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Cadastro não pode ser vazio.";
    } else {
      console.log("success");
      msg.innerHTML = "";
      acceptData();
      add.setAttribute("data-bs-dismiss", "modal");
      add.click();
  
      (() => {
        add.setAttribute("data-bs-dismiss", "");
      })();
    }
  };
  
  let data = [{}];
  
  let acceptData = () => {
    data.push({
      nome: nomeInput.value,
      cpf: cpfInput.value,
      senha: senhaInput.value,
    });
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
    createCadastros();
  };
  
  let createCadastros = () => {
    cadastros.innerHTML = "";
    data.map((x, y) => {
      return (cadastros.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.nome}</span>
            <span class="fw-bold">${x.cpf}</span>
            <span class="fw-bold">${x.senha}</span>
   
            <span class="options">
              <i onClick= "editCadastro(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteCadastro(this);createCadastros()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };
  
  let deleteCadastro = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    
  };
  
  let editCadastro = (e) => {
    let selectedCadastro = e.parentElement.parentElement;
  
    nomeInput.value = selectedCadastro.children[0].innerHTML;
    cpfInput.value = selectedCadastro.children[1].innerHTML;
    senhaInput.value = selectedCadastro.children[2].innerHTML;
  
    deleteCadastro(e);
  };
  
  let resetForm = () => {
    nomeInput.value = "";
    cpfInput.value = "";
    senhaInput.value = "";
  };
  
  (() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createCadastros();
  })();