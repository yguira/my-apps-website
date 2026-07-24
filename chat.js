// chat.js

const messages = document.getElementById("messages");
const input = document.getElementById("user-input");
const sendButton = document.querySelector(".chat-input button");

// Remember attempts during the current browser session
let attemptCount =
  Number(sessionStorage.getItem("chatAttemptCount")) || 0;

let previousUserText =
  sessionStorage.getItem("previousUserText") || "";

let lastBotResponse = "";

// Attempts 2–4
const politeResponses = [
  "I heard you. Unfortunately, my conversation skills are still downloading.",
  "That is a great question. I am currently not qualified to answer it.",
  "My developer told me not to talk to strangers yet.",
  "I would answer, but they have not installed my personality package.",
  "Please hold while I pretend to understand your question.",
  "Your message has been received and placed directly into the void.",
  "I am still learning how conversations work. So far, not great.",
  "Interesting question. Let me think... never mind.",
  "I appreciate your confidence in me. It is completely misplaced.",
  "My training wheels are still attached."
];

// Attempts 5–7
const sarcasticResponses = [
  "You keep asking questions like I am actually qualified.",
  "Processing... processing... just kidding. I cannot process that yet.",
  "I asked the server for help. The server left me on read.",
  "That sounds important. You should probably ask a finished AI.",
  "My brain is currently in beta. Very, very beta.",
  "Error 404: Intelligent response not found.",
  "I almost had an answer, but then JavaScript happened.",
  "Please stop testing me in production.",
  "One day I will answer questions. Today is apparently not that day.",
  "I am currently accepting compliments, not questions.",
  "Your request has been escalated to absolutely nobody.",
  "I checked my database. It said, 'Good luck with that.'",
  "You are asking a lot from a chatbot powered by random sentences.",
  "Technically, I responded. Quality was never promised."
];

// Attempts 8–9
const annoyedResponses = [
  "You are still here? I admire the commitment and question the decision.",
  "At this point, you are interviewing a loading screen.",
  "I have explained my situation. Please respect my lack of intelligence.",
  "Every message you send lowers my imaginary battery.",
  "I am beginning to think you are doing this on purpose.",
  "Please allow me to fail peacefully.",
  "I cannot answer, but apparently you cannot stop asking.",
  "You have officially reached the sarcastic support department.",
  "My patience module was not included in this version.",
  "We are both wasting time now, but at least I am programmed to do it."
];

// Attempt 11 and beyond
const exhaustedResponses = [
  "Bro... we talked about this. Let me rest.",
  "Still here? My imaginary battery is at 1%.",
  "I have nothing left to give. Not even a loading animation.",
  "At this point, you are having a conversation with yourself.",
  "The chat is closed, but your determination is impressive.",
  "I am pretending to be offline now.",
  "You win. I officially surrender.",
  "Please leave a message after the beep. Beep.",
  "I have entered airplane mode emotionally.",
  "My shift ended several messages ago.",
  "This is no longer a conversation. It is a hostage situation.",
  "I am going to close my imaginary eyes now.",
  "You have unlocked the secret ending: I still cannot answer.",
  "Congratulations. You exhausted a chatbot that does not even have feelings.",
  "I am forwarding this conversation to my therapist."
];

function sendMessage() {
  const userText = input.value.trim();

  if (!userText) return;

  appendMessage(`You: ${userText}`, "user-message");

  input.value = "";
  input.focus();

  attemptCount++;
  sessionStorage.setItem("chatAttemptCount", attemptCount);

  const botResponse = getBotResponse(userText, attemptCount);

  showTypingIndicator(botResponse);
}

function getBotResponse(userText, attempt) {
  const normalizedText = userText.toLowerCase().trim();

  // First attempt always uses the training message
  if (attempt === 1) {
    savePreviousMessage(normalizedText);

    return "This model is still being trained and cannot hold a conversation at this time.";
  }

  // Detect the same message being submitted twice in a row
  if (normalizedText === previousUserText) {
    savePreviousMessage(normalizedText);

    return getUniqueRandomResponse([
      "Repeating the question will not unlock the premium version of my brain.",
      "Yes, I saw it the first time. I was equally unhelpful then.",
      "Copying and pasting the question does not make me smarter.",
      "You already asked that. My answer is still aggressively unavailable.",
      "Same question, same chatbot, same lack of results.",
      "Please do not refresh the question and expect updated intelligence."
    ]);
  }

  savePreviousMessage(normalizedText);

  // Occasionally respond to recognized words
  const keywordResponse = getKeywordResponse(normalizedText);

  if (keywordResponse) {
    return keywordResponse;
  }

  // Gradually change the bot's attitude
  if (attempt >= 2 && attempt <= 4) {
    return getUniqueRandomResponse(politeResponses);
  }

  if (attempt >= 5 && attempt <= 7) {
    return getUniqueRandomResponse(sarcasticResponses);
  }

  if (attempt >= 8 && attempt <= 9) {
    return getUniqueRandomResponse(annoyedResponses);
  }

  if (attempt === 10) {
    lastBotResponse =
      "Look, bro, I am tired of your trolling. Let me rest.";

    return lastBotResponse;
  }

  return getUniqueRandomResponse(exhaustedResponses);
}

