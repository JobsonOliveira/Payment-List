//MOSTRAR OS PAGAMENTOS REALIZADOS
atualizar();
async function atualizar(){
	const dados = await fetch('../PHP/mostrarPag.php');
	const retorno =  await dados.json();

	//MOSTRAR A MENSÁGEM QUANDO O DADO FOR ENCONTRADO
	if(retorno['status']){
	    for (let i = 0; i < retorno.dados.length; i++) {
            
        	document.querySelector("#listaPagamentos").innerHTML += `
				<tr class="pagamento">
					<td>${retorno.dados[i]["cliente"]}</td>
					<td>${retorno.dados[i]["vencimento_form"]}</td>
					<td>${retorno.dados[i]["pagamento_form"]}</td>
					<td class="valorPago">${retorno.dados[i]["valor"]}</td>
					<td>${retorno.dados[i]["forma"]}</td>
					<td>${retorno.dados[i]["funcionario"]}</td>
					<td class="opcoes">
						<img class="BTNeditar" onclick="editar('${retorno.dados[i]['cliente']}', '${retorno.dados[i]['vencimento_form']}')" src='../imagens/editar.png' alt="">
						<img src='../imagens/lixeira.png' alt="foto de lixeira para apagar pagamento" onclick="apagar('${retorno.dados[i]['id']}')">
					</td>
				</tr>
			`;
    	}
		//MOSTRAR O VALOR TOTAL RECEBIDO
		let valorRecebido = document.getElementsByClassName("valorPago");
		let valorTotal = 0;
		for(let i = 0; i < valorRecebido.length; i++){
			valorTotal += parseInt(valorRecebido[i].innerHTML);
		}
		document.querySelector("#valorRecebido").innerHTML = valorTotal;
	}
}

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

	//ZERARO SO VALORES DO POP-UP
	document.querySelector("#nomeCliente").value = "";
	document.querySelector("#vencimBoleto").value = "";
	document.querySelector("#pagameBoleto").value = "";
	document.querySelector("#valorPago").value = "";
	document.querySelector("#forma").value = "Pix";
	document.querySelector("#funcionario").value = "";

	//MUDAR OS INPUTS PARA DATE
	document.querySelector("#vencimBoleto").addEventListener("click", () =>{
		document.querySelector("#vencimBoleto").type = "date";

	});
	document.querySelector("#pagameBoleto").addEventListener("click", () =>{
		document.querySelector("#pagameBoleto").type = "date";

	});
});

//FECHAR O POP-UP
function FecharPopUp(){

	document.querySelector("#DialogOperacoes").close();
	document.querySelector("#DialogOperacoes").style.display = "none";

	//MUDA OS INPUTS NOVAMENTE PARA TEXT
	document.querySelector("#vencimBoleto").type = "text";
	document.querySelector("#pagameBoleto").type = "text";

};

//AÇÃO PARA ABRIR O POP-UP E EDITAR PAGAMENTO
function editar(nome, vencimento){
	listarSituacao();
	async function listarSituacao(){
    	const dados = await fetch('../PHP/coletor.php');
    	const retorno =  await dados.json();

    	//MOSTRAR A MENSÁGEM QUANDO O DADO FOR ENCONTRADO
    	if(retorno['status']){
    	    for (let i = 0; i < retorno.dados.length; i++) {

				if((retorno.dados[i]['cliente'] == nome) && (retorno.dados[i]['vencimento_form'] == vencimento)){
					
					document.querySelector("#DialogOperacoes").innerHTML = `
						<div id="formulario">
							<form action="../PHP/editarPag.php" method="POST">
								<div id="DivTitulo">
									<h1>Editar pagamento</h1>
								<img src="../imagens/ImgBtnFechar.png" id="btnFechar" onclick="FecharPopUp()" alt="Imagem de button para fechar aba de registro de pagamento">
								</div>
								<div id="DivInputs">
									<input type="hidden" name="idPag" value='${retorno.dados[i]['id']}'>
									<input type="text" id="nomeCliente" name="nomeCliente" placeholder="Cliente" value='${retorno.dados[i]['cliente']}'>
									<input type="date" id="vencimBoleto" name="vencimBoleto" placeholder="Vencimento" value='${retorno.dados[i]['vencimento']}'>
									<input type="date" id="pagameBoleto" name="pagameBoleto" placeholder="Pagamento" value='${retorno.dados[i]['pagamento']}'>
									<input type="number" id="valorPago" name="valorPago" placeholder="Valor" value='${retorno.dados[i]['valor']}'>
									<select name="forma" id="forma" value='Débito'>
										<option value="Pix">Pix</option>
										<option value="Espécie">Espécie</option>
										<option value="Débito">Débito</option>
										<option value="Crédito 1X">Crédito 1X</option>
										<option value="Crédito 2X">Crédito 2X</option>
										<option value="Crédito 3X">Crédito 3X</option>
									</select>
									<input type="text" id="funcionario" name="funcionario" placeholder="Funcionário que recolheu" value='${retorno.dados[i]['funcionario']}'>
								</div>
								<div id="DivBtnSalvar">
									<button type="submit" name="EditarPag">Editar</button>
								</div>
							</form>
						</div>
					`;
				}
    	    }
    	}else{
			alert("Consulta falhou!");
		}
}

	document.querySelector("#DialogOperacoes").style.display = "flex";
	document.querySelector("#DialogOperacoes").show();
}


//POP-UP DE CONFIRMAÇÃO PARA APAGAR O PAGAMENTO
function apagar(id){
	document.querySelector("#dialogConfirm").show();
	document.querySelector("#dialogConfirm").style.display = "flex";
	document.querySelector("#idPag").value = id;


	//FECHAR O POP-UP DE CONFIRMAÇÃO
	document.querySelector("#fechar").addEventListener("click", () =>{
		document.querySelector("#dialogConfirm").style.display = "none";
		document.querySelector("#dialogConfirm").close();
	});
}