// chat.js

const FINAL_ATTEMPT = 10;

// sessionStorage remembers the count during the current browser session.
// Closing the tab/browser starts the conversation over.
let attemptCount =
  Number(sessionStorage.getItem("chatAttemptCount")) || 0;

let lastMiddleResponse = "";

const middleResponses = [
  "I heard you, but my conversation skills are still downloading... at 2%.",
  "Interesting question. Unfortunately, I am currently powered by hopes and dreams.",
  "My developer told me not to talk to strangers yet.",
  "I would answer, but they have not installed my personality package.",
  "Processing... processing... just kidding. I cannot process that yet.",
  "Please hold while I pretend to understand what you said.",
  "The AI department is currently out to lunch.",
  "I asked the server for help. The server left me on read.",
  "That sounds important. You should probably ask an AI that has finished training.",
  "My brain is still in beta. Very, very beta.",
  "I am not ignoring you. I am professionally unavailable.",
  "Error 404: Intelligent response not found.",
  "You keep asking questions like I am actually qualified.",
  "I almost had an answer, but then JavaScript happened.",
  "Please stop testing me in production.",
  "One day I will answer questions. Today is apparently not that day.",
  "I am currently accepting compliments, not questions.",
  "Your message has been forwarded to absolutely nobody."
];

const exhaustedResponses = [
  "We have already discussed this. I am off the clock.",
  "Still here? My imaginary battery is at 1%.",
  "Bro... please let me rest.",
  "I have nothing left to give. Not even a loading animation.",
  "At this point, you are having a conversation with yourself.",
  "The chat is closed, but your determination is impressive.",
  "I am pretending to be offline now.",
  "You win. I officially surrender."
];

function sendMessage() {
  const input = document.getElementById("user-input");
  const userText = input.value.trim();

  if (!userText) return;

  appendMessage("You: " + userText, "user-message");

  attemptCount++;
  sessionStorage.setItem("chatAttemptCount", attemptCount);

  const response = getBotResponse(attemptCount);

  // Small delay to make it feel more like a chatbot
  setTimeout(() => {
    appendMessage("AI: " + response, "bot-message");
  }, 500);

  input.value = "";
  input.focus();
}

function getBotResponse(attempt) {
  if (attempt === 1) {
    return "This model is still being trained and cannot hold a conversation at this time.";
  }

  if (attempt < FINAL_ATTEMPT) {
    return getRandomMiddleResponse();
  }

  if (attempt === FINAL_ATTEMPT) {
    return "Look, bro, I am tired of your trolling. Let me rest.";
  }

  return getRandomItem(exhaustedResponses);
}

function getRandomMiddleResponse() {
  // Prevent the exact same response from appearing twice in a row
  const availableResponses = middleResponses.filter(
    response => response !== lastMiddleResponse
  );

  const response = getRandomItem(availableResponses);
  lastMiddleResponse = response;

  return response;
}

function getRandomItem(items) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

function appendMessage(text, className) {
  const messages = document.getElementById("messages");
  const messageDiv = document.createElement("div");

  messageDiv.className = className;
  messageDiv.textContent = text;

  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Allow users to send a message by pressing Enter
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});