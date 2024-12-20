
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
})