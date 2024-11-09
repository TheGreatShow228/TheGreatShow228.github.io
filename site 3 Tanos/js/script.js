$(document).ready(function() {
    $('#submit-button').on('click', function() {
        let article = $('#message').val().trim();

        if (article !== '') {
            $.ajax({
                url: 'ajax-script.php',
                method: 'POST',
                data: { article: article },
                success: function(response) {
                    $('#messageResponse').html(response);
                },
                error: function() {
                    $('#messageResponse').html('<p>Ошибка запроса. Попробуйте снова.</p>');
                }
            });
        } else {
            $('#messageResponse').html('<p>Пожалуйста, введите артикул.</p>');
        }
    });
});
