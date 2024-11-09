<?php
$valid_username = 'admin';
$valid_password = 'admin';

$username = $_POST['username'];
$password = $_POST['password'];

if (empty($username) || empty($password)) {
    echo json_encode(['success' => '0', 'message' => 'Пожалуйста, заполните все поля']);
    exit;
}

if ($username == $valid_username && $password == $valid_password) {
    echo json_encode(['success' => '1', 'redirect' => 'index.html']);
} else {
    echo json_encode(['success' => '0', 'message' => 'Неверный логин или пароль']);
}
?>