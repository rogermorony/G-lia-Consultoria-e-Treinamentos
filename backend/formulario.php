<?php
ob_start();
header('Content-Type: application/json; charset=utf-8');
ob_clean();

function limpar($v) {
    return htmlspecialchars(strip_tags(trim($v)));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'erros' => ['geral' => 'Requisicao invalida.']]);
    exit;
}

$firstName = limpar($_POST['firstName'] ?? '');
$lastName  = limpar($_POST['lastName']  ?? '');
$company   = limpar($_POST['company']   ?? '');
$email     = limpar($_POST['email']     ?? '');
$phone     = limpar($_POST['phone']     ?? '');
$message   = limpar($_POST['message']   ?? '');

$erros = [];

// NOME
if ($firstName === '') {
    $erros['firstName'] = 'O campo Nome e obrigatorio.';
} elseif (preg_match('/[0-9]/', $firstName)) {
    $erros['firstName'] = 'Nome nao pode conter numeros.';
} elseif (preg_match('/[^a-zA-Z\xc0-\xff\s\-]/', $firstName)) {
    $erros['firstName'] = 'Nome deve conter apenas letras.';
} elseif (mb_strlen($firstName) < 2) {
    $erros['firstName'] = 'Nome muito curto.';
}

// SOBRENOME
if ($lastName === '') {
    $erros['lastName'] = 'O campo Sobrenome e obrigatorio.';
} elseif (preg_match('/[0-9]/', $lastName)) {
    $erros['lastName'] = 'Sobrenome nao pode conter numeros.';
} elseif (preg_match('/[^a-zA-Z\xc0-\xff\s\-]/', $lastName)) {
    $erros['lastName'] = 'Sobrenome deve conter apenas letras.';
} elseif (mb_strlen($lastName) < 2) {
    $erros['lastName'] = 'Sobrenome muito curto.';
}

// EMPRESA
if ($company === '') {
    $erros['company'] = 'O campo Empresa e obrigatorio.';
} elseif (mb_strlen($company) < 2) {
    $erros['company'] = 'Nome da empresa muito curto.';
}

// EMAIL
if ($email === '') {
    $erros['email'] = 'O campo E-mail e obrigatorio.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $erros['email'] = 'Insira um e-mail valido (ex: nome@empresa.com.br).';
}

// TELEFONE (opcional, mas se preenchido valida)
if ($phone !== '') {
    $phoneDigitos = preg_replace('/[^0-9]/', '', $phone);
    if (strlen($phoneDigitos) !== 11) {
        $erros['phone'] = 'Telefone invalido. Use o formato (00) 00000-0000.';
    }
}

// MENSAGEM
if ($message === '') {
    $erros['message'] = 'O campo de mensagem e obrigatorio.';
} elseif (mb_strlen($message) < 10) {
    $erros['message'] = 'A mensagem deve ter pelo menos 10 caracteres.';
}

if (!empty($erros)) {
    echo json_encode(['sucesso' => false, 'erros' => $erros]);
    exit;
}

// ENVIA E-MAIL
$destinatario = 'contato@galiaonline.net';
$assunto      = 'Novo contato pelo site - ' . $firstName . ' ' . $lastName;
$corpo        = "Nova mensagem pelo site da Galia Consultoria.\n\n";
$corpo       .= "Nome:     $firstName $lastName\n";
$corpo       .= "Empresa:  $company\n";
$corpo       .= "E-mail:   $email\n";
$corpo       .= "Telefone: " . ($phone ?: 'Nao informado') . "\n\n";
$corpo       .= "Mensagem:\n$message\n";
$headers      = "From: site@galiaonline.net\r\nReply-To: $email\r\nContent-Type: text/plain; charset=UTF-8\r\n";

@mail($destinatario, $assunto, $corpo, $headers); // @ suprime warnings no XAMPP local

echo json_encode(['sucesso' => true]);
exit;