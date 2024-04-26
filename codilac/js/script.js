// script do calendário
// const current_date = document.querySelector('.current_date');
// const dias = document.querySelector('.dias');
// const icons = document.querySelectorAll('.icons span');

// let date = new Date(),
// currYear = date.getFullYear(),
// currMoth = date.getMonth();

// const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

// const renderizarCalendario = () => {
//   let primeiroDiaDoMes = new Date(currYear, currMoth, 1).getDate();
//   ultimoDiaDoMes = new Date(currYear, currMoth + 1, 0).getDate();
//   ultimoMes = new Date(currYear, currMoth, ultimoDiaDoMes).getDate();
//   ultimaDataDoMes = new Date(currYear, currMoth, 0).getDate();
//   let litag = "";

//   for(let day = primeiroDiaDoMes; day > 0; day--){ 
//     litag += `<li class="inativo">${ultimaDataDoMes - day + 1}</li>`;
//   }

//   for(let day = 1; day <= ultimoDiaDoMes; day++){
//     let hoje = day === date.getDate() && currMoth === new Date().getMonth()
//     && currYear === new Date().getFullYear() ? "activo" : "";
//     litag += `<li class="${hoje}">${day}</li>`;
//   }

//   for(let day = ultimoMes; day < 6 ; day++){ 
//     litag += `<li class="inativo">${day - ultimoMes + 1}</li>`;
// }

//   current_date.innerHTML = `${meses[currMoth]}  ${currYear}`;
//   dias.innerHTML = litag;
// }
// renderizarCalendario();

// icons.forEach( icon => {
//   icon.addEventListener("click",() =>{
//     currMoth = icon.id === "prev" ? currMoth - 1 : currMoth + 1;
//     if(currMoth < 0 || currMoth > 11 ){
//       date = new Date(currYear, currMoth);
//       currYear = date.getFullYear();
//       currMoth = date.getMonth();
//     } else{
//       date = new Date();
//     }
//     renderizarCalendario();
//   });
// });

//

const link = document.getElementById('link-sair')

function logout() {
  localStorage.removeItem('id')
  window.location.replace('login.html')
}




// ------------------

let list = document.querySelectorAll('.navigation li');
const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const main = document.querySelector('.main');



function activeLink() {
  list.forEach(item => {
    item.classList.remove("hovered");
  })
  this.classList.add("hovered");
}

list.forEach(item => item.addEventListener("mouseover", activeLink));

toggle.onclick = () => {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
}

// cards de marcação de consulta
const button_one = document.querySelector("#button-one");
const main_conteiner = document.querySelector(".main");

