let tipoConsultaId
let search = ''
let page = 0
let totalConsultas

let consultasStorage

const form = document.querySelector("#formCadastro");
const tBodyContainer = document.querySelector("tbody")
const searchInput = document.querySelector('#search')
const buttonSubmit = document.querySelector("#cadastrarDentistas");
const buttonNext = document.querySelector("#button-proximo")
const buttonPrevious = document.querySelector("#button-anterior")

/* Variaveis dos campos*/
const tipo_consultaInput = form.elements['tipo_consulta']
const precoInput = form.elements['preco']
const descontoInput = form.elements['desconto']


let load = true

const isload = () => {
  if (load) {
    buttonSubmit.innerHTML = !load ? "..." : "Cadastrar"
    load = !load
  }
}


const limparCampos = () => {
  tipoConsultaId = 0
  tipo_consultaInput.value = ""
  precoInput.value = ""
  descontoInput.value = ""
}

async function handleCadastroEAtualizar(
  tipo_consulta,
  preco,
  desconto,
) {
  try {
    isload()
    const dentista = {
      nome: tipo_consulta,
      preco: Number(preco),
      desconto: Number(desconto),
    }
    if (tipoConsultaId && tipoConsultaId !== 0) {
      await fetch(`http://localhost:3333/tiposConsulta/${tipoConsultaId}`, {
        method: "PUT",
        body: JSON.stringify(dentista),
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      alert('Consulta editada com sucesso')
    } else {
      await fetch('http://localhost:3333/tiposConsulta', {
        method: "POST",
        body: JSON.stringify(dentista),
        headers: { "Content-Type": "application/json;charset=UTF-8" }
      })
      alert('Consulta cadastrada com sucesso')
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

    await fetch(`http://localhost:3333/tiposConsulta/${id}`, {
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

    const tipo_consulta = consultasStorage.find(tipoConsulta => tipoConsulta.id === id)

    const dentista = tipo_consulta

    tipoConsultaId = dentista.id
    tipo_consultaInput.value = dentista.tipo_consulta
    precoInput.value = dentista.preco
    descontoInput.value = dentista.desconto


  } catch (error) {
    alert('error: ' + error.mensagem)
  }
}

async function getDentistasByFiltro(filtro = '', page = 0) {
  let elements = ''
  const response = await fetch(`http://localhost:3333/tiposConsulta/todos?filtro=${filtro}&page=${page}&limit=${6}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const tipo_consulta = await response.json()
  totalConsultas = tipo_consulta.length

  if (response.status !== 200) {
    tBodyContainer.innerHTML = `
     <tr>
        <td colspan="5" class="mensagem-error">Ocorreu um erro interno.</td>
      <tr>
    `
    return
  }

  if (tipo_consulta.length === 0) {
    tBodyContainer.innerHTML = `
     <tr>
        <td colspan="5" class="mensagem-error">Nenhum serviço cadastrado.</td>
      <tr>
    `
    return
  }


  tipo_consulta?.forEach((tipoConsulta) => {
    elements += `
    <tr>
      <td>${tipoConsulta.tipo_consulta}</td>
      <td>${tipoConsulta.preco}</td>
      <td>${tipoConsulta.desconto}</td>

      <td>
        <button onclick="handleRemoverDentista(${tipoConsulta.id})">
          <ion-icon class="color-blue" name="trash-outline"></ion-icon>
        </button>
        <button onclick="handleBuscaDentistaPorIdExibeNaTela(${tipoConsulta.id})">
          <ion-icon class="color-red" name="create-outline"></ion-icon>
        </button>
      </td>
    </tr>
    `
  })

  tBodyContainer.innerHTML = elements
  consultasStorage = tipo_consulta
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
  const tipo_consulta = tipo_consultaInput.value
  const preco = Number(precoInput.value)
  const desconto = Number(descontoInput.value)

  console.log(typeof (preco))

  if (tipo_consulta === '') {
    alert('preencha o campo Serviço')
    return
  }
  if (!preco) {
    alert('preencha o campo preco com numero')
    return
  }

  if (!desconto) {
    alert('preencha o campo desconto com numero')
    return
  }

  await handleCadastroEAtualizar(
    tipo_consulta,
    preco,
    desconto
  )
}
)