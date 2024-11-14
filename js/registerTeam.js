let teamKey = '';
let role = '';
let statusInterval = null;

async function registerTeam(roleName) {
    const teamName = prompt("Enter your team name:");
    if (!teamName) return;

    const response = await fetch(apiUrl + '/register/' + gameKey, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
            name: teamName 
        })
    });

    if (response.ok) {
        teamKey = (await response.json()).secret;
        role = roleName;

        document.querySelector('#player-role').innerText = `Role: ${role}`;
        fetchShips();

        statusInterval = setInterval(checkStatus, 5000);
    }
}

async function checkStatus() {
    const response = await fetch(apiUrl + '/status/' + teamKey);

    if (response.ok) {
        const data = await response.json();

        document.querySelector('#my-team-name').innerText = data.myTeamName || 'Not Registered';
        document.querySelector('#opponent-team-name').innerText = data.opponentTeamName || 'Not Registered';
        document.querySelector('#turn-status').innerText = data.yourTurn ? "Your Turn" : "Opponent's Turn"; // ? is the (if)  operator and : is the (else) operator
    }
}
