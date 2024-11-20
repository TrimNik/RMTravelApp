// Zeigt das Formular zum Erstellen einer neuen Gruppe an
document.getElementById('showFormButton').addEventListener('click', function() {
    const formContainer = document.getElementById('formContainer');
    formContainer.classList.toggle('show');
});

// Zeigt das Formular zum Hinzufügen eines Teilnehmers an
document.getElementById('showAddMemberButton').addEventListener('click', function() {
    const addMemberContainer = document.getElementById('addMemberContainer');
    addMemberContainer.classList.toggle('show');
});

// Funktion, um einen 8-stelligen numerischen Code zu generieren
function generateCode() {
    let code = '';
    for (let i = 0; i < 8; i++) {
        code += Math.floor(Math.random() * 10); // Eine Ziffer hinzufügen
    }
    return code;
}

// Funktion zum Erstellen einer neuen Gruppe
document.getElementById('groupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Standardformularverhalten verhindern
    const groupName = document.getElementById('groupName').value;
    const code = generateCode();

    // Speichere die Gruppe im localStorage (nur mit 'code' und 'name')
    const groupData = { name: groupName, code: code, members: [] };
    localStorage.setItem('groupInfo', JSON.stringify(groupData));
    
    // Debugging: Ausgabe in der Konsole
    console.log('Gruppe erstellt:', groupData);

    // Weiterleitung zur Detailseite
    window.location.href = 'sites/creategroup.html';

    document.getElementById('groupName').value = ''; // Eingabefeld zurücksetzen
    document.getElementById('formContainer').classList.remove('show'); // Formular ausblenden
});

// Funktion zum Beitreten einer Gruppe anhand des generierten Codes
document.getElementById('addMemberButton').addEventListener('click', function() {
    const groupCodeInput = document.getElementById('groupCode').value; // Eingabe des Nutzers
    const storedData = JSON.parse(localStorage.getItem('groupInfo')); // Abrufen gespeicherter Gruppe

    // Debugging: Prüfen, ob Daten korrekt ausgelesen wurden
    console.log('Gespeicherte Daten:', storedData);

    // Überprüfen, ob der eingegebene Code mit dem gespeicherten Code übereinstimmt
    if (storedData && storedData.code === groupCodeInput) {
        const memberName = prompt("Bitte geben Sie den Namen des Teilnehmers ein:");
        if (memberName) {
            // Füge den neuen Teilnehmer zur Gruppe hinzu
            storedData.members.push(memberName);
            localStorage.setItem('groupInfo', JSON.stringify(storedData));
            alert(`Erfolgreich der Gruppe '${storedData.name}' beigetreten!`);

            // Zur Detailseite weiterleiten
            window.location.href = 'sites/creategroup.html';
        }
    } else {
        alert("Ungültiger Code oder Gruppe nicht gefunden.");
    }

    document.getElementById('groupCode').value = ''; // Eingabefeld zurücksetzen
    document.getElementById('addMemberContainer').classList.remove('show'); // Formular ausblenden
});

// Funktion zum Laden der Gruppeninformationen auf der Detailseite
function loadGroupDetails() {
    const storedData = JSON.parse(localStorage.getItem('groupInfo'));
    
    // Debugging: Prüfen, ob Daten korrekt ausgelesen wurden
    console.log('Lade Gruppeninformationen:', storedData);

    if (storedData) {
        document.getElementById('groupDetails').textContent = `Gruppe: ${storedData.name} (Code: ${storedData.code})`;

        const membersList = document.getElementById('membersList');
        membersList.innerHTML = ''; // Aktuelle Liste löschen

        // Mitglieder in der Liste anzeigen
        storedData.members.forEach(member => {
            const memberItem = document.createElement('li');
            memberItem.textContent = member;
            membersList.appendChild(memberItem);
        });
    } else {
        alert("Keine Gruppeninformationen gefunden.");
    }
}
