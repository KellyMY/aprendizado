let calcularMedia = ( notas ) => {

    let soma = 0;
    for( c = 0; c < notas.length; c++) {
        soma += notas[c];
    }

    media = soma / notas.length;

    return media;

}


let media; // escopo global

let aprovacao = ( notas ) =>{

    let media = calcularMedia( notas ); // escopo da função

    let condicao = media >= 8 ? "aprovado" : "reprovado";

    return 'Média: ' + media + ' - Resultado: ' + condicao;

}


// Função Recursivas

let contagemRegressiva = (numero) => {

    console.log(numero);  
    
    let proximoNumero = numero - 1;

    if(proximoNumero > 0)
        contagemRegressiva(proximoNumero);

}

// contagemRegressiva(50);

/* 
 * Formulário envio de dados para cálculo da média 
 */
const formulario1 = document.getElementById('formulario-01');

if(formulario1)
    formulario1.addEventListener('submit', function( evento ){

        evento.preventDefault();
        evento.stopPropagation();

    let camposNumericos = document.querySelectorAll('input.numero');
    
    for( let emFoco of camposNumericos) {
        validaCampoNumerico(emFoco);
    }
        
        if(document.getElementById("formulario-01").className == 'erro'){
            if( this.getAttribute('class').match(/erro/) ) {
                document.getElementById("formulario-01").style.background = "#facccc"
                return false;
            }
        }
        
    document.getElementById("formulario-01").style.background = "#81c784"
    
    document.getElementById("mensagem-01").innerHTML = "Enviado com sucesso!!"

        let dados = new FormData(this);

        let notas = [];

        for(let key of dados.keys()) {

            let numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)) : 0; // é um número

            if(!isNaN(numero)) {
                notas.push(numero);
            }

        }

        console.log(notas);

        texto = aprovacao(notas)

        document.getElementById('resultado').innerHTML = texto;

    });


let validaCampo = (elemento)=>{
        if(elemento.value == ""){
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em vermelho";
            elemento.classList.add('erro');
            elemento.parentNode.classList.add('erro');
            return false;
        } else {
            document.querySelector('.mensagem').innerHTML = "";
            elemento.classList.remove('erro');
            elemento.parentNode.classList.remove('erro');
        }

    elemento.addEventListener('focusout', function(event) {

        event.preventDefault();
        
        if(elemento.value == ""){
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em vermelho";
            elemento.classList.add('erro');
            elemento.parentNode.classList.add('erro');
            return false;
        } else {
            document.querySelector('.mensagem').innerHTML = "";
            elemento.classList.remove('erro');
            elemento.parentNode.classList.remove('erro');
        }

    });

}

let validaCampoNumerico = (elemento) => {

        let numero = elemento.value.match(/^[\d]5-[\d]3/) ? elemento.value.replace(/-/, "") : elemento.value; 

        if(numero != "" && numero.match(/[0-9]*/) && numero >= 0 && numero <= 10){
            document.querySelector('.mensagem').innerHTML = "";
            elemento.classList.remove('erro');
            elemento.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
            elemento.classList.add('erro');
            elemento.parentNode.classList.add('erro');
            return false;
        }

    elemento.addEventListener('focusout', function(event) {

        event.preventDefault();

        let numero = elemento.value.match(/^[\d]5-[\d]3/) ? elemento.value.replace(/-/, "") : elemento.value; 

        if(numero != "" && numero.match(/[0-9]*/) && numero >= 0 && numero <= 10){
            document.querySelector('.mensagem').innerHTML = "";
            elemento.classList.remove('erro');
            elemento.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
            elemento.classList.add('erro');
            elemento.parentNode.classList.add('erro');
            return false;
        }

    });

}


let validaEmail = (elemento) =>{

        const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
        if(elemento.value.match(emailValido)) {
            document.querySelector('.mensagem').innerHTML = "";
            elemento.classList.remove('erro');
            elemento.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
            elemento.classList.add('erro');
            elemento.parentNode.classList.add('erro');
            return false;
        }

    elemento.addEventListener('focusout', function(event) {

        event.preventDefault();

        const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
        if(elemento.value.match(emailValido)) {
            document.querySelector('.mensagem').innerHTML = "";
            elemento.classList.remove('erro');
            elemento.parentNode.classList.remove('erro');
        } else {
            document.querySelector('.mensagem').innerHTML = "verifique o preenchimento dos campos em destaque";
            elemento.classList.add('erro');
            elemento.parentNode.classList.add('erro');
            return false;
        }

    });

}

document.getElementById("formulario-02").addEventListener("submit", function(event){
    event.preventDefault();
    
    let camposObrigatorios = document.querySelectorAll('input.obrigatorio');
    // let camposNumericos = document.querySelectorAll('input.numero');
    let camposEmail = document.querySelectorAll('input.email');

    for( let emFoco of camposObrigatorios) {
        validaCampo(emFoco);
    }
    
    // for( let emFoco of camposNumericos) {
    //     validaCampoNumerico(emFoco);
    // }
    
    for( let emFoco of camposEmail) {
        validaEmail(emFoco);
    }
    console.log(document.getElementById("formulario-02").className)
if(document.getElementById("formulario-02").className == "erro"){
    if(document.getElementById("formulario-02").getAttribute('class').match(/erro/) ){
        document.getElementById("formulario-02").style.background = "#facccc"
        return false;
    }
}
if(document.getElementById("formulario-02").className == ''){
    document.getElementById("mensagem-02").innerHTML = "Enviado com sucesso!!"
    document.getElementById("formulario-02").style.background = "#81c784"
    return false
}

})
