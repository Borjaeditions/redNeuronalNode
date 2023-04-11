var socket = io();
        socket.on('connect', function(){

            console.log('conectado al servidor');

        });
        socket.on('disconnect', function(){

            console.log('Desconectado del servidor');

        });

        //socket.emit('mensaje', {nombre: 'John',});
            
        socket.on('mensaje', function(payload){

            console.log('escuchando', payload);

        });
        socket.on('nuevo-mensaje', function(payload){

            console.log('Mensaje Recibido: ', payload);

        });
        socket.on('active-bands', function(payload){

            console.clear();
            console.table(payload);

        });