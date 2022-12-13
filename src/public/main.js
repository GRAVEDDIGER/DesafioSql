/* eslint-disable no-undef */
const user = prompt('Ingrese Nombre de usuario')
const sendMessage = document.getElementById('sendMessage')
const chatBox = document.getElementById('msgBox')
socket.on('connection', (ser) => {
  socket.emit('clientMessage', 'hola mundo')
})
socket.on('startChat', (messages) => {
  const fragmentoFinal = document.createDocumentFragment()
  messages.forEach((message) => {
    fragmentoFinal.appendChild(updateDom(message))
  })
  document.getElementById('msgBox').appendChild(fragmentoFinal)
})
sendMessage.addEventListener('click', (e) => {
  socket.emit(
    'clientMessage',
    JSON.stringify({
      USER: user,
      MESSAGE: chatMessage.value,
      TIMESTAMP: Date.now()
    })
  )
})
socket.on('serverMessage', (message) => {
  chatBox.appendChild(updateDom(JSON.parse(message)))
})

function updateDom (mensaje) {
  const fragmento = document.getElementById('chatItem').content
  const selector = fragmento.querySelectorAll('.data')
  const message = mensaje
  if (user === message.user) {
    fragmento.querySelector('div').classList.add('derecha')
  } else fragmento.querySelector('div').classList.add('izquierda')
  selector[0].innerHTML = message.USER
  selector[1].innerHTML = new Date(message.TIMESTAMP).toDateString()
  selector[2].innerHTML = message.MESSAGE
  const nodo = fragmento.cloneNode(true)
  console.log(message)
  return nodo
}
