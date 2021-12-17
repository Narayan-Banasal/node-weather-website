console.log('Client side JavaScript file is loaded on to the server ');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = '';

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    const address = 'http://localhost:3000/weather?address=' + location;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(address).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location; 
                messageTwo.textContent = 'Temperature is ' + data.temperature + ' and the environment is ' + data.forecast.substring(6);
            }
        })
    })

})