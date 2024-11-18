
let players = []
let selection = 
    {
        "secret": "",
        "start": "",
        "type": ``,
        "direction": ``
    }


document.querySelector('#submit-name').addEventListener('click', async function () {
    //console.log(password)
    if(password == undefined) {
        password = ''
        alert('Must create/start a game first')
        return
    } else {

    let name = document.querySelector('#player-name').value
    const response = await fetch(`${apiUrl}/register/${password}`, {
        method: 'POST',
        body: JSON.stringify({
            'name': name
        })
    })

    let json = await response.json()
    console.log(response)
    console.log(json)
    if(response.ok) {
        
        players.push({'name': name, 'secret':json.secret})
        alert(`Player ${name} has been created`)
        console.log(players)
        let teamOne = document.querySelector('#teamOne')
        let teamTwo = document.querySelector('#teamTwo')
        //console.log(document.querySelector('#teamOne').innerText == '')

        //player selection method
        if(document.querySelector('#teamOne').innerText == ''){
            teamOne.innerText = players[players.length - 1].name
            teamOne.value = players[players.length - 1].secret
            teamOne.addEventListener('click', () => {
                selection.secret = `${teamOne.value}`
                showStatus(selection.secret)
                options(teamOne.value)
                resetBoard()
            })
            console.log(teamOne.value)
        } else {
            teamTwo.innerText = players[players.length - 1].name
            teamTwo.value = players[players.length - 1].secret
            teamTwo.addEventListener('click', () => {
                selection.secret = `${teamTwo.value}`
                showStatus(selection.secret)
                options(teamTwo.value)
                resetBoard()
            })
            console.log(selection)
        }

        if(players.length == 2 ){
            document.querySelector('#team-Name').hidden = true
            document.querySelector('#orientation').disabled = false
            document.querySelector('#ship-select').disabled = false
        }
        name = ''
        
    } else {
        alert(json.message)
    }
    }
})


//JOINING GAME

document.querySelector('#join-name').addEventListener('click', async function () {
    //console.log(password)
    password = document.querySelector('#password-input').value
    if(password == undefined) {
        password = ''
        alert('Must create/start a game first')
        return
       
    } else {
        let name = document.querySelector('#player-name').value
    const response = await fetch(`${apiUrl}/register/${password}`, {
        method: 'POST',
        body: JSON.stringify({
            'name': name
        })
    })

    let json = await response.json()
    console.log(response)
    console.log(json.message)

    if(response.ok) {
        players.push({'name': name, 'secret':json.secret})
        alert(`${name} has Joined the Game`)
        console.log(players)

        setInterval(() => {
            showStatus(selection.secret)
           
        }, 5000)




        let teamOne = document.querySelector('#teamOne')
        let teamTwo = document.querySelector('#teamTwo')
        //console.log(document.querySelector('#teamOne').innerText == '')

        //player selection method
        if(document.querySelector('#teamOne').innerText == ''){
            teamOne.innerText = players[players.length - 1].name
            teamOne.value = players[players.length - 1].secret
            teamTwo.hidden = true
            selection.secret = `${teamOne.value}`
            teamOne.addEventListener('click', () => {
                selection.secret = `${teamOne.value}`
                showStatus(selection.secret)
                options(teamOne.value)
                resetBoard()
                console.log(selection)
            })

            if(players.length == 1 ){
                document.querySelector('#team-Name').hidden = true
                document.querySelector('#orientation').disabled = false
                document.querySelector('#ship-select').disabled = false
            }








    } else {
        alert(json.message)
    }

    }
}

})







    // const response = await fetch(apiUrl + '/register/' + gameKey, {
    //     method: 'POST',
    //     headers: { 
    //         'Content-Type': 'application/json' 
    //     },
    //     body: JSON.stringify({ 
    //         name: teamName 
    //     })
    // });





    // if (response.ok) {
    //     teamKey = (await response.json()).secret;
    //     role = roleName;

    //     document.querySelector('#player-role').innerText = `Role: ${role}`;
    //     fetchShips();

    //     statusInterval = setInterval(checkStatus, 5000);
    // }


// async function checkStatus() {
//     const response = await fetch(apiUrl + '/status/' + teamKey);

//     if (response.ok) {
//         const data = await response.json();

//         document.querySelector('#my-team-name').innerText = data.myTeamName || 'Not Registered';
//         document.querySelector('#opponent-team-name').innerText = data.opponentTeamName || 'Not Registered';
//         document.querySelector('#turn-status').innerText = data.yourTurn ? "Your Turn" : "Opponent's Turn"; // ? is the (if)  operator and : is the (else) operator
//     }
// 