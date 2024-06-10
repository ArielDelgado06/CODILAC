const cardWrapper = document.querySelector('.cardWrapper')

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
              <div class="btn">
                <button class="button-ghost" >Remarcar</button>
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

renderNaTelaASConsultas()