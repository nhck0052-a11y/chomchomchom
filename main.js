
document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.querySelector('.gallery-container');

    // Placeholder images - replace with your actual drone images
    const images = []; // Cleared the images array

    if (galleryContainer) {
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = '드론 촬영 사진';
            galleryContainer.appendChild(img);
        });
    }

    const themeSwitcher = document.querySelector('.theme-switcher');
    const body = document.body;

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
    }

    themeSwitcher.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });
});

// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/CcsLAc9f4/";

let model, webcam, labelContainer, maxPredictions;

// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    let highestProbability = 0;
    let predictedClass = '';

    for (let i = 0; i < maxPredictions; i++) {
        if (prediction[i].probability > highestProbability) {
            highestProbability = prediction[i].probability;
            predictedClass = prediction[i].className;
        }
    }
    // Clear previous predictions
    labelContainer.innerHTML = '';
    // Display only the winning class with a larger font size
    const resultElement = document.createElement('div');
    resultElement.style.fontSize = '2em';
    resultElement.style.fontWeight = 'bold';
    resultElement.textContent = `Predicted: ${predictedClass} (${(highestProbability * 100).toFixed(0)}%)`;
    labelContainer.appendChild(resultElement);
}
