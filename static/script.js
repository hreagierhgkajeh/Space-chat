
const socket = io();
const msgerInput = get(".msger-input");
const msgerForm = get(".msger-inputarea");
const msgerChat = get(".msger-chat");
const imgLogo = "../static/foto5.jpg";
const imgUser = "../static/foto6.jpg";

const datosForm = get(".datosForm");
const usuario = get(".usuario");
const color = get(".color");

//socket.on('message', function(mensage){
//  if ( mensage[0]==$('#usuario').val()){
//    $('#message').append("<div class='msg right-msg'><div class='msg-img' style='background-image: url(../static/LOGO.png)'></div><div class='msg-bubble'><div class='msg-info'><div class='msg-info-name'>"+mensage[0] +"</div><div class='msg-info-time'>"+ mensage[2] +"</div></div><div class='msg-text'>"+ mensage[1] +"</div></div></div>");
//  }else{
//    $('#message').append('<div class="msg left-msg"><div class="msg-img" style="background-image: url(../static/foto6.jpg)"></div><div class="msg-bubble"><div class="msg-info"><div class="msg-info-name">'+ mensage[0]+'</div><div class="msg-info-time">'+ mensage[2] +'</div></div><div class="msg-text">'+ mensage[1] +'</div></div></div>');
//  }   
//})


//$('#send').on('click', function () {
//  socket.send([$('#usuario').val()+'*'+$('#myMessage').val()]);
//  $('#myMessage').val('');
//});

  


socket.on('message', function(mensage){
    if ( mensage[0]==$('#usuario').val()){
        appendMessage("right", mensage[4], mensage[2], mensage[1], mensage[0], mensage[3]);
    }else{
        appendMessage("left", mensage[4], mensage[2], mensage[1], mensage[0], mensage[3]);
    } 

})

datosForm.addEventListener("submit", event =>{
    event.preventDefault();

    const textUsuario = usuario.value;
    const textColor = color.value;


    if (!textColor || !textUsuario) return;
    textUsuario.value = "";
    cerrarModale();

})


msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    if (!$('#image').val()){
        $('#image').val("imagen-1");
    };

    socket.send([$('#usuario').val()+'*'+msgText+"*"+$('#color').val()+"*"+$('#image').val()]);
    msgerInput.value = "";

});

function appendMessage(side, img, time, text, name, colorName) {
    const msgHTML = `
    <div class="msg ${side}-msg">
        <div class=${img}></div>

        <div class="msg-bubble">
        <div class="msg-info">
            <div class=${colorName}>${name}</div>
            <div class="msg-info-time">${time}</div>
        </div>

        <div class="msg-text">${text}</div>
        </div>
    </div>
    `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}


function get(selector, root = document) {
    return root.querySelector(selector);
}

function abrirModale(){
    htmlModale = document.getElementById("modale");
    htmlModale.setAttribute("class", "modale opened");

}
function cerrarModale(){
    htmlModale = document.getElementById("modale");
    htmlModale.setAttribute("class", "modale");
}

function cambiarImg(classType){
    htmlModale = document.getElementById("imagen");
    htmlModale.setAttribute("class", classType);
    $('#image').val(classType);
}
  

