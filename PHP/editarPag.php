<?php 
//GUIA: ESTE ARQUIVO TEM A FUNÇÃO DE EFETUAR A EDIÇÃO DE UM PAGAMENTO QUE ESTÁ NO BANCO DE DADOS, ELE APAGA O PAGAMENTO QUE ESTAVA NO BANCO E ADICIONA O PAGAMENTO EDITADO

include('conexao.php');

//REPORTAR ERRO DE CONEXÃO
if(!$conn){

    die("Conexão falhou." . mysqli_connect_error());

}

//CAPTURAR OS DADOS DIGITADOS PELO USUÁRIO
if (isset($_POST["EditarPag"])) {

    $Nome = ucwords(strtolower($_POST["nomeCliente"]));
    $Vencimento = $_POST["vencimBoleto"];
    $Pagamento = $_POST["pagameBoleto"];
    $Valor = $_POST["valorPago"];
    $Forma = $_POST["forma"];
    $Funcionario = ucwords(strtolower($_POST["funcionario"]));
    $Id = $_POST["idPag"];

}
    
//CONSULTA PARA O BANCO
$query_sits = "SELECT id FROM pagamentos";
     
/*REALIZAR A CONEXÃO COM O BANCO, PEGAR ID*/
$result = $conn->query($query_sits);
    
    if (($result) and ($result->num_rows != 0) ) {
        while ($row = $result->fetch_assoc()) {
     
            extract($row);
            $dados[] = [
                'id' => $id,
            ];
        }
        //APAGAR O PAGAMENTO NO BANCO PARA QUE POSSA SER SALVO JÁ EDITADO
        for ($i = 0; $i < count($dados); $i++) {
            if($dados[$i]['id'] == $Id){
                
                $query_sits2 = "DELETE FROM pagamentos WHERE `pagamentos`.`id` = $Id";  

                //REALIZAR A CONEXÃO COM O BANCO ENVIANDO A CONSULTA
                $result2 = $conn->query($query_sits2);

                if ($result2) {

                    //-----------------------------------------------------ADICIONAR O PAGAMENTO EDITADO NO SISTEMA
             
                    $query_sits = "INSERT INTO pagamentos(cliente, vencimento, pagamento, valor, forma, funcionario)  VALUES('$Nome', '$Vencimento', '$Pagamento', '$Valor', '$Forma', '$Funcionario')";  
        
                    //REALIZAR A CONEXÃO COM O BANCO ENVIANDO A CONSULTA
                    $result = $conn->query($query_sits);
                    
                    if ($result) {
                        //MOSTRAR NA TELA SE O PAGAMENTO FOI EDITADO
                        echo '<script> alert("Pagamento editado!"); const win = window.open("../HTML/principal.html","_self"); </script>';
                    }
                }
            }
        }
    }
    //FECHA A CONEXÃO
    $conn->close();
    ?>