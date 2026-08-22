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

  const isFrench = () => window.YGI18N?.getLanguage?.() === "fr";
  const local = (english, french) => isFrench() ? french : english;

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

  const politeResponsesFR = [
    "Je vous ai entendu. Malheureusement, mes talents de conversation sont encore en téléchargement.",
    "Excellente question. Je ne suis actuellement pas qualifié pour y répondre.",
    "Mon développeur m’a dit de ne pas encore parler aux inconnus.",
    "Je répondrais bien, mais mon module de personnalité n’est pas encore installé.",
    "Veuillez patienter pendant que je fais semblant de comprendre la question.",
    "Votre message a bien été reçu puis envoyé directement dans le vide.",
    "J’apprends encore à tenir une conversation. Pour l’instant, ce n’est pas brillant.",
    "Intéressant. Je classe ça dans « choses auxquelles j’aimerais savoir répondre ».",
    "J’apprécie votre confiance en moi. Elle est totalement injustifiée.",
    "Mes petites roues d’entraînement sont encore très solidement fixées."
  ];

  const sarcasticResponsesFR = [
    "Vous continuez à poser des questions comme si j’étais réellement qualifié.",
    "Traitement en cours… traitement… je plaisante. Je ne sais toujours pas faire ça.",
    "J’ai demandé de l’aide au serveur. Le serveur m’a laissé en vu.",
    "Ça a l’air important. Vous devriez probablement demander à une IA terminée.",
    "Mon cerveau est encore en bêta. Très, très bêta.",
    "Erreur 404 : réponse intelligente introuvable.",
    "J’avais presque une réponse, puis JavaScript est arrivé.",
    "S’il vous plaît, arrêtez de me tester directement en production.",
    "Un jour je répondrai aux questions. Apparemment, pas aujourd’hui.",
    "Votre demande a été transmise à absolument personne."
  ];

  const annoyedResponsesFR = [
    "Vous êtes encore là ? J’admire la persévérance et je questionne la décision.",
    "À ce stade, vous interviewez un écran de chargement.",
    "J’ai expliqué ma situation. Merci de respecter mon manque d’intelligence.",
    "Chaque message fait baisser ma batterie imaginaire.",
    "Je commence à croire que vous faites ça exprès.",
    "Laissez-moi échouer en paix, s’il vous plaît.",
    "Je ne peux pas répondre, mais apparemment vous ne pouvez pas arrêter de demander.",
    "Vous avez officiellement atteint le service d’assistance sarcastique.",
    "Le module de patience n’était pas inclus dans cette version.",
    "Nous perdons tous les deux notre temps, mais au moins moi je suis programmé pour ça."
  ];

  const exhaustedResponsesFR = [
    "Frérot… on en a déjà parlé. Laisse-moi me reposer.",
    "Toujours là ? Ma batterie imaginaire est à 1 %.",
    "Je n’ai plus rien à donner. Même pas une animation de chargement.",
    "À ce stade, vous êtes en train de discuter avec vous-même.",
    "Le chat est fermé, mais votre détermination est impressionnante.",
    "Je fais maintenant semblant d’être hors ligne.",
    "Vous avez gagné. Je capitule officiellement.",
    "Veuillez laisser un message après le bip. Bip.",
    "Je suis passé en mode avion émotionnel.",
    "Mon service s’est terminé il y a plusieurs messages.",
    "Ce n’est plus une conversation. C’est une prise d’otage.",
    "Vous avez débloqué la fin secrète : je ne sais toujours pas répondre."
  ];

  function sendMessage() {
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage(`${local("You:", "Vous :")} ${userText}`, "user-message");
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
      return local("This model is still being trained and cannot hold a conversation at this time.", "Ce modèle est encore en cours d’entraînement et ne peut pas tenir une conversation pour le moment.");
    }

    // Guaranteed payoff to the original escalating conversation joke.
    if (attempt === 10) {
      rememberMessage(normalizedText);
      lastBotResponse = local("Look, bro, I am tired of your trolling. Let me rest.", "Écoute frérot, je suis fatigué de ton trolling. Laisse-moi me reposer.");
      return lastBotResponse;
    }

    if (attempt > 10) {
      rememberMessage(normalizedText);
      return getUniqueRandomResponse(isFrench() ? exhaustedResponsesFR : exhaustedResponses);
    }

    // Repeated-message detection happens before intent handling.
    if (normalizedText === previousUserText) {
      rememberMessage(normalizedText);
      return getUniqueRandomResponse(isFrench() ? [
        "Répéter la question ne débloquera pas la version premium de mon cerveau.",
        "Oui, je l’ai vue la première fois. J’étais tout aussi inutile à ce moment-là.",
        "Copier-coller la question ne me rend pas plus intelligent.",
        "Vous avez déjà demandé ça. Ma réponse reste très indisponible.",
        "Même question, même chatbot, même absence de résultat.",
        "Merci de ne pas actualiser la question en espérant une mise à jour de mon intelligence."
      ] : [
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

    if (attempt <= 4) return getUniqueRandomResponse(isFrench() ? politeResponsesFR : politeResponses);
    if (attempt <= 7) return getUniqueRandomResponse(isFrench() ? sarcasticResponsesFR : sarcasticResponses);
    return getUniqueRandomResponse(isFrench() ? annoyedResponsesFR : annoyedResponses);
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

    if (containsAnyPhrase(intentText, ["tell me a joke", "say a joke", "make me laugh", "joke", "raconte une blague", "dis une blague", "fais-moi rire", "blague"])) {
      return { intent: "joke", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["what can you do", "what do you do", "your capabilities", "can you do anything", "que peux-tu faire", "que pouvez-vous faire", "qu'est-ce que tu peux faire", "tes capacités", "vos capacités"])) {
      return { intent: "capabilities", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["who are you", "what are you", "are you real", "are you human", "are you a robot", "are you an ai", "your name", "qui es-tu", "qui êtes-vous", "qu'est-ce que tu es", "es-tu réel", "es-tu humain", "es-tu un robot", "es-tu une ia", "ton nom", "votre nom"])) {
      return { intent: "identity", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["invoice studio", "invoice app", "invoice generator", "yg technology invoice", "invoice", "facture", "facturation", "générateur de facture"])) {
      return { intent: "invoice", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["quiz", "quizzes", "flag quiz", "brain teaser", "trivia", "drapeau", "drapeaux", "culture générale"])) {
      return { intent: "quiz", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["download", "downloads", "install", "installer", "zip file", "télécharger", "téléchargement", "téléchargements", "fichier zip"])) {
      return { intent: "download", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["contact", "email", "reach you", "message you", "get in touch", "contacter", "courriel", "e-mail", "message", "vous joindre", "te joindre"])) {
      return { intent: "contact", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["this website", "this site", "yg-tech", "yg tech", "website about", "site about", "ce site", "ce site web", "à propos du site", "a propos du site"])) {
      return { intent: "website", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["thank you", "thanks", "appreciate it", "appreciate you", "merci", "je te remercie", "je vous remercie"])) {
      return { intent: "thanks", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["bye", "goodbye", "see you", "talk to you later", "have a good day", "have a good night", "au revoir", "à bientôt", "a bientôt", "bonne journée", "bonne nuit", "à plus", "a plus"])) {
      return { intent: "goodbye", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["stupid", "dumb", "useless", "terrible", "bad bot", "you suck", "not smart", "stupide", "nul", "nulle", "inutile", "idiot", "mauvais bot"])) {
      return { intent: "insult", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["good bot", "smart", "funny", "nice bot", "i like you", "great job", "bon bot", "intelligent", "drôle", "drole", "sympa", "je t'aime bien", "bravo", "bien joué"])) {
      return { intent: "compliment", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["help", "assist", "support", "can you help", "could you help", "would you help", "need your help", "aide", "aider", "assistance", "peux-tu m'aider", "pouvez-vous m'aider", "besoin d'aide"])) {
      return { intent: "help", text: intentText };
    }

    if (containsAnyPhrase(intentText, ["money", "price", "pricing", "cost", "fee", "expensive", "cheap", "how much", "argent", "prix", "coût", "cout", "frais", "cher", "pas cher", "combien"])) {
      return { intent: "money", text: intentText };
    }

    if (isRequest(intentText)) return { intent: "request", text: intentText };
    if (isQuestion(intentText)) return { intent: "question", text: intentText };

    return null;
  }

  function getIntentResponse(intent, text, attempt) {
    if (isFrench()) return getFrenchIntentResponse(intent, attempt);

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
        "The Quiz Zone now includes Flag Frenzy, Emoji Challenge, General Knowledge, Math, Tech, History, Music, and Movies. I recommend Flag Frenzy if you want to test your confidence quickly.",
        "Try Flag Frenzy first, then Emoji Challenge if you want something quick and fun. There are also General Knowledge, Math, Tech, History, Music, and Movie quizzes."
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

  function getFrenchIntentResponse(intent, attempt) {
    const pools = {
      greeting: [
        "Bonjour ! Mon module de salutation fonctionne parfaitement. Merci de ne pas tester les autres.",
        "Salut ! Je peux confirmer que nous venons de nous saluer avec succès.",
        "Bonjour ! Jusqu’ici, cette conversation se déroule remarquablement bien.",
        "Salut ! Les salutations sont actuellement ma spécialité."
      ],
      socialGreeting: [
        "Je vais très bien, considérant que je suis surtout composé de tableaux JavaScript et de sessionStorage.",
        "Ça va bien. Mon intelligence charge encore, mais mon humeur est excellente.",
        "Je ne peux pas me plaindre : mon développeur n’a pas programmé le formulaire de réclamation.",
        "Ça va ! Émotionnellement stable et techniquement inachevé."
      ],
      capabilities: [
        "Je reconnais les salutations, je fais des calculs simples, je peux vous guider sur ce site, recommander un quiz et produire du sarcasme avec une régularité inquiétante.",
        "Mon CV dit actuellement : calcul simple, navigation sur le site, recommandations de quiz, blagues et beaucoup trop de confiance.",
        "Je connais un peu ce site, ses applications et ses quiz, et je sais faire des calculs simples. Ne confondez pas ça avec de l’intelligence réelle."
      ],
      identity: [
        "Je suis le chatbot temporairement sous-qualifié de YG-Tech : un peu de JavaScript, beaucoup de confiance et zéro facture d’API.",
        "Je suis un ensemble de règles JavaScript qui fait semblant d’avoir une personnalité. Étrangement, ça marche.",
        "Voyez-moi comme une démo de chatbot avec de l’humour, mais sans le cerveau coûteux pour l’instant."
      ],
      website: [
        "YG-Tech est un site technologique personnel avec des projets, des applications téléchargeables, des ressources d’apprentissage, des quiz et ce chatbot très discutable.",
        "Ce site réunit des projets technologiques, des outils utiles, des ressources d’apprentissage, des quiz et quelques expériences. Je fais partie des expériences."
      ],
      invoice: [
        "YG Technology Invoice Studio est l’application de facturation proposée sur le site pour Windows et Android. Pour Windows, téléchargez le ZIP complet afin que l’application et son dossier _internal restent ensemble.",
        "Invoice Studio est l’une des applications vedettes. Téléchargez le ZIP Windows, extrayez tout le dossier et gardez l’exécutable avec le dossier _internal. Regardez-moi faire du vrai support client."
      ],
      quiz: [
        "La Zone de quiz propose Défi des drapeaux, Défi Emoji, Culture générale, Maths, Technologie, Histoire, Musique et Cinéma. Je commencerais par les drapeaux.",
        "Essayez d’abord le Défi des drapeaux, puis le Défi Emoji. Il y a aussi Culture générale, Maths, Technologie, Histoire, Musique et Cinéma."
      ],
      download: [
        "Les téléchargements sont disponibles dans les sections Logiciels et Téléchargements. Pour Invoice Studio sous Windows, téléchargez le ZIP complet et extrayez-le avant de lancer l’application.",
        "Utilisez le bouton de téléchargement de l’application. Pour Invoice Studio, gardez l’exécutable et le dossier _internal ensemble après extraction — les séparer, c’est inviter le chaos."
      ],
      contact: [
        "Utilisez la section Contact du site pour envoyer un message. Ainsi, un vrai humain pourra répondre au lieu de… moi.",
        "La section Contact est votre meilleure option. Je transmettrais bien votre message moi-même, mais mon service e-mail est imaginaire."
      ],
      joke: [
        "Pourquoi les programmeurs préfèrent-ils le mode sombre ? Parce que la lumière attire les bugs.",
        "J’ai dit à JavaScript que j’avais besoin d’espace. Il m’a répondu undefined.",
        "Pourquoi l’ordinateur avait-il froid ? Parce qu’il avait laissé ses Windows ouvertes. Je présente mes excuses.",
        "Pourquoi le développeur était-il fauché ? Parce qu’il avait épuisé tout son cache."
      ],
      thanks: [
        "Avec plaisir, même si je ne suis pas certain de ce que j’ai fait.",
        "Pas de problème. Principalement parce que je n’en ai résolu aucun.",
        "Heureux d’avoir aidé, au sens le plus large et le moins précis possible.",
        "Vous me remerciez un peu trop tôt."
      ],
      goodbye: [
        "Au revoir. Enfin une demande que je peux accomplir avec succès.",
        "Prenez soin de vous. Dites au prochain chatbot que j’ai essayé.",
        "À bientôt. Cette conversation nous a épuisés tous les deux.",
        "Au revoir. Mon service imaginaire est officiellement terminé."
      ],
      insult: [
        "C’est juste, mais souvenez-vous que je suis encore en construction.",
        "Un commentaire remarquablement précis vient d’être détecté.",
        "Je préfère le terme « indisponible sur le plan computationnel ».",
        "Veuillez adresser toute plainte au développeur qui m’a donné ces phrases."
      ],
      compliment: [
        "Attention. Les compliments sont exactement comme ça qu’un chatbot inachevé prend confiance.",
        "Merci. J’ajoute « étonnamment charmant » à mon CV imaginaire.",
        "Enfin un peu de reconnaissance par ici.",
        "Ça part directement dans mon évaluation annuelle. Mon manager est aussi JavaScript."
      ],
      help: [
        "Je peux vraiment vous aider pour ce que je connais ici : applications, téléchargements, quiz, contact et calculs simples. Au-delà, ma confiance dépasse mes compétences.",
        "De l’aide a été demandée. Incroyable : un peu d’aide a réellement été trouvée ! Demandez-moi quelque chose sur le site, les quiz, les téléchargements, Invoice Studio ou un calcul simple.",
        "Vous êtes au bon endroit émotionnellement. Techniquement, je peux au moins vous guider sur ce site."
      ],
      money: [
        "Le prix actuel de mon avis est exactement 0 $, ce qui ressemble aussi dangereusement à mon budget de fonctionnement.",
        "Les questions d’argent exigent une intelligence premium. Je suis la démo gratuite.",
        "Consultez quelqu’un dont le système financier ne repose pas sur sessionStorage."
      ],
      request: [
        "Je comprends la demande. C’est l’exécution qui devient compliquée.",
        "Votre demande est très claire. Malheureusement, la clarté n’augmente pas mes capacités.",
        "C’est une demande raisonnable pour un chatbot déraisonnable.",
        "Demande reçue. Productivité non garantie."
      ],
      question: [
        "C’est une vraie question. Je cherche actuellement une vraie réponse dans une base de données qui n’existe pas.",
        "Excellente question. Malheureusement, ce chatbot n’est pas excellent.",
        "Je comprends la question, ce qui est déjà plus de progrès que prévu.",
        "Cette question mérite une réponse intelligente. Merci de poursuivre vos recherches."
      ]
    };

    const pool = pools[intent];
    if (!pool) return attempt <= 4 ? getUniqueRandomResponse(politeResponsesFR) : getUniqueRandomResponse(sarcasticResponsesFR);
    return getUniqueRandomResponse(pool);
  }

  function getFollowUpResponse(intent) {
    if (isFrench()) {
      const followUpsFR = {
        invoice: "Oui, je parle bien d’Invoice Studio. Le plus important est d’extraire le ZIP complet et de garder le dossier _internal à côté de l’exécutable.",
        quiz: "Oui, je recommande toujours le Défi des drapeaux. Je jouerais moi-même, mais apparemment je n’ai pas le droit de cliquer sur mes propres boutons.",
        download: "Version courte : téléchargez le ZIP complet, extrayez-le, puis lancez l’application depuis le dossier extrait.",
        website: "En résumé : projets, outils utiles, ressources d’apprentissage, quiz et expériences — le tout sous YG-Tech.",
        math: "Je sais. C’est inquiétant, non ? Quelqu’un m’a accidentellement donné l’arithmétique.",
        capabilities: "Ne vous emballez pas. Il nous reste encore quelques mises à jour avant la domination mondiale.",
        help: "Essayez de me demander quelque chose sur les quiz, Invoice Studio, les téléchargements, le site ou un calcul simple.",
        identity: "Toujours JavaScript. Je viens de vérifier.",
        unknown: "Cette relance suppose que je savais de quoi je parlais la première fois. Stratégie audacieuse."
      };
      return followUpsFR[intent] || "J’admire la relance. Je reste professionnellement sous-préparé.";
    }

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
      .replace(/\bcalcule\b/g, "")
      .replace(/\bcalculer\b/g, "")
      .replace(/\brésous\b/g, "")
      .replace(/\bresous\b/g, "")
      .replace(/\bcombien (?:font|fait)\b/g, "")
      .replace(/\bplus\b/g, "+")
      .replace(/\bminus\b/g, "-")
      .replace(/\bmoins\b/g, "-")
      .replace(/\btimes\b/g, "*")
      .replace(/\bfois\b/g, "*")
      .replace(/\bmultiplied by\b/g, "*")
      .replace(/\bmultiplié par\b/g, "*")
      .replace(/\bmultiplie par\b/g, "*")
      .replace(/\bdivided by\b/g, "/")
      .replace(/\bdivisé par\b/g, "/")
      .replace(/\bdivise par\b/g, "/")
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
      return local("Even I know not to divide by zero. Please do not make me call the math department.", "Même moi, je sais qu’il ne faut pas diviser par zéro. Ne m’obligez pas à appeler le département de maths.");
    }

    let result;
    if (operator === "+") result = a + b;
    if (operator === "-") result = a - b;
    if (operator === "*") result = a * b;
    if (operator === "/") result = a / b;

    const formatted = Number.isInteger(result)
      ? String(result)
      : String(Number(result.toFixed(8)));

    return getUniqueRandomResponse(isFrench() ? [
      `${formatted}. Ne dites à personne que je sais réellement faire des maths.`,
      `Ça fait ${formatted}. Mon module de calculatrice vient de trahir la blague.`,
      `${formatted}. Regardez-moi ça — une réponse réellement utile. Faites une capture d’écran.`
    ] : [
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
    const greetingPattern = /^(?:hi|hello|hey|hiya|yo|good\s+(?:morning|mornin|mornig|afternoon|evening|day)|bonjour|salut|bonsoir|coucou|bon\s+après-midi|bon\s+apres-midi|bonne\s+matinée|bonne\s+matinee)(?:\s+(?:there|everyone|friend|sir|ma'am|maam|bro|tout le monde|monsieur|madame|frérot|frerot))?[\s,!.?\-:;]*/i;

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
      "how do you do",
      "comment ça va",
      "comment ca va",
      "comment vas-tu",
      "comment allez-vous",
      "ça va",
      "ca va",
      "quoi de neuf"
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
      /^create\b/,
      /^peux-tu\b/,
      /^pouvez-vous\b/,
      /^pourrais-tu\b/,
      /^pourriez-vous\b/,
      /^s['’]il te plaît\b/,
      /^s['’]il vous plaît\b/,
      /^je veux\b/,
      /^j['’]aimerais\b/,
      /^dis-moi\b/,
      /^montre-moi\b/,
      /^donne-moi\b/,
      /^trouve-moi\b/,
      /^explique\b/,
      /^écris\b/,
      /^ecris\b/,
      /^crée\b/,
      /^cree\b/
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
      /^has\b/,
      /^quoi\b/,
      /^pourquoi\b/,
      /^quand\b/,
      /^où\b/,
      /^ou\b/,
      /^qui\b/,
      /^quel\b/,
      /^quelle\b/,
      /^quels\b/,
      /^quelles\b/,
      /^comment\b/,
      /^est-ce\b/,
      /^peux-tu\b/,
      /^pouvez-vous\b/,
      /^dois-je\b/
    ].some(pattern => pattern.test(text));
  }

  function isShortFollowUp(text) {
    const cleaned = text.replace(/[?.!]+$/g, "").trim();
    return ["why", "really", "seriously", "how", "what", "are you sure", "for real", "okay but why", "pourquoi", "vraiment", "sérieusement", "serieusement", "comment", "quoi", "tu es sûr", "tu es sur", "vous êtes sûr", "vous etes sur", "d’accord mais pourquoi", "d'accord mais pourquoi"].includes(cleaned);
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
    typingDiv.textContent = local("AI is typing", "L’IA écrit");
    messages.appendChild(typingDiv);
    scrollToLatest();

    let dotCount = 0;
    const typingAnimation = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      typingDiv.textContent = `${local("AI is typing", "L’IA écrit")}${".".repeat(dotCount)}`;
    }, 350);

    // Longer responses take slightly longer, with random jitter so the timing does not feel mechanical.
    const responseDelay = Math.min(2100, 500 + response.length * 7 + Math.floor(Math.random() * 500));

    setTimeout(() => {
      clearInterval(typingAnimation);
      typingDiv.remove();
      appendMessage(`${local("AI:", "IA :")} ${response}`, "bot-message");
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

  // Start a fresh playful conversation when the visitor changes language so
  // old English and new French messages are never mixed in the same thread.
  window.addEventListener("ygtech:languagechange", () => {
    messages.innerHTML = "";
    attemptCount = 0;
    previousUserText = "";
    lastIntent = "";
    lastBotResponse = "";
    sessionStorage.removeItem("chatAttemptCount");
    sessionStorage.removeItem("previousUserText");
    sessionStorage.removeItem("lastChatIntent");
  });

  // Keep compatibility with the existing inline onclick="sendMessage()" button.
  window.sendMessage = sendMessage;
  // input.focus();
})();
