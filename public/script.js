const closeMessage = document.querySelector("#close-message");
const message = document.querySelector(".message")

// ao clicar no botao fecha notificacao
closeMessage.addEventListener("click", () => {
    message.style.display = "none"
})

// desaparece notificacao de confirmacao de acao apos 5 segundos
setTimeout(() => {
    message.style.display = "none"
}, 5000);