


const formEl = document.querySelector(".form");
formEl.addEventListener("submit", event => {
    event.preventDefault();
    fetchLogInn();
})
formEl.addEventListener('keypress', event => {
    if(event.keyCode === 13){
        event.preventDefault();
        formEl.dispatchEvent(new Event('submit', {cancelable: true}));
    }
})

async function fetchLogInn(){
    //Hvis det kommer in error iløpet av try blocken vil den hoppe rett til catch
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        //Henter dataen fra URL linken
        const response = await fetch("https://675aee2c9ce247eb19351651.mockapi.io/API/v1/users");
        //Sjekker at den får tak i linken
        if(!response.ok){
            throw new Error('Email or password was incorrect');
        }

        //Gjør URL linken om til json format
        const data = await response.json();
        console.log('Fetched data: ', data);

        //Sjekker at email og passord variabelet i JSON passer med inputfeltet
        const user = data.find(item => {
            return item.email === email && item.password === password;
        })

        //Hvis ikke email eller passord stemmer sender den error
        if(!user){
            throw new Error('Email or password was incorrect');
        }
        //Hvis alt stemmer sender den ut name fra samme JSON object som email og passord matcher
        console.log(`${user.username} is now logged inn`);

    //Hvis det kommer noen errorer kommer du rett til catch    
    } catch (error) {
        //Viser at det har vært en error, .stack gjør at den viser hvor error skjedde
        console.log(error.stack);
    }
}