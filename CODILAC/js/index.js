const buttonAccess = document.querySelector('#buttonsWrapper')
const usuarioId = localStorage.getItem('id')

async function handleConsumoAPI(url) {
  const response = await fetch(`http://localhost:3333${url}`)

  const data = await response.json()
  const status = await response.status
  console.log(status)
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

async function renderNomesNaTelaPaciente() {
  if (usuarioId) {
    const url = `/paciente/${usuarioId}`
    const { data: paciente } = await handleConsumoAPI(url)

    buttonAccess.innerHTML = `
      <button class="button-access" id="buttonAccess" onclick="handleMovePage()">
          <img class="user-icon" src="../../img/perfil-de-usuario.png" />
          <span class="user-name" id="user-name">${paciente.nome}</span>
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