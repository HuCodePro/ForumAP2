class Dialog {
    constructor(buttonId, dialogId, closeButtonId) {
        this.buttonSignup = document.querySelector(buttonId); // Le bouton pour ouvrir le dialogue
        this.dialog = document.createElement('dialog'); // Création du dialog
        this.closeButtonId = closeButtonId; // Bouton de fermeture

        this.initDialog(dialogId); // Initialiser le dialogue avec son contenu
    }

    // Fonction pour initialiser le contenu du dialogue
    initDialog(dialogId) {
        const popupContent = `
            <div class="popup-content">
                <h2>Inscription</h2>
                <form id="formSignup">
                    <div class="form-group">
                        <label for="input-prenom">Login :</label>
                        <input type="text" id="input-login" name="prenom" required>
                    </div>
                    <div class="form-group">
                        <label for="input-password">Mot de passe :</label>
                        <input type="password" id="input-password" name="password" required>
                    </div>
                    <div class="form-group">
                        <label for="input-confirm-password">Confirmer le mot de passe :</label>
                        <input type="password" id="input-confirm-password" name="confirm-password" required>
                    </div>
                    <button type="submit">S'inscrire</button>
                    <button type="button" id="${this.closeButtonId}">Fermer</button>
                </form>
            </div>
        `;
        
        this.dialog.innerHTML = popupContent;
        this.dialog.setAttribute('id', dialogId); // Attribuer l'id dynamique
        document.body.appendChild(this.dialog); // Ajouter le dialog au DOM
    }

    // Méthode pour ouvrir le dialogue
    open() {
        this.dialog.showModal();
    }

    // Méthode pour fermer le dialogue
    close() {
        this.dialog.close();
    }

    // Méthode pour lier les événements
    bindEvents() {
        this.buttonSignup.addEventListener("click", () => this.open());
        const closeDialogButton = document.querySelector(`#${this.closeButtonId}`);
        closeDialogButton.addEventListener("click", () => this.close());
    }
}

export default Dialog;
