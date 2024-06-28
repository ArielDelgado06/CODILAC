const buttonAccess = document.querySelector('#buttonsWrapper');
const buttonPefil = document.querySelector("#buttonsWrapperPerfil");
const buttonLogOut = document.querySelector("#buttonsWrapperLogOut");
const usuarioId = localStorage.getItem('id');

async function handleConsumoAPI(url) {
  const response = await fetch(`http://localhost:3333${url}`)

  const data = await response.json()
  const status = await response.status

  return {
    data,
    status
  }
}

async function handleMovePage() {
  const cargo = localStorage.getItem('cargo')
  if (['admin', 'normal', 'recepcionista'].includes(cargo.toString().toLowerCase())) {
    window.location.href = '../dashboard/admin/admin.html'
  } else {
    window.location.href = '../dashboard/home.html'
  }
}

async function handleMovePageLogOut() {
  localStorage.removeItem('id')
  localStorage.removeItem('cargo')
  window.location.replace('../site/index.html')
}

async function handleMovePagePerfil() {
  const cargo = localStorage.getItem('cargo')
  if (['admin', 'normal', 'recepcionista'].includes(cargo.toString().toLowerCase())) {
    window.location.href = '../dashboard/admin/admin.html'
  } else {
    window.location.href = '../dashboard/perfil.html'
  }
}

async function renderNomesNaTelaPaciente() {
  if (usuarioId) {
    const url = `/paciente/${usuarioId}`
    const { data: paciente } = await handleConsumoAPI(url)

    buttonPefil.innerHTML = `
      <span class="icon_button" onclick="handleMovePagePerfil()">
        <img src="../../img/user.png" />
      </span>
    `
    buttonAccess.innerHTML = `
      <button class="button-access" id="buttonAccess" onclick="handleMovePage()">
          <span class="user-name" id="user-name">Agendar consulta</span>
      </button>
    `
    buttonLogOut.innerHTML = `
      <button class="button-logout" id="buttonLogOut" onclick="handleMovePageLogOut()">
          <span class="user-name" id="user-name">Sair</span>
      </button>
    `
  } else {
    buttonAccess.innerHTML = `
        <a href="../site/../site/login.html" class="pagina_principal_botao_login">Entrar</a>
        <a href="../site/cadastro.html" class="pagina_principal_botao_login">Cadastrar-se</a>
    `
  }
}


renderNomesNaTelaPaciente()