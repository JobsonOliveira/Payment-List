		
//MOSTRAR O VALOR TOTAL RECEBIDO
let valorRecebido = document.getElementsByClassName("valorPago");
let valorTotal = 0;
for(let i = 0; i < valorRecebido.length; i++){
	valorTotal += parseInt(valorRecebido[i].innerHTML);
}
document.querySelector("#valorRecebido").innerHTML = valorTotal;
		
//FILTRAR OS DADOS PESQUISADOS E ATUALIZAR O VALOR TOTAL RECEBIDO
function filtro(){
    let input = document.querySelector("#filtroDePagamentos").value;
    input = input.toLowerCase();
    let classPagamentos = document.getElementsByClassName("pagamento");

	for (let i = 0; i < classPagamentos.length; i++) {
		for (let it = 0; it < valorRecebido.length; it++) {
    				
  			if (!classPagamentos[i].innerHTML.toLowerCase().includes(input)) {
            
      			classPagamentos[i].style.display = "none";
      			valorRecebido[i].style.display = "none";
            				
  			}else{

      			classPagamentos[i].style.removeProperty('display');
      			valorRecebido[i].style.removeProperty('display');
  			}
  		}
	}	
    			
	valorTotal = 0;		
	for(let it = 0; it < valorRecebido.length; it++){
					
		if(valorRecebido[it].style.display != "none"){
			valorTotal += parseInt(valorRecebido[it].innerHTML);
		}
	}
	document.querySelector("#valorRecebido").innerHTML = valorTotal;
}

//AÇÃO PARA ABRIR O POP-UP E ADICIONAR NOVO PAGAMENTO
document.querySelector("#BTNAddPag").addEventListener("click", ()=>{

	document.querySelector("#DivTitulo h1").innerHTML = "Registrar pagamento";
	document.querySelector("#DialogOperacoes").style.display = "flex";
	document.querySelector("#DialogOperacoes").show();
});

//FECHAR O POP-UP
function FecharPopUp(){

	document.querySelector("#DialogOperacoes").close();
	document.querySelector("#DialogOperacoes").style.display = "none";
};

//AÇÃO PARA ABRIR O POP-UP E EDITAR PAGAMENTO
function editar(nome, vencimento){
	document.querySelector("#DivTitulo h1").innerHTML = "Editar pagamento";

	listarSituacao();
	async function listarSituacao(){
    	const dados = await fetch('../PHP/coletor.php');
    	const retorno =  await dados.json();

    	//MOSTRAR A MENSÁGEM QUANDO O DADO FOR ENCONTRADO
    	if(retorno['status']){
    	    for (let i = 0; i < retorno.dados.length; i++) {

				if((retorno.dados[i]['cliente'] == nome) && (retorno.dados[i]['vencimento_form'] == vencimento)){

					document.querySelector("#nomeCliente").value = retorno.dados[i]['cliente'];
					document.querySelector("#vencimBoleto").value = retorno.dados[i]['vencimento'];
					document.querySelector("#pagameBoleto").value = retorno.dados[i]['pagamento'];
					document.querySelector("#valorPago").value = retorno.dados[i]['valor'];
					document.querySelector("#forma").value = retorno.dados[i]['forma'];
					document.querySelector("#funcionario").value = retorno.dados[i]['funcionario'];
				}
    	    }
    	}else{
			alert("Consulta falhou!");
		}
}

	document.querySelector("#DialogOperacoes").style.display = "flex";
	document.querySelector("#DialogOperacoes").show();
}
