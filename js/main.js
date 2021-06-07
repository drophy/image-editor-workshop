console.log('Holi');

const width = 320;
const height = 240;

let uploadedImage = null;

function setup() {
    createCanvas(width, height).parent('canvas-container');
    pixelDensity(1);

    const htmlDropzone = select('#dropzone');
    htmlDropzone.dragOver(function() {
        htmlDropzone.addClass('dragover');
    });
    htmlDropzone.dragLeave(function() {
        htmlDropzone.removeClass('dragover');
    });
    htmlDropzone.drop(function(file) {
        uploadedImage = loadImage(file.data);

        htmlDropzone.removeClass('dragover');
    });
}
  
function draw() {
    background(100);
    if(uploadedImage === null) return;

    let canvasRatio = width/height;

    let imageWidth = uploadedImage.width;
    let imageHeight = uploadedImage.height;
    let imageRatio = imageWidth/imageHeight;

    let x = 0, y = 0, w, h;

    if(imageRatio > canvasRatio) {
        w = width;
        h = w/imageRatio;
        y = (height - h)/2;
    } else {
        h = height;
        w = imageRatio * h;
        x = (width - w)/2;
    }
    
    image(uploadedImage, x, y, w, h);
}