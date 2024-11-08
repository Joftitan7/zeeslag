async function attack(cellId) {
    if (!apiSecret) return console.warn("No API secret found.");

    try {
        const response = await fetch(`${apiUrl}/attack`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secret: apiSecret, position: cellId })
        });

        if (response.ok) {
            const result = await response.json(); 

            const cellElement = document.querySelector(cellId);
            if (cellElement) {
                if (result.result === "Hit") {
                    cellElement.style.backgroundColor = 'red'; 
                } else if (result.result === "Miss") {
                    cellElement.style.backgroundColor = 'black'; 
                }
            }

            alert(`Attack sent to ${cellId}: ${result.result}`);
        } else {
            alert("Attack failed.");
        }
    } catch (error) {
        console.error("Error attacking:", error);
    }
}
