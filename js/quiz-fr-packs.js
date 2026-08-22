// French quiz packs for YG-Tech.
// Loaded after each English quiz data file and before quiz-engine.js.
(() => {
  "use strict";

  if (!window.quizData) return;

  const initialLanguage = window.YGI18N?.getLanguage() || "en";
  window.addEventListener("ygtech:languagechange", event => {
    if (event.detail?.language && event.detail.language !== initialLanguage) window.location.reload();
  });

  if (initialLanguage !== "fr") return;

  const source = window.quizData;

  const quizMeta = {
    "🌍 Flag Frenzy": {
      title: "🌍 Défi des drapeaux",
      subtitle: "10 drapeaux aléatoires. Les classiques faciles se corsent rapidement.",
      completionTitle: "🌍 Défi des drapeaux terminé !",
      ranks: [
        "🏆 Parfait ! Vous pourriez probablement reconnaître un pays à son drapeau à trois pâtés de maisons.",
        "🌍 Expert des drapeaux ! Très impressionnant.",
        "🧭 Excellent ! Votre connaissance des drapeaux voyage bien.",
        "👏 Très belle partie ! Seuls quelques drapeaux vous ont échappé.",
        "🙂 Beau travail ! Vos réflexes géographiques sont solides.",
        "🗺️ Pas mal ! Un autre tour du monde et vous y êtes.",
        "😂 Les drapeaux gagnent cette manche. Revanche !"
      ]
    },
    "😄 Emoji Challenge": {
      title: "😄 Défi Emoji",
      subtitle: "10 indices emoji aléatoires sur les films, la nourriture et la vie quotidienne.",
      completionTitle: "😄 Défi Emoji terminé !",
      ranks: [
        "🏆 Parfait ! Vous parlez couramment emoji.",
        "😎 Impressionnant ! Presque aucun indice ne vous résiste.",
        "🎯 Excellent ! Vous décodez les emojis très vite.",
        "👏 Très belle partie ! Quelques indices seulement vous ont échappé.",
        "🙂 Bien joué ! Votre radar à emojis fonctionne bien.",
        "🤔 Pas mal ! Une autre partie pourrait tout changer.",
        "😂 Les emojis gagnent cette manche. À la revanche !"
      ]
    },
    "🧠 General Knowledge Quiz": {
      title: "🧠 Quiz de culture générale",
      subtitle: "10 questions aléatoires. Une sélection différente à chaque partie.",
      completionTitle: "🧠 Quiz de culture générale terminé !",
      ranks: [
        "🏆 Parfait ! Votre culture générale est redoutable.",
        "🧠 Excellent ! Vous savez vraiment beaucoup de choses.",
        "🌟 Très fort ! Une très belle performance.",
        "👏 Bonne partie ! Quelques questions vous ont surpris.",
        "🙂 Bien joué ! Votre culture générale est solide.",
        "🤔 Pas mal ! Une autre partie pourrait vous faire grimper.",
        "😂 Le quiz gagne cette manche. Revanche !"
      ]
    },
    "➕ Math Challenge": {
      title: "➕ Défi de maths",
      subtitle: "10 problèmes aléatoires. Un défi différent à chaque partie.",
      completionTitle: "➕ Défi de maths terminé !",
      ranks: [
        "🏆 Parfait ! Votre calculatrice commence à se sentir inutile.",
        "🧠 Magicien des maths ! Les nombres vous respectent.",
        "📐 Excellent ! Très bon sens des nombres.",
        "➗ Beau travail ! Quelques problèmes seulement vous ont échappé.",
        "✏️ Solide ! Vos muscles mathématiques travaillent bien.",
        "🤔 Pas mal ! Une autre partie pourrait tout changer.",
        "😂 Les maths gagnent cette manche. Exigez une revanche !"
      ]
    },
    "💻 Tech Trivia Quiz": {
      title: "💻 Quiz technologie",
      subtitle: "10 questions aléatoires sur le matériel, le web, le code, la sécurité et plus encore.",
      completionTitle: "💻 Quiz technologie terminé !",
      ranks: [
        "🏆 Parfait ! Le service informatique vient vous demander de l’aide.",
        "🧠 Excellente culture tech. Très impressionnant.",
        "💻 Cerveau tech certifié.",
        "⚡ Très belle partie ! Vous connaissez bien le monde numérique.",
        "🔧 Solides réflexes technologiques.",
        "🤔 Pas mal — un redémarrage et une autre partie devraient suffire.",
        "😂 La technologie gagne cette manche. Avez-vous essayé d’éteindre puis rallumer le quiz ?"
      ]
    },
    "📜 History Buff": {
      title: "📜 Passion histoire",
      subtitle: "10 questions d’histoire aléatoires. Un défi différent à chaque partie.",
      completionTitle: "📜 Défi d’histoire terminé !",
      ranks: [
        "🏛️ Historien suprême ! Les archives n’ont rien à vous apprendre.",
        "📚 Excellent historien ! Très impressionnant.",
        "🧠 Passion histoire confirmée. Vous connaissez vos époques.",
        "⚔️ Très belle performance ! Quelques empires vous ont échappé.",
        "📜 Solide culture historique ! Vous survivriez à un débat d’histoire.",
        "🤔 Respectable ! Le passé garde encore quelques secrets.",
        "😂 Le passé vous bat cette fois. Revanche historique !"
      ]
    },
    "🎵 Music Mania": {
      title: "🎵 Passion musique",
      subtitle: "10 questions musicales aléatoires. Une playlist différente à chaque partie.",
      completionTitle: "🎵 Défi musical terminé !",
      ranks: [
        "🏆 Parfait ! Votre playlist mérite son propre musée.",
        "🎧 Expert musical ! Très impressionnant.",
        "🎵 Excellent ! Votre culture musicale est très large.",
        "👏 Très belle partie ! Quelques notes seulement vous ont échappé.",
        "🙂 Bien joué ! Votre oreille musicale est solide.",
        "🤔 Pas mal ! Une autre chanson, une autre partie.",
        "😂 La musique gagne cette manche. Remettez le son et rejouez !"
      ]
    },
    "🎬 Movie Buff": {
      title: "🎬 Passion cinéma",
      subtitle: "10 questions cinéma aléatoires. Classiques, réalisateurs, acteurs et plus encore.",
      completionTitle: "🎬 Défi cinéma terminé !",
      ranks: [
        "🏆 Parfait ! Hollywood devrait vous appeler.",
        "🎬 Expert cinéma ! Très impressionnant.",
        "🍿 Excellent ! Votre culture cinéma est solide.",
        "👏 Très belle partie ! Quelques scènes seulement vous ont échappé.",
        "🙂 Bien joué ! Vous connaissez vos films.",
        "🤔 Pas mal ! Une autre séance pourrait tout changer.",
        "😂 Le cinéma gagne cette manche. Générique, puis revanche !"
      ]
    }
  };

  const questionsFR = {
    // Flag Frenzy
    "Which country does this flag represent?": "Quel pays ce drapeau représente-t-il ?",

    // Emoji Challenge
    "What movie do these emojis represent? 🦁👑": "Quel film ces emojis représentent-ils ? 🦁👑",
    "What movie do these emojis represent? 🕷️🧑": "Quel film ces emojis représentent-ils ? 🕷️🧑",
    "What movie do these emojis represent? 🚢🧊💔": "Quel film ces emojis représentent-ils ? 🚢🧊💔",
    "What food do these emojis represent? 🍎🥧": "Quel aliment ces emojis représentent-ils ? 🍎🥧",
    "What food do these emojis represent? 🥜🧈🍞": "Quel aliment ces emojis représentent-ils ? 🥜🧈🍞",
    "What movie do these emojis represent? 👻🚫": "Quel film ces emojis représentent-ils ? 👻🚫",
    "What movie do these emojis represent? 👽📞🏠": "Quel film ces emojis représentent-ils ? 👽📞🏠",
    "What movie do these emojis represent? 🧙‍♂️💍🌋": "Quel film ces emojis représentent-ils ? 🧙‍♂️💍🌋",
    "What food do these emojis represent? 🐔🍜": "Quel plat ces emojis représentent-ils ? 🐔🍜",
    "What treat do these emojis represent? 🍪🥛": "Quelle gourmandise ces emojis représentent-ils ? 🍪🥛",
    "What movie do these emojis represent? 🏠👦😱🎄": "Quel film ces emojis représentent-ils ? 🏠👦😱🎄",
    "What movie do these emojis represent? 🐠🔎🌊": "Quel film ces emojis représentent-ils ? 🐠🔎🌊",
    "What movie do these emojis represent? 👠🎃🕛": "Quel film ces emojis représentent-ils ? 👠🎃🕛",
    "What dish do these emojis represent? 🥩🥔": "Quel plat ces emojis représentent-ils ? 🥩🥔",
    "What breakfast do these emojis represent? 🥞🍁": "Quel petit-déjeuner ces emojis représentent-ils ? 🥞🍁",

    // General knowledge
    "What is the capital of France?": "Quelle est la capitale de la France ?",
    "Which planet is known as the Red Planet?": "Quelle planète est surnommée la planète rouge ?",
    "Who wrote 'Romeo and Juliet'?": "Qui a écrit « Roméo et Juliette » ?",
    "What is the largest mammal in the world?": "Quel est le plus grand mammifère du monde ?",
    "Which country is commonly credited with inventing tea drinking?": "À quel pays attribue-t-on généralement l’invention de la consommation du thé ?",
    "Which planet has the shortest day in our solar system?": "Quelle planète a la journée la plus courte de notre système solaire ?",
    "Which empire built Machu Picchu?": "Quel empire a construit le Machu Picchu ?",
    "What is the longest river in South America?": "Quel est le plus long fleuve d’Amérique du Sud ?",
    "What is the hardest natural substance?": "Quelle est la substance naturelle la plus dure ?",
    "What does HTTP stand for?": "Que signifie HTTP ?",
    "Which element has the highest melting point among pure metals?": "Quel élément possède le point de fusion le plus élevé parmi les métaux purs ?",
    "Which treaty formally ended World War I between Germany and the Allied Powers?": "Quel traité a officiellement mis fin à la Première Guerre mondiale entre l’Allemagne et les puissances alliées ?",
    "Which country has the most natural lakes?": "Quel pays possède le plus de lacs naturels ?",
    "Which planet has the most prominent ring system?": "Quelle planète possède le système d’anneaux le plus remarquable ?",
    "Which blood type is known as the universal red-cell donor?": "Quel groupe sanguin est considéré comme donneur universel de globules rouges ?",

    // Math
    "What is 12 × 3?": "Combien font 12 × 3 ?",
    "What is 100 ÷ 4?": "Combien font 100 ÷ 4 ?",
    "What is 15 + 27?": "Combien font 15 + 27 ?",
    "What is the square root of 81?": "Quelle est la racine carrée de 81 ?",
    "What is 50% of 200?": "Combien font 50 % de 200 ?",
    "Solve for x: x + 7 = 19": "Résolvez pour x : x + 7 = 19",
    "Solve for x: 3x = 27": "Résolvez pour x : 3x = 27",
    "What is 25% of 360?": "Combien font 25 % de 360 ?",
    "What is 3/4 of 80?": "Combien font les 3/4 de 80 ?",
    "What is the area of a rectangle with length 8 and width 5?": "Quelle est l’aire d’un rectangle de longueur 8 et de largeur 5 ?",
    "Solve for x: 4x - 7 = 21": "Résolvez pour x : 4x - 7 = 21",
    "Solve for x: 5x + 10 = 3x + 30": "Résolvez pour x : 5x + 10 = 3x + 30",
    "What is the area of a circle with radius 4? Use π ≈ 3.14.": "Quelle est l’aire d’un cercle de rayon 4 ? Utilisez π ≈ 3,14.",
    "A right triangle has legs of 6 and 8. What is the hypotenuse?": "Un triangle rectangle a des côtés perpendiculaires de 6 et 8. Quelle est l’hypoténuse ?",
    "What is 2⁸?": "Combien vaut 2⁸ ?",

    // Tech
    "Who is often called the father of the computer?": "Qui est souvent appelé le père de l’ordinateur ?",
    "What does HTML stand for?": "Que signifie HTML ?",
    "In what year was the first iPhone released?": "En quelle année le premier iPhone est-il sorti ?",
    "What does CPU stand for?": "Que signifie CPU ?",
    "Which company developed the Windows operating system?": "Quelle entreprise a développé le système d’exploitation Windows ?",
    "What is the main purpose of DNS?": "Quel est le rôle principal du DNS ?",
    "What does IP stand for in computer networking?": "Que signifie IP dans les réseaux informatiques ?",
    "Which statement best describes an SSD?": "Quelle affirmation décrit le mieux un SSD ?",
    "Who created Git?": "Qui a créé Git ?",
    "Which transport protocol is connection-oriented?": "Quel protocole de transport est orienté connexion ?",
    "Which TCP port is normally used for HTTPS?": "Quel port TCP est normalement utilisé pour HTTPS ?",
    "Which TCP port is commonly used by SSH?": "Quel port TCP est couramment utilisé par SSH ?",
    "How many layers are in the OSI reference model?": "Combien de couches compte le modèle de référence OSI ?",
    "How many bits are in an IPv6 address?": "Combien de bits contient une adresse IPv6 ?",

    // History
    "Who was the first President of the United States?": "Qui fut le premier président des États-Unis ?",
    "In which year did World War II end?": "En quelle année la Seconde Guerre mondiale s’est-elle terminée ?",
    "Which empire built the Colosseum?": "Quel empire a construit le Colisée ?",
    "What was the name of the ship used by the Pilgrims in 1620?": "Quel était le nom du navire utilisé par les Pèlerins en 1620 ?",
    "Who was British Prime Minister during most of World War II?": "Qui fut Premier ministre britannique pendant la majeure partie de la Seconde Guerre mondiale ?",
    "Who was the first Roman emperor?": "Qui fut le premier empereur romain ?",
    "The Renaissance began in which country?": "Dans quel pays la Renaissance a-t-elle commencé ?",
    "Which event directly triggered World War I?": "Quel événement a directement déclenché la Première Guerre mondiale ?",
    "Which battle is generally considered the final major battle of the American Revolution?": "Quelle bataille est généralement considérée comme la dernière grande bataille de la Révolution américaine ?",
    "Which ancient civilization developed cuneiform writing?": "Quelle civilisation antique a développé l’écriture cunéiforme ?",
    "Which Roman emperor issued the Edict of Milan in 313 CE?": "Quel empereur romain a promulgué l’édit de Milan en 313 ?",
    "Which treaty formally ended the war between Germany and the Allied Powers after World War I?": "Quel traité a officiellement mis fin à la guerre entre l’Allemagne et les puissances alliées après la Première Guerre mondiale ?",
    "Which civilization used quipu as a system of record keeping?": "Quelle civilisation utilisait le quipu comme système de tenue de registres ?",
    "Which Byzantine emperor ordered the construction of Hagia Sophia?": "Quel empereur byzantin a ordonné la construction de Sainte-Sophie ?",
    "Which West African city became famous as a major center of trade and Islamic scholarship?": "Quelle ville d’Afrique de l’Ouest est devenue célèbre comme grand centre de commerce et d’érudition islamique ?",

    // Music
    "Who is widely known as the King of Pop?": "Qui est largement connu comme le Roi de la Pop ?",
    "Which band released 'Bohemian Rhapsody'?": "Quel groupe a sorti « Bohemian Rhapsody » ?",
    "Who recorded 'Rolling in the Deep'?": "Qui a enregistré « Rolling in the Deep » ?",
    "Which instrument is Elton John especially known for playing?": "De quel instrument Elton John est-il particulièrement connu pour jouer ?",
    "What is the stage name of Marshall Mathers?": "Quel est le nom de scène de Marshall Mathers ?",
    "Who composed the 'Moonlight Sonata'?": "Qui a composé la « Sonate au clair de lune » ?",
    "Which artist recorded 'No Woman, No Cry'?": "Quel artiste a enregistré « No Woman, No Cry » ?",
    "Which band released the album 'Abbey Road'?": "Quel groupe a sorti l’album « Abbey Road » ?",
    "The saxophone belongs to which instrument family?": "À quelle famille d’instruments appartient le saxophone ?",
    "Daft Punk originated in which country?": "De quel pays est originaire Daft Punk ?",
    "How many completed numbered symphonies did Beethoven compose?": "Combien de symphonies numérotées achevées Beethoven a-t-il composées ?",
    "Who composed the opera 'The Magic Flute'?": "Qui a composé l’opéra « La Flûte enchantée » ?",
    "Which trumpeter released the album 'Kind of Blue'?": "Quel trompettiste a sorti l’album « Kind of Blue » ?",
    "Who recorded the landmark jazz album 'A Love Supreme'?": "Qui a enregistré l’album de jazz emblématique « A Love Supreme » ?",
    "Who composed 'The Rite of Spring'?": "Qui a composé « Le Sacre du printemps » ?",

    // Movies
    "Which movie features the line 'I'll be back'?": "Dans quel film entend-on la réplique « I’ll be back » ?",
    "Who directed 'Inception'?": "Qui a réalisé « Inception » ?",
    "Which actor played Jack Dawson in 'Titanic'?": "Quel acteur a joué Jack Dawson dans « Titanic » ?",
    "In which movie does the Joker ask 'Why so serious?'": "Dans quel film le Joker demande-t-il « Why so serious? » ?",
    "Which film won Best Picture at the 2020 Academy Awards ceremony?": "Quel film a remporté l’Oscar du meilleur film lors de la cérémonie de 2020 ?",
    "Who directed 'Jaws'?": "Qui a réalisé « Les Dents de la mer » ?",
    "Who directed 'Pulp Fiction'?": "Qui a réalisé « Pulp Fiction » ?",
    "Which actor played Maximus in 'Gladiator'?": "Quel acteur a joué Maximus dans « Gladiator » ?",
    "Who directed 'The Lord of the Rings' film trilogy?": "Qui a réalisé la trilogie cinématographique « Le Seigneur des anneaux » ?",
    "Who directed the animated film 'Spirited Away'?": "Qui a réalisé le film d’animation « Le Voyage de Chihiro » ?",
    "Who directed and starred in 'Citizen Kane'?": "Qui a réalisé « Citizen Kane » et y a également tenu le rôle principal ?",
    "Who directed the Japanese classic 'Seven Samurai'?": "Qui a réalisé le classique japonais « Les Sept Samouraïs » ?",
    "What is the name of the computer in '2001: A Space Odyssey'?": "Quel est le nom de l’ordinateur dans « 2001 : L’Odyssée de l’espace » ?",
    "Who played Daniel Plainview in 'There Will Be Blood'?": "Qui a joué Daniel Plainview dans « There Will Be Blood » ?",
    "Who played Anton Chigurh in 'No Country for Old Men'?": "Qui a joué Anton Chigurh dans « No Country for Old Men » ?"
  };

  const categoriesFR = {
    "North America": "Amérique du Nord", "South America": "Amérique du Sud", "Europe": "Europe", "Asia": "Asie", "Africa": "Afrique", "Europe / Asia": "Europe / Asie",
    "Movies": "Films", "Food": "Nourriture", "Geography": "Géographie", "Science": "Sciences", "Literature": "Littérature", "Nature": "Nature", "History": "Histoire", "Technology": "Technologie", "Chemistry": "Chimie", "Astronomy": "Astronomie", "Biology": "Biologie",
    "Multiplication": "Multiplication", "Division": "Division", "Addition": "Addition", "Square Roots": "Racines carrées", "Percentages": "Pourcentages", "Algebra": "Algèbre", "Fractions": "Fractions", "Geometry": "Géométrie", "Exponents": "Exposants",
    "Computer History": "Histoire de l’informatique", "Web": "Web", "Mobile Tech": "Technologie mobile", "Hardware": "Matériel", "Operating Systems": "Systèmes d’exploitation", "Networking": "Réseaux", "Storage": "Stockage", "Development": "Développement",
    "U.S. History": "Histoire des États-Unis", "World War II": "Seconde Guerre mondiale", "Ancient Rome": "Rome antique", "Colonial History": "Histoire coloniale", "European History": "Histoire européenne", "World War I": "Première Guerre mondiale", "American Revolution": "Révolution américaine", "Ancient Civilizations": "Civilisations antiques", "Byzantine History": "Histoire byzantine", "African History": "Histoire africaine",
    "Pop": "Pop", "Rock": "Rock", "Artists": "Artistes", "Hip-Hop": "Hip-hop", "Classical": "Classique", "Reggae": "Reggae", "Instruments": "Instruments", "Electronic": "Électronique", "Jazz": "Jazz",
    "Action/Sci-Fi": "Action / science-fiction", "Directors": "Réalisateurs", "Drama": "Drame", "Superhero": "Super-héros", "Awards": "Récompenses", "Historical Drama": "Drame historique", "Fantasy": "Fantasy", "Animation": "Animation", "Classic Film": "Cinéma classique", "World Cinema": "Cinéma du monde", "Sci-Fi": "Science-fiction", "Crime": "Policier"
  };

  const choicesFR = {
    // Countries and places
    "United States":"États-Unis", "United Kingdom":"Royaume-Uni", "New Zealand":"Nouvelle-Zélande", "Netherlands":"Pays-Bas", "Russia":"Russie", "Germany":"Allemagne", "Belgium":"Belgique", "Romania":"Roumanie", "Spain":"Espagne", "Honduras":"Honduras", "Argentina":"Argentine", "Uruguay":"Uruguay", "Guatemala":"Guatemala", "Nigeria":"Nigeria", "Ireland":"Irlande", "Ghana":"Ghana", "Uganda":"Ouganda", "Tanzania":"Tanzanie", "Malawi":"Malawi", "Kenya":"Kenya", "Syria":"Syrie", "Yemen":"Yémen", "Egypt":"Égypte", "Iraq":"Irak", "Singapore":"Singapour", "Türkiye (Turkey)":"Turquie", "Tunisia":"Tunisie", "Pakistan":"Pakistan", "Mongolia":"Mongolie", "Kyrgyzstan":"Kirghizistan", "Kazakhstan":"Kazakhstan", "Uzbekistan":"Ouzbékistan", "Montenegro":"Monténégro", "North Macedonia":"Macédoine du Nord", "Bhutan":"Bhoutan", "Sri Lanka":"Sri Lanka", "Nepal":"Népal", "Myanmar":"Myanmar", "Laos":"Laos", "Cambodia":"Cambodge", "Comoros":"Comores", "Madagascar":"Madagascar", "Seychelles":"Seychelles", "Mauritius":"Maurice", "Austria":"Autriche", "Denmark":"Danemark", "Australia":"Australie", "Iceland":"Islande", "Luxembourg":"Luxembourg", "France":"France", "Canada":"Canada", "India":"Inde", "China":"Chine", "Japan":"Japon", "England":"Angleterre", "Finland":"Finlande",

    // Emoji food and movie labels (localized when the French title is common)
    "The Lion King":"Le Roi Lion", "Jungle Book":"Le Livre de la jungle", "Finding Nemo":"Le Monde de Nemo", "Jaws":"Les Dents de la mer", "Frozen":"La Reine des neiges", "Apple pie":"Tarte aux pommes", "Cherry pie":"Tarte aux cerises", "Fruit salad":"Salade de fruits", "Apple sauce":"Compote de pommes", "Peanut butter sandwich":"Sandwich au beurre de cacahuète", "Grilled cheese":"Sandwich au fromage grillé", "French toast":"Pain perdu", "Ghostbusters":"SOS Fantômes", "The Haunted Mansion":"Le Manoir hanté", "Home Alone":"Maman, j’ai raté l’avion !", "The Lord of the Rings":"Le Seigneur des anneaux", "The Hobbit":"Le Hobbit", "Chicken noodle soup":"Soupe de poulet aux nouilles", "Chicken fried rice":"Riz frit au poulet", "Chicken salad":"Salade de poulet", "Cookies and milk":"Biscuits et lait", "Cereal":"Céréales", "Ice cream sandwich":"Sandwich glacé", "Pancakes":"Pancakes", "The Grinch":"Le Grinch", "Christmas Vacation":"Le sapin a les boules", "The Little Mermaid":"La Petite Sirène", "Shark Tale":"Gang de requins", "Cinderella":"Cendrillon", "Sleeping Beauty":"La Belle au bois dormant", "Beauty and the Beast":"La Belle et la Bête", "Steak and potatoes":"Steak et pommes de terre", "Meatloaf":"Pain de viande", "Beef stew":"Ragoût de bœuf", "Burger and fries":"Burger et frites", "Pancakes with syrup":"Pancakes au sirop", "Waffles":"Gaufres", "Oatmeal":"Flocons d’avoine",

    // General knowledge
    "London":"Londres", "Blue Whale":"Baleine bleue", "Elephant":"Éléphant", "Giraffe":"Girafe", "Hippopotamus":"Hippopotame", "Earth":"Terre", "Roman":"Romain", "Diamond":"Diamant", "Steel":"Acier", "Iron":"Fer", "Tungsten":"Tungstène", "Treaty of Paris":"Traité de Paris", "Treaty of Versailles":"Traité de Versailles", "Treaty of Vienna":"Traité de Vienne", "Treaty of Utrecht":"Traité d’Utrecht", "O Positive":"O positif", "O Negative":"O négatif", "AB Positive":"AB positif", "A Negative":"A négatif",

    // Tech explanations
    "Translate domain names to IP addresses":"Traduire les noms de domaine en adresses IP", "Encrypt hard drives":"Chiffrer les disques durs", "Compress images":"Compresser les images", "Manage computer memory":"Gérer la mémoire de l’ordinateur", "It uses flash memory and has no moving mechanical parts":"Il utilise de la mémoire flash et ne contient aucune pièce mécanique mobile", "It stores data only while power is on":"Il stocke les données uniquement lorsque l’appareil est alimenté", "It is a type of monitor":"C’est un type d’écran", "It requires magnetic tape":"Il nécessite une bande magnétique",

    // History phrases
    "Greek Empire":"Empire grec", "Roman Empire":"Empire romain", "Ottoman Empire":"Empire ottoman", "Byzantine Empire":"Empire byzantin", "Invasion of Poland":"Invasion de la Pologne", "Assassination of Archduke Franz Ferdinand":"Assassinat de l’archiduc François-Ferdinand", "Russian Revolution":"Révolution russe", "Sinking of the Titanic":"Naufrage du Titanic", "Battle of Yorktown":"Bataille de Yorktown", "Battle of Lexington":"Bataille de Lexington", "Battle of Bunker Hill":"Bataille de Bunker Hill", "Battle of Saratoga":"Bataille de Saratoga", "Sumerians":"Sumériens", "Romans":"Romains", "Aztecs":"Aztèques", "Vikings":"Vikings",

    // Music instruments/families
    "Guitar":"Guitare", "Violin":"Violon", "Piano":"Piano", "Drums":"Batterie", "Woodwind":"Bois", "Brass":"Cuivres", "String":"Cordes", "Percussion":"Percussions",

    // Movie option titles that have familiar French titles
    "The Terminator":"Terminator", "The Dark Knight":"The Dark Knight : Le Chevalier noir", "Once Upon a Time in Hollywood":"Once Upon a Time… in Hollywood", "The Lord of the Rings":"Le Seigneur des anneaux", "Spirited Away":"Le Voyage de Chihiro", "Seven Samurai":"Les Sept Samouraïs", "Mother":"Mère", "Deep Thought":"Pensée profonde"
  };

  const translateChoice = value => choicesFR[value] || value;
  const translateQuestion = q => ({
    ...q,
    question: questionsFR[q.question] || q.question,
    category: categoriesFR[q.category] || q.category,
    choices: q.choices.map(translateChoice),
    correct: translateChoice(q.correct),
    imageAlt: q.imageAlt ? "Drapeau à identifier" : q.imageAlt
  });

  const meta = quizMeta[source.config.title];
  if (!meta) return;

  // Keep French rounds varied while avoiding a partially translated question bank.
  // Five questions from each difficulty provide 15 fully localized questions per quiz.
  const localizedQuestions = ["easy", "medium", "hard"].flatMap(difficulty =>
    source.questions.filter(q => q.difficulty === difficulty).slice(0, 5).map(translateQuestion)
  );

  const sourceRanks = source.config.ranks || [];
  const rankTexts = meta.ranks || [];

  window.quizData = {
    config: {
      ...source.config,
      title: meta.title,
      subtitle: meta.subtitle,
      completionTitle: meta.completionTitle,
      ranks: sourceRanks.map((rank, index) => ({ ...rank, text: rankTexts[index] || rank.text }))
    },
    questions: localizedQuestions
  };

})();
