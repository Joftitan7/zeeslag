apiUrl = 'https://koene.cvoatweb.be/api/public/zeeslagje';
let cells = []

document.addEventListener('DOMContentLoaded', () => {
  
    createBoard('your-board', true);  
    createBoard('opponent-board', true);  
    
});

function createBoard(boardId) {
    const table = document.querySelector(`#${boardId}`);

    const headerRow = document.createElement('tr')
    headerRow.appendChild(document.createElement('th'))
    
    for (let col = 0; col < 10; col++) {
        const th = document.createElement('th')
        th.textContent = String.fromCharCode(65 + col)  // A-J
        headerRow.appendChild(th)
    }
    table.appendChild(headerRow)

    for (let row = 0; row < 10; row++) {
        const tr = document.createElement('tr')
        const rowHeader = document.createElement('th')
        rowHeader.textContent = row + 1
        
        
        tr.appendChild(rowHeader)
        for (let col = 0; col < 10; col++) {
            const td = document.createElement('td')
             td.id = `${String.fromCharCode(65 + col)}${row + 1}`
             td.classList.add(`${boardId}-${String.fromCharCode(65 + col)}${row + 1}`)
             cellId = `${String.fromCharCode(65 + col)}${row + 1}`
             cells.push(td)

             td.textContent = cellId

             td.addEventListener('click', () => {
                selection.start = `${td.id}`
                console.log()
                console.log(selection)
                
            })

            tr.appendChild(td);
           
        }
        table.appendChild(tr);
    }

    
}

//creates dynamic options
let select = document.querySelector('#ship-select')

async function options (secret) {
    
    select.innerHTML = ''
    //console.log(select)
    const response = await fetch(`${apiUrl}/ships/${secret}`, {
        method: 'GET'
    })
    const json = await response.json()


    json.forEach(element => {
        let newOption = new Option(`${element.name} (${element.quantity})`, element.name)
        newOption.id = element.name
        select.add(newOption, undefined )
    });
}



function resetBoard() {
    //console.log(document.querySelectorAll('table'))
    //console.log(cells)
    cells.forEach((element) => {
       
        element.classList.remove('ship')
        element.classList.remove('hit')
        element.classList.remove('miss')
        element.innerText = element.id
    })
    
    
}

