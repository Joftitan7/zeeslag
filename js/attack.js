
async function btnPressed() {
    console.log('pressed')

   const response = await fetch('https://koene.cvoatweb.be/api/public/zeeslagje/attack', {
        method: 'POST',
        headers: { 
                     'Content-Type': 'application/json' 
                 },
        body: JSON.stringify({
            "secret": selection.secret, //hier komt de secret dynamisch
            "position": `${document.querySelector('#target-cell').value}`
        })
    })

    const json = await response.json()
    console.log(json)

if(json.message =='Invalid data, missing secret' && result == undefined) {
    alert('No Player has been selected or created')
} else if(!response.ok) {
    alert(json.message)
} else {
    alert(json.result)
}



    //alert is hier
    
    //console.log(document.querySelector('#target-cell').value)
}