let list = document.querySelectorAll('.navigation li');
const toggle = document.querySelector('.toggle');
const navigation = document.querySelector('.navigation');
const main = document.querySelector('.main');


function activeLink () {
  list.forEach( item => {
    item.classList.remove("hovered");
  })
  this.classList.add("hovered");
}

list.forEach(item  => item.addEventListener("mouseover",activeLink));

toggle.onclick = () =>{
  navigation.classList.toggle("active");
  main.classList.toggle("active");
}

// cards de marcação de consulta
const button_one = document.querySelector("#button-one");
const main_conteiner = document.querySelector(".main");

const event_button = () =>{
  const box = document.createElement('div');
  box.classList.add('box');

  const titleContent = document.createElement('h2');
  titleContent.innerText = 'Especialista';

  const box_especialista = document.createElement('div');
  box_especialista.classList.add("boxEspecialista");

  const box_img = document.createElement('img');
  const subTitleContent = document.createElement('h3');
  subTitleContent.innerText = "Dr. António Gaspar";

  box.appendChild(titleContent);
  box.appendChild(box_especialista);

  box_especialista.appendChild(box_img);
  box_especialista.appendChild(subTitleContent);
  main_conteiner.appendChild(box);
}

button_one.addEventListener("click", () => event_button());