async function showStatus(secret) {
     const response = await fetch(`https://koene.cvoatweb.be/api/public/zeeslagje/status/${secret}`, {
        method: 'GET'
     })
     let json = await response.json()
     console.log(json)
    
    //  <p><strong>My Team:</strong> <span id="my-team-name">Not Registered</span></p>
    //     <p><strong>Opponent Team:</strong> <span id="opponent-team-name">Not Registered</span></p>
    //     <p><strong>Turn Status:</strong> <span id="turn-status">Waiting...</span></p>

    let myName = document.querySelector('#my-team-name')
    let opponentTeamName = document.querySelector('#opponent-team-name')
    let turnStatus = document.querySelector('#turn-status')
    myName.innerText = json.myTeamName
    opponentTeamName.innerText = json.opponentTeamName
    turnStatus.innerText = json.yourTurn

    console.log(json.myTeamName)

}





