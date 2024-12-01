import { getMessages } from "./api/message.js";


document.addEventListener("DOMContentLoaded", () => {
  console.log("Le script est chargé");

  // Gestion du modal
  const buttonSignup = document.getElementById("buttonSignup");
  const dialog = document.getElementById("dialog");
  const closeDialog = document.getElementById("closeDialog");

  if (buttonSignup && dialog && closeDialog) {
      buttonSignup.addEventListener("click", () => {
          console.log("Affichage du modal");
          dialog.showModal();
      });

      closeDialog.addEventListener("click", () => {
          console.log("Fermeture du modal");
          dialog.close();
      });
  } else {
      console.error("Erreur : certains éléments du modal sont introuvables !");
  }

  // Gestion du formulaire
  const formSignup = document.getElementById("formSignup");

  if (formSignup) {
      formSignup.addEventListener("submit", (event) => {
          event.preventDefault();

          const prenom = document.getElementById("input-prenom").value;
          const nom = document.getElementById("input-nom").value;
          const email = document.getElementById("input-email").value;
          const password = document.getElementById("input-password").value;
      

          console.log("Formulaire soumis :", { prenom, nom, email });

     
     
          // Hacher le mot de passe
          const hashedPassword = CryptoJS.SHA256(password).toString();
          console.log("Mot de passe haché :", hashedPassword);

          apiSignup(prenom, nom, email, hashedPassword)
              .then((data) => {
                  console.log("Inscription réussie :", data);
                  alert(`Inscription réussie ! Bienvenue ${data.prenom} ${data.nom}.`);
                  dialog.close();
              })
              .catch((error) => {
                  console.error("Erreur lors de l'inscription :", error);
                  alert("Erreur lors de l'inscription : " + error.message);
              });
      });
  } else {
      console.error("Erreur : le formulaire est introuvable !");
  }
});

// Fonction API d'inscription
function apiSignup(prenom, nom, email, hashedPassword) {
  const API_URL = "https://s3-4683.nuage-peda.fr/Forum2/public/api/users";

  const data = {
      email: email,
      password: hashedPassword,
      prenom: prenom,
      nom: nom,
      dateInscription: new Date().toISOString(),
  };

  const options = {
      method: "POST",
      headers: {
          accept: "application/ld+json",
          "Content-Type": "application/ld+json",
      },
      body: JSON.stringify(data),
  };

  console.log("Envoi des données API :", data);

  return fetch(API_URL, options)
      .then((response) => {
          console.log("Statut HTTP :", response.status);
          if (!response.ok) {
              return response.json().then((errData) => {
                  console.error("Erreur API :", errData);
                  throw new Error(errData["hydra:description"] || "Erreur inconnue");
              });
          }
          return response.json();
      })
      .catch((error) => {
          console.error("Erreur lors du fetch :", error);
          throw error;
      });



     

}
 // MESSAGE 

async function ShowMessages() {
    console.log('test');
    try {
        const messages = await getMessages(); 
        for (const message of messages) {
            console.log(message);
            const ulMessages = document.getElementById("liste-messages");
            var title = document.createElement("p")
            var li = document.createElement("li"); 
            title.classList.add('uppercase')
            li.classList.add("list-group-item")
            title.innerText = message.titre
            li.innerText = message.contenu
            ulMessages.appendChild(li)
            li.appendChild(title)
        }
    } catch (error) {
        console.log("Erreur :", erreur);
    }
}
ShowMessages(); 


