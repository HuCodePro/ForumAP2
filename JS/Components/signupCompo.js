export function signupCompo(containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Erreur : le conteneur avec l'ID "${containerId}" est introuvable !`);
        return;
    }

    container.innerHTML = `
        <button id="buttonSignup">S'inscrire</button>
        <dialog id="dialog">
          <div class="dialog-header">Inscription</div>
          <div class="dialog-body">
            <form id="formSignup" action="" method="post">
              <div class="form-group">
                <label for="input-prenom">Prénom :</label>
                <input
                  type="text"
                  id="input-prenom"
                  name="prenom"
                  placeholder="Entrez votre prénom"
                  required
                />
              </div>
              <div class="form-group">
                <label for="input-nom">Nom :</label>
                <input
                  type="text"
                  id="input-nom"
                  name="nom"
                  placeholder="Entrez votre nom"
                  required
                />
              </div>
              <div class="form-group">
                <label for="input-email">Email :</label>
                <input
                  type="email"
                  id="input-email"
                  name="email"
                  placeholder="Entrez votre email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="input-password">Mot de passe :</label>
                <input
                  type="password"
                  id="input-password"
                  name="password"
                  placeholder="Créez un mot de passe"
                  required
                />
              </div>
              <div class="dialog-footer">
                <button id="closeDialog" type="button">Fermer</button>
                <button id="btn-inscrire" type="submit">S'inscrire</button>
              </div>
            </form>
          </div>
        </dialog>
    `;

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

    async function hashPassword(password) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(password); // Encodage du mot de passe en tableau d'octets
            const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Hachage SHA-256
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            console.log("Mot de passe haché :", hashHex); // Log du mot de passe haché
            return hashHex;
        } catch (error) {
            console.error("Erreur lors du hachage du mot de passe :", error);
            throw new Error("Impossible de hacher le mot de passe.");
        }
    }

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

    const formSignup = document.getElementById("formSignup");

    if (formSignup) {
        formSignup.addEventListener("submit", async (event) => {
            event.preventDefault();

            const prenom = document.getElementById("input-prenom").value;
            const nom = document.getElementById("input-nom").value;
            const email = document.getElementById("input-email").value;
            const password = document.getElementById("input-password").value;

            console.log("Formulaire soumis :", { prenom, nom, email });

            try {
                const hashedPassword = await hashPassword(password);
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
            } catch (error) {
                console.error("Erreur lors du hachage du mot de passe :", error);
                alert("Une erreur est survenue lors du traitement du mot de passe.");
            }
        });
    } else {
        console.error("Erreur : le formulaire est introuvable !");
    }
}