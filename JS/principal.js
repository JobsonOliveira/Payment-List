document.querySelector("#listaPagamentos").innerHTML = `
	<tr class='pagamento' id='teste'>
		<td>Jobson</td>
		<td>15/12/2023</td>
		<td>10/12/2023</td>
		<td class='valorPago'>55</td>
		<td>Pix</td>
		<td>Qualquer</td>
		<td class='opcoes'>
			<button>ed</button>
			<button>ex</button>
		</td>
	</tr>

    <tr class='pagamento'>
		<td>Maria</td>
		<td>15/12/2023</td>
		<td>10/12/2023</td>
		<td class='valorPago'>100</td>
		<td>Pix</td>
		<td>Qualquer</td>
		<td class='opcoes'>
			<button>ed</button>
			<button>ex</button>
		</td>
	</tr>
`;
		
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