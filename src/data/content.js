export const profile = {
  name: "Kevin Kouton",
  fullName: "Kouton Vignon Esmel Yann Kevin",
  role: "Data Scientist & Développeur Full-Stack",
  location: "Marcory, Abidjan, Côte d'Ivoire",
  email: "koutonesmel@gmail.com",
  phone: "+225 07 16 74 52 06",
  tagline: "De l'algorithme à l'interface, sans perte de signal.",
};

export const nav = [
  { label: "Accueil", href: "#accueil" },
  { label: "À propos", href: "#apropos" },
  { label: "Compétences", href: "#competences" },
  { label: "Parcours", href: "#parcours" },
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "DATA SCIENCE & IA — ABIDJAN, CI",
  headline: ["J'entraîne des modèles.", "Je construis des produits."],
  sub: "Étudiant en Master Data Science & IA, je conçois des systèmes complets — du traitement de la donnée brute jusqu'à l'interface que l'utilisateur touche du doigt. Scoring, prédiction, automatisation : je transforme des problèmes flous en outils qui décident ou aide à la decision.",
  ctaPrimary: { label: "Voir mes projets", href: "#projets" },
  ctaSecondary: { label: "Me contacter", href: "#contact" },
};

export const about = {
  eyebrow: "À PROPOS",
  title: "Je pilote la donnée, pas seulement le code.",
  paragraphs: [
    "Je suis un junior Data Scientist & MLOps, avec un socle solide en économie statistique. Ce qui m'intéresse : concevoir des solutions d'automatisation intelligentes qui tiennent debout de bout en bout — de l'algorithme jusqu'à l'interface finale.",
    "Mon portfolio reflète cette approche full-stack de la data : j'analyse, je modélise, puis je livre un produit utilisable, pas un notebook qui reste sur mon disque. Certifié en gestion de projet (PMI®, LinkedIn Learning), j'aborde chaque projet avec autant de rigueur dans le pilotage que dans l'algorithmique.",
  ],
  facts: [
    { label: "Formation actuelle", value: "Master Data Science & IA" },
    { label: "Localisation", value: "Abidjan, Côte d'Ivoire" },
    { label: "Permis", value: "Catégorie AB" },
    { label: "Depuis", value: "2021 — Freelance Data & Full-Stack" },
  ],
};

export const skills = {
  eyebrow: "COMPÉTENCES",
  title: "Ma boîte à outils pensée pour livrer, pas pour collectionner.",
  groups: [
    {
      name: "Programmation",
      items: ["Python", "Git", "GitHub", "Docker", "JavaScript", "HTML", "CSS"],
      accent: "gold",
    },
    {
      name: "Outils scientifiques",
      items: ["R", "Stata", "LaTeX", "Power BI"],
      accent: "mint",
    },
    {
      name: "Gestion & Business",
      items: ["Dolibarr", "Meta Business Suite", "Gestion de projet (PMI®)"],
      accent: "violet",
    },
    {
      name: "No-code / Design",
      items: ["Canva", "WordPress", "Shopify", "Hostinger"],
      accent: "gold",
    },
    {
      name: "Bureautique",
      items: ["Excel", "Word", "PowerPoint"],
      accent: "mint",
    },
  ],
};

// Chronological path — most recent first. `kind` drives the color coding.
export const timeline = {
  eyebrow: "PARCOURS",
  title: "Formation et expérience, en parallèle.",
  items: [
    {
      date: "Nov. 2025 — Aujourd'hui",
      kind: "formation",
      title: "Master Data Science & IA",
      place: "Université Félix Houphouët-Boigny",
      description:
        "Modèles prédictifs (régression, classification), Deep Learning, statistiques avancées, administration SGBD, écosystème Big Data, NLP et IA générative.",
    },
    {
      date: "Nov. 2025",
      kind: "formation",
      title: "Certificat Gestion de projet (PMI®)",
      place: "LinkedIn Learning",
      description:
        "Méthodologies de suivi et de gestion de projet — pour piloter un projet data avec autant de rigueur que je le code.",
    },
    {
      date: "2021 — Aujourd'hui",
      kind: "experience",
      title: "Freelance — Data Science & Développement Full-Stack",
      place: "À mon compte",
      description:
        "Conception de modèles de Machine Learning et intégration via API, développement web, automatisation marketing (QR codes dynamiques, géolocalisation, landing pages) et UI/UX design.",
    },
    {
      date: "Sept. — Nov. 2024",
      kind: "experience",
      title: "Agent commercial débutant",
      place: "Credit Access SA",
      description:
        "Présentation de produits financiers et gestion de l'ouverture de comptes clients.",
    },
    {
      date: "2021 — 2024",
      kind: "formation",
      title: "Licence Économie Statistique",
      place: "Université Internationale des Sciences Appliquées et des Technologies",
      description:
        "Algèbre linéaire, calcul différentiel et probabilités, programmation structurée, analyse macro/microéconomique et traitement statistique de grandes bases de données.",
    },
    {
      date: "2020 — 2021",
      kind: "formation",
      title: "Baccalauréat Scientifique",
      place: "Lycée Moderne de Treichville",
      description: "",
    },
  ],
};

