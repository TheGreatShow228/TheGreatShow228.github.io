<?php
if (isset($_POST['article'])) {
    $article = htmlspecialchars($_POST['article']);

    if (!empty($article)) {
        $products = [
            ['article' => '12345', 'name' => 'Товар 1', 'price' => '1000 руб.'],
            ['article' => '67890', 'name' => 'Товар 2', 'price' => '1500 руб.'],
            ['article' => '54321', 'name' => 'Товар 3', 'price' => '2000 руб.'],
        ];

        $found = false;
        foreach ($products as $product) {
            if ($product['article'] === $article) {

                echo '<table>';
                echo '<tr><th>Артикул</th><th>Название товара</th><th>Цена</th></tr>';
                echo '<tr><td>' . htmlspecialchars($product['article']) . '</td>';
                echo '<td>' . htmlspecialchars($product['name']) . '</td>';
                echo '<td>' . htmlspecialchars($product['price']) . '</td></tr>';
                echo '</table>';
                $found = true;
                break;
            }
        }

        if (!$found) {
            echo '<p>Товар с артикулом <strong>' . htmlspecialchars($article) . '</strong> не найден.</p>';
        }
    } else {
        echo '<p>Ошибка: Артикул не может быть пустым.</p>';
    }
}
?>
