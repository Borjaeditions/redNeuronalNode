const { createCanvas, ImageData } = require('canvas');
const fs = require('fs');

const width = 100;
const height = 100;
const pixelData = new Uint8ClampedArray(width * height * 4); // RGBA

// Asigna los valores de los píxeles aquí...
console.log(pixelData);

const canvas = createCanvas(width, height);
console.log(canvas);
const ctx = canvas.getContext('2d');

const imageData = new ImageData(pixelData, width, height);
ctx.putImageData(imageData, 0, 0);

const buffer = canvas.toBuffer('image/png'); // Convierte a formato PNG

fs.writeFileSync('mi_imagen.png', buffer);