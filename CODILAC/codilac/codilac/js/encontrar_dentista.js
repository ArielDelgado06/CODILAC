const containerDentista = document.querySelector('.main_content_dentista');
const voltar = document.querySelector('#retornar');
const all = document.querySelector('.all')
const searchInput = document.querySelector('#search-input')
const getdatas = document.querySelector('.content_dentista');
let especialistas = []

function bloqueador() {
  if (!localStorage.getItem('tipo_consultaId')) {
    window.location.href = './servicos.html'
  }
}

function handleMoveParaOutraPagina(dentistaId) {
  const { id, nome, especialidade } = especialistas.find((especialista) => especialista.id === dentistaId)
  localStorage.setItem('dentistaId', id)

  window.location.href = `../dashboard/agendar_consulta.html?nome=${nome}&especialidade=${especialidade}`;
}

async function getAllDentistas(filtro = '') {
  let elements = ''
  const response = await fetch(`http://localhost:3333/dentistas?filtro=${filtro}&page=${0}&limit=${30}`, {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" }
  })


  especialistas = await response.json();


  especialistas.map((especialista) => {
    elements += `
      <div class="content_dentista" onclick="handleMoveParaOutraPagina(${especialista.id})">
            <img src="../../img/dentista-1.jpg"/>
            <div class="div_text">
            <h3>${especialista.nome}</h3>
            <p>${especialista.especialidade}</p>
            </div>
          </div>
    `;
  })

  containerDentista.innerHTML = elements
}

bloqueador()

getAllDentistas();

searchInput.addEventListener('input', (event) => {
  getAllDentistas(event.target.value);
})

voltar.addEventListener('click', () => {
  window.location.href = "../dashboard/servicos.html";
})