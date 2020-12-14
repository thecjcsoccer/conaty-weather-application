console.log('Client side javascript')

/**
fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

 */

/** 
fetch('http://localhost:3000/weather?address=Boston').then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)

        }
        else{ 
            console.log(data.location)
            console.log(data.forecast)
        }
         
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + decodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
         if(data.error){
            messageOne.textContent = data.error

          }
         else{ 
             
            messageOne.textContent =   data.location
            messageTwo.textContent =   data.forecast 
         }
         
      })
    }) 
})