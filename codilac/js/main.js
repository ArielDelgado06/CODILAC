const wrapper = document.querySelector(".wrapper");
const carrossel = document.querySelector(".carrossel");
const botao = document.querySelectorAll (".wrapper i");
const firstCardWidth = carrossel.querySelector(".card").offsetWidth;
const carrosselChildrens = [... carrossel.children]

// const t = document.querySelector('h2');

let isDragging = false, timeoutId;

const autoPlay = () =>{
  if(window.innerWidth < 800) return;
  timeoutId = setTimeout(() => carrossel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

let cardPerdView = Math.round(carrossel.offsetWidth / firstCardWidth)

carrosselChildrens.slice(-cardPerdView).reverse().forEach(card =>{
  carrossel.insertAdjacentHTML("afterbegin", card.outerHTML)
} )

carrosselChildrens.slice(0,cardPerdView).forEach(card =>{
  carrossel.insertAdjacentHTML("beforeend", card.outerHTML)
} )

botao.forEach(btn => {
  btn.addEventListener("click", () => {
    carrossel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth
  } )
});

const dragStart = () => {
  isDragging = true;
  carrossel.classList.add("dragging")
}

const dragging = (e) => {
  if(!isDragging) return;
  console.log(e.pageX);
  carrossel.scrollLeft = e.pageX;
}

const infiniteScroll = () => {
  if(carrossel.scrollLeft === 0){
    carrossel.classList.add("no-transitio")
    carrossel.scrollLeft = carrossel.scrollWidth - (2 * carrossel.offsetWidth);
    carrossel.classList.remove("no-transitio")
  } else if(Math.ceil(carrossel.scrollLeft) === carrossel.scrollWidth - carrossel.offsetWidth){
    carrossel.classList.add("no-transitio")
    carrossel.scrollLeft = carrossel.offsetWidth;
    carrossel.classList.remove("no-transitio")
  }

  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();

}

carrossel.addEventListener("mousedown",dragStart);
carrossel.addEventListener("mousemove",dragging);
carrossel.addEventListener("scroll",infiniteScroll);
wrapper.addEventListener("mouseenter",() => clearTimeout(timeoutId) );
wrapper.addEventListener("mouseleave",autoPlay);

// t.style.color="red";