// Constante responsável por armazenar a lista de campos de cep
const ul = document.querySelector('ul');

// Variavel que define o HTML a ser criado
var htmlCEP = '<label for="cepClient"><b>CEP</b></label><input type="text" class="cepClient" required placeholder="00.000-000"><p class="removeCEP"><b>X</b></p>';

// Adiciona um evento ao botão de adicionar CEP
document.querySelector('.addCEP').addEventListener('click', () => addFieldCEP());

// Função que insere o html na lista não ordenada
function addFieldCEP() {
    var limit = document.querySelectorAll('.cepClient');
    if (limit.length >= 5) {
        alert('Só é possivel consultar 5 (cinco) CEPs ao mesmo tempo')
    } else {
        ul.appendChild(document.createElement('li')).innerHTML = htmlCEP;

        var i = document.querySelectorAll('.removeCEP')
        for (const item of i) {
            item.addEventListener('click', () => removeFieldCEP(item));
        }
    }
}

// Remove o campo de CEP
function removeFieldCEP(e) {
    e.parentNode.remove();
}

// Adiciona o evento ao botão de consulta
var consultBtn = document.querySelector('.sendForm');
consultBtn.addEventListener('click', () => {

    // Remove os CEPs que já estão aparecendo no site para inserir os novos
    var removeItens = document.querySelectorAll('.dataCEP');
    for(const item of removeItens){
        item.remove();
    }

    // Captura o CEP inserido pelo cliente
    const cep = document.querySelectorAll('.cepClient');
    for(const item of cep) {
        if (item.value == "") {
            return alert("Preencha todos os campos apenas com números!")
        }
    }

    for(const item of cep) {
        // Cria um elemento javascript.
        var script = document.createElement('script');

        // Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ item.value + '/json/?callback=returnResult';

        // Insere script no documento e carrega o conteúdo.
        document.querySelector('body').appendChild(script).remove();
    }
})

function returnResult(results) {
    var field = document.querySelector('.results');

    // Cria a tag <p> e insere uma classe na mesma
    var p = document.createElement('p');
    p.setAttribute('class', 'dataCEP');
    
    // Adiciona a tag com os dados do CEP inserido pelo usuario
    field.appendChild(p).innerHTML = 
        '<b>CEP:</b>' + results.cep + 
        '<br><b>Logradouro:</b>' + results.logradouro + " - " + results.complemento +
        '<br><b>Bairro:</b>' + results.bairro + 
        '<br><b>Localidade:</b>' + results.localidade + " - " + results.uf +'<br>';
}
