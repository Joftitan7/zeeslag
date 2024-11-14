const attackButton = document.querySelector('#attack-btn');
const targetInput = document.querySelector('#target-cell');

attackButton.addEventListener('click', function() {
    const cellId = targetInput.value;
    if (cellId) {
        attack(cellId);
    } 
});

async function attack(cellId) {
    const response = await fetch(apiUrl + '/attack', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            secret: teamKey,
            position: cellId
        })
    });

    if (response.ok) {
        const result = await response.json();
        const cell = document.querySelector(cellId);
        
        if (cell) {
            if (result.result === "Hit") {
                cell.style.backgroundColor = 'red';
            } else {
                cell.style.backgroundColor = 'black';
            }
        }

        alert(`Attack on ${cellId}: ${result.result}`);
    }
}
