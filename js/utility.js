document.addEventListener('DOMContentLoaded', () => {
  
    createBoard('your-board', true);  
    createBoard('opponent-board', false);  
});

function createBoard(boardId, isYourBoard = false) {
    const table = document.querySelector(`#${boardId}`);
    if (!table) {
        console.error(`Element with id "${boardId}" not found.`);
        return;
    }

    table.innerText = '';  

    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th'));
    for (let col = 0; col < 10; col++) {
        const th = document.createElement('th');
        th.textContent = String.fromCharCode(65 + col);  // A-J
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    for (let row = 0; row < 10; row++) {
        const tr = document.createElement('tr');
        const rowHeader = document.createElement('th');
        rowHeader.textContent = row + 1;  
        tr.appendChild(rowHeader);

        for (let col = 0; col < 10; col++) {
            const td = document.createElement('td');
            const cellId = `${String.fromCharCode(65 + col)}${row + 1}`;
            td.dataset.cellId = cellId;

            if (isYourBoard) {
                td.addEventListener('click', () => placeShip(cellId));  
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}
