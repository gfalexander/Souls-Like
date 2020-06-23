let login_usuario;
let nome_usuario;

function redirecionar_login() {
    window.location.href = 'login.html';
}

function redirecionar_login2() {
    window.location.href = '../login.html';
}

function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    nome_usuario = sessionStorage.nome_usuario_meuapp;

    if (login_usuario == undefined) {
        // redirecionar_login();
    } else {
        usr_nome.innerHTML = nome_usuario;
        usuario.style.display = 'none';
        usr_online.style.display = 'block';
        no_log_contact.style.display = 'none';
        validar_sessao();
    }

}

function logoff() {
    finalizar_sessao();
    sessionStorage.clear();
    if(window.location.href == "http://localhost:3000/Demon%20Souls/demonsPage.html"){
        redirecionar_login2();    
    }else{
        redirecionar_login();
    }
    usuario.style.display = 'block';
    usr_online.style.display = 'none';
    no_log_contact.style.display = 'block';
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
                logoff();
            }
        });
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, { cache: 'no-store' });
}

function fn_menu_usuario() {
    let teste = menu_user.style.display == "block" ? "none" : "block";
    let borda = menu_user.style.display == "block" ? "1px solid #262626" : "1px solid #a1261b";

    menu_user.style.display = teste;
    user_box.style.border = borda;

}