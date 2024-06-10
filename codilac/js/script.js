

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

const buttonAgendar = document.querySelectorAll('.btnAgendar');

for (let i = 0; i < buttonAgendar.length; i++) {
  buttonAgendar[i].addEventListener('click', () => {
    window.location.href = "../dashboard/encontrarDentista.html";
  })
}

