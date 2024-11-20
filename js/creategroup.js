// Hole den Gruppennamen und Code aus dem localStorage
const groupName = localStorage.getItem('groupName');

// Hole das gespeicherte Objekt aus dem Local Storage
const groupInfo = localStorage.getItem('groupInfo');

// Parse das Objekt, falls es als JSON gespeichert ist, sonst direkt verwenden
const parsedGroupInfo = groupInfo ? JSON.parse(groupInfo) : null;

// Extrahiere das `code`-Feld und weise es einer Konstante zu
const code = parsedGroupInfo ? parsedGroupInfo.code : null;
const groupCode = code

// Zeige die Gruppendaten auf der Detailseite an
document.getElementById('groupInfo').innerText = `Gruppe: ${groupName} (Code: ${groupCode})`;

// Event-Listener für das Formular zum Speichern zusätzlicher Informationen
document.getElementById('detailsForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const additionalInfo = document.getElementById('additionalInfo').value;

    // Speichere die zusätzlichen Infos im localStorage, verknüpft mit dem Code
    localStorage.setItem(`groupInfo_${groupCode}`, additionalInfo);

    // Optional: Bestätigung anzeigen oder Weiterleitung
    alert('Informationen gespeichert!');
});

document.getElementById('backButton').addEventListener('click', function () {
    window.location.href = '../index.html'; // Leitet zurück zur Startseite weiter
    // Alternativ: window.history.back(); // Geht zur vorherigen Seite im Verlauf zurück
});

