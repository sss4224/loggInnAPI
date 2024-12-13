
const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const repeatPasswordEl = document.getElementById('repeatPassword');

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', async event => {
    event.preventDefault();
    if(passwordEl.value !== repeatPasswordEl.value){
        alert('Passwords are not matching');
        formEl.reset();
        return;
    }

    const isUnique = await checkForDup();

    if(isUnique){   
        const payload = new FormData(formEl);
        console.log([...payload]);
    
        payload.forEach((value, key) => {
            payload[key] = value;
        })
    
    
        fetch('https://675aee2c9ce247eb19351651.mockapi.io/API/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            const userData = {user: data};
            console.log(userData);
        })
        .catch(error => console.error(error));
    
        window.location.href = 'https://sss4224.github.io/loggInnAPI/index.html';
    }
})


async function checkForDup(){
    try {
        
        const response = await fetch('https://675aee2c9ce247eb19351651.mockapi.io/API/v1/users');
        if(!response.ok){
            throw new Error('Could not find/connect to the server');
        }

        const data = await response.json();

        const user = data.find(item => {
            return item.email === emailEl.value
        })

        if(user){
            alert('This email is already used');
            throw new Error('This email is allrady in use');
        }

    } catch (error) {
        console.log('Error: ', error.stack);
        return false;
    }
}