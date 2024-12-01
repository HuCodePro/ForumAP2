import signupCompo from './Components/signupCompo';  

document.addEventListener("DOMContentLoaded", () => {
    const dialog = new signupCompo('#buttonSignup', 'dialog', 'closeDialog');
    dialog.bindEvents(); 
});
