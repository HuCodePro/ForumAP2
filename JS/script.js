import { getMessages } from "./api/message.js";
import { signupCompo } from "./Components/signupCompo.js";
import { signinCompo } from "./Components/signinCompo.js";
import MessageComponent from "./Components/MessageComponent.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Le script est chargé");

  // Initialisation des composants d'inscription et de connexion
  signupCompo("signup-container");
  signinCompo("signin-container");

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
