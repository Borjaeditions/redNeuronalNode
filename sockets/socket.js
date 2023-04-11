const { io } = require('../index');
const Categorias = require('../models/bands_colection.js');
const Categoria = require('../models/band.js');

const categorias = new Categorias();

categorias.addCategoria( new Categoria( 'Pantalón' ) );

console.log(categorias);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit("active-bands", categorias.getCategorias());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje!!!', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });
    client.on('vote-band', (payload) => {

        console.log(payload.id, "Se ha agregado a: " ,payload.names);
        categorias.voteCategoria(payload.id);        
        io.emit('active-bands', categorias.getCategorias());

    });
    client.on('emitir-mensaje', (payload) =>{

        //io.emit('nuevo-mensaje', payload); //emite a todos los clientes conectados
        client.broadcast.emit('nuevo-mensaje', payload);

    });
    client.on('agregar-banda', (payload)=>{

        console.log(payload);
        const newCategoria = new Categoria(payload.nombre);
        
        categorias.addCategoria(newCategoria);
        console.log("Categoria agregada");
        io.emit('active-bands', categorias.getCategorias());

    });
    client.on('borrar-categoria', (payload)=>{

        console.log(payload.nombre, "borrado");
        
        bands.deleteBand(payload.id);
        io.emit('active-bands', categorias.getCategorias());

    });

});
