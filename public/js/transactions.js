const myModal = new bootstrap.Modal("#transactions-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

let data = {
    transactions:[]
};

//Evento click do botão Sair
document.getElementById("button-logout").addEventListener("click", logout);

//Adicionar Lançamento.
document.getElementById("transactions-form").addEventListener("submit", function (e) {
    e.preventDefault();//Evento para um reloud na pagina.

    //Variaveis dos valores dos Inputs.
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    //Unshift = ele adiciona itens em cima e o push adiciona no final
    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset(); //Para limpar o formulário 
    myModal.hide();//Para fechar o Modal

    getTransactions();

    alert("Lançamento adicionado com sucesso.");

});

//Chamada da função para ver se o usuário ta logando.
checkLogged();

//Função para ver se o usuário ta logando.
function checkLogged(){
    if(session){
        sessionStorage.setItem("logged", session);//Para permanecer logado.
        logged = session;
    }
    //se não tiver logado envia o usuário para a tela de login(login-html)
    if(!logged) {
       window.location.href = "index.html";
       return;
    }

    const dataUser = localStorage.getItem(logged);
    if(dataUser){
        data = JSON.parse(dataUser);
    }

    getTransactions();

}

//Função do logout(sair)
function logout(){
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getTransactions(){
    const transactions = data.transactions;
    let transactionsHtml = ``;

    //Verificação para percorrer a lista e mostrar o tipe de transação é
    if(transactions.length) {
        transactions.forEach((item) => {
            let type = "Enterada";

            if(item. type === "2") {
                type = "Saida";
            }

            //Tem a função de joga todos os dados adicinado na tela, html tirado la da tela transactions.html
            transactionsHtml += `
            <tr>
                <th scope="row">${item.date}</th> 
                <td>${item.value.toFixed(2)}</td>
                <td>${type}</td>
                <td>${item.description}</td>
            </tr>
            `;
        });
    }

    document.getElementById("transactions-list").innerHTML = transactionsHtml;
}

function saveData(data){
    localStorage.setItem(data.login, JSON.stringify(data));
}
