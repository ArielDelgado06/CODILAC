let dentistaId
let search = ''
let page = 0
let totalConsultas

const form = document.querySelector("#formCadastro");
const tBodyContainer = document.querySelector("tbody")
const searchInput = document.querySelector('#search')
const buttonSubmit = document.querySelector("#cadastrarDentistas");
const buttonNext = document.querySelector("#button-proximo")
const buttonPrevious = document.querySelector("#button-anterior")

/* Variaveis dos campos*/
const nomeInput = form.elements['nome']
const especialidadeInput = form.elements['especialidade']
const nCarteiraInput = form.elements['nCarteira']
const emailInput = form.elements['email']
const telefoneInput = form.elements['telefone']
const enderecoInput = form.elements['endereco']
const horaStartInput = form.elements['horaStart']
const horaEndInput = form.elements['horaEnd']


let load = true

const isload = () => {
  if (load) {
    buttonSubmit.innerHTML = !load ? "..." : "Cadastrar"
    load = !load
  }
}


const limparCampos = () => {
  dentistaId = 0
  nomeInput.value = ""
  especialidadeInput.value = ""
  nCarteiraInput.value = ""
  emailInput.value = ""
  telefoneInput.value = ""
  enderecoInput.value = ""
  horaStartInput.value = ""
  horaEndInput.value = ""
}

async function handleCadastroEAtualizar(
  nome,
  especialidade,
  nCarteira,
  telefone,
  email,
  endereco,
  horaStart,
  horaEnd
) {
  try {
    isload()
    const dentista = {
      nome,
      especialidade,
      NCarteira: nCarteira,
      telefone,
      email,
      endereco,
      horaStart,
      horaEnd
    }
    if (dentistaId && dentistaId !== 0) {
      await fetch(`http://localhost:3333/dentistas/${dentistaId}`, {
        method: "PUT",
        body: JSON.stringify(dentista),
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      alert('Dentista editado com sucesso')
    } else {
      await fetch('http://localhost:3333/dentistas', {
        method: "POST",
        body: JSON.stringify(dentista),
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      alert('Dentista cadastrado com sucesso')
    }
    getDentistasByFiltro(search, page)
  } catch (error) {
    console.log(error)
    alert('Ocorreu um erro no servidor')
  } finally {
    limparCampos()
    isload()
  }

}

async function handleRemoverDentista(id) {
  try {
    limparCampos()

    await fetch(`http://localhost:3333/dentistas/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    })

    alert('Deletado com sucesso')
    getDentistasByFiltro(search, page)
  } catch (error) {
    alert('error: ' + error.mensagem)
  } finally {
    limparCampos()
  }
}

async function handleBuscaDentistaPorIdExibeNaTela(id) {
  try {

    const response = await fetch(`http://localhost:3333/dentistas/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    })

    const dentista = await response.json()

    dentistaId = dentista.id
    nomeInput.value = dentista.nome
    especialidadeInput.value = dentista.especialidade
    nCarteiraInput.value = dentista.NCarteira
    telefoneInput.value = dentista.telefone
    emailInput.value = dentista.email
    enderecoInput.value = dentista.endereco
    horaStartInput.value = dentista.horaStart
    horaEndInput.value = dentista.horaEnd

  } catch (error) {
    alert('error: ' + error.mensagem)
  }
}

async function getDentistasByFiltro(filtro = '', page = 0) {
  let elements = ''
  const response = await fetch(`http://localhost:3333/dentistas?filtro=${filtro}&page=${page}&limit=${6}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const dentistas = await response.json()
  totalConsultas = dentistas.length

  if (response.status !== 200) {
    tBodyContainer.innerHTML = `
      <tr align='center'>
        Ocorreu um erro na aplicação
      <tr>
    `
  }

  if (dentistas.length === 0) {
    tBodyContainer.innerHTML = `
      <tr align='center'>
        Não a nenhuma consulta
      <tr>
    `
  }

  console.log(dentistas)
  dentistas?.forEach((dentista) => {
    elements += `
      <tr>
        <td>${dentista.nome}</td>
        <td>${dentista.especialidade}</td>
        <td>${dentista.telefone}</td>
        <td>${dentista.email}</td>
        <td>${dentista.endereco}</td>
        <td>${dentista.NCarteira}</td>
        <td>${dentista.horaStart}</td>
        <td>${dentista.horaEnd}</td>
        <td>
          <button onclick="handleRemoverDentista(${dentista.id})">
            <ion-icon class="color-blue" name="trash-outline"></ion-icon>
          </button>
          <button onclick="handleBuscaDentistaPorIdExibeNaTela(${dentista.id})">
            <ion-icon class="color-red" name="create-outline"></ion-icon>
          </button>
        </td>
      </tr>
    `
  })

  tBodyContainer.innerHTML = elements

}

getDentistasByFiltro()

searchInput.addEventListener('input', event => {
  search = event.target.value
  getDentistasByFiltro(search)
})

buttonPrevious.addEventListener('click', event => {
  if (page <= 0) {
    return
  }
  page -= 6
  getDentistasByFiltro(search, page)
})

buttonNext.addEventListener('click', event => {
  if (totalConsultas < page) {
    return
  }
  page += 6
  getDentistasByFiltro(search, page)
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const nome = nomeInput.value
  const especialidade = especialidadeInput.value
  const nCarteira = nCarteiraInput.value
  const telefone = telefoneInput.value
  const email = emailInput.value
  const endereco = enderecoInput.value
  const horaStart = horaStartInput.value
  const horaEnd = horaEndInput.value

  if (nome === '') {
    alert('preencha o campo nome')
    return
  }
  if (especialidade === '') {
    alert('preencha o campo especialidade')
    return
  }

  if (nCarteira == '') {
    alert('preencha o campo nCarteira')
    return
  }
  if (telefone === '') {
    alert('preencha o campo telefone')
    return
  }
  if (email === '') {
    alert('preencha o campo email')
    return
  }
  if (endereco === '') {
    alert('preencha o campo endereço')
    return
  }
  if (horaStart === '') {
    alert('preencha o campo horaStart')
    return
  }

  if (horaEnd == '') {
    alert('preencha o campo horaEnd')
    return
  }

  const regex = /^9[0-9]{8}$/

  if (!regex.test(telefone)) {
    alert('O numero telefone deve iniciar com 9 e conter 9 numeros apenas')
    return
  }

  await handleCadastroEAtualizar(
    nome,
    especialidade,
    nCarteira,
    telefone,
    email,
    endereco,
    horaStart,
    horaEnd
  )
}
)