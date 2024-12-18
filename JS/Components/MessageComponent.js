class ForumMessages { //composant pour afficher les messages du forum
    constructor(containerId, messages = []) {
      this.container = document.getElementById(containerId);
      this.messages = messages;
      this.render();
    }
  
    setMessages(newMessages) {
      this.messages = newMessages;
      this.render();
    }
  
    render() {
      if (!this.container) return;
  
      // Nettoie le conteneur
      this.container.innerHTML = '';
  
      if (this.messages.length === 0) {
        this.container.innerHTML = '<p>Aucun message à afficher.</p>';
        return;
      }
  
      // Création des éléments de message
      this.messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
          <div class="message-header">
            <strong>${message.author}</strong> - ${message.date}
          </div>
          <div class="message-content">${message.content}</div>
        `;
        this.container.appendChild(messageElement);
      });
    }
  }
  
  // Exemple d'utilisation
  document.addEventListener('DOMContentLoaded', () => {
    const messages = [
      { id: 1, author: "Alice", content: "Bonjour tout le monde !", date: "27/11/2024 10:00" },
      { id: 2, author: "Bob", content: "Quelqu'un peut m'aider avec mon code ?", date: "27/11/2024 10:15" },
      { id: 3, author: "Charlie", content: "Je recommande cet article sur JavaScript.", date: "27/11/2024 10:30" }
    ];
  
    // Instancie le composant dans un conteneur
    const forum = new ForumMessages('messages-container', messages);
  
    // Exemple de mise à jour des messages
    setTimeout(() => {
      forum.setMessages([
        { id: 4, author: "David", content: "Nouveau message ajouté !", date: "27/11/2024 11:00" },
      ]);
    }, 5000);
  });
  