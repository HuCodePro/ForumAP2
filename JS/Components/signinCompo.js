export function signinCompo(containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Erreur : le conteneur avec l'ID "${containerId}" est introuvable !`);
        return;
    }

    // Ajouter le contenu HTML dans le conteneur
    container.innerHTML = `
        <button id="buttonSignin">Se connecter</button>
        <dialog id="dialogSignin">
          <div class="dialog-header">Connexion</div>
          <div class="dialog-body">
            <form id="formSignin" action="" method="post">
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
                  placeholder="Saisissez votre mot de passe"
                  required
                />
              </div>
              <div class="dialog-footer">
                <button id="closeDialogSignin" type="button">Fermer</button>
                <button id="btn-connexion" type="submit">Se connecter</button>
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
            console.log("Affichage du modal de connexion");
            dialogSignin.showModal();
        });

        closeDialogSignin.addEventListener("click", () => {
            console.log("Fermeture du modal de connexion");
            dialogSignin.close();
        });
    } else {
        console.error("Erreur : certains éléments du modal de connexion sont introuvables !");
    }

    // Fonction API de connexion
    async function apiSignin(email, password) {
        const API_URL = "https://s3-4683.nuage-peda.fr/Forum2/public/api/login";

        const data = {
            email: email,
            password: password,
        };

        const options = {
            method: "POST",
            headers: {
                accept: "application/ld+json",
                "Content-Type": "application/ld+json",
            },
            body: JSON.stringify(data),
        };

        console.log("Envoi des données API de connexion :", data);

        try {
            const response = await fetch(API_URL, options);
            console.log("Statut HTTP de connexion :", response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erreur API :", errorData);
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

            console.log("Formulaire soumis :", { email, password });

            try {
                // Appeler l'API de connexion
                const data = await apiSignin(email, password);
                console.log("Connexion réussie :", data);

                // Afficher un message de succès et fermer le modal
                alert(`Connexion réussie ! Bienvenue ${data.prenom || ""} ${data.nom || ""}.`);
                dialogSignin.close();
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);

                // Gestion visuelle des erreurs
                alert("Erreur lors de la connexion : " + error.message);

                // Ajouter une classe d'erreur aux champs
                document.getElementById("input-email").classList.add("error");
                document.getElementById("input-password").classList.add("error");
            }
        });
    } else {
        console.error("Erreur : le formulaire est introuvable !");
    }
}
