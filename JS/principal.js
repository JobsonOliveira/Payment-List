//ESTE É O ARQUIVO JAVASCRIPT PRINCIPAL DO PROJETO

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
					<td class="vencimentos">${retorno.dados[i]["vencimento_form"]}</td>
					<td class="pagamentos">${retorno.dados[i]["pagamento_form"]}</td>
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

		document.querySelector("#btnValTotal").addEventListener("click", () =>{
			//MOSTRAR O VALOR TOTAL RECEBIDO
			let valorRecebido = document.getElementsByClassName("valorPago");
			let valorTotal = 0.0;
			var og = Math.pow(10, 2);
			
			for(let i = 0; i < valorRecebido.length; i++){
				valorTotal += parseFloat(valorRecebido[i].innerHTML);
			}
			document.querySelector("#valorRecebido").innerHTML = "R$" + Math.trunc(valorTotal * og) / og;
		});
	}
}

//MOSTRAR O VALOR TOTAL RECEBIDO
let valorRecebido = document.getElementsByClassName("valorPago");
let valorTotal = 0.0;
var og = Math.pow(10, 2);

for(let i = 0; i < valorRecebido.length; i++){
	valorTotal += parseFloat(valorRecebido[i].innerHTML);
}
document.querySelector("#valorRecebido").innerHTML = "R$" + Math.trunc(valorTotal * og) / og;
		
//FILTRAR OS DADOS PESQUISADOS E ATUALIZAR O VALOR TOTAL RECEBIDO
function filtro(){

	//INPUT DO FILTRO
    let input = document.querySelector("#filtroDePagamentos").value;
    input = input.toLowerCase();

	//CLASSES A SEREM CONSULTADAS
	//data de vencimento
	let classVencimentos = document.getElementsByClassName("vencimentos");
	//data de pagamento
	let classDataPagamentos = document.getElementsByClassName("pagamentos");
	//todos os dados dos pagamento
    let classPagamentos = document.getElementsByClassName("pagamento");

	//CHECKBOX DE FILTRO
	let checkVencimento = document.querySelector("#checkVencimento");
	let checkPagamento = document.querySelector("#checkPagamento");

	//FILTRAR POR DATA DE VENCIMENTO DO BOLETO
	if(checkVencimento.checked){
		for (let i = 0; i < classPagamentos.length; i++) {
			for (let it = 0; it < valorRecebido.length; it++) {
				for (let ivenc = 0; ivenc < classVencimentos.length; ivenc++) {		

				  	if (!classVencimentos[i].innerHTML.toLowerCase().includes(input)) {
				
						classPagamentos[i].style.display = "none";
					  	valorRecebido[i].style.display = "none";
								
				  	}else{
	
						classPagamentos[i].style.removeProperty('display');
					  	valorRecebido[i].style.removeProperty('display');
				  	}
				}
			}
		}	
		
		document.querySelector("#btnValTotal").addEventListener("click", () =>{
			valorTotal = 0.0;
			var og = Math.pow(10, 2);
			
			for(let it = 0; it < valorRecebido.length; it++){
				if(valorRecebido[it].style.display != "none"){
					valorTotal += parseFloat(valorRecebido[it].innerHTML);
				}
			}
			document.querySelector("#valorRecebido").innerHTML = "R$" + Math.trunc(valorTotal * og) / og;
		});
		
	}
	//FILTRAR POR DATA DE PAGAMENTO
	if(checkPagamento.checked){
		//todos os dados do pagamento
		for (let i = 0; i < classPagamentos.length; i++) {
			//valor recebido
			for (let it = 0; it < valorRecebido.length; it++) {
				//data de pagamento
				for (let ivenc = 0; ivenc < classDataPagamentos.length; ivenc++) {		

				  	if (!classDataPagamentos[i].innerHTML.toLowerCase().includes(input)) {
				
						classPagamentos[i].style.display = "none";
					  	valorRecebido[i].style.display = "none";
								
				  	}else{
	
						classPagamentos[i].style.removeProperty('display');
					  	valorRecebido[i].style.removeProperty('display');
				  	}
				}
			}
		}	
		
		document.querySelector("#btnValTotal").addEventListener("click", () =>{
			valorTotal = 0.0;	
			var og = Math.pow(10, 2);
			
			for(let it = 0; it < valorRecebido.length; it++){
						
				if(valorRecebido[it].style.display != "none"){
					valorTotal += parseFloat(valorRecebido[it].innerHTML);
				}
			}
			document.querySelector("#valorRecebido").innerHTML = "R$" + Math.trunc(valorTotal * og) / og;
		});
	}
	//FILTRO GERAL (TODOS OS ATRIBUTOS DO PAGAMENTO)
	if((checkVencimento.checked == false) && (checkPagamento.checked == false)){
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
				
		document.querySelector("#btnValTotal").addEventListener("click", () =>{
			valorTotal = 0.0;	
			var og = Math.pow(10, 2);
			
			for(let it = 0; it < valorRecebido.length; it++){
						
				if(valorRecebido[it].style.display != "none"){
					valorTotal += parseFloat(valorRecebido[it].innerHTML);
				}
			}
			document.querySelector("#valorRecebido").innerHTML = "R$" + Math.trunc(valorTotal * og) / og;
		});
	}
}

