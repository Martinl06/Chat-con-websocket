//metodo para el lado del cliente (public)
const socket = io();


socket.on('mensaje-bienvenida', (data)=>{
    console.log(data);
})

socket.on('messages-all', (data)=>{
    render(data)
})



function addMessage(){
    const mensaje = {
        Author : document.getElementById('userName').value,
        Texto : document.getElementById('textName').value
    }
    socket.emit('New-message', mensaje)

    console.log(mensaje);
    return false
}

function render(data){
    let html = data.map(elem=>{
        return(`<div class="container chat mx-4 my-2">
                    <strong>${elem.Author}</strong> dice <em>${elem.Texto}</em>
                </div>`)
    }).join(' ');

    document.getElementById('caja').innerHTML = html;
}