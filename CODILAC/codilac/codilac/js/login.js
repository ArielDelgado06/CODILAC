const form = document.querySelector(".form_login_formulario");
const emailInput = form.elements['email']
const senhaInput = form.elements['senha']
const buttonSubmit = document.querySelector("#form_login_botao[value=entrar]");
let load = true

function isLoad() {
  buttonSubmit.innerHTML = load ? '...' : 'Entrar'
  load = !load
}

async function handleLogin(email, senha) {
  try {
    isLoad()
    const response = await fetch('http://localhost:3333/login', {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        email,
        senha
      })
    })

    const data = await response.json()

    if (response.status !== 200) {
      alert(data?.mensagem)
      return
    }

    localStorage.setItem('id', data?.id)
    localStorage.setItem('cargo', data?.cargo)
    window.location.href = './index.html'

  } catch (error) {
    console.log(error)
  } finally {
    isLoad()
  }

}


form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const email = emailInput.value
  const senha = senhaInput.value

  if (email === '') {
    alert('Campo email vazio. Por favor preencha o email!')
    return
  }

  if (senha === '') {
    alert('Campo senha vazio. Por favor preencha o senha!')
    return
  }

  if (email && senha) {
    const usuario = await handleLogin(email, senha)
    console.log(usuario)
  }

})
