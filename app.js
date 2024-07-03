// @ts-nocheck

const chatMessages = document.querySelector('.chatMessages');
const chatInputForm = document.querySelector('.chatInputForm');
const chatInputBox = document.querySelector('.chatInputBox');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'User' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  })
}

const sendMessage = (senderName, messageText) => {
  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: senderName,
    text: messageText,
    timestamp,
  }

  /* Save message to local storage */
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message);

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const sendUserMessage = (e) => {
  e.preventDefault();

  sendMessage('User', chatInputBox.value);

  /* Clear input field */
  chatInputForm.reset();

  shawnResponse();
}

function shawnResponse () {
  sendMessage('Shawn', 'placeholder');
}

chatInputForm.addEventListener('submit', sendUserMessage);
