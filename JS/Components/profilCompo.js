export function profilCompo(containerId) {
    const container = document.getElementById(containerId);

    console.log("profilCompo initialisé !");

  
    if (!container) {
      console.error(`Erreur : le conteneur avec l'ID "${containerId}" est introuvable !`);
      return;
    }

    container.innerHTML = `
      <dialog id="profilDialog" class="profil-dialog">

        <div class="dialog-header">
          <h3>Profil de l'utilisateur</h3>
        </div>

        <div class="dialog-body text-center">

          <h4 id="profil-name">John Doe</h4>
          <p>Email : <span id="profil-email">johndoe@example.com</span></p>
          <p>Date d'inscription : <span id="profil-date">01/01/2024</span></p>

          <div id="userMessages">
          <h5>Mes Messages Envoyés</h5>
          <ul id="messages-list" class="list-group">
            <!-- Les messages envoyés seront insérés ici -->
          </ul>
          </div>

        </div>

        <div class="dialog-footer text-end">
          <button id="closeProfilDialog" class="btn btn-secondary">Fermer</button>
          <button id="deleteAccountBtn" class="btn btn-danger">Supprimer le compte</button>
        </div>

      </dialog>
    `;

    const buttonDialog = document.getElementById("buttonDialog");
    const profilDialog = document.getElementById("profilDialog");
    const closeProfilDialog = document.getElementById("closeProfilDialog");
    const deleteAccountBtn = document.getElementById("deleteAccountBtn");
  
    if (buttonProfil && profilDialog && closeProfilDialog) {
        buttonProfil.addEventListener("click", () => {
            console.log("Affichage du modal");
            profilDialog.showModal();
        });

        closeProfilDialog.addEventListener("click", () => {
            console.log("Fermeture du modal");
            profilDialog.close();
        });

        deleteAccountBtn.addEventListener("click", () => {
            const confirmation = confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
            if (confirmation) {
              deleteAccount();
            }
          });
        } else {
          console.error("Erreur : les éléments du dialog sont introuvables !");
        }
  }
  
  async function deleteAccount() {
    try {
      const response = await fetch('https://s3-4683.nuage-peda.fr/Forum2/public/api/users', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        alert("Votre compte a été supprimé avec succès.");
        window.location.href = "/"; 
      } else {
        alert("Une erreur est survenue lors de la suppression du compte.");
      }
    } catch (error) {
      console.log("Erreur lors de la suppression du compte :", error);
      alert("Une erreur est survenue.");
    }

    async function loadUserMessages() {
        try {

          const response = await fetch('https://s3-4683.nuage-peda.fr/Forum2/public/api/users');
          const messages = await response.json();
          const userMessages = messages.filter(message => message.userId === currentUserId); // Assumes 'currentUserId' est l'ID de l'utilisateur connecté
          const messagesList = document.getElementById("messages-list");

          if (userMessages.length > 0) {
            userMessages.forEach(message => {
              const li = document.createElement("li");
              li.classList.add("list-group-item");
              li.innerHTML = `
                <p class="uppercase">${message.titre}</p>
                <p>${message.contenu}</p>
              `;
              messagesList.appendChild(li);
            });
          } else {
            messagesList.innerHTML = "<li class='list-group-item'>Vous n'avez pas encore envoyé de messages.</li>";
          }
        } catch (error) {
          console.log("Erreur lors du chargement des messages :", error);
        }
      }

  }