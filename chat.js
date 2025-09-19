// chat.js

const messages = document.getElementById('messages');

function sendMessage() {
  const input = document.getElementById('user-input');
  const userText = input.value.trim();
  if (!userText) return;

  // Display user message
  const userDiv = document.createElement('div');
  userDiv.className = 'user-message';
  userDiv.innerText = 'You: ' + userText;
  messages.appendChild(userDiv);

  // Simulated GPT response (replace with real backend later)
  const botDiv = document.createElement('div');
  botDiv.className = 'bot-message';
  botDiv.innerText = 'GPT: (This will be powered by GPT soon!)';
  messages.appendChild(botDiv);

  // Scroll to latest
  messages.scrollTop = messages.scrollHeight;

  // Clear input
  input.value = '';
}
