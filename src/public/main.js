// eslint-disable-next-line no-undef
const client = io()
const user = prompt('Ingrese Nombre de usuario')
const sendMessage = document.getElementById('sendMessage')
const chatMessage = document.getElementById('chatMessage')

sendMessage.addEventListener('click', e => {
  client.emit('clientMessage', { user, message: chatMessage.value, timeStamp: Date.now() })
})

client.on('startChat', messages => {
  messages.forEach(message => {

  })
})
