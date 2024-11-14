let ships = [];
let placedShips = [];

async function fetchShips() {
    const response = await fetch(apiUrl + '/ships/' + teamKey, {
        method: 'GET',
        headers: {
             'Content-Type': 'application/json' 
            }
    });

    if (response.ok) {
        ships = await response.json();
        updateShipOptions();
    }
}

function updateShipOptions() {
    const shipSelect = document.querySelector('#ship-select');
    shipSelect.innerHTML = '';

    ships.forEach(ship => {
        const placedCount = placedShips.filter(placedShip => placedShip.name === ship.name).length;
        const remainingCount = ship.quantity - placedCount;

        if (remainingCount > 0) {
            const option = document.createElement('option');
            option.value = ship.name;
            option.innerText = `${ship.name} (${remainingCount} left)`;
            shipSelect.appendChild(option);
        }
    });
}

async function placeShip(cellId) {
    const shipName = document.querySelector('#ship-select').value;
    const direction = document.querySelector('#orientation').value;

    const ship = ships.find(ship => ship.name === shipName);
    const placedCount = placedShips.filter(placedShip => placedShip.name === shipName).length;

    if (ship && placedCount < ship.quantity) {
        const response = await fetch(apiUrl + '/ship', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                secret: teamKey,
                start: cellId,
                type: shipName,
                direction: direction
            })
        });

        if (response.ok) {
            placedShips.push({ name: shipName, position: cellId, direction: direction });
            updateShipOptions();
        }
    }
}
