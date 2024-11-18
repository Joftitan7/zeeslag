// let ships = [];
// let placedShips = [];

let shipPos = [];
let hitShipPos = []
let missedShipPos = []


//fetch ship positions here 

document.querySelector('#show-btn').addEventListener('click', () => {
    fetchShips(selection.secret)
})

async function fetchShips(secret) {
    
    const response1 = await fetch(`https://koene.cvoatweb.be/api/public/zeeslagje/status/${secret}`, {
        method: 'GET'
    })

    const json1 = await response1.json()
    console.log(json1)

    
    getMyShipPos(json1.myBoard)
    getEnemyShipStatus(json1.opponentBoard)
    const result = getMyShipPos(json1.myBoard)
    const result1 = getEnemyShipStatus(json1.opponentBoard)

  console.log(result, result1)
    // json1.myBoard
    console.log()

    //gets ship positions
    function getMyShipPos(board) {
        shipPos.length = 0
    Object.entries(board).forEach(([row, columns]) => {
      Object.keys(columns).forEach(coord => {
        if (columns[coord] === 'S') {
          shipPos.push(coord);
        }
        
      });
    });
    
  
    return shipPos
  }

  function getEnemyShipStatus(board) {

    Object.entries(board).forEach(([row, columns]) => {
        Object.keys(columns).forEach(coord => {

            if (columns[coord] === 'X') {
                hitShipPos.push(coord)
                console.log(hitShipPos)
            }
    
            if (columns[coord] === '0') {
                missedShipPos.push(coord)
                console.log(missedShipPos)
            }
          
        })
      })

      return missedShipPos

  }
  
  shipPos.forEach((element) => {
    let shipCoord = document.querySelector(`#${element}`)
    shipCoord.innerText = shipCoord.id
    shipCoord.innerText = 'S'
    shipCoord.classList.add('ship')
  })

  hitShipPos.forEach((element) => {
    let shipCoord = document.querySelector(`.opponent-board-${element}`)
    shipCoord.innerText = shipCoord.id
    console.log(shipCoord)
    shipCoord.innerText = 'X'
    shipCoord.classList.add('hit')
    //document.querySelector(`.hit`).style.backgroundColor = 'yellow'
  })

  missedShipPos.forEach((element) => {
    let shipCoord = document.querySelector(`.opponent-board-${element}`)
    shipCoord.innerText = shipCoord.id
    shipCoord.innerText = '0'
    shipCoord.classList.add('miss')
    document.querySelector(`.miss`).style.backgroundColor = 'blue'
  })


}







//place ship positions here
async function placeShips(secret, coord) {
    //get secret from players[]
    //get coord from field
    //get direction from select
    //get ship type
    

    const response = await fetch(`${apiUrl}/ship?=${secret}`, {
        method: "POST",
        body: JSON.stringify({ 
            "secret": secret,
            "start": coord,
            "type": `${document.querySelector('#ship-select').value}`,
            "direction": `${document.querySelector('#orientation').value}`
        })
    })

    let json = await response.json()
    console.log(json)
    options(selection.secret)
}

document.querySelector('#place-btn').addEventListener('click', () => {
    console.log(document.querySelector('#ship-select').value)
    placeShips(selection.secret, selection.start)
    

    // console.log(players)
    
})
