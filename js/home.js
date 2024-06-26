const agendamentoWrapper = document.querySelector('.agendamentoItems')
const especialistaWrapper = document.querySelector('.especialistaWrapper')
const titulo = document.querySelector('#pacienteName')
const botaoVerMais = document.querySelector('#botao-ver-mais')

let consultaStories

function colorir(status) {
  switch (status) {
    case 'AGENDADA': return 'br-warning color-white';
    case 'FINALIZADA': return 'br-waiting color-white';
    case 'CANCELADA': return 'br-error color-white';
  }
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

async function getDate(data) {
  return new Intl.DateTimeFormat(['ban', 'id']).format(data)
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

async function renderNaTelaASConsultas() {
  const usuarioId = localStorage.getItem('id')
  const url = `/consulta/${usuarioId}/consultas?page=${0}&limit=${4}`
  const { data: consultas, status } = await handleConsumoAPI(url)

  if (status !== 200) {
    agendamentoWrapper.innerHTML = `
      <div class="mensagem-error">
        Error na aplicação
      <div>
    `
  }

  if (consultas.length === 0) {
    agendamentoWrapper.innerHTML = `
      <div class="mensagem-error">
        Não a nenhuma consulta
      <div>
    `
  } else {
    let elements = ''
    consultaStories = consultas
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
          class="btn-print"
          target="_blank"
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

        ${consulta.status !== 'CANCELADA' ?
          '<button class="button-ghost | btn-remarcar">Remarcar</button>'
          : ''
        }
      </div>
      </div>    
     `

      return elements
    })

    agendamentoWrapper.innerHTML = elements
  }
}

async function renderNaTelaOsDentistas() {
  const url = `/dentistas/todos?page=${0}&limit=${4}`
  const { data: dentistas, status } = await handleConsumoAPI(url)
  let elements = ''

  if (dentistas.lenght === 0) {
    especialistaWrapper.innerHTML = `
      <div class="mensagem-error">
        Sem nenhum dentista
      <div>
    `
  } else {
    dentistas?.forEach(dentista => {
      elements += `
        <div class="especialistaItem">
          <img src="../../img/dentista-1.jpg" alt="Rosa Maria">
          <div class="header">
            <strong>${dentista.nome}</strong>
            <span>${dentista.especialidade}</span>
          </div>
          <div class="footer">
            <span class="icon"><ion-icon name="people-outline"></ion-icon></span>
            <span>4.5</span>
          </div>
        </div> 
       `
    }, 0)
    especialistaWrapper.innerHTML = elements
  }
}

async function renderNomesNaTelaPaciente() {
  const usuarioId = localStorage.getItem('id')
  const url = `/paciente/${usuarioId}`
  const { data: paciente } = await handleConsumoAPI(url)

  console.log(paciente)
  const nome = paciente.nome
  const sobreNome = paciente.sobreNome

  titulo.innerText = `Olá ${nome.charAt(0).toUpperCase() + nome.slice(1)} ${sobreNome.charAt(0).toUpperCase() + sobreNome.slice(1)}`
}


botaoVerMais.addEventListener('click', () => {
  window.location.href = './agenda.html'
})

renderNomesNaTelaPaciente()
renderNaTelaOsDentistas()
renderNaTelaASConsultas()






