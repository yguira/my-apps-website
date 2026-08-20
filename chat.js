// chat.js
// Lightweight "smart" chat simulation — no API calls or usage costs.

(() => {
  "use strict";

  const messages = document.getElementById("messages");
  const input = document.getElementById("user-input");
  const sendButton = document.querySelector(".chat-input button");

  // Exit quietly on pages that do not contain the chat box.
  if (!messages || !input) return;

  let attemptCount = Number(sessionStorage.getItem("chatAttemptCount")) || 0;
  let previousUserText = sessionStorage.getItem("previousUserText") || "";
  let lastIntent = sessionStorage.getItem("lastChatIntent") || "";
  let lastBotResponse = "";

  const politeResponses = [
    "I heard you. Unfortunately, my conversation skills are still downloading.",
    "That is a great question. I am currently not qualified to answer it.",
    "My developer told me not to talk to strangers yet.",
    "I would answer, but they have not installed my personality package.",
    "Please hold while I pretend to understand your question.",
    "Your message has been received and placed directly into the void.",
    "I am still learning how conversations work. So far, not great.",
    "Interesting. I have logged that under 'things I wish I could answer.'",
    "I appreciate your confidence in me. It is completely misplaced.",
    "My training wheels are still attached. Very securely."
  ];

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
    "Your request has been escalated to absolutely nobody."
  ];

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
    "You have unlocked the secret ending: I still cannot answer."
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
    const normalizedText = normalizeMessage(userText);

    // The first attempt remains the original joke/setup.
    if (attempt === 1) {
      rememberMessage(normalizedText);
      return "This model is still being trained and cannot hold a conversation at this time.";
    }

    // Guaranteed payoff to the original escalating conversation joke.
    if (attempt === 10) {
      rememberMessage(normalizedText);
      lastBotResponse = "Look, bro, I am tired of your trolling. Let me rest.";
      return lastBotResponse;
    }

    if (attempt > 10) {
      rememberMessage(normalizedText);
      return getUniqueRandomResponse(exhaustedResponses);
    }

    // Repeated-message detection happens before intent handling.
    if (normalizedText === previousUserText) {
      rememberMessage(normalizedText);
      return getUniqueRandomResponse([
        "Repeating the question will not unlock the premium version of my brain.",
        "Yes, I saw it the first time. I was equally unhelpful then.",
        "Copying and pasting the question does not make me smarter.",
        "You already asked that. My answer is still aggressively unavailable.",
        "Same question, same chatbot, same lack of results.",
        "Please do not refresh the question and expect updated intelligence."
      ]);
    }

    rememberMessage(normalizedText);

    // A tiny real capability: basic two-number arithmetic, still with personality.
    const mathResponse = trySimpleMath(normalizedText);
    if (mathResponse) {
      rememberIntent("math");
      return mathResponse;
    }

    // Short follow-ups can reference the kind of thing the user asked previously.
    if (isShortFollowUp(normalizedText) && lastIntent) {
      return getFollowUpResponse(lastIntent);
    }

    const intentResult = detectIntent(normalizedText);
    if (intentResult) {
      rememberIntent(intentResult.intent);
      return getIntentResponse(intentResult.intent, intentResult.text, attempt);
    }

    rememberIntent("unknown");

    if (attempt <= 4) return getUniqueRandomResponse(politeResponses);
    if (attempt <= 7) return getUniqueRandomResponse(sarcasticResponses);
    return getUniqueRandomResponse(annoyedResponses);
  }

  function detectIntent(text) {
    const greetingResult = removeLeadingGreetings(text);
    const hadGreeting = greetingResult.hadGreeting;
    const remainingText = greetingResult.remainingText;

    if (hadGreeting && remainingText === "") {
      return { intent: "greeting", text: "" };
    }

    const intentText = hadGreeting ? remainingText : text;

    if (isSocialGreeting(intentText)) return { intent: "socialGreeting", text: intentText };

    if (containsAnyPhrase(intentText, ["tell me a joke", "say a joke", "make me laugh", "joke"])) {
      return { intent: "joke", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["what can you do", "what do you do", "your capabilities", "can you do anything"])) {
      return { intent: "capabilities", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["who are you", "what are you", "are you real", "are you human", "are you a robot", "are you an ai", "your name"])) {
      return { intent: "identity", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["invoice studio", "invoice app", "invoice generator", "yg technology invoice", "invoice"])) {
      return { intent: "invoice", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["quiz", "quizzes", "flag quiz", "brain teaser", "trivia"])) {
      return { intent: "quiz", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["download", "downloads", "install", "installer", "zip file"])) {
      return { intent: "download", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["contact", "email", "reach you", "message you", "get in touch"])) {
      return { intent: "contact", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["this website", "this site", "yg-tech", "yg tech", "website about", "site about"])) {
      return { intent: "website", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["thank you", "thanks", "appreciate it", "appreciate you"])) {
      return { intent: "thanks", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["bye", "goodbye", "see you", "talk to you later", "have a good day", "have a good night"])) {
      return { intent: "goodbye", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["stupid", "dumb", "useless", "terrible", "bad bot", "you suck", "not smart"])) {
      return { intent: "insult", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["good bot", "smart", "funny", "nice bot", "i like you", "great job"])) {
      return { intent: "compliment", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["help", "assist", "support", "can you help", "could you help", "would you help", "need your help"])) {
      return { intent: "help", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["money", "price", "pricing", "cost", "fee", "expensive", "cheap", "how much"])) {
      return { intent: "money", text: intentText };
    }

    if (isRequest(intentText)) return { intent: "request", text: intentText };
    if (isQuestion(intentText)) return { intent: "question", text: intentText };

    return null;
  }

  function getIntentResponse(intent, text, attempt) {
    const pools = {
      greeting: [
        "Hello! My greeting module works perfectly. Please do not test the other modules.",
        "Hi there. I can confidently confirm that we have now greeted each other.",
        "Hello! So far, this conversation is going extremely well.",
        "Hey! Greetings are currently my strongest feature.",
        "Hello, human. Social interaction successfully completed.",
        "Hi! I was trained extensively for this exact moment."
      ],
      socialGreeting: [
        "I am doing great, considering I am mostly arrays and sessionStorage.",
        "I am doing well. My intelligence is still loading, but my mood is excellent.",
        "I cannot complain. My developer did not program a complaint form.",
        "I am good! Emotionally stable and technically unfinished.",
        "Doing well. Thanks for asking before requesting free technical support."
      ],
      capabilities: [
        "I can recognize greetings, answer basic arithmetic, point you around this site, recommend a quiz, and deliver sarcasm with suspicious consistency.",
        "My résumé currently says: simple math, site navigation, quiz recommendations, jokes, and pretending to be much smarter than I am.",
        "I know a little about this website, its apps and quizzes, and I can handle basic math. Please do not confuse that with actual intelligence."
      ],
      identity: [
        "I am YG-Tech's temporarily underqualified chatbot: part JavaScript, part confidence, zero API bill.",
        "I am a collection of JavaScript rules pretending to have a personality. Somehow it is working.",
        "Think of me as a chatbot demo with a sense of humor and no access to the expensive brain yet."
      ],
      website: [
        "YG-Tech is a personal technology site with projects, downloadable apps, learning resources, quizzes, and this highly questionable chatbot.",
        "This site is a mix of technology projects, useful tools, learning content, quizzes, and experiments. I am one of the experiments."
      ],
      invoice: [
        "YG Technology Invoice Studio is the Windows invoicing app featured on the site. The download is packaged as a ZIP so the app and its required _internal folder stay together.",
        "Invoice Studio is one of the featured apps. Download the Windows ZIP, extract the whole folder, and keep the executable with its _internal folder. Look at me doing actual customer support."
      ],
      quiz: [
        "The Quiz Zone now includes Flag Frenzy, Brain Teasers, General Knowledge, Math, Tech, History, Music, and Movies. I recommend Flag Frenzy if you want to test your confidence quickly.",
        "Try Flag Frenzy first, then Brain Teasers if you still trust your brain. There are also General Knowledge, Math, Tech, History, Music, and Movie quizzes."
      ],
      download: [
        "Downloads are listed in the Featured Apps area. For Invoice Studio, download the full Windows ZIP and extract it before running the app.",
        "Use the app's download button on the site. If it is Invoice Studio, keep the extracted executable and _internal folder together — separating them is how chaos begins."
      ],
      contact: [
        "Use the Contact section on the site to send a message. That way a real human can respond instead of... whatever I am doing here.",
        "The site's Contact section is your best route. I would forward your message myself, but my email department is imaginary."
      ],
      joke: [
        "Why did the developer go broke? Because he used up all his cache.",
        "Why do programmers prefer dark mode? Because light attracts bugs.",
        "I told JavaScript I needed space. It gave me undefined.",
        "Why was the computer cold? It left its Windows open. I am legally required to apologize for that one."
      ],
      thanks: [
        "You are welcome, although I am not sure what I did.",
        "No problem. Mostly because I did not solve one.",
        "Happy to help, in the broadest and least accurate sense.",
        "You are thanking me too early."
      ],
      goodbye: [
        "Goodbye. Finally, a request I can successfully handle.",
        "Take care. Please tell the next chatbot I tried.",
        "Bye. This was exhausting for both of us.",
        "Goodbye. My imaginary shift is officially over."
      ],
      insult: [
        "That is fair, but please remember that I am still under construction.",
        "Accurate feedback has been detected.",
        "I prefer the term 'computationally unavailable.'",
        "Please direct all complaints to the developer who gave me these sentences."
      ],
      compliment: [
        "Careful. Compliments are how unfinished chatbots develop confidence.",
        "Thank you. I will be adding 'surprisingly charming' to my imaginary résumé.",
        "Finally, some recognition around here.",
        "That is going straight to my performance review. My manager is also JavaScript."
      ],
      help: [
        "I can help with the important stuff I actually know about this site: apps, downloads, quizzes, contact info, and basic arithmetic. Beyond that, confidence exceeds capability.",
        "Help has been requested. Limited help has actually been located! Ask me about the site, quizzes, downloads, Invoice Studio, or simple math.",
        "You came to the right place emotionally. Technically, I can at least guide you around this site."
      ],
      money: [
        "The current price of my opinion is exactly $0, which is also suspiciously close to my operating budget.",
        "Money questions require premium intelligence. I am the free demo.",
        "Please consult someone whose financial system is not sessionStorage."
      ],
      request: [
        "I understand the request. Completing it is where things become complicated.",
        "You asked very clearly. Unfortunately, clarity does not increase my abilities.",
        "That sounds like a reasonable request for an unreasonable chatbot.",
        "Request received. Productivity not guaranteed."
      ],
      question: [
        "That is a valid question. I am currently searching for a valid answer in a database that does not exist.",
        "Excellent question. Unfortunately, this is not an excellent chatbot.",
        "I understand the question, which is already more progress than expected.",
        "That question deserves an intelligent response. Please continue looking."
      ]
    };

    const pool = pools[intent];
    if (!pool) return attempt <= 4 ? getUniqueRandomResponse(politeResponses) : getUniqueRandomResponse(sarcasticResponses);
    return getUniqueRandomResponse(pool);
  }

  function getFollowUpResponse(intent) {
    const followUps = {
      invoice: "Yes, I mean the Invoice Studio download. The important part is extracting the full ZIP and keeping the _internal folder beside the executable.",
      quiz: "Yes, I am still recommending the Flag Quiz. I would play it myself, but apparently I am not allowed to click my own buttons.",
      download: "The short version: download the complete ZIP, extract it, then run the app from the extracted folder.",
      website: "Basically: projects, useful tools, learning resources, quizzes, and experiments — all under YG-Tech.",
      math: "I know. Disturbing, right? Apparently someone accidentally gave me arithmetic.",
      capabilities: "Do not get too excited. We are still several upgrades away from world domination.",
      help: "Try asking me about the quizzes, Invoice Studio, downloads, the website, or a simple calculation.",
      identity: "Still JavaScript. I checked.",
      unknown: "That follow-up assumes I knew what I was talking about the first time. Bold strategy."
    };

    return followUps[intent] || "I admire the follow-up. I remain professionally underprepared.";
  }

  function trySimpleMath(text) {
    let expression = text
      .replace(/\bwhat(?:'s| is)\b/g, "")
      .replace(/\bcalculate\b/g, "")
      .replace(/\bsolve\b/g, "")
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .replace(/\btimes\b/g, "*")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\bdivided by\b/g, "/")
      .replace(/[×x]/g, "*")
      .replace(/÷/g, "/")
      .replace(/[?!.]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const match = expression.match(/^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/);
    if (!match) return null;

    const a = Number(match[1]);
    const operator = match[2];
    const b = Number(match[3]);

    if (operator === "/" && b === 0) {
      return "Even I know not to divide by zero. Please do not make me call the math department.";
    }

    let result;
    if (operator === "+") result = a + b;
    if (operator === "-") result = a - b;
    if (operator === "*") result = a * b;
    if (operator === "/") result = a / b;

    const formatted = Number.isInteger(result)
      ? String(result)
      : String(Number(result.toFixed(8)));

    return getUniqueRandomResponse([
      `${formatted}. Please do not tell anyone I can actually do math.`,
      `That one is ${formatted}. My calculator module has betrayed the joke.`,
      `${formatted}. Look at that — a genuinely useful response. Screenshot it.`
    ]);
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

    // Includes punctuation such as "Good morning?" so punctuation does not turn a greeting into a question.
    const greetingPattern = /^(?:hi|hello|hey|hiya|yo|good\s+(?:morning|mornin|mornig|afternoon|evening|day))(?:\s+(?:there|everyone|friend|sir|ma'am|maam|bro))?[\s,!.?\-:;]*/i;

    while (remainingText && greetingPattern.test(remainingText)) {
      remainingText = remainingText.replace(greetingPattern, "").trim();
      hadGreeting = true;
    }

    return { hadGreeting, remainingText };
  }

  function isSocialGreeting(text) {
    const cleanedText = text.replace(/[?.!]+$/g, "").trim();
    return [
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
    ].includes(cleanedText);
  }

  function isRequest(text) {
    return [
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
    ].some(pattern => pattern.test(text));
  }

  function isQuestion(text) {
    if (text.includes("?")) return true;

    return [
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
    ].some(pattern => pattern.test(text));
  }

  function isShortFollowUp(text) {
    const cleaned = text.replace(/[?.!]+$/g, "").trim();
    return ["why", "really", "seriously", "how", "what", "are you sure", "for real", "okay but why"].includes(cleaned);
  }

  function containsAnyPhrase(text, phrases) {
    return phrases.some(phrase => {
      const escapedPhrase = escapeRegExp(phrase);
      const phrasePattern = new RegExp(`(^|\\s|[,.!?])${escapedPhrase}(?=$|\\s|[,.!?])`, "i");
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

    // Longer responses take slightly longer, with random jitter so the timing does not feel mechanical.
    const responseDelay = Math.min(2100, 500 + response.length * 7 + Math.floor(Math.random() * 500));

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
    let availableResponses = responsePool.filter(response => response !== lastBotResponse);
    if (!availableResponses.length) availableResponses = responsePool;

    const selectedResponse = availableResponses[Math.floor(Math.random() * availableResponses.length)];
    lastBotResponse = selectedResponse;
    return selectedResponse;
  }

  function rememberMessage(message) {
    previousUserText = message;
    sessionStorage.setItem("previousUserText", message);
  }

  function rememberIntent(intent) {
    lastIntent = intent;
    sessionStorage.setItem("lastChatIntent", intent);
  }

  function setChatAvailability(isAvailable) {
    input.disabled = !isAvailable;
    if (sendButton) sendButton.disabled = !isAvailable;
    if (isAvailable) input.focus();
  }

  input.addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });

  // Keep compatibility with the existing inline onclick="sendMessage()" button.
  window.sendMessage = sendMessage;
  // input.focus();
})();
