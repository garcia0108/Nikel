const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();

//Logar no sistema.
document.getElementById("login-form").addEventListener("submit", function(e){
    e.preventDefault();
    //Variáveis
    const email = document.getElementById("email-input").value;
    const passoword = document.getElementById("passoword-input").value;
    const checkSession = document.getElementById("session-check").checked;

    const account = getAccount(email);

    //Verificação de E-mail se existe ou não.
    if(!account){
        alert("Ops verifeque o usuário ou a senha.");
        return;
    }

    //Verificação de senha se exixte ou não.
    if(account){
        if(account.passoword !== passoword) {
            alert("Ops verifeque o usuário ou a senha.");
            return;
        }

        saveSession(email, checkSession);

        //Comando para enviar o usuário para tela de Home caso ele tiver conta já. 
        window.location.href = "home.html";
    }

    
})

//criar conta.
document.getElementById("create-form").addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.getElementById("email-create-input").value;
    const passoword = document.getElementById("passaword-create-input").value;

    //Verificação do tamanho minímo e se é um e-mail válido
   if(email.length < 5 ){
      alert("preencha o campo com um e-mail válido.");
      return;
   }

   //verificação da senha com tamanho minímo.
   if(passoword.length < 4 ){
       alert("Preencha a senha com no miníno 4 digitos.");
       return;
   }

   saveAccount({
     login: email,
     passoword: passoword,
     transactions: []
   });

   //Para asim que o usuário tenha se cadastrado o Modal se feche.
   myModal.hide("");

   alert("Conta criada com sucesso.");
});

function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(logged) {
        saveSession(logged, session);

        window.location.href = "home.html";
    }
}

//Função para salvar os dados no Banco de Dados local do Sistema 
function saveAccount(date){
    localStorage.setItem(date.login, JSON.stringify(date));//Mudar o objeto para uma string
}

//Função para pernanecer o usuário logado em uma sessão.
function saveSession(date, saveSession) {
    if(saveSession){
        localStorage.setItem("session", date);//Usuário fica salvo mesmo fechando o navegador.
    }

    sessionStorage.setItem (logged, date); //Slavar na sessão(Quando fechar o navegador ele se apaga

}

//Função para achar uma conta no Banco de Dados local do Sistema.
function getAccount(key){
    const account = localStorage.getItem(key);

    if(account) {
        return JSON.parse(account);//Volta a string para um objeto
    }
    //Se não tiver conta 
    return "";
}
