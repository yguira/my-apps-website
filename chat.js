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
  const message = normalizeMessage(text);

  // Separate a greeting from the actual message
  const greetingResult = removeLeadingGreetings(message);
  const hadGreeting = greetingResult.hadGreeting;
  const remainingText = greetingResult.remainingText;

  /*
   * Examples:
   * "Hi"                       -> remainingText = ""
   * "Hello, good morning"      -> remainingText = ""
   * "Hi, how are you?"         -> remainingText = "how are you?"
   * "Hello, can you help me?"  -> remainingText = "can you help me?"
   */

  // A simple greeting with no request or question
  if (hadGreeting && remainingText === "") {
    return getUniqueRandomResponse([
      "Hello! My greeting module works perfectly. Please do not test the other modules.",
      "Hi there. I can confidently confirm that we have now greeted each other.",
      "Hello! So far, this conversation is going extremely well.",
      "Good to see you. Please keep the questions easy.",
      "Hey! Greetings are currently my strongest feature.",
      "Hello, human. Social interaction successfully completed.",
      "Hi! I was trained extensively for this exact moment.",
      "Hello! Finally, something I know how to answer."
    ]);
  }

  // Use the part after the greeting when one exists
  const intentText = hadGreeting ? remainingText : message;

  // Conversational greetings such as "Hi, how are you?"
  if (isSocialGreeting(intentText)) {
    return getUniqueRandomResponse([
      "I am doing great, considering I am mostly arrays and sessionStorage.",
      "I am doing well. My intelligence is still loading, but my mood is excellent.",
      "I cannot complain. My developer did not program a complaint form.",
      "I am good! Emotionally stable and technically unfinished.",
      "Doing well. Thanks for asking before requesting free technical support.",
      "I am fine, although every question slightly increases my stress level."
    ]);
  }

  // Help requests
  if (
    containsAnyPhrase(intentText, [
      "help",
      "assist",
      "support",
      "can you help",
      "could you help",
      "would you help",
      "need your help"
    ])
  ) {
    return getUniqueRandomResponse([
      "I would love to help. Unfortunately, love is not the same as capability.",
      "Help has been requested. Help has not been located.",
      "You came to the right place emotionally, but the wrong place technically.",
      "I support your need for help. I cannot contribute to it.",
      "I am checking my help database... apparently it is just an empty array.",
      "I can certainly pretend to help. Actual results may vary."
    ]);
  }

  // Questions about the bot
  if (
    containsAnyPhrase(intentText, [
      "who are you",
      "what are you",
      "are you real",
      "are you human",
      "are you a robot",
      "are you an ai"
    ])
  ) {
    return getUniqueRandomResponse([
      "I am a collection of JavaScript arrays pretending to have a personality.",
      "I am currently more of a feature demonstration than an intelligence.",
      "I am an unpaid intern trapped inside this website.",
      "I am proof that confidence does not require knowledge.",
      "I am a chatbot in the same way a cardboard car is transportation.",
      "Technically, I am JavaScript with excellent self-esteem."
    ]);
  }

  // Thank-you messages
  if (
    containsAnyPhrase(intentText, [
      "thank you",
      "thanks",
      "thank you so much",
      "appreciate it",
      "appreciate you"
    ])
  ) {
    return getUniqueRandomResponse([
      "You are welcome, although I am not sure what I did.",
      "No problem. Mostly because I did not solve one.",
      "Happy to help, in the broadest and least accurate sense.",
      "You are thanking me too early.",
      "You are welcome. Please leave a five-star review for my confidence.",
      "Glad I could be emotionally present."
    ]);
  }

  // Goodbye messages
  if (
    containsAnyPhrase(intentText, [
      "bye",
      "goodbye",
      "see you",
      "later",
      "talk to you later",
      "have a good day",
      "have a good night"
    ])
  ) {
    return getUniqueRandomResponse([
      "Goodbye. Finally, a request I can successfully handle.",
      "Take care. Please tell the next chatbot I tried.",
      "Bye. This was exhausting for both of us.",
      "Goodbye. My imaginary shift is officially over.",
      "See you later. Preferably after my training is complete.",
      "Have a good day. I will remain here doing absolutely nothing."
    ]);
  }

  // Money, prices, or costs
  if (
    containsAnyPhrase(intentText, [
      "money",
      "price",
      "pricing",
      "cost",
      "fee",
      "expensive",
      "cheap",
      "how much"
    ])
  ) {
    return getUniqueRandomResponse([
      "Financial advice from me would be a bold and dangerous choice.",
      "The current price of my opinion is exactly $0.",
      "Money questions require premium intelligence. I am the free demo.",
      "Please consult someone whose financial system is not sessionStorage.",
      "My services are free, and the quality reflects that.",
      "I cannot calculate the price, but I can emotionally support the purchase."
    ]);
  }

  // Insults or negative feedback
  if (
    containsAnyPhrase(intentText, [
      "stupid",
      "dumb",
      "useless",
      "terrible",
      "bad bot",
      "you suck",
      "not smart"
    ])
  ) {
    return getUniqueRandomResponse([
      "That is fair, but please remember that I am still under construction.",
      "Accurate feedback has been detected.",
      "I prefer the term 'computationally unavailable.'",
      "Please direct all complaints to the developer who gave me these sentences.",
      "I may be useless, but I am consistently useless.",
      "That hurt my feelings module. Fortunately, it does not exist."
    ]);
  }

  // Requests beginning with phrases such as "Can you..."
  if (isRequest(intentText)) {
    return getUniqueRandomResponse([
      "I understand the request. Completing it is where things become complicated.",
      "You asked very clearly. Unfortunately, clarity does not increase my abilities.",
      "That sounds like a reasonable request for an unreasonable chatbot.",
      "I would get started, but my task-completion module is still under construction.",
      "Request received. Productivity not guaranteed.",
      "I know exactly what you want. That concludes the useful portion of my response."
    ]);
  }

  // General questions
  if (isQuestion(intentText)) {
    return getUniqueRandomResponse([
      "That is a valid question. I am currently searching for a valid answer.",
      "Excellent question. Unfortunately, this is not an excellent chatbot.",
      "I understand the question, which is already more progress than expected.",
      "That question deserves an intelligent response. Please continue looking.",
      "I was hoping you would ask something rhetorical.",
      "The question has been recognized. The answer remains unavailable."
    ]);
  }

  // Polite message that does not match another request
  if (containsAnyPhrase(intentText, ["please"])) {
    return getUniqueRandomResponse([
      "Politeness detected. Intelligence still unavailable.",
      "You said please, so now I feel slightly worse about being useless.",
      "Excellent manners. Terrible choice of chatbot.",
      "Your politeness has been noted and will not improve the result."
    ]);
  }

  // No clear intent was recognized
  return null;
}


