<?php

$servidor = "localhost";
$banco = "estoque";
$usuario = "root";
$senha = "root";

$operacao = "";
$sql = "";

$operacao = "INSERIR";


$con = mysqli_connect($servidor,$usuario,$senha,$banco);
// $con->set_charset("utf8");

if (mysqli_connect_errno()){
    echo "Falha na criação da conexão com o banco de dados: " .mysqli_connect_errno();
} else {
    echo "Conexão efetuada com sucesso! <br><br>";
}

if($operacao == "INSERIR") {

    $dataCriacao = date('Y-m-d H:i:s');

    $sql = "INSERT INTO produtos (nome, preco, descricao, data_criacao)
        VALUES ('Pao', 3.50, 'Pão feito manualmente', ''$dataCriacao')";

    if(!mysqli_query($con, $sql)){
        echo "Ocorreu um erro: " .mysqli_error($con). "<br>";
    } else {
        echo "Inserção efetuada com sucesso!";
    }

    mysqli_close($con);
}