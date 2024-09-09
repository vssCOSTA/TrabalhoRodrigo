const usuarioCorreto = "adm";
const senhaCorreta = "adm";

function verificarLogin() {
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const errorMessage = document.getElementById('error-message');

    if (usuario === usuarioCorreto && senha === senhaCorreta) {

        window.location.href = "tela-principal.html";
    } else {
        errorMessage.style.display = 'block';
    }
}