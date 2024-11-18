document.querySelector('#bot-btn').addEventListener('click', () => {
    setInterval(bot(selection.secret), 5000)
});

let currentIndex = 0;
async function bot(secret) {
    let sequence = [
        'A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1',
        'A5', 'B5', 'C5', 'D5', 'E5', 'F5', 'G5', 'H5', 'I5', 'J5',
        'A10', 'B10', 'C10', 'D10', 'E10', 'F10', 'G10', 'H10', 'I10', 'J10',
        'B2', 'C3', 'D4', 'E6', 'F7', 'G8', 'H9', 'I3', 'J6', 'A6',
        'C2', 'D3', 'E4', 'F6', 'G7', 'H8', 'I9', 'J2', 'A9', 'B7',
        'D5', 'E7', 'F8', 'G9', 'I5', 'J3', 'A8', 'B9', 'C6',
        'D7', 'E8', 'F9', 'G10', 'H5', 'I6', 'J7', 'A3', 'B8', 'C7',
        'E2', 'F3', 'G4', 'H6', 'I7', 'J8', 'A4', 'B5', 'C5', 'D6',
        'E3', 'F4', 'G5', 'H7', 'I8', 'J9', 'A2', 'B4', 'C8', 'D8',
        'F2', 'G3', 'H4', 'I5', 'J6', 'A7', 'B6', 'C9', 'D9', 'E9'
    ];

    

    const attackResponse = await fetch('https://koene.cvoatweb.be/api/public/zeeslagje/attack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            secret: secret, 
            position: sequence[currentIndex] })
            
    });
    const attackJson = await attackResponse.json()

    currentIndex++

    if(currentIndex > 98) {
        currentIndex = 0
    }

}

