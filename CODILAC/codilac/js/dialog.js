document.querySelector("#service-dialog")

const btn_dialog = document.querySelector("button");
const modal = document.querySelector(".dialog");
const close = document.querySelector("#close-service");
const btnClose = document.querySelector('.btnClose');

const handleDialog = () => {
  modal.showModal()
}

const closeDialog = () => {
  modal.close()
}

btn_dialog.addEventListener('click', handleDialog);
close.addEventListener('click',closeDialog);
btnClose.addEventListener('click',closeDialog);