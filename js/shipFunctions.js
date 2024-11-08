let placedShips = [];
let availableShips = [];

async function fetchAvailableShips() {
    if (!apiSecret) return console.warn("No API secret found.");

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
    shipSelect.innerHTML = ''; 

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
    const orientation = document.querySelector('#orientation').value;

    const ship = availableShips.find(s => s.name === shipName);

    if (!ship || !shipName) {
        alert("No more ships to place.");
        return;
    }

    const placedCount = placedShips.filter(s => s.name === shipName).length;
    const remainingCount = ship.quantity - placedCount;

    if (remainingCount <= 0) {
        alert(`Cannot place more ${shipName}s.`);
        return;
    }

    if (!canPlaceShip(cellId, ship.length, orientation)) {
        alert("The ship cannot be placed here due to board boundaries.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/ship`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ secret: apiSecret, start: cellId, type: shipName, direction: orientation })
        });

        if (response.ok) {
            placedShips.push({ name: shipName, position: cellId, orientation });
            updateShipDropdown(); 
        } else {
            throw new Error("Failed to place ship.");
        }
    } catch (error) {
        console.error("Error placing ship:", error);
    }
}


function canPlaceShip(startCell, shipLength, orientation) {
    const boardSize = 10;
    const [startRow, startCol] = parseCell(startCell);

    return orientation === 'H'
        ? startCol + shipLength <= boardSize
        : startRow + shipLength <= boardSize;
}

function parseCell(cellId) {
    const row = parseInt(cellId.slice(1), 10);
    const col = cellId.charCodeAt(0) - 65;
    return [row, col];
}

document.addEventListener('DOMContentLoaded', fetchAvailableShips);
