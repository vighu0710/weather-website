console.log('Client side')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Please search to proceed'

const weather = (location) => {
        fetch('http://localhost:3000/weather?search='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.info
                messageTwo.textContent  = data.location
            }
        })
    })
}
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()
    messageTwo.textContent  = ''
    const location = search.value
    weather(location)
})