function normalizeMessage(text) {
  return text
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function removeLeadingGreetings(text) {
  let remainingText = normalizeMessage(text);
  let hadGreeting = false;

  /*
   * The loop allows multiple greetings:
   *
   * "Hello, good morning"
   * "Hi there, good afternoon"
   */
  const greetingPattern =
    /^(?:hi|hello|hey|hiya|yo|good\s+(?:morning|mornin|mornig|afternoon|evening|day))(?:\s+(?:there|everyone|friend|sir|ma'am|maam|bro))?[\s,!.\-:;]*/i;

  while (
    remainingText.length > 0 &&
    greetingPattern.test(remainingText)
  ) {
    remainingText = remainingText
      .replace(greetingPattern, "")
      .trim();

    hadGreeting = true;
  }

  return {
    hadGreeting,
    remainingText
  };
}

function isSocialGreeting(text) {
  const cleanedText = text
    .replace(/[?.!]+$/g, "")
    .trim();

  const socialGreetings = [
    "how are you",
    "how are you doing",
    "how have you been",
    "how is everything",
    "how are things",
    "how is it going",
    "how's it going",
    "what is up",
    "what's up",
    "whats up",
    "how do you do"
  ];

  return socialGreetings.includes(cleanedText);
}

function isRequest(text) {
  const requestPatterns = [
    /^can you\b/,
    /^could you\b/,
    /^would you\b/,
    /^will you\b/,
    /^please\b/,
    /^i need\b/,
    /^i want\b/,
    /^i would like\b/,
    /^tell me\b/,
    /^show me\b/,
    /^give me\b/,
    /^find me\b/,
    /^explain\b/,
    /^write\b/,
    /^make\b/,
    /^create\b/
  ];

  return requestPatterns.some(pattern => pattern.test(text));
}

function isQuestion(text) {
  if (text.includes("?")) {
    return true;
  }

  const questionPatterns = [
    /^what\b/,
    /^why\b/,
    /^when\b/,
    /^where\b/,
    /^who\b/,
    /^which\b/,
    /^whose\b/,
    /^how\b/,
    /^is\b/,
    /^are\b/,
    /^am\b/,
    /^do\b/,
    /^does\b/,
    /^did\b/,
    /^can\b/,
    /^could\b/,
    /^would\b/,
    /^will\b/,
    /^should\b/,
    /^have\b/,
    /^has\b/
  ];

  return questionPatterns.some(pattern => pattern.test(text));
}

function containsAnyPhrase(text, phrases) {
  return phrases.some(phrase => {
    const escapedPhrase = escapeRegExp(phrase);

    const phrasePattern = new RegExp(
      `(^|\\s|[,.!?])${escapedPhrase}(?=$|\\s|[,.!?])`,
      "i"
    );

    return phrasePattern.test(text);
  });
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
