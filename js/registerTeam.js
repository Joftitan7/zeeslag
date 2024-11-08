let statusInterval = null;

async function registerTeam(role) {
    const teamName = prompt("Enter your team name:");
    if (!teamName) return;

    try {
        const response = await fetch(`${apiUrl}/register/${gameSecret}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: teamName })
        });

        if (response.ok) {
            const result = await response.json();
            apiSecret = result.secret;
            console.log(apiSecret)
            playerRole = role;
            alert(`${teamName} registered successfully as ${role}`);
            document.querySelector('#role-selection').classList.add('hidden');
            document.querySelector('#ship-placement, #game-board-section').classList.remove('hidden');
            document.querySelector('#player-role').innerText = `You are ${role}`;
            fetchAvailableShips();

            if (!statusInterval) {
                statusInterval = setInterval(checkGameStatus, 5000);
                checkGameStatus();
            }
        } else {
            alert("Team is full");
        }
    } catch (error) {
        console.error("Registration failed:", error);
    }
}

async function checkGameStatus() {
    if (!apiSecret) return console.warn("No API secret found.");

    try {
        const response = await fetch(`${apiUrl}/status/${apiSecret}`);
        if (response.ok) {
            const statusData = await response.json();
            document.querySelector('#my-team-name').innerText = statusData.myTeamName || 'Not Registered';
            document.querySelector('#opponent-team-name').innerText = statusData.opponentTeamName || 'Not Registered';
            document.querySelector('#turn-status').innerText = statusData.yourTurn ? "It's your turn!" : "It's opponent's turn!";
        }
    } catch (error) {
        console.error("Failed to check game status:", error);
    }
}
