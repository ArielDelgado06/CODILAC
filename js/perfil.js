const profile = document.querySelector('.main_perfil');
const box_content = document.querySelector('.perfil_content');

async function get_pacientes() {
  const usuarioId = localStorage.getItem('id')
  const res = await fetch(`http://localhost:3333/paciente/${usuarioId}`, {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" }
  })

  let users = await res.json();
  console.log(users)

  profile.innerHTML = `
    <h3>Dados pessoais do usuário</h3>
        <div class="profile">
          <div class="grupTitle">
            <h6>Primeiro Nome</h6>
            <p>${users.nome}</p>
          </div>
    
          <div class="iconUpdate">
            <p>Editar</p>
          </div>
        </div>
    
        <div class="profile">
          <div class="grupTitle">
            <h6>Segundo nome</h6>
            <p>${users.sobreNome}</p>
          </div>
    
          <div class="iconUpdate">
            <p>Editar</p>
          </div>
        </div>
    
        <div class="profile">
          <div class="grupTitle">
            <h6>Nacionalidade</h6>
            <p>${users.nacionalidade}</p>
          </div>
    
          <div class="iconUpdate">
            <p>Editar</p>
          </div>
        </div>
    
        <div class="profile">
          <div class="grupTitle">
            <h6>Número de telefone</h6>
            <p>${users.telefone}</p>
          </div>
    
          <div class="iconUpdate">
            <p>Editar</p>
          </div>
        </div>
      </div>
  `
  box_content.innerHTML = `
  <div class="profile">
          <div class="grupTitle">
            <h6>Email</h6>
            <p>${users.email}</p>
          </div>
    
          <div class="iconUpdate">
            <p>Editar</p>
          </div>
        </div>
    
        <div class="profile">
          <div class="grupTitle">
            <h6>Endereço</h6>
            <p>${users.endereco}</p>
          </div>
    
          <div class="iconUpdate">
            <p>Editar</p>
          </div>
        </div>
    
        <div class="profile">
          <div class="grupTitle">
            <h6>Data de nascimento</h6>
            <p>${users.data_nasc}</p>
          </div>
    
          <div class="iconUpdate">
            <p>Editar</p>
          </div>
        </div>
    
        <div class="profile">
          <div class="grupTitle">
            <h6>Sexo</h6>
            <p>${users.sexo}</p>
          </div>
    
          <div class="iconUpdate">
            <p>Editar</p>
          </div>
        </div>
  `
}


get_pacientes();