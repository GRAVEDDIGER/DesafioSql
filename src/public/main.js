// eslint-disable-next-line no-undef
const client = io()
// eslint-disable-next-line no-undef
const user = prompt('Ingrese Nombre de usuario')
const sendMessage = document.getElementById('sendMessage')
const chatMessage = document.getElementById('chatMessage')

sendMessage.addEventListener('click', e => {
  client.emit('clientMessage', { user, message: chatMessage.value, timeStamp: Date.now() })
})

client.on('startChat', messages => {
  console.log(messages, 'dd')
  const fragmentoFinal = document.createDocumentFragment()
  messages.forEach(message => {
    fragmentoFinal.appendChild(updateDom(message))
  })
  document.getElementById('msgBox').appendChild(fragmentoFinal)
})

client.on('serverMessage', (message) => {

})

function updateDom (message) {
  const fragmento = document.getElementById('chatItem').content
  const selector = fragmento.querySelectorAll('.data')
  selector[0].innerHtml = message.user
  selector[1].innerHtml = Date(message.timeStamp).toLocaleString()
  selector[2].innerHtml = message.message
  const nodo = fragmento.cloneNode(true)
  console.log(selector, 'mm')
  return nodo
}
