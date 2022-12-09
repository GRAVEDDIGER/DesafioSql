// eslint-disable-next-line no-undef
const client = io()
const user = prompt('Ingrese Nombre de usuario')
const sendMessage = document.getElementById('sendMessage')
const chatMessage = document.getElementById('chatMessage')

sendMessage.addEventListener('click', e => {
  client.emit('clientMessage', { user, message: chatMessage.value, timeStamp: Date.now() })
})

client.on('startChat', messages => {
  console.log(messages, 'dd')
  messages.forEach(message => {
    const fragmento = document.getElementById('chatItem').content
    const selector = fragmento.querySelectorAll('.data')
    console.log(selector, 'mm')
  })
})
