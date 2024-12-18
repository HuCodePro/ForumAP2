export function searchCompo() {
    const searchInput = document.getElementById('searchInput');
    const messagesList = document.getElementById('messages-list'); 

    searchInput.addEventListener('input', async () => {
      const query = searchInput.value.trim().toLowerCase();
  
      if (query.length > 0) {
        const response = await fetch('https://s3-4683.nuage-peda.fr/Forum2/public/api/messages');
        const messages = await response.json();

        const filteredMessages = messages.filter(message =>
          message.titre.toLowerCase().includes(query) || message.contenu.toLowerCase().includes(query)
        );

        displayMessages(filteredMessages);
      } else {
        const response = await fetch('https://s3-4683.nuage-peda.fr/Forum2/public/api/messages');
        const messages = await response.json();
        displayMessages(messages);
      }
    });
  }

  function displayMessages(messages) {
    const messagesList = document.getElementById('messages-list');
    messagesList.innerHTML = ''; 
  
    if (messages.length > 0) {
      messages.forEach(message => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `
          <p class="uppercase">${message.titre}</p>
          <p>${message.contenu}</p>
        `;
        messagesList.appendChild(li);
      });
    } else {
      messagesList.innerHTML = "<li class='list-group-item'>Aucun message trouvé.</li>";
    }
  }
  