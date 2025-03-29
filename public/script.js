// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    const message = document.querySelector(".message");
    const closeMessage = document.querySelector("#close-message");

    // Só executa se a mensagem existir
    if (message && closeMessage) {
        // Fecha ao clicar no botão
        closeMessage.addEventListener("click", () => {
            message.style.display = "none";
        });

        // Fecha automaticamente após 5 segundos
        setTimeout(() => {
            message.style.display = "none";
        }, 5000);
    }
});