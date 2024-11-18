const apiUrl = 'https://koene.cvoatweb.be/api/public/zeeslagje';

let password
async function startGame() {

    password = document.querySelector('#password-input').value
    const response = await fetch(apiUrl + '/start', {
        method: 'POST',
        body: JSON.stringify({ 
            "password": password,
            "test": false
        })
    })

    
    if(response.ok) {
        alert('Game has been created')
        setInterval(() => {
            showStatus(selection.secret)
           
        }, 5000)
        return
    } else {
        json = await response.json()
        alert(json.message)
    }
}
