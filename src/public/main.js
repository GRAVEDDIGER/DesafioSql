/* eslint-disable no-undef */
const user = prompt('Ingrese Nombre de usuario')
const sendMessage = document.getElementById('sendMessage')
const chatBox = document.getElementById('msgBox')
socket.on('connection', (ser) => {
  console.log('conectado')
  socket.emit('clientMessage', 'hola mundo')
})
socket.on('startChat', messages => {
  const fragmentoFinal = document.createDocumentFragment()
  messages.forEach((message) => {
    fragmentoFinal.appendChild(updateDom(message))
  })
  document.getElementById('msgBox').appendChild(fragmentoFinal)
})
sendMessage.addEventListener('click', (e) => {
  socket.emit('clientMessage', JSON.stringify({
    user,
    message: chatMessage.value,
    timeStamp: Date.now()
  }))
})
socket.on('serverMessage', (message) => {
  console.log('mensaje del server', message)
  chatBox.appendChild(updateDom(message))
})

function updateDom (mensaje) {
  const fragmento = document.getElementById('chatItem').content
  const selector = fragmento.querySelectorAll('.data')
  const message = mensaje
  if (user === message.user) fragmento.querySelector('div').classList.add('derecha')
  else fragmento.querySelector('div').classList.add('izquierda')
  console.log(fragmento)
  selector[0].innerHTML = message.user
  selector[1].innerHTML = new Date(message.timeStamp).toDateString()
  selector[2].innerHTML = message.message
  const nodo = fragmento.cloneNode(true)
  return nodo
}
