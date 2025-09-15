function openDonate() {
    window.open("https://paypal.com/br/home", "", "width=400", "height=400")
}

function openWhatsapp() {
    window.open("https://wa.me/5518991264582");
}

function popUp(div_id, button_open, button_close) {
  const dialog = document.getElementById(div_id);
  const openBtn = document.getElementById(button_open);
  const closeBtn = document.getElementById(button_close);

    dialog.classList.add("open");
    dialog.showModal();
 

  closeBtn.addEventListener("click", () => {
    dialog.classList.remove("open");
    dialog.close();
  });
}

document.getElementById("openPop-history").addEventListener("click", () => {
    popUp("popup-history", "openPop-history", "closePop-history");
});

document.getElementById("openPop-feira").addEventListener("click", () => {
    popUp("popup-history", "openPop-history", "closePop-history");
});