document.addEventListener("DOMContentLoaded", () => {
    console.log("Le script est chargé");
    const buttonSignup = document.getElementById("buttonSignup") 
    const dialog = document.getElementById("dialog"); 
  
    buttonSignup.addEventListener("click", () => {
      dialog.showModal();
    });
  
    closeDialog.addEventListener("click", () => {
      dialog.close();
    });
  });
  