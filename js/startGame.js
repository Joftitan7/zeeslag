const apiUrl = 'https://koene.cvoatweb.be/api/public/zeeslagje';
let gameKey = '';

async function startGame() {
    const password = document.querySelector('#password-input').value.trim();
    if (!password) return;

    const response = await fetch(apiUrl + '/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            password: password 
        })
    });

    if (response.ok) {
        gameKey = password;
    }
}

function joinGame() {
    const password = document.querySelector('#password-input').value.trim();
    if (!password) return;

    gameKey = password;
}
