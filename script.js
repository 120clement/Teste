const questions = [
  "Quelle est sa couleur préférée ?",
  "Quel est son plat préféré ?",
  "Quel est son passe-temps préféré ?",
  "Quelle est sa musique préférée ?",
  "Quel est son plus grand défaut ?",
  "Quelle est sa plus grande qualité ?",
  "Quel est son rêve ?",
  "Quel est son film préféré ?",
  "Quel est son sport préféré ?",
  "Quel pays aimerait-il visiter ?"
];

// Afficher les questions sur index.html
if (document.getElementById("questions")) {
  questions.forEach((q, i) => {
    document.getElementById("questions").innerHTML += `
      <p>${q}</p>
      <input id="q${i}">
    `;
  });
}

function createAccount() {
  const name = document.getElementById("username").value;
  if (!name) return alert("Entre ton nom");

  let answers = {};
  questions.forEach((_, i) => {
    answers[i] = document.getElementById(`q${i}`).value.toLowerCase();
  });

  const userId = Date.now();
  localStorage.setItem(`user_${userId}`, JSON.stringify({
    name,
    answers,
    notifications: []
  }));

  const link = `${location.origin}/quiz.html?user=${userId}`;
  document.getElementById("link").innerHTML =
    `Lien à partager : <br><b>${link}</b>`;
}if (document.getElementById("quiz")) {
  const params = new URLSearchParams(location.search);
  const userId = params.get("user");
  const user = JSON.parse(localStorage.getItem(`user_${userId}`));

  questions.forEach((q, i) => {
    document.getElementById("quiz").innerHTML += `
      <p>${q}</p>
      <input id="a${i}">
    `;
  });

  window.submitQuiz = function () {
    let bonnesReponses = 0;

    questions.forEach((_, i) => {
        const answer = document.getElementById(`a${i}`).value.trim().toLowerCase();
        const correct = user.answers[i].trim().toLowerCase();

        if (answer === correct) {
            bonnesReponses++;
        }
    });

    const scoreFinal = bonnesReponses * 10;

    const message = document.getElementById("message").value;
    const phone = document.getElementById("phone").value;

    // Enregistrer notification si l’ami crée un compte
    if (phone) {
        user.notifications.push({
            phone,
            time: new Date().toLocaleString()
        });
        localStorage.setItem(`user_${userId}`, JSON.stringify(user));
    }

    // Sauvegarder le résultat
    localStorage.setItem("result", JSON.stringify({
        bonnesReponses,
        scoreFinal,
        message
    }));

    location.href = "result.html";
};
  
  
}