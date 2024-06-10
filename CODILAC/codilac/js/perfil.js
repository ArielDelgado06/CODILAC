const profile = document.querySelector('.profile');
const box_content = document.querySelector('.box_content');

async function get_pacientes() {
  const usuarioId = localStorage.getItem('id')
  const res = await fetch(`http://localhost:3333/paciente/${usuarioId}`, {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" }
  })

  let users = await res.json();
  console.log(users)

  profile.innerHTML = `
  <div class="img_profile">
    <img src="../../img/456283.png" alt="">
    <h4>${users.nome} ${users.sobreNome}</h4>
    <p>${users.telefone}</p>
  </div>
<div class="profile_content">
    <h4>Suas informações</h4>
    <div class="names">
      <div class="profile_name">
        <p>Primeiro</p>
        <p class="user_name">${users.nome}</p>
      </div>

      <div class="profile_name">
        <p>Último nome</p>
        <p class="user_name">${users.sobreNome}</p>
      </div>
    </div>
    <button class="button_update" type="button">
      Atualizar
    </button>
</div>
  `
  box_content.innerHTML = `
  <h4 class="title_main">Suas informações</h4>
  <div class="information-user">
    <div class="informations">
      <p>Email</p>
      <h4>${users.email}</h4>
    </div>
    <div class="informations">
      <p>Endereço</p>
      <h4>${users.endereco}</h4>
    </div>
    <div class="informations">
      <p>Número</p>
      <h4>${users.telefone}</h4>
    </div>
    <div class="informations">
      <p>Nacionalidade</p>
      <h4>${users.nacionalidade}</h4>
    </div>
    <div class="informations">
      <p>Data de nascimento</p>
      <h4>${users.data_nasc}</h4>
    </div>
    <div class="informations">
      <p>Sexo</p>
      <h4>${users.sexo}</h4>
    </div>
  </div>
  <div class="buttons">
    <button class="buttun_editar" type="button">
      Atualizar 
    </button>
  </div>
  `
}


get_pacientes();