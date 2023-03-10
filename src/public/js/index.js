let socket = io()
let user = ''
let chatBox = document.getElementById('chatbox')

Swal.fire({
    title: 'Authentication',
    input: 'text',
    text: 'Who are you?',
    inputValidator: value => {
        return !value.trim() && 'Please. Write a username!'
    },
    allowOutsideClick: false
}).then( result => {
    user = result.value
    document.getElementById('username').innerHTML = user
})

// Enviamos mensajes
chatBox.addEventListener('keyup', event => {
    if(event.key === 'Enter') {
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user,
                message: chatBox.value
            })

            chatBox.value = ''
        }
    }
})


// Recibir Mensahes
socket.on('logs', data => {
    const divLog = document.getElementById('messageLogs')
    let messages = ''

    data.reverse().forEach(message => {
        messages += `<p><i>${message.user}</i>: ${message.message}</p>`
    });

    divLog.innerHTML = messages
})