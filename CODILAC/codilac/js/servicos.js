let tipoConsultaId
let search = ''
let page = 0
let totalConsultas

const form = document.querySelector("#formCadastro");
const tBodyContainer = document.querySelector("tbody")
const searchInput = document.querySelector('#search')
const buttonSubmit = document.querySelector("#cadastrarDentistas");
const buttonNext = document.querySelector("#button-proximo")
const buttonPrevious = document.querySelector("#button-anterior")

async function enviar(id) {
  localStorage.setItem('tipo_consultaId', id)
  window.location.href = './encontrarDentista.html'
}

async function getDentistasByFiltro(filtro = '', page = 0) {
  let elements = ''
  const response = await fetch(`http://localhost:3333/tiposConsulta/todos?filtro=${filtro}&page=${page}&limit=${6}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const tipo_consulta = await response.json()
  totalConsultas = tipo_consulta.length

  console.log(tipo_consulta)
  if (response.status !== 200) {
    return
  }


  tipo_consulta?.forEach((tipoConsulta) => {
    elements += `
    <tr>
      <td>${tipoConsulta.tipo_consulta}</td>
      <td>${tipoConsulta.preco}</td>
      <td>${tipoConsulta.desconto}</td>
      <td>
        <button id="button-one" onclick="enviar(${tipoConsulta.id})" class="btnAgendar">
        Prosseguir
        </button>
      </td>
    </tr>
    `
  })

  tBodyContainer.innerHTML = elements
  consultasStorage = tipo_consulta
}

getDentistasByFiltro()

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

searchInput.addEventListener('input', event => {
  search = event.target.value
  getDentistasByFiltro(search)
})