const event_button = () => {
  const box_container_consult = document.createElement('div');
  box_container_consult.classList.add('box_container_consult');

  const container_especialista = document.createElement('div');
  container_especialista.classList.add("container_especialista");

  const titleContent = document.createElement('h2');
  titleContent.innerText = 'Especialista';

  const box_especialista = document.createElement('div');
  box_especialista.classList.add("boxEspecialista");

  const box_img = document.createElement('img');
  const src_img = document.createAttribute('src');
  src_img.value = "../img/enfermeira.png";
  box_img.setAttributeNode(src_img);

  const subTitleContent = document.createElement('h3');
  const textH3 = document.createTextNode("Dra. Antónia Gaspar");
  subTitleContent.appendChild(textH3);

  const content_box = document.createElement('div');
  content_box.classList.add("content_box");
  const content_box_h2 = document.createElement('h2');
  content_box_h2.innerText = "Selecione uma data"

  const date = document.createElement('div');
  date.classList.add('date');
  const cabecalho = document.createElement('header');
  const cabecalho_current_date = document.createElement('p');
  cabecalho_current_date.classList.add('current_date');
  const cabecalho_icons = document.createElement('div');
  cabecalho_icons.classList.add('icons');
  const prev = document.createElement('span');
  prev.classList.add('icon');
  const prev_id = document.createAttribute('id');
  prev_id.value = "prev";
  prev.setAttributeNode(prev_id);
  const icon_left = document.createElement('ion-icon');
  const icon_left_name = document.createAttribute('name');
  icon_left_name.value = "chevron-back-outline";
  icon_left.setAttributeNode(icon_left_name);
  const next = document.createElement('span');
  next.classList.add('icon');
  const next_id = document.createAttribute('id');
  next_id.value = "next";
  next.setAttributeNode(next_id);
  const icon_right = document.createElement('ion-icon');
  const icon_right_name = document.createAttribute('name');
  icon_right_name.value = "chevron-forward-outline";
  icon_right.setAttributeNode(icon_right_name);

  const calendario = document.createElement('div');
  calendario.classList.add('calendario');
  const semanas = document.createElement('ul');
  semanas.classList.add('semanas');
  const list_Dom = document.createElement('li');
  list_Dom.innerText = "Dom";
  const list_Seg = document.createElement('li');
  list_Seg.innerText = "Seg";
  const list_Ter = document.createElement('li');
  list_Ter.innerText = "Ter";
  const list_Quart = document.createElement('li');
  list_Quart.innerText = "Quart";
  const list_Qui = document.createElement('li');
  list_Qui.innerText = "Qui";
  const list_Sex = document.createElement('li');
  list_Sex.innerText = "Sex";
  const list_Sab = document.createElement('li');
  list_Sab.innerText = "Sab";
  const calendario_dias = document.createElement('ul');
  calendario_dias.classList.add('dias');

  const content_box_h3 = document.createElement('h3');
  content_box_h3.innerText = "Horários disponíveis";

  const content_box_select = document.createElement('select');
  const content_box_select_name = document.createAttribute('name');
  content_box_select_name.value = "harario";
  content_box_select.setAttributeNode(content_box_select_name);
  const content_box_select_id = document.createAttribute('id');
  content_box_select_id.value = "harario";
  content_box_select.setAttributeNode(content_box_select_id);
  const op_first = document.createElement('option');
  op_first.innerText = "10:00";
  const op_first_value = document.createAttribute('value');
  op_first_value.value = "10:00";
  op_first.setAttributeNode(op_first_value);
  const op_second = document.createElement('option');
  op_second.innerText = "12:00";
  const op_second_value = document.createAttribute('value');
  op_second_value.value = "12:00";
  op_second.setAttributeNode(op_second_value);
  const submit_agendar = document.createElement('button');
  submit_agendar.classList.add('submit_agendar');
  submit_agendar.innerText = "Agendar";
  const submit_agendar_type = document.createAttribute('type');
  submit_agendar_type.value = "submit";
  submit_agendar.setAttributeNode(submit_agendar_type);


  content_box.appendChild(content_box_h2);
  content_box.appendChild(date);
  content_box.appendChild(content_box_h3);
  content_box.appendChild(content_box_select);
  content_box.appendChild(submit_agendar);

  date.appendChild(cabecalho);
  date.appendChild(calendario);

  cabecalho.appendChild(cabecalho_current_date);
  cabecalho.appendChild(cabecalho_icons);
  cabecalho_icons.appendChild(prev);
  cabecalho_icons.appendChild(next);
  prev.appendChild(icon_left);
  next.appendChild(icon_right);

  calendario.appendChild(semanas);
  calendario.appendChild(calendario_dias);

  semanas.appendChild(list_Dom);
  semanas.appendChild(list_Seg);
  semanas.appendChild(list_Ter);
  semanas.appendChild(list_Quart);
  semanas.appendChild(list_Qui);
  semanas.appendChild(list_Sex);
  semanas.appendChild(list_Sab);


  content_box_select.appendChild(op_first);
  content_box_select.appendChild(op_second);


  box_container_consult.appendChild(container_especialista);
  box_container_consult.appendChild(content_box);
  container_especialista.appendChild(titleContent);
  container_especialista.appendChild(box_especialista);

  box_especialista.appendChild(box_img);
  box_especialista.appendChild(subTitleContent);
  main_conteiner.appendChild(box_container_consult);

  // ------------------

  const current_date = document.querySelector('.current_date');
  const dias = document.querySelector('.dias');
  const icons = document.querySelectorAll('.icons span');

  let data = new Date(),
    currYear = data.getFullYear(),
    currMoth = data.getMonth();

  const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  const renderizarCalendario = () => {
    let primeiroDiaDoMes = new Date(currYear, currMoth, 1).getDate();
    ultimoDiaDoMes = new Date(currYear, currMoth + 1, 0).getDate();
    ultimoMes = new Date(currYear, currMoth, ultimoDiaDoMes).getDate();
    ultimaDataDoMes = new Date(currYear, currMoth, 0).getDate();
    let litag = "";

    for (let day = primeiroDiaDoMes; day > 0; day--) {
      litag += `<li class="inativo">${ultimaDataDoMes - day + 1}</li>`;
    }

    for (let day = 1; day <= ultimoDiaDoMes; day++) {
      let hoje = day === data.getDate() && currMoth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? "activo" : "";
      litag += `<li class="${hoje}">${day}</li>`;
    }

    for (let day = ultimoMes; day < 6; day++) {
      litag += `<li class="inativo">${day - ultimoMes + 1}</li>`;
    }

    current_date.innerText = `${meses[currMoth]}  ${currYear}`;
    dias.innerHTML = litag;
  }
  renderizarCalendario();

  icons.forEach(icon => {
    icon.addEventListener("click", () => {
      currMoth = icon.id === "prev" ? currMoth - 1 : currMoth + 1;
      if (currMoth < 0 || currMoth > 11) {
        data = new Date(currYear, currMoth);
        currYear = date.getFullYear();
        currMoth = date.getMonth();
      } else {
        data = new Date();
      }
      renderizarCalendario();
    });
  });
}

link.addEventListener('click', (event) => {
  event.preventDefault()
  logout()
})

button_one.addEventListener("click", () => event_button());

