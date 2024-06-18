let search = ''
let page = 0
let consultaStories
let totalConsultas

const tBodyContainer = document.querySelector('tbody')
const searchInput = document.querySelector('#search')
const buttonNext = document.querySelector("#button-proximo")
const buttonPrevious = document.querySelector("#button-anterior")

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

modal.style.display = "none";

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

async function handleMarcarComoFinalizada(id) {
  try {
    const consulta = consultaStories.find((consulta) => consulta.id === id)

    if (consulta.status === "FINALIZADA") {
      modal.style.display = "block";
      return
    }


    const response = await fetch(`http://localhost:3333/consulta/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ status: 'FINALIZADA' })
    })

    if (response.status === 200) {
      alert('Deletado com sucesso')
      getConsultaByFiltro(search, page)
    }
  } catch (error) {
    alert('error: ' + error.mensagem)
  }
}


function colorir(status) {
  switch (status) {
    case 'AGUARDADA': return 'bg-warning color-white';
    case 'FINALIZADA': return 'bg-waiting color-white';
    case 'CANCELADA': return 'bg-error color-white';
  }
}

function handleImprimirRelatorio(id) {
  if (!id) {
    return
  }

  window.location.href = `http://localhost:3333/consulta/${id}/relatorio`
}

async function getConsultaByFiltro(filtro = '', page = 0) {
  let elements = ''
  const response = await fetch(`http://localhost:3333/consulta/consultas?filtro=${filtro}&page=${page}&limit=${6}`, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })

  const consultas = await response.json()

  if (response.status !== 200) {
    return
  }

  console.log('dfada')
  totalConsultas = consultas.length
  consultaStories = consultas

  consultas?.forEach((consulta) => {
    elements += `
      <tr class="colunas">
      <td>${consulta.paciente.nome} ${consulta.paciente.sobreNome}</td>
      <td>${consulta.data_consulta}</td>
      <td>${consulta.hora_consulta}</td>
      <td>${consulta.dentista.nome}</td>
      <td>${consulta.tipo_consulta.tipo_consulta}</td>
      <td class="buttons-action">
        <button 
          class="button-status ${colorir(consulta.status)}" 
          onclick="handleMarcarComoFinalizada(${consulta.id})"
        >
          <ion-icon name="happy-outline"></ion-icon>
          <span>${consulta.status.toLowerCase()}</span>
        </button>
        <a
          target="_blank" 
          onclick="handleImprimirRelatorio(${consulta.id})" 
          class="button-print ${consulta.status === 'AGUARDADA' ? 'bg-disable' : 'bg-waiting color-white'}">
          <ion-icon name="print-outline"></ion-icon>
          <span>pdf</span>
        </a>
      </td>
    </tr>
    <tr>
    `
  })


  tBodyContainer.innerHTML = elements
}

getConsultaByFiltro()

searchInput.addEventListener('input', event => {
  search = event.target.value
  getConsultaByFiltro(search)
})

buttonPrevious.addEventListener('click', event => {
  if (page <= 0) {
    return
  }
  page -= 6
  getConsultaByFiltro(search, page)
})

buttonNext.addEventListener('click', event => {
  if (totalConsultas < page) {
    return
  }
  page += 6
  getConsultaByFiltro(search, page)
})

