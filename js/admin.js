let dentistaId
let search = ''
let page = 0
let totalConsultas
let consultaStory

const tBodyContainer = document.querySelector("tbody")
const searchInput = document.querySelector('#search')
const totalPacientes = document.querySelector('#totalPacientes')
const pacientesAgendados = document.querySelector('#pacientesAgendados')
const agendaHoje = document.querySelector('#agendaHoje')
const balancodeConsultas = document.querySelector('#balancodeConsultas')

const buttonNext = document.querySelector("#button-proximo")
const buttonPrevious = document.querySelector("#button-anterior")

async function getDentistasByFiltro(filtro = '', page = 0) {
  let elements = ''
  const response = await fetch(`http://localhost:3333/consulta/consultas?filtro=${filtro}&page=${page}&limit=${6}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const consultas = await response.json()
  totalConsultas = consultas.length

  if (response.status !== 200) {
    tBodyContainer.innerHTML = `
     <tr>
        <td colspan="5" class="mensagem-error">Não a nenhuma consulta agenda</td>
      <tr>
    `
    return
  }

  if (consultas.length === 0) {
    tBodyContainer.innerHTML = `
      <tr>
        <td colspan="5" class="mensagem-error">Não a nenhuma consulta agenda</td>
      <tr>
    `
    return
  }

  consultas?.forEach((consulta) => {
    elements += `
      <tr class="colunas">
      <td>${consulta.paciente.nome}</td>
      <td>${consulta.hora_consulta}</td>
      <td>${consulta.data_consulta}</td>
      <td>${consulta.dentista.nome}</td>
      <td>
        <button class="bg-error">
          <ion-icon name="happy-outline"></ion-icon>
          ${consulta.status.toString().toLowerCase()}
        </button>
      </td>
    </tr>
    <tr>
    `
  })

  tBodyContainer.innerHTML = elements
}

async function getPacienteAll() {
  let elements = ''
  const response = await fetch(`http://localhost:3333/pacientes`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const consultas = await response.json()
  totalPacientes.innerHTML = consultas.length
}

async function getConsultas() {
  const response = await fetch(`http://localhost:3333/consulta/consultas?filtro=${new Date().toISOString()}&page=${0}&limit=${30}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const consultas = await response.json()
  agendaHoje.innerHTML = consultas.length
}

async function getBalancoDeHoje() {
  const response = await fetch(`http://localhost:3333/consulta/consultas?filtro=${new Date().toISOString()}&page=${0}&limit=${30}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const consultas = await response.json()

  if (consultas.length !== 0) {
    const consultasFeitasHoje = consultas.filter((consulta) => consulta.status === 'FINALIZADA')
    balancodeConsultas.innerHTML = consultasFeitasHoje.length
    return
  }

  balancodeConsultas.innerHTML = consultas.length
}

async function getConsultasPacientesAgendados() {
  const response = await fetch(`http://localhost:3333/consulta/consultas?filtro=${new Date().toISOString()}&page=${0}&limit=${30}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const consultas = await response.json()
  pacientesAgendados.innerHTML = consultas.length
}

getDentistasByFiltro()

getPacienteAll()

getConsultas()

getBalancoDeHoje()

getConsultasPacientesAgendados()

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
