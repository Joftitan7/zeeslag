const apiUrl = 'https://koene.cvoatweb.be/api/public/zeeslagje';
let gameSecret = '';

async function startGame() {
    const password = document.querySelector('#password-input').value.trim();
    if (!password) {
        alert("Please enter a password.");
        return;
    }

        const response = await fetch(`${apiUrl}/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password })
        });

        if (response.ok) {
            gameSecret = password;
            document.querySelector('#password-entry').classList.add('hidden');
            document.querySelector('#role-selection').classList.remove('hidden');

            document.querySelector('#password-input').value = "";

            alert('game started')
        } else {
            const errorText = await response.text();
            console.warn("Failed to start game: " + errorText);
        }
    
}

function joinGame() {
    const password = document.querySelector('#password-input').value.trim();
    if (!password) {
        alert("Please enter the game password to join.");
        return;
    }

    gameSecret = password;
    alert("Joined game successfully. Select your role.");
    document.querySelector('#password-entry').classList.add('hidden');
    document.querySelector('#role-selection').classList.remove('hidden');
}
