const form = document.querySelector(".form");
const inputNome = form.elements["nome"];
const inputtelefone = form.elements["telefone"];
const inputEmail = form.elements["email"];
const inputSenha = form.elements["senha"];
const inputConfSenha = form.elements["confSenha"];
const BtnCadastrar = form.elements["bg-waiting button"];

async function AddFuncionario(nome, telefone, email, senha) {
  const funcionario = {
    "nome": nome,
    "telefone": telefone,
    "email": email,
    "senha": senha
  };

  try {

    await fetch("http://localhost:3333/cadastro/funcionario", {
      method: "POST",
      body: JSON.stringify(funcionario),
      headers: { "Content-Type": "application/json;charset=UTF-8" },
    }).then(window.alert("recepcionista cadastrado com sucesso"));

  } catch (error) {
    console.log("falha ao se conectar com o banco");
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = inputNome.value;
  const telefone = inputtelefone.value;
  const email = inputEmail.value;
  const senha = inputSenha.value;
  const confSenha = inputConfSenha.value;
  const nomevalid = nome.match(/[1-9]/g)
  if (nome == "") {
    window.alert("campo nome obrigatório");
    return;
  }
  if (nomevalid != null) {
    window.alert('o nome não pode conter números')
    return
  }


  if (telefone == "") {
    window.alert("campo telefone obrigatorio");
    return;
  }
  if (email == "") {
    window.alert("campo email obrigatorio");
    return;
  }
  if (senha == "") {
    window.alert("campo senha obrigatorio");
    return;
  }
  if (confSenha == "") {
    window.alert("campo confirmar senha obrigaatorio");
    return;
  }

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (emailRegex.test(email)) {
    alert('Email inválido!')
    return
  }

  if (senha.lengh < 8) {
    window.alert("a senha precisa ter no mínimo 8 caracter");
  }
  if (confSenha != senha) {
    window.alert("senhas diferentes");
  }


  await AddFuncionario(nome, telefone, email, senha);
  window.location.reload()
});
