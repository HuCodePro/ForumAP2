export function signinCompo(containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Erreur : le conteneur avec l'ID "${containerId}" est introuvable !`);
        return;
    }

    // Ajouter le contenu HTML dans le conteneur
    container.innerHTML = `
        <button id="buttonSignin" class="btn btn-primary">Se connecter</button>
        <dialog id="dialogSignin">
          <div class="dialog-header">
            <h2>Connexion</h2>
          </div>
          <div class="dialog-body">
            <form id="formSignin" action="" method="post">
              <div class="form-group mb-3">
                <label for="input-email">Email :</label>
                <input
                  type="email"
                  id="input-email"
                  name="email"
                  class="form-control"
                  placeholder="Entrez votre email"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="input-password">Mot de passe :</label>
                <input
                  type="password"
                  id="input-password"
                  name="password"
                  class="form-control"
                  placeholder="Saisissez votre mot de passe"
                  required
                />
              </div>
              <div class="dialog-footer">
                <button id="closeDialogSignin" type="button" class="btn btn-secondary">Fermer</button>
                <button id="btn-connexion" type="submit" class="btn btn-primary">Se connecter</button>
              </div>
            </form>
          </div>
        </dialog>
    `;

    // Gestion du modal de connexion
    const buttonSignin = document.getElementById("buttonSignin");
    const dialogSignin = document.getElementById("dialogSignin");
    const closeDialogSignin = document.getElementById("closeDialogSignin");

    if (buttonSignin && dialogSignin && closeDialogSignin) {
        buttonSignin.addEventListener("click", () => {
            dialogSignin.showModal();
        });

        closeDialogSignin.addEventListener("click", () => {
            dialogSignin.close();
        });
    } else {
        console.error("Erreur : certains éléments du modal de connexion sont introuvables !");
    }

    // Vérifier si l'API est disponible
    async function isApiAvailable(url) {
        try {
            const response = await fetch(url, { method: "OPTIONS" });
            return response.ok;
        } catch (error) {
            console.error("API non disponible :", error);
            return false;
        }
    }

    // Fonction pour appeler l'API de connexion
    async function apiSignin(email, password) {
        const API_URL = "https://s3-4683.nuage-peda.fr/Forum2/public/api/authentication_token";

        /*if (!(await isApiAvailable(API_URL))) {
            throw new Error("L'API de connexion n'est pas disponible. Vérifiez l'URL ou la configuration.");
        }
*/
        const data = {
            email: email,
            password: password
            };
           
        const options = {
            method: "POST",
            headers: {
                "accept": "application/ld+json",
                "Content-Type": "application/ld+json",
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(API_URL, options);
                console.log(response)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData["hydra:description"] || "Erreur inconnue");
            }

            return await response.json();
        } catch (error) {
            console.error("Erreur lors du fetch de connexion :", error);
            throw error;
        }
    }

    // Gestion du formulaire de connexion
    const formSignin = document.getElementById("formSignin");

    if (formSignin) {
        formSignin.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = document.getElementById("input-email").value;
            const password = document.getElementById("input-password").value;

            try {
                // Appeler l'API de connexion
                const data = await apiSignin(email, password);

                // Stocker le token
                sessionStorage.setItem("token", data.token);

                // Modifier l'interface utilisateur
                alert(`Connexion réussie ! Bienvenue ${data.prenom || ""} ${data.nom || ""}.`);
                dialogSignin.close();
                buttonSignin.style.display = "none";

                const userInfo = document.createElement("div");
                userInfo.innerHTML = `
                    <p>Bienvenue, ${data.prenom || "utilisateur"} !</p>
                    <button id="logoutButton" class="btn btn-warning">Déconnexion</button>
                `;
                container.appendChild(userInfo);

                // Gérer la déconnexion
                document.getElementById("logoutButton").addEventListener("click", () => {
                    sessionStorage.removeItem("token");
                    alert("Déconnexion réussie !");
                    window.location.reload();
                });
            } catch (error) {
                alert("Erreur lors de la connexion : " + error.message);

                // Ajouter une classe d'erreur aux champs
                document.getElementById("input-email").classList.add("is-invalid");
                document.getElementById("input-password").classList.add("is-invalid");
            }
        });
    } else {
        console.error("Erreur : le formulaire est introuvable !");
    }
}
