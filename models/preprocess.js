const {createCanvas, loadImage, ImageData} = require('canvas');
const fs = require("fs");
const path = require("path");
const { uuid } = require('uuidv4');

function imageRoute(route){

    const image = loadImage(path.join(__dirname, route));
    console.log("Esta debe ser la ruta: " + path.join(__dirname, route));
    
    image.then(() => {
        console.log("Hasta ahora, todo bien");
        imageLoaded();
    }).catch(err => {
        console.log('Error fatal', err);
    })
    }
function imageLoaded(){

    var canvas = createCanvas(1200 , 1200);
    var ctx = canvas.getContext("2d");
    loadImage('images/pictures.jpg').then((image) => {
        // Carga la imagen desde una ruta en disco
        ctx.drawImage(image, 0, 0, 1200, 1200); // Dibuja la imagen en el canvas, con un ancho y alto de 200px
        //console.log(canvas.toDataURL()); // Devuelve la imagen en formato base64

        //extraer tamaño de imagen y mantener mismas proporciones
        canvas.width = image.width;
        canvas.height = image.height;   
        
    //Dibujar imagen en canvas
    ctx.drawImage(image, 0, 0, image.width, image.height);
  
    var resultado = canvas;
    //pasar el objeto de tipo imagen a función blancoYNegro
    blancoYNegro(canvas);
    
    //visualizar imagen en documento html
    //var resultado = document.getElementById("Resultado");
    convolucionar(canvas, resultado);
    });
}
function blancoYNegro(canvas){

    //tomar imagen y contexto
    var ctx = canvas.getContext("2d");
    var imgData = ctx.getImageData(0,0, canvas.width, canvas.height);
    var pixeles = imgData.data;
    console.log(imgData.data);

    //Recorrer cada uno de los pixeles de la imagen
    //obtenido en el arreglo de imgData.data
    for (var p = 0; p < pixeles.length; p += 4) {
        
        //separar en pixeles de color, obteniendo un promedio
        //de los 3 colores para obtener un promedio en gris
        var rojo = pixeles[p];
        var verde = pixeles[p+1];
        var azul = pixeles[p+2];
        var alpha = pixeles[p+3];

        var gris = (rojo + verde + azul)/3;
        
        pixeles[p] = gris;
        pixeles[p+1] = gris;
        pixeles[p+2] = gris;
        
    }
    
    ctx.putImageData(imgData, 0, 0);

}
function convolucionar(canvasFuente, canvasDestino) {
    //obtener las variables necesarias
    var ctxFuente = canvasFuente.getContext("2d");
    var imgDataFuente = ctxFuente.getImageData(0,0, canvasFuente.width, canvasFuente.height);
    var pixelesFuente = imgDataFuente.data;    
    //asegurarse de que el canvasFuente y canvasFestino tengan el mismo tamaño
    canvasDestino.width = canvasFuente.width;
    canvasDestino.height = canvasFuente.height;

    var ctxDestino = canvasDestino.getContext("2d");
    var imgDataDestino = ctxDestino.getImageData(0,0, canvasDestino.width, canvasDestino.height);
    var pixelesDestino = imgDataDestino.data;

    
    //Nucleo, Kernel,
    /*
    var Kernel = [

        [-1,-1,-1],
        [-1, 8,-1],
        [-1,-1,-1],
        
        //[0,0,0],
        //[0,0,0],
        //[0, 1,0],

        //[1,0,-1],
        //[0, 0,0],
        //[-1,0,1],

    ];*/
    var sobelVertical = [

        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],

    ];
    var sobelHorizontal = [

        [-1, -2,-1],
        [ 0, 0, 0], 
        [ 1, 2, 1],

    ];

    for(var y=1; y < canvasFuente.height-1; y++){

        for(var x=1; x < canvasFuente.width-1; x++){

            //posición en el arreglo de javascript
            var idx = ((y*canvasFuente.width) + x) *4;

            //Reducción de código
            /*
            var totalY = 0
            var totalX = 0

            for(var KernelY = 0; KernelY <3; KernelY++){
                for(var KernelX = 0; KernelX <3; KernelX++){

                    totalY += sobelVertical[KernelY][KernelX] * pixelesFuente[((((y + (KernelY-1))*canvasFuente.width) + (x + (KernelX-1))) * 4)];

                    totalX += sobelHorizontal[KernelY][KernelX] * pixelesFuente[((((y + (KernelY-1))*canvasFuente.width) + (x + (KernelX-1))) * 4)];

                }             
            }*/

            //Primer casilla
            
            //Kernel Regular
            /*
            var casilla1 = Kernel[0][0] * pixelesFuente[((((y-1)*canvasFuente.width) + (x-1)) * 4)];
            var casilla2 = Kernel[0][1] * pixelesFuente[((((y-1)*canvasFuente.width) + (x)) * 4)];
            var casilla3 = Kernel[0][2] * pixelesFuente[((((y-1)*canvasFuente.width) + (x+1)) * 4)];
            var casilla4 = Kernel[1][0] * pixelesFuente[((((y)*canvasFuente.width) + (x-1)) * 4)];
            var casilla5 = Kernel[1][1] * pixelesFuente[((((y)*canvasFuente.width) + (x)) * 4)];
            var casilla6 = Kernel[1][2] * pixelesFuente[((((y)*canvasFuente.width) + (x+1)) * 4)];
            var casilla7 = Kernel[2][0] * pixelesFuente[((((y+1)*canvasFuente.width) + (x-1)) * 4)];
            var casilla8 = Kernel[2][1] * pixelesFuente[((((y+1)*canvasFuente.width) + (x)) * 4)];
            var casilla9 = Kernel[2][2] * pixelesFuente[((((y+1)*canvasFuente.width) + (x+1)) * 4)];

            var resultado = casilla1 + casilla2 + casilla3 + casilla4 + casilla5 + casilla6 + casilla7 + casilla8 + casilla9;

            //asignar todos los pixeles
        
            pixelesDestino[idx] = resultado; //rojo
            pixelesDestino[idx+1] = resultado; //verde
            pixelesDestino[idx+2] = resultado; //azul
            pixelesDestino[idx+3] = 255; //alpha
            */
            //Convolución con sobel
            //Eje Y
            var casillaY1 = sobelVertical[0][0] * pixelesFuente[((((y-1)*canvasFuente.width) + (x-1)) * 4)];
            var casillaY2 = sobelVertical[0][1] * pixelesFuente[((((y-1)*canvasFuente.width) + (x)) * 4)];
            var casillaY3 = sobelVertical[0][2] * pixelesFuente[((((y-1)*canvasFuente.width) + (x+1)) * 4)];
            var casillaY4 = sobelVertical[1][0] * pixelesFuente[((((y)*canvasFuente.width) + (x-1)) * 4)];
            var casillaY5 = sobelVertical[1][1] * pixelesFuente[((((y)*canvasFuente.width) + (x)) * 4)];
            var casillaY6 = sobelVertical[1][2] * pixelesFuente[((((y)*canvasFuente.width) + (x+1)) * 4)];
            var casillaY7 = sobelVertical[2][0] * pixelesFuente[((((y+1)*canvasFuente.width) + (x-1)) * 4)];
            var casillaY8 = sobelVertical[2][1] * pixelesFuente[((((y+1)*canvasFuente.width) + (x)) * 4)];
            var casillaY9 = sobelVertical[2][2] * pixelesFuente[((((y+1)*canvasFuente.width) + (x+1)) * 4)];
            
            var resultadoY = casillaY1 + casillaY2 + casillaY3 + casillaY4 + casillaY5 + casillaY6 + casillaY7 + casillaY8 + casillaY9;

            //Eje X
            var casillaX1 = sobelHorizontal[0][0] * pixelesFuente[((((y-1)*canvasFuente.width) + (x-1)) * 4)];
            var casillaX2 = sobelHorizontal[0][1] * pixelesFuente[((((y-1)*canvasFuente.width) + (x)) * 4)];
            var casillaX3 = sobelHorizontal[0][2] * pixelesFuente[((((y-1)*canvasFuente.width) + (x+1)) * 4)];
            var casillaX4 = sobelHorizontal[1][0] * pixelesFuente[((((y)*canvasFuente.width) + (x-1)) * 4)];
            var casillaX5 = sobelHorizontal[1][1] * pixelesFuente[((((y)*canvasFuente.width) + (x)) * 4)];
            var casillaX6 = sobelHorizontal[1][2] * pixelesFuente[((((y)*canvasFuente.width) + (x+1)) * 4)];
            var casillaX7 = sobelHorizontal[2][0] * pixelesFuente[((((y+1)*canvasFuente.width) + (x-1)) * 4)];
            var casillaX8 = sobelHorizontal[2][1] * pixelesFuente[((((y+1)*canvasFuente.width) + (x)) * 4)];
            var casillaX9 = sobelHorizontal[2][2] * pixelesFuente[((((y+1)*canvasFuente.width) + (x+1)) * 4)];
            
            var resultadoX = casillaX1 + casillaX2 + casillaX3 + casillaX4 + casillaX5 + casillaX6 + casillaX7 + casillaX8 + casillaX9;

            //Teorema de pitágoras para tener los dos ejes en un sólo
            var mag = Math.sqrt(Math.pow(resultadoX, 2) + Math.pow(resultadoY, 2));
            //Eliminación de ruido
            mag = (mag < 80) ? 0 : mag;

            pixelesDestino[idx] = mag; //rojo
            pixelesDestino[idx+1] = mag; //verde
            pixelesDestino[idx+2] = mag; //azul
            pixelesDestino[idx+3] = 255; //alpha
        }

    }

    var finalWidth = canvasDestino.width;
    var finalHeight = canvasDestino.height;

    console.log(finalWidth + finalHeight);
    const canvas2 = createCanvas(finalWidth, finalHeight); // El tamaño del canvas se define con los valores de finalWidth y finalHeight
    console.log(canvas2); // No es necesario concatenar el objeto canvas con una cadena de texto
    console.log(finalWidth, finalHeight);

    const ctx = canvas2.getContext('2d');

    const imageData = new ImageData(imgDataDestino.data, finalWidth, finalHeight);
    ctx.putImageData(imageData, 0, 0);

    const buffer = canvas2.toBuffer('image/png'); // Convierte a formato PNG

    const filename = "imagen-" + uuid();

    fs.writeFileSync(`images/${filename}.png`, buffer);
    console.log("Imagen guardada")

}
module.exports = imageRoute;