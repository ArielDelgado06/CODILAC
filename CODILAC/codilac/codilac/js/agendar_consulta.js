let dataEscolhido
let horaSelecionado
let consultasStorage

const urlParams = new URLSearchParams(window.location.search);
const nome = urlParams.get("nome")
const especialidade = urlParams.get("especialidade")
const dentistaId = localStorage.getItem('dentistaId')


const content = document.querySelector('.content')
const horarios_disponiveis = document.querySelector('.horarios_disponiveis')
const calendarioInput = document.querySelector("#calendario")
const buttonAgendar = document.querySelector("#button-agendamento");
const buttonHorarios = document.querySelectorAll(".buttonHorarios");


let load = true

async function bloquearRota() {

  const nomeText = document.querySelector('#nome-text')
  const especialidadeText = document.querySelector('#especialidade-text')

  if (!dentistaId) {
    window.location.href = './encontrarDentista.html'
  }

  nomeText.innerHTML = nome
  especialidadeText.innerHTML = especialidade

}

async function getPacienteById() {
  const usuarioId = localStorage.getItem('id')

  const response = await fetch(`http://localhost:3333/paciente/${usuarioId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const paciente = await response.json()
  return paciente.id
}

async function handleSelect(horasIndex) {
  let elements = ''

  horaSelecionado = consultasStorage.find((_, index) => index === horasIndex)

  consultasStorage?.forEach((horas, index) => {
    elements += `
      <input
        onclick="handleSelect(${index})"
        class=${horaSelecionado === horas ? "buttonHorarios-selecionado" : "buttonHorarios"} 
        type="button" 
        value="${horas}"
      >
    `
  })

  horarios_disponiveis.innerHTML = elements
}

async function getDentistasByFiltro(data = '') {
  if (data === '') {
    dataEscolhido = new Date().toISOString()
  } else {
    dataEscolhido = new Date(data).toISOString()
  }

  let elements = ''
  const response = await fetch(`http://localhost:3333/consulta/${dentistaId}/horas?data_escolhido=${dataEscolhido}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  if (response.status === 401) {
    const { mensagem } = await response.json()

    horarios_disponiveis.innerHTML = `<p class="mensagem-error">${mensagem}</p>`
    return
  }
  const horas = await response.json()
  totalConsultas = horas.length


  if (response.status !== 200) {
    alert(await response.json().mensagem)
    return
  }


  horas?.forEach((horas, index) => {
    elements += `
      <input
        onclick="handleSelect(${index})"
        class="buttonHorarios" 
        type="button" 
        value="${horas}"
      >
    `
  })

  horarios_disponiveis.innerHTML = elements
  consultasStorage = horas
}

bloquearRota()

getDentistasByFiltro()

calendarioInput.addEventListener('input', (e) => {
  getDentistasByFiltro(new Date(e.target.value))
})

buttonAgendar.addEventListener('click', async (e) => {
  if (!horaSelecionado) {
    alert('Selecione um horario disponivel')
    return
  }

  try {
    const dentistaId = localStorage.getItem('dentistaId')
    const tipo_consultaId = localStorage.getItem('tipo_consultaId')
    const usuarioId = localStorage.getItem('id')

    const consulta = {
      data_consulta: dataEscolhido,
      hora_consulta: horaSelecionado,
      tipo_consultaId: Number(tipo_consultaId),
      usuarioId: usuarioId,
      dentistaId: Number(dentistaId)
    }

    await fetch(`http://localhost:3333/consulta`, {
      method: "POST",
      body: JSON.stringify(consulta),
      headers: { "Content-Type": "application/json;charset=UTF-8" }
    })
    alert('Consulta editado com sucesso')
    window.location.href = "./agenda.html"
  } catch (error) {
    console.log(error)
    alert('Ocorreu um erro no servidor')
  }
})
