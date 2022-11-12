from flask import render_template, Flask, request
from flask_socketio import SocketIO, send
import time

app = Flask(__name__,template_folder='Template')
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)


@app.route('/')
def index():
    fecha = time.strftime('%d %b %y', time.localtime())
    return render_template('index.html', fecha=fecha)

@socketio.on('message')
def server(msg):
    time_stamp = time.strftime('%I:%M %p', time.localtime())
    #print(msg)

    string = ""
    aEnviar = []

    for i in msg:
        string += i
    for i in string.split("*"):
        aEnviar.append(i)

    nombre = aEnviar[0]
    sms = aEnviar[1]
    color = aEnviar[2]
    imagen = aEnviar[3]

    mensage = [nombre, sms, time_stamp, color, imagen]
    #print(mensage)

    send(mensage, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=8000, debug=False)
