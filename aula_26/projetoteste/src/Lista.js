// import logo from './logo.svg';
// import './App.css';

const Listagem = {
  filtro: function(){
    return 'teste';
  }
}
const lista = [
    {
      nome : 'Cataratas do Iguaçu',
      estado : 'Paraná',
      custo_por_pessoa: 250.00,
      custo_medio_passeio: 100.00 

    },
    {
      nome : 'Rota das Emoções',
      estado : 'Maranhão',
      custo_por_pessoa: 300.00,
      custo_medio_passeio: 80.00 
    },
    {
      nome : 'Costa do Descobrimento',
      estado : 'Bahia',
      custo_por_pessoa: 7000.00,
      custo_medio_passeio: 1800.00 
    },
    {
      nome : 'Bonito',
      estado : 'Mato Grosso do Sul',
      custo_por_pessoa: 450.00,
      custo_medio_passeio: 250.00 
    },
    {
      nome : 'Paraty',
      estado : 'Rio de Janeiro',
      custo_por_pessoa: 350.00,
      custo_medio_passeio: 180.00
    },
    {
      nome : 'Jalapão',
      estado : 'Tocantins',
      custo_por_pessoa: 3000.00,
      custo_medio_passeio: 980.00 
    },
    {
      nome : 'Praia da Pipa',
      estado : 'Rio Grande do Norte',
      custo_por_pessoa: 630.00,
      custo_medio_passeio: 260.00 
    },
    {
      nome : 'Campos do Jordão e a Serra da Mantiqueira',
      estado : 'São Paulo',
      custo_por_pessoa: 740.00,
      custo_medio_passeio: 90.00 
    },
    {
      nome : 'Monte Verde',
      estado : 'Minas Gerais',
      custo_por_pessoa: 580.00,
      custo_medio_passeio: 70.00 
    }
  ]

function Lista() {
  let listagem = '';
  let filtro = [];
  let virgula = '';
  let custo = 0;
  let lista_com_foreach = '';

  let custo_total = 0;

  lista.filter((item) =>{
    if(item.custo_medio_passeio <= 100.00){
      filtro += virgula+item.nome;
      virgula = ',';
    }

  })
  
  lista.map((item) => {
    listagem += virgula+item.nome+' (R$'+item.custo_por_pessoa+')';
    virgula = ', ';
  });

  lista.reduce((vazio, item) => {
    custo_total += item.custo_por_pessoa;

    if(item.custo_por_pessoa <= 1000.00){
      custo +=  item.custo_por_pessoa;
    }

  })

  lista.forEach((item) => {
    if(item.estado == 'Minas Gerais'){
      lista_com_foreach += 'Nome do lugar: '+item.nome+' custo medio de passeio: '+item.custo_medio_passeio
    }
  })

  // return 'Economia de: '+(custo_total - custo);
  // return listagem;
  // return filtro;
  return lista_com_foreach;
}

export default Lista;
