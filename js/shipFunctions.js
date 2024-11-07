let placedShips = [];
let availableShips = [];

async function fetchAvailableShips() {
    const apiSecret = localStorage.getItem('apiSecret');
    if (!apiSecret) {
        console.warn("No secret found, make sure to register.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/ships/${apiSecret}`);
        if (response.ok) {
            availableShips = await response.json();
            updateShipDropdown();
        } else {
            throw new Error("Failed to retrieve available ships.");
        }
    } catch (error) {
        console.error("Error fetching ships:", error);
    }
}

function updateShipDropdown() {
    const shipSelect = document.querySelector('#ship-select');
    shipSelect.innerHTML = '';  // Clear the dropdown

    availableShips.forEach(ship => {
        const placedCount = placedShips.filter(s => s.name === ship.name).length;
        const remainingCount = ship.quantity - placedCount;

        if (remainingCount > 0) {
            const option = document.createElement('option');
            option.value = ship.name;
            option.innerText = `${capitalizeFirstLetter(ship.name)} (${remainingCount} left)`;
            shipSelect.appendChild(option);
        }
    });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function placeShip(cellId) {
    const shipSelect = document.querySelector('#ship-select');
    const shipName = shipSelect.value;
    const ship = availableShips.find(s => s.name === shipName);
    const orientation = document.querySelector('#orientation').value;

    const apiSecret = localStorage.getItem('apiSecret');
    if (!apiSecret) {
        console.warn("No secret found, make sure to register.");
        return;
    }

    const placedCount = placedShips.filter(s => s.name === shipName).length;
    const remainingCount = ship.quantity - placedCount;

    if (remainingCount <= 0) {
        alert(`You cannot place any more ${shipName}s. All ${ship.quantity} have been placed.`);
        return;
    }

    if (!canPlaceShip(cellId, ship.length, orientation)) {
        alert(`The ship cannot be placed here due to board boundaries.`);
        return;
    }

    const requestData = {
        secret: apiSecret,
        start: cellId,  
        type: shipName,  
        direction: orientation  
    };

    console.log("data is", requestData);

        const response = await fetch(`${apiUrl}/ship`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Ship placed successfully:", result);

            placedShips.push({ name: shipName, position: cellId, orientation: orientation });

            await fetchAvailableShips();  
        } else {
            const errorDetails = await response.json();
            console.error("Error placing ship:", errorDetails);
            throw new Error("Failed to place ship.");
        }
    
}

function canPlaceShip(startCell, shipLength, orientation) {
    const boardSize = 10;  
    const [startRow, startCol] = parseCell(startCell);

    if (orientation === 'H') {
        return startCol + shipLength <= boardSize;
    } else if (orientation === 'V') {
        return startRow + shipLength <= boardSize;
    }

    return false;
}

function parseCell(cellId) {
    const row = parseInt(cellId.slice(1), 10);
    const col = cellId.charCodeAt(0) - 65;  
    return [row, col];
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchAvailableShips();

});