export const projects = {
  eyebrow: "RÉALISATIONS",
  title: "Six problèmes concrets, résolus jusqu'au bout.",
  items: [
    {
      name: "SainteMM",
      tag: "IA appliquée à la santé",
      matchScore: 96,
      description:
        "Plateforme de gestion de patients pour pharmaciens, avec assistant IA intégré : génération de formulaires de diagnostic, calcul de posologies et recherche médicale en temps réel sur le web.",
      stack: ["React", "LLM", "RAG", "Recherche temps réel"],
      url: "https://saintemm.vercel.app/dashboard",
    },
    {
      name: "RH Pro+",
      tag: "NLP & scoring vectoriel",
      matchScore: 94,
      description:
        "Moteur de matching CV / offre : parsing de fichiers PDF, score de compatibilité par proximité vectorielle et sélection dynamique du top-N des candidats les plus pertinents.",
      stack: ["Python", "Embeddings", "ATS"],
      url: "https://esmelo-rh-pro.hf.space/",
    },
    {
      name: "Compare CI",
      tag: "Scraping & données temps réel",
      matchScore: 91,
      description:
        "Agrégateur de prix intelligent : moteur de scraping multi-plateformes couplé à une stack Supabase, pour comparer les prix instantanément et préserver le pouvoir d'achat en Côte d'Ivoire.",
      stack: ["Scraping", "Supabase", "Comparateur"],
      url: "https://esmelo-comparateur-ci.hf.space/",
    },
    {
      name: "Estimation Immobilière",
      tag: "Machine Learning",
      matchScore: 89,
      description:
        "Modèle prédictif de prix immobilier à partir de la localisation, la surface et le nombre de pièces — pipeline complet, du traitement des données brutes à l'optimisation du modèle.",
      stack: ["Python", "Régression", "Feature engineering"],
      url: "https://esmelo-immo.hf.space/",
    },
    {
      name: "EduShare",
      tag: "Full-stack & temps réel",
      matchScore: 88,
      description:
        "Plateforme collaborative académique pour le partage de ressources entre étudiants, avec chat en temps réel, notifications et interface responsive.",
      stack: ["Flask", "Supabase", "DaisyUI"],
      url: "https://esmelo-edushare.hf.space/",
    },
    {
      name: "Scoring Satisfaction — Aviation",
      tag: "Analyse prédictive",
      matchScore: 85,
      description:
        "Modèle de scoring de la satisfaction passager dans le secteur aérien, pour identifier les leviers d'amélioration de l'expérience client à partir de données d'enquête.",
      stack: ["Python", "Modélisation", "Data viz"],
      url: "https://esmel-soro.vercel.app/",
    },
    {
  "name": "Économétrie Spatiale — Migrations et Instabilité",
  "tag": "Modélisation économétrique",
  "matchScore": 90,
  "description": "Application Shiny interactive présentant un modèle DSDM (Dynamic Spatial Durbin Model) pour analyser les effets directs et indirects de la migration et du PIB sur l'instabilité sociale en Afrique subsaharienne. Le modèle intègre des matrices de pondération spatiale (KNN, contiguïté, connectivité migratoire) et propose des estimations GMM et MLE avec calcul des impacts totaux, directs et indirects.",
  "stack": ["R", "Shiny", "Économétrie spatiale", "DSDM", "GMM", "MLE"],
  "url": "https://esmel.shinyapps.io/econometrie/"
}
  ],
};

export const contact = {
  eyebrow: "CONTACT",
  title: "Un projet en tête ?",
  sub: "Que ce soit pour un modèle prédictif, un outil d'automatisation ou une application complète, je suis disponible pour en discuter.",
};

export const interests = [
  "Design & Création — UI/UX et web minimaliste (no-code)",
  "Automatisation — scripts personnels pour optimiser les tâches du quotidien",
  "Lecture — vulgarisation scientifique et biographies d'entrepreneurs de la tech",
    "Gaming — Jeux de battle royale multijoueurs, rôle play et jeux de stratégie en temps réel.",

];
