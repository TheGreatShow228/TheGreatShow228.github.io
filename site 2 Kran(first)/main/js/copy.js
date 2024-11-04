const promoCodeElement = document.querySelector('.promotional_code-code');
const promoIconElement = document.querySelector('.promotion_icon img');
const copyMessage = document.getElementById('copyMessage');

promoIconElement.addEventListener('click', () => {

    const textarea = document.createElement('textarea');
    textarea.value = promoCodeElement.textContent;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy'); 
    document.body.removeChild(textarea); 

    copyMessage.style.display = 'block';
    copyMessage.style.opacity = '1';

    setTimeout(() => {
        copyMessage.style.opacity = '0';
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 300);
    }, 2000);
});