//AÇÃO PARA ABRIR O POP-UP E ADICIONAR NOVO PAGAMENTO
document.querySelector("#BTNAddPag").addEventListener("click", ()=>{

	document.querySelector("#DivTitulo h1").innerHTML = "Registrar pagamento";
	document.querySelector("#DialogOperacoes").style.display = "flex";
	document.querySelector("#DialogOperacoes").show();

	//ZERAR OS VALORES DO POP-UP
	document.querySelector("#nomeCliente").value = "";
	document.querySelector("#vencimBoleto").value = "";
	document.querySelector("#pagameBoleto").value = "";
	document.querySelector("#valorPago").value = "";
	document.querySelector("#forma").value = "Pix";
	document.querySelector("#funcionario").value = "";

	//COMO O INPUT DE FUNCIONÁRIO ESTARÁ AO ABRIR O POP-UP
	document.querySelector("#funcionario").value = "Alcides";
	document.querySelector("#funcionario").setAttribute("disabled", "disabled");

	//MUDAR OS INPUTS PARA DATE
	document.querySelector("#vencimBoleto").addEventListener("click", () =>{
		document.querySelector("#vencimBoleto").type = "date";
	});
	document.querySelector("#vencimBoleto").onkeypress = (event) => {
		document.querySelector("#vencimBoleto").type = "date";
	}

	document.querySelector("#pagameBoleto").addEventListener("click", () =>{
		document.querySelector("#pagameBoleto").type = "date";
	});
	document.querySelector("#pagameBoleto").onkeypress = (event) => {
		document.querySelector("#pagameBoleto").type = "date";
	}
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
									<input type="number" step="0.01" id="valorPago" name="valorPago" placeholder="Valor" value='${retorno.dados[i]['valor']}'>
									<select name="forma" id="forma" value='${retorno.dados[i]['forma']}'>
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
					document.querySelector("#forma").value = `${retorno.dados[i]['forma']}`;
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

document.querySelector("#imgSair").addEventListener("click", () => {
	document.querySelector("body").innerHTML = `
		<dialog id='dialogSaindo'>
			<div id='comprimento'>
				<h3>Volte sempre!</h3>
			</div>
		</dialog>
	`;
	document.querySelector("#dialogSaindo").show();

	setTimeout( () => {
		window.open("../PHP/logout.php","_self");
	}, 1000);
});
document.querySelector("#forma").addEventListener("click", ()=>{
	 
 
    // vamos obter a opção selecionada
    var selecionada = document.querySelector("#forma").options[document.querySelector("#forma").options.selectedIndex];	
	
	if(selecionada.value == "Pix"){
		document.querySelector("#funcionario").setAttribute("disabled", "disabled");
		document.querySelector("#funcionario").value = "Alcides";
	}else{
		document.querySelector("#funcionario").value = "";
		document.querySelector("#funcionario").removeAttribute("disabled");
	}
});

//BUTTON PARA ABRIR O ESTOQUE
document.querySelector("#btnEstoque").addEventListener("click", () =>{
	document.querySelector("#dialogEstoque").style.display = "flex";
	document.querySelector("#tablePagamentos tr").style.opacity = ".5";
});

//FECHAR O ESTOQUE
document.querySelector("#fecharEstoque").addEventListener("click", () =>{
	document.querySelector("#dialogEstoque").style.removeProperty('display');
	document.querySelector("#tablePagamentos tr").style.opacity = "1";

});