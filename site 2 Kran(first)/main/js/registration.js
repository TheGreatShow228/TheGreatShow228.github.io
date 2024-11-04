document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('closeModal');
    const showLogin = document.getElementById('showLogin');
    const showSignup = document.getElementById('showSignup');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const modalHeader = document.getElementById('modalHeader'); 

    document.querySelector('.header_user-menu').addEventListener('click', () => {
        overlay.style.display = 'block';
        modal.style.display = 'block';
        modalHeader.textContent = 'Вход';
    });

    function closeModalWindow() {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }

    closeModal.addEventListener('click', () => {
        setTimeout(closeModalWindow, 1); 
    });

    overlay.addEventListener('click', () => {
        setTimeout(closeModalWindow, 1);
    });

    showLogin.addEventListener('click', () => {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        showLogin.classList.add('active');
        showSignup.classList.remove('active');
        modalHeader.textContent = 'Вход'; 
    });

    showSignup.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        showSignup.classList.add('active');
        showLogin.classList.remove('active');
        modalHeader.textContent = 'Регистрация'; 
    });
});