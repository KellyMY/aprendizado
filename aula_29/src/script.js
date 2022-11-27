function ProcuraCEP(cep){
    let url = 'https://viacep.com.br/ws/'+cep+'/json';
    
    fetch(`${url}`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json; charset=UTF-8'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.erro){
            document.getElementById("mensagem").innerHTML = 'Digite um CEP válido.';
            document.getElementById("mensagem").style.background = "red";
            document.getElementById("cep").style.borderColor = "red";

            document.getElementById("bairro").value = '';
            document.getElementById("cepcomtraco").value = '';
            document.getElementById("complemento").value = '';
            document.getElementById("ddd").value = '';
            document.getElementById("gia").value = '';
            document.getElementById("ibge").value = '';
            document.getElementById("localidade").value = '';
            document.getElementById("logradouro").value = '';
            document.getElementById("siafi").value = '';
            document.getElementById("uf").value = '';
        }else{
        
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cepcomtraco").value = data.cep;
            document.getElementById("complemento").value = data.complemento;
            document.getElementById("ddd").value = data.ddd;
            document.getElementById("gia").value = data.gia;
            document.getElementById("ibge").value = data.ibge;
            document.getElementById("localidade").value = data.localidade;
            document.getElementById("logradouro").value = data.logradouro;
            document.getElementById("siafi").value = data.siafi;
            document.getElementById("uf").value = data.uf;
        }
    })
}

function CEPValido(cep){console.log(cep)
    let part = /^[0-9]{8}/;
    if(!part.test(cep)){
        return 'Digite um CEP válido';
    }else{
        return '';
    }
}

let cep = document.getElementById("cep");
let email = document.getElementById("email");

cep.addEventListener('focusout' , e => {
    let valor = e.currentTarget.value;

    let cepValido = CEPValido(valor);

    if(cepValido == ''){
        ProcuraCEP(valor);
        
        e.currentTarget.style.borderColor = "";
        document.getElementById("mensagem").innerHTML = '';
        document.getElementById("mensagem").style.background = "";
    }else{
        document.getElementById("mensagem").innerHTML = cepValido;
        document.getElementById("mensagem").style.background = "red";
        e.currentTarget.style.borderColor = "red";
    }
});

const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

email.addEventListener('focusout', e => {
    let valor = e.currentTarget.value;

    let validaCEP = validateEmail(valor);

    if(validaCEP != null){
        e.currentTarget.style.borderColor = "";
        document.getElementById("mensagem").innerHTML = '';
        document.getElementById("mensagem").style.background = "";
    }else{
        document.getElementById("mensagem").innerHTML = "Digite e-mail válido.";
        document.getElementById("mensagem").style.background = "red";
        e.currentTarget.style.borderColor = "red";
    }
});