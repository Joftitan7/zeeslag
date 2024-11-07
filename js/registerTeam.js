let statusInterval = null;

async function registerTeam(role) {
    const teamName = prompt("Enter your team name:");
    if (!teamName) return;

    
        const response = await fetch(`${apiUrl}/register/${gameSecret}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: teamName })
        });

        if (response.ok) {
            const result = await response.json();
            alert(`${teamName} registered successfully as ${role}`);
            localStorage.setItem('apiSecret', result.secret);
            localStorage.setItem('playerRole', role);
            document.querySelector('#role-selection').classList.add('hidden');
            document.querySelector('#ship-placement').classList.remove('hidden');
            document.querySelector('#game-board-section').classList.remove('hidden');
            document.querySelector('#player-role').innerText = `You are ${role}`;
            console.log(result.secret)
            fetchAvailableShips();
            if (statusInterval === null) {
                statusInterval = setInterval(checkGameStatus, 5000);
            }
            checkGameStatus();
        } else {
            alert ('invalid name -_-')
        }
    
}

async function checkGameStatus() {
    const apiSecret = localStorage.getItem('apiSecret');
    if (!apiSecret) {
        console.warn("we have no api again xD");
        return;
    }

    
        const response = await fetch(`${apiUrl}/status/${apiSecret}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const statusData = await response.json();
            document.querySelector('#my-team-name').innerText = statusData.myTeamName || 'Not Registered';
            document.querySelector('#opponent-team-name').innerText = statusData.opponentTeamName || 'Not Registered';
            document.querySelector('#turn-status').innerText = statusData.yourTurn ? "It's your turn!" : "It's opponent's turn!";
        } 
    
}