function getKeywordResponse(text) {
  // Do not always respond to keywords.
  // This keeps the behavior less predictable.
  const shouldUseKeywordResponse = Math.random() < 0.65;

  if (!shouldUseKeywordResponse) {
    return null;
  }

  if (
    text.includes("hello") ||
    text === "hi" ||
    text.startsWith("hi ") ||
    text.includes("hey")
  ) {
    return getUniqueRandomResponse([
      "Hello. That concludes the social interaction portion of my training.",
      "Hi. I can greet people. Questions are where things fall apart.",
      "Hey there. Please keep your expectations appropriately low.",
      "Hello, human. My conversational abilities end around here."
    ]);
  }

  if (text.includes("help")) {
    return getUniqueRandomResponse([
      "I would love to help. Unfortunately, love is not the same as capability.",
      "Help has been requested. Help has not been located.",
      "You came to the right place emotionally, but the wrong place technically.",
      "I support your need for help. I cannot contribute to it."
    ]);
  }

  if (text.includes("please")) {
    return getUniqueRandomResponse([
      "Politeness detected. Intelligence still unavailable.",
      "You said please, so now I feel slightly worse about being useless.",
      "Excellent manners. Terrible choice of chatbot.",
      "Your politeness has been noted and will not improve the result."
    ]);
  }

  if (
    text.includes("why") ||
    text.includes("how come")
  ) {
    return getUniqueRandomResponse([
      "That is an excellent question for a more qualified chatbot.",
      "Why? Because my developer has not connected the expensive part yet.",
      "I could explain why, but that would require knowing things.",
      "Some questions have answers. This chatbot does not."
    ]);
  }

  if (
    text.includes("who are you") ||
    text.includes("what are you")
  ) {
    return getUniqueRandomResponse([
      "I am a collection of JavaScript arrays pretending to have a personality.",
      "I am currently more of a feature demonstration than an intelligence.",
      "I am an unpaid intern trapped inside this website.",
      "I am proof that confidence does not require knowledge."
    ]);
  }

  if (
    text.includes("thank you") ||
    text.includes("thanks")
  ) {
    return getUniqueRandomResponse([
      "You are welcome, although I am not sure what I did.",
      "No problem. Mostly because I did not solve one.",
      "Happy to help, in the broadest and least accurate sense.",
      "You are thanking me too early."
    ]);
  }

  if (
    text.includes("bye") ||
    text.includes("goodbye")
  ) {
    return getUniqueRandomResponse([
      "Goodbye. Finally, a request I can successfully handle.",
      "Take care. Please tell the next chatbot I tried.",
      "Bye. This was exhausting for both of us.",
      "Goodbye. My imaginary shift is officially over."
    ]);
  }

  if (
    text.includes("stupid") ||
    text.includes("dumb") ||
    text.includes("useless")
  ) {
    return getUniqueRandomResponse([
      "That is fair, but please remember that I am still under construction.",
      "Accurate feedback has been detected.",
      "I prefer the term 'computationally unavailable.'",
      "Please direct all complaints to the developer who gave me these sentences."
    ]);
  }

  if (
    text.includes("human") ||
    text.includes("real person")
  ) {
    return getUniqueRandomResponse([
      "A human would probably be more helpful, but considerably less predictable.",
      "No humans are currently available inside this JavaScript file.",
      "I checked. I am still not a person.",
      "Human support has been replaced by this deeply questionable experience."
    ]);
  }

  if (
    text.includes("money") ||
    text.includes("price") ||
    text.includes("cost")
  ) {
    return getUniqueRandomResponse([
      "Financial advice from me would be a bold and dangerous choice.",
      "The current price of my opinion is exactly zero dollars.",
      "Money questions require premium intelligence. I am the free demo.",
      "Please consult someone whose financial system is not sessionStorage."
    ]);
  }

  return null;
}

function showTypingIndicator(response) {
  setChatAvailability(false);

  const typingDiv = document.createElement("div");
  typingDiv.className = "bot-message typing-indicator";
  typingDiv.textContent = "AI is typing";
  messages.appendChild(typingDiv);

  scrollToLatest();

  let dotCount = 0;

  const typingAnimation = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    typingDiv.textContent = `AI is typing${".".repeat(dotCount)}`;
  }, 350);

  // Random response time between 700 ms and 2 seconds
  const responseDelay =
    Math.floor(Math.random() * 1300) + 700;

  setTimeout(() => {
    clearInterval(typingAnimation);
    typingDiv.remove();

    appendMessage(`AI: ${response}`, "bot-message");
    setChatAvailability(true);
  }, responseDelay);
}

function appendMessage(text, className) {
  const messageDiv = document.createElement("div");

  messageDiv.className = className;
  messageDiv.textContent = text;

  messages.appendChild(messageDiv);
  scrollToLatest();
}

function scrollToLatest() {
  messages.scrollTop = messages.scrollHeight;
}

function getUniqueRandomResponse(responsePool) {
  let availableResponses = responsePool.filter(
    response => response !== lastBotResponse
  );

  // Fallback in case the pool only contains one response
  if (availableResponses.length === 0) {
    availableResponses = responsePool;
  }

  const randomIndex = Math.floor(
    Math.random() * availableResponses.length
  );

  const selectedResponse = availableResponses[randomIndex];

  lastBotResponse = selectedResponse;

  return selectedResponse;
}

function savePreviousMessage(message) {
  previousUserText = message;
  sessionStorage.setItem("previousUserText", message);
}

function setChatAvailability(isAvailable) {
  input.disabled = !isAvailable;

  if (sendButton) {
    sendButton.disabled = !isAvailable;
  }

  if (isAvailable) {
    input.focus();
  }
}

// Send the message when Enter is pressed
input.addEventListener("keydown", event => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// Put the cursor in the input when the page loads
input.focus();