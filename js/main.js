console.log('Holi');

const width = 320;
const height = 240;

let uploadedImage = null;

const downloadButton = $('#download-button');

const redSlider = $('#red-slider');
const greenSlider = $('#green-slider');
const blueSlider = $('#blue-slider');

const presetSelect = $('#preset-select');

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
    background(100, 0);
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

    // Filters
    loadPixels();

    if(presetSelect.val() === 'grayscale') grayscale(pixels);
    else defaultFilter(pixels);
    
    updatePixels();
}

downloadButton.click(function() {
    uploadedImage.loadPixels();

    // Backup pixel values
    let pixelBackup = [];
    for(let i = 0; i < uploadedImage.pixels.length; i++) {
        pixelBackup.push(uploadedImage.pixels[i]);
    }

    // Apply filters
    if(presetSelect.val() === 'grayscale') grayscale(uploadedImage.pixels);
    else defaultFilter(uploadedImage.pixels);
    
    uploadedImage.updatePixels();

    // Save
    save(uploadedImage, 'edit.png');

    // Restore image values
    uploadedImage.loadPixels();
    for(let i = 0; i < uploadedImage.pixels.length; i++) {
        uploadedImage.pixels[i] = pixelBackup[i];
    }
    uploadedImage.updatePixels();
});

///// FILTERS /////
function grayscale(pixels) {
    for(let pixel = 0; pixel < pixels.length/4; pixel++) {
        let i = pixel * 4;
        let average = (pixels[i] + pixels[i+1] + pixels[i+2]) / 3;
        pixels[i+0] = average; // R
        pixels[i+1] = average; // G
        pixels[i+2] = average; // B
    }
}

function defaultFilter(pixels) {
    let r = Number(redSlider.val());
    let g = Number(greenSlider.val());
    let b = Number(blueSlider.val());
    for(let pixel = 0; pixel < pixels.length/4; pixel++) {
      let i = pixel * 4;
      pixels[i+0] = pixels[i+0] + r; // R
      pixels[i+1] = pixels[i+1] + g; // G
      pixels[i+2] = pixels[i+2] + b; // B
    }
}