const form = document.querySelector(".form_content");
const nomeInput = form.elements['nome']
const senhaInput = form.elements['senha']
const buttonSubmit = document.querySelector("button[value=entrar]")
let load = true

function isLoad() {
  buttonSubmit.innerHTML = load ? '...' : 'Entrar'
  load = !load
}

async function handleLogin(nome, senha) {
  console.log('clicou')
  try {
    isLoad()
    const response = await fetch('http://localhost:3333/login', {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({
        nome,
        senha
      })
    })

    const data = await response.json()

    if (response.status !== 200) {
      alert(data?.mensagem)
      return
    }
  } catch (error) {
    console.log(error)
  } finally {
    isLoad()
  }

}


form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const nome = nomeInput.value
  const senha = senhaInput.value

  if (nome === '') {
    alert('Campo nome vazio. Por favor preencha o nome!')
    return
  }

  if (senha === '') {
    alert('Campo senha vazio. Por favor preencha o senha!')
    return
  }

  if (nome && senha) {
    await handleLogin(nome, senha)
    return
  }

})
