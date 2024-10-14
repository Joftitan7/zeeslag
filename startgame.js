
    function start(password) {
        async function fetchdata() {
            let response = await fetch("https://koene.cvoatweb.be/api/public/smurf-api/zeeslagje/start", {
                method: 'POST',
                body: JSON.stringify({
                    "password": `${password}`,
                    "test": true

                    
                })

                // let data = response.json
            })
        }

        fetchdata()

    }

start(123)




