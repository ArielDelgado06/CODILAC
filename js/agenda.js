const cardWrapper = document.querySelector('.cardWrapper')
const modal = document.querySelector('.course-dialog')
const span = document.getElementsByClassName("close")[0];
let consultaStories
const modalButton = document.querySelector('.modalButton')
const buttonRemarcar = document.querySelector('#remarcar')
const selectRequest = document.querySelector('#employee')
const selectService = document.querySelector('#service')
const selectHour = document.querySelector("#hour")
const form = document.querySelector("#myForm")
const inputData = form.elements['date']
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

    console.log(consult.hora_consulta)
    inputData.value = consult.data_consulta
    for (let i = 0; i < selectRequest.length; i++) {
      if (selectRequest.options.item(i).text == consult.tipo_consulta.tipo_consulta) {
        selectRequest.selectedIndex = i
        
      }
      if (selectService.options.item(i).text == consult.dentista.nome) {
        selectService.selectedIndex = i
       
      }
      
    }
   window.localStorage.setItem('dentistaId', consult.dentista.id)
   return console.log(consult)

  } catch (error) {
    console.log('falha ao se conectar com o servidor', error)
  }

}
const returnHorario = async()=>{
  const dentista_id = window.localStorage.getItem('dentistaId')
  const data = inputData.value
  let elementsHour = ''
 
  inputData.addEventListener('change',async()=>{
    const horario = await fetch(`http://localhost:3333/consulta/${dentista_id}/horas?data_escolhido=${data}`

    ).then((response)=> response.json())

var nume = 0
horario.forEach((hora)=>{
  elementsHour +=`
  <option value ="${hora}">${hora}</option>
 `
 nume ++
})
selectHour.innerHTML = elementsHour
})

console.log('select:',selectHour)


 

 
}

const openModal = (id) => {
  modal.showModal()
  returnOneConsult(id)
  returnAllConsult(id)
  returnAllDentista()
  returnHorario()
 
}
// const closeModal = () => {
//   modal.close()
// }

span.onclick = function () {
  modal.style.display = "none";
}


selectService.addEventListener('change',async(e)=>{
  returnHorario()
})

const returnAllConsult = async (id) => {
  let elements = ''

  const url = `/tiposConsulta/todos`
  const { data } = await handleConsumoAPI(url)
  
  data.forEach((consult) => {
    elements += `

    <option value=${consult.tipo_consulta}>${consult.tipo_consulta}</option>
     
     `
  })
  
  selectRequest.innerHTML = elements
 
  
}

const handleUpdateConsulta = async()=>{
  const id = window.localStorage.getItem('dentistaId')
  const idConsult = window.localStorage.getItem('id_consult')
  const idTipo = window.localStorage.getItem('tipo_consultaId')
   try{
    const newConsulta = {
      data_consulta:inputData.value,
      hora_consulta:selectHour.value,
      dentistaId:id,
      tipo_consultaId:idTipo,
    }
    await fetch(`http://localhost:3333/actualizar/consulta${idConsult}`,{
      method:'PUT',
      body:JSON.stringify(newConsulta),
      headers:{'Content-Type':'application/json'}
    })
    window.alert('consulta reagendada com sucesso!')
    window.localStorage.removeItem('dentistaId')
   }catch(err){
    window.alert('consulta não foi reagendada!')
   }
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
const handleRemarcar = ()=>{
  
}
form.addEventListener('submit',async(e)=>{
  e.preventDefault()
  handleUpdateConsulta()
})
renderNaTelaASConsultas()



