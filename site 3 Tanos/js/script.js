document.querySelector('.input-submit').onclick = Click;

function Click() {
    let a = document.querySelector('.input-text').value;
    console.log(a);
    document.querySelector('out').innerHTML = a;
}

let objXMLHttpRequest = new XMLHttpRequest();
objXMLHttpRequest.onreadystatechange = function () {
    if (objXMLHttpRequest.readyState === 4) {
        if (objXMLHttpRequest.status === 200) {
            alert(objXMLHttpRequest.responseText);
        } else {
            alert('Error Code: ' + objXMLHttpRequest.status);
            alert('Error Message: ' + objXMLHttpRequest.statusText);
        }
    }
}
objXMLHttpRequest.open('GET', 'request_ajax_data.php');
objXMLHttpRequest.send();

    $.ajax(
    'request_ajax_data.php',
    {
        success: function(data) {
        alert('AJAX call was successful!');
        alert('Data from the server' + data);
    },
        error: function() {
        alert('There was some error performing the AJAX call!');
    }
    }
    );