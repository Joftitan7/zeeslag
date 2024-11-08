const apiUrl = 'https://koene.cvoatweb.be/api/public/zeeslagje';
let gameSecret = '';

async function startGame() {
    const password = document.querySelector('#password-input').value.trim();
    if (!password) return alert("Please enter a password.");

    try {
        const response = await fetch(`${apiUrl}/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        if (response.ok) {
            gameSecret = password;
            document.querySelector('#password-entry').classList.add('hidden');
            document.querySelector('#role-selection').classList.remove('hidden');
            alert('Game started');
        } else {
            console.warn("Failed to start game:", await response.text());
        }
    } catch (error) {
        console.error("Error starting game:", error);
    }
}

function joinGame() {
    const password = document.querySelector('#password-input').value.trim();
    if (!password) return alert("Please enter the game password to join.");

    gameSecret = password;
    alert("Joined game successfully. Select your role.");
    document.querySelector('#password-entry').classList.add('hidden');
    document.querySelector('#role-selection').classList.remove('hidden');
}
