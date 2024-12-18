import { getMessages } from "./api/message.js";
import { signupCompo } from "./Components/signupCompo.js";
import { signinCompo } from "./Components/signinCompo.js";
import { profilCompo } from "./Components/profilCompo.js";
import { searchCompo } from "./Components/searchCompo.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Le script est chargé");
  signupCompo("signup-container");
  signinCompo("signin-container");
  profilCompo("profil-container");
  searchCompo();

  async function ShowMessages() {
    console.log("test");
    try {
      const messages = await getMessages();
      for (const message of messages) {
        console.log(message);
        const ulMessages = document.getElementById("liste-messages");
        var title = document.createElement("p");
        var text = document.createElement("p");
        var li = document.createElement("li");
        title.classList.add("uppercase");
        li.classList.add("list-group-item");
        title.innerText = message.titre;
        text.innerText = message.contenu;
        ulMessages.appendChild(li);
        li.appendChild(title);
        li.appendChild(text);
      }
    } catch (error) {
      console.log("Erreur :", error);
    }
  }
  ShowMessages();
});
