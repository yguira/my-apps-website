/* YG-Tech offline assistant knowledge + routing layer.
 * No network requests, no API keys. A future secure AI adapter may return
 * {text: string, links: [{label, href}]} from an authenticated backend.
 */
(() => {
  "use strict";
  let topic = "";
  const normalize = value => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[’']/g, "").replace(/[^a-z0-9%+*/.,?\-\s]/g, " ").replace(/\s+/g, " ").trim();
  const words = (text, terms) => terms.some(term => text.includes(term));
  const t = (lang, en, fr) => lang === "fr" ? fr : en;
  const link = (href, en, fr, lang) => ({href, label:t(lang,en,fr)});
  const money = n => Number.isFinite(n) ? Number(n.toFixed(6)).toLocaleString("en-US", {maximumFractionDigits:6}) : null;
  function calculate(s,lang) {
    let m = s.match(/(?:what(?: is| s)?|calculate|compute|combien fait|calcule|calculer)?\s*(-?\d+(?:\.\d+)?)\s*%\s*(?:of|de|sur)\s*(-?\d+(?:\.\d+)?)/);
    if (m) return t(lang,"That comes to ","Cela fait ")+money(Number(m[1])*Number(m[2])/100)+". "+t(lang,"My calculator module actually works. Shocking, I know.","Mon module de calcul fonctionne vraiment. Incroyable, non ?");
    m = s.match(/(?:what(?: is| s)?|calculate|compute|combien fait|calcule|calculer|=|^|\s)\s*(-?\d+(?:\.\d+)?)\s*(\+|\-|\*|\/|x|times|plus|minus|fois|divise par)\s*(-?\d+(?:\.\d+)?)/);
    if (!m) return null;
    const a=Number(m[1]),b=Number(m[3]),op=m[2];
    if ((op==="/" || op==="divise par") && b===0) return t(lang,"Division by zero? Nice try.","Division par zéro ? Bien essayé.");
    const value = ["+","plus"].includes(op)?a+b:["-","minus"].includes(op)?a-b:["*","x","times","fois"].includes(op)?a*b:a/b;
    return t(lang,"The answer is ","La réponse est ")+money(value)+". "+t(lang,"See? I have at least one useful brain cell.","Vous voyez ? J'ai au moins un neurone utile.");
  }
  const entries = [
    {id:"invoice",terms:["invoice","invoic","facture","facturation","billing","receipt","recu"],
     en:"Invoice Studio helps with customers, invoices, receipts and exports. There are Android and Windows editions. The Android edition supports English and French; the Windows ZIP should be extracted completely before running the app.",
     fr:"Invoice Studio aide à gérer les clients, factures, reçus et exports. Il existe sur Android et Windows. La version Android prend en charge le français et l’anglais ; extrayez entièrement le ZIP Windows avant de lancer le logiciel.",
     links:["downloads.html","📥 View downloads","📥 Voir les téléchargements"]},
    {id:"quiz",terms:["quiz","quizz","trivia","flag","drapeau","emoji","math quiz","jeu","practice"],
     en:"The Quiz Zone has Flag Frenzy, Emoji Challenge, General Knowledge, Math, Tech, History, Music and Movies. Want a challenge? Start with Flag Frenzy.",
     fr:"La zone Quiz propose les drapeaux, les émojis, la culture générale, les maths, la technologie, l’histoire, la musique et le cinéma. Essayez d’abord les drapeaux !",
     links:["quizzes.html","🎯 Open quizzes","🎯 Ouvrir les quiz"]},
    {id:"datasets",terms:["dataset","data set","csv","donnee","donnees","excel","sql","tableau","data science"],
     en:"YG-Tech offers practice datasets for Excel, Python, SQL, charts and analytics. You can browse the datasets and learning resources.",
     fr:"YG-Tech propose des jeux de données pour s’exercer avec Excel, Python, SQL, les graphiques et l’analyse. Consultez les données et ressources pédagogiques.",
     links:["datasets.html","📊 Browse datasets","📊 Voir les données"]},
    {id:"contact",terms:["contact","email","mail","support","help desk","contacter","courriel","assistance","message au developpeur"],
     en:"To reach a real person, use the contact form on the homepage or the Support Center. I can't send emails myself. My imaginary inbox is overflowing.",
     fr:"Pour joindre une vraie personne, utilisez le formulaire de contact sur la page d’accueil ou le centre d’assistance. Je ne peux pas envoyer d’e-mails moi-même.",
     links:["index.html#contact","✉️ Contact YG-Tech","✉️ Contacter YG-Tech"]},
    {id:"downloads",terms:["download","telecharg","install","installer","software","logiciel","application","apps","apk"],
     en:"The Downloads page lists available tools and software. For Invoice Studio on Windows, extract the ZIP before launching it.",
     fr:"La page Téléchargements présente les logiciels et outils disponibles. Pour Invoice Studio sur Windows, extrayez le ZIP avant de le lancer.",
     links:["downloads.html","⬇️ Open downloads","⬇️ Voir les téléchargements"]},
    {id:"website",terms:["yg tech","yg-tech","website","this site","site web","ce site","about","a propos","developer","developpeur"],
     en:"YG-Tech is a hub for practical software, quizzes, learning resources, datasets and experiments. The assistant is one of the experiments—please don't tell my developer I said that.",
     fr:"YG-Tech regroupe des logiciels pratiques, des quiz, des ressources d’apprentissage, des données et des expérimentations. Je fais partie des expériences — chut !",
     links:["index.html#explore","🌐 Explore YG-Tech","🌐 Explorer YG-Tech"]}
  ];
  const follow = ["does it","is it","can it","how about","what about","where","how do i","tell me more","and on","et sur","est ce","comment","ou est","en savoir plus","plus de details","ca marche","cela marche"];
  function answer(raw, lang="en") {
    const s=normalize(raw);
    if (!s) return null;
    if (words(s,["tell me a joke","joke","blague","raconte une blague"])) return {text:t(lang,"Why did the developer go broke? Because he used up all his cache. I'll see myself out.","Pourquoi le développeur a-t-il perdu son argent ? Il avait vidé tout son cache !"),links:[]};
    if (words(s,["what can you do","que peux tu faire","que pouvez vous faire","capabilities","tes capacites"])) return {text:t(lang,"I can guide you around YG-Tech, explain Invoice Studio, recommend quizzes, find datasets, handle basic math and percentages, and tell terrible jokes. All offline—no expensive AI brain required.","Je peux vous guider sur YG-Tech, présenter Invoice Studio, proposer des quiz, trouver des données, faire des calculs et pourcentages, et raconter de mauvaises blagues. Le tout hors ligne."),links:[]};
    const calc=calculate(s,lang);
    if(calc) return {text:calc,links:[]};
    let entry=entries.find(e=>words(s,e.terms));
    if (!entry && topic && (s.length<45 || words(s,follow)) && words(s,follow)) entry=entries.find(e=>e.id===topic);
    if (!entry && words(s,["windows","android","iphone","mobile","offline","hors ligne","francais","french"]) && topic==="invoice") entry=entries[0];
    if (!entry) return null; // Fall through to the original playful chatbot.
    topic=entry.id;
    let response=t(lang,entry.en,entry.fr);
    if(entry.id==="invoice") {
      if(words(s,["android","phone","telephone","mobile"])) response=t(lang,"Yes, Invoice Studio has an Android edition (Android 8+). It supports English and French.","Oui, Invoice Studio existe sur Android (Android 8+) avec le français et l’anglais.");
      else if(words(s,["windows","desktop","pc"])) response=t(lang,"Yes, Invoice Studio runs on Windows 10 and 11. Download the ZIP and extract the full folder, keeping the executable and _internal folder together.","Oui, Invoice Studio fonctionne sous Windows 10 et 11. Extrayez tout le ZIP en gardant l’exécutable et le dossier _internal ensemble.");
    }
    return {text:response+" "+t(lang,"Look at me being helpful for once.","Pour une fois, je suis utile !"),links:[link(...entry.links,lang)]};
  }
  window.YGChatSmart=Object.freeze({answer,reset:()=>{topic="";},version:"2.0-offline"});
})();
