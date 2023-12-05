//ESTE ARQUIVO É RESPONSÁVEL POR REALIZAR A GUARDA DO SITE, NÃO DEIXAR QUE ENTREM NA PÁGINA PRINCIPAL SEM TER FEITO LOGIN ANTES

verificar();
async function verificar(){
	const dados = await fetch('../PHP/vigia.php');
	const retorno =  await dados.json();

	//MOSTRAR A MENSÁGEM QUANDO O DADO FOR ENCONTRADO
	if(retorno['status']){
	    for (let i = 0; i < retorno.dados.length; i++) {
            if(retorno.dados[i]["logado"] == 'false'){
                document.querySelector("body").innerHTML = "Página privada!! Faça login para entrar!!";
            }
        }
    }
}