import { getMessages } from "./api/message.js";
import { signupCompo } from "./Components/signupCompo.js";
import { signinCompo } from "./Components/signinCompo.js";
import MessageComponent from "./Components/MessageComponent.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Le script est chargé");

  // Initialisation des composants d'inscription et de connexion
  signupCompo("signup-container");
  signinCompo("signin-container");
  

<<<<<<< HEAD
  // Initialisation des messages
  const containerId = "liste-messages"; // ID du conteneur des messages

  try {
    // Récupération des messages via l'API
    const messages = await getMessages();

    // Utilisation du composant MessageComponent
    new MessageComponent(containerId, messages);
    console.log("Messages affichés avec succès !");
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);

    // Gestion de l'erreur dans le conteneur
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML =
        '<li class="list-group-item text-danger">Erreur lors du chargement des messages.</li>';
    }
  }
});
=======
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
      mode: 'no-cors',
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
        const ulMessages = document.getElementById("liste-messages");

        for (const message of messages) {
            console.log(message);

            const li = document.createElement("li");
            const userInfo = document.createElement("span");
            const userBadge = document.createElement("span");
            const datePost = document.createElement("p");
            const title = document.createElement("p");
            const text = document.createElement("p");

            li.classList.add("list-group-item");
            userInfo.classList.add('text-uppercase');
            title.classList.add('text-uppercase');
            userBadge.classList.add("badge", "ms-2"); // Bootstrap style for badges

            // Vérification du rôle de l'utilisateur
            const userRoles = message.user.roles;
            if (userRoles.includes("ROLE_ADMIN")) {
                userBadge.innerText = "Administrateur";
                userBadge.classList.add("bg-danger"); // Badge rouge pour admin
            } else if (userRoles.includes("ROLE_USER")) {
                userBadge.innerText = "Utilisateur";
                userBadge.classList.add("bg-primary"); // Badge bleu pour utilisateur
            }

            // Affichage des informations principales
            const userPrenom = message.user.prenom;
            const parentUserPrenom = message.parent ? message.parent.user.prenom : null;

            // Construire l'information utilisateur
            if (parentUserPrenom) {
                userInfo.innerText = `${userPrenom} (réponse à ${parentUserPrenom})`;
            } else {
                userInfo.innerText = userPrenom;
            }

            datePost.innerText = message.datePoste;
            title.innerText = message.titre;
            text.innerText = message.contenu;

            // Ajout des éléments dans la liste
            ulMessages.appendChild(li);
            li.appendChild(userInfo);
            userInfo.appendChild(userBadge); // Ajouter le badge à côté du nom
            li.appendChild(datePost);
            li.appendChild(title);
            li.appendChild(text);
        }
    } catch (error) {
        console.log("Erreur :", error);
    }
}


ShowMessages(); 


>>>>>>> fed125ec36e79dee352bbcff7d1de93bfc365de4
