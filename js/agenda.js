const cardWrapper = document.querySelector('.cardWrapper')
const modal = document.querySelector('.course-dialog')
const span = document.getElementsByClassName("close")[0];
let consultaStories
const buttonRemarcar = document.querySelector('#remarcar')
const selectRequest = document.querySelector('#request')
const selectService = document.querySelector('#service')
const form = document.querySelector("#myForm")
const inputData = form.elements['calendario']
function colorir(status) {
  switch (status) {
    case 'AGENDADA': return 'br-warning color-white';
    case 'FINALIZADA': return 'br-waiting color-white';
    case 'CANCELADA': return 'br-disable color-white';
  }
}
async function handleMarcarComoFinalizada(id) {
  try {
    const consulta = consultaStories.find((consulta) => consulta.id === id)

    if (["FINALIZADA", "CANCELADO"].includes(consulta.status)) {
      return
    }

    const response = await fetch(`http://localhost:3333/consulta/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ status: 'CANCELADA' })
    })

    if (response.status === 200) {
      alert('Cancelado a ')
      renderNaTelaASConsultas()
    }
  } catch (error) {
    alert('error: ' + error.mensagem)
  }
}

async function handleImprimirRecibo(consulta_id) {
  const consulta = consultaStories.find((consulta) => consulta.id === consulta_id)

  if (!consulta) {
    alert('Consulta não encontrada!')
  }

  if (['CANCELADA', 'FINALIZADA'].includes(consulta?.status)) {
    alert('Só se pode imprimir recibo de confirmação para consulta agendada!')
  }

  window.location.href = `http://localhost:3333/consulta/${consulta.id}/recibo`
}


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

async function renderNaTelaASConsultas() {
  const usuarioId = localStorage.getItem('id')
  const url = `/consulta/${usuarioId}/consultas?page=${0}&limit=${30}`
  const { data: consultas, status } = await handleConsumoAPI(url)

  if (status !== 200) {
    cardWrapper.innerHTML = `
      <div class="mensagem-error">
        Error na aplicação
      <div>
    `
  }

  if (consultas.length === 0) {
    cardWrapper.innerHTML = `
      <div class="mensagem-error">
        Não a nenhuma consulta
      <div>
    `
  } else {
    consultaStories = consultas
    let elements = ''

    consultas?.forEach((consulta) => {
      elements += `
          <div class="agendamento-item">
            <div class="barra ${colorir(consulta.status)}"></div>
            <div class="content">
              <div class="title">
                <span class="data">${consulta.data_consulta}</span>
                <h4>${consulta.tipo_consulta.tipo_consulta}</h4>
              </div>

              <a 
                target="_blank"
                class="btn-print"
                onClick="handleImprimirRecibo(${consulta.id})"
                >
                <ion-icon name="download-outline"></ion-icon>
              </a>

              <div class="infoWrapper">
                <span>
                  <ion-icon class="icon" name="person-outline"></ion-icon>
                  <p>${consulta.dentista.nome}</p>
                </span>
                <span>
                  <ion-icon class="icon" name="id-card-outline"></ion-icon>
                  <p>${consulta.dentista.especialidade}</p>
                </span>
                <span>
                  <ion-icon class="icon" name="pricetag-outline"></ion-icon>
                  <p>${consulta.tipo_consulta.preco}kz</p>
                </span>
                <span>
                  <ion-icon class="icon" name="time-outline"></ion-icon>
                  <p>${consulta.hora_consulta}</p>
                </span>
              </div>

              <div class="btn | btn-card">
                <button class="button-ghost" onclick="openModal(${consulta.id})" id="remarcar">Remarcar</button>
                <button class="button-ghost ${consulta.status !== 'CANCELADA' ? 'bg-error' : 'bg-disable'} color-white" onclick="handleMarcarComoFinalizada(${consulta.id})">cancela</button>
              </div>
            </div>
        </div>
     `

      return elements
    })

    cardWrapper.innerHTML = elements
  }
}


const returnOneConsult = async (id) => {

  try {

    const consult = await fetch(`http://localhost:3333/consulta/${id}`).then((response) => {
      return response.json()
    })
    console.log(consult)
    inputData.value = consult.data_consulta
    for (let i = 0; i < selectRequest.length; i++) {
      if (selectRequest.options[i].text == consult.tipo_consulta.tipo_consulta) {
        selectRequest.selectedIndex = i
      }
      if (selectService.options[i].text == consult.dentista.nome) {
        selectService.selectedIndex = i
        return
      }
    }

  } catch (error) {
    window.alert('falha ao se conectar com o servidor', error)
  }

}

const openModal = (id) => {
  modal.showModal()
  const oneConsult = returnOneConsult(id)
  returnAllConsult(id)
  returnAllDentista()
}
// const closeModal = () => {
//   modal.close()
// }

span.onclick = function () {
  modal.style.display = "none";
}


const returnAllConsult = async (id) => {
  let elements = ''
  const url = `/tiposConsulta/todos`
  const { data } = await handleConsumoAPI(url)
  data.forEach((consult) => {
    elements += `

    <option value=${consult.tipo_consulta}>${consult.tipo_consulta}</option>
     
     `
    return consult.id
  })
  selectRequest.innerHTML = elements
}

const returnAllDentista = async () => {
  let elements = ''
  const dentista = await fetch('http://localhost:3333/dentistas/todos').then(response => {
    return response.json()
  })
  dentista.forEach((data) => {
    elements += `
     <option value ="${data.nome}">${data.nome}</option>
    `
  })

  selectService.innerHTML = elements

}

renderNaTelaASConsultas()



