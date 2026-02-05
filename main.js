
document.addEventListener('DOMContentLoaded', async () => {
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

    // Teachable Machine Image Model Integration
    const URL = "https://teachablemachine.withgoogle.com/models/CcsLAc9f4/";
    let model, maxPredictions;

    const imageUpload = document.getElementById('image-upload');
    const selectedImage = document.getElementById('selected-image');
    const predictButton = document.getElementById('predict-button');
    const labelContainer = document.getElementById('label-container');

    // Load the model
    async function initTeachableMachine() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        console.log("Teachable Machine model loaded.");
    }

    // Call initTeachableMachine on DOMContentLoaded
    await initTeachableMachine();

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                selectedImage.src = e.target.result;
                selectedImage.style.display = 'block';
                predictButton.disabled = false;
                labelContainer.innerHTML = ''; // Clear previous predictions
            };
            reader.readAsDataURL(file);
        } else {
            selectedImage.src = '';
            selectedImage.style.display = 'none';
            predictButton.disabled = true;
            labelContainer.innerHTML = '';
        }
    });

    predictButton.addEventListener('click', async () => {
        if (selectedImage.src) {
            await predict();
        }
    });

    async function predict() {
        const prediction = await model.predict(selectedImage);
        let highestProbability = 0;
        let predictedClass = '';

        for (let i = 0; i < maxPredictions; i++) {
            if (prediction[i].probability > highestProbability) {
                highestProbability = prediction[i].probability;
                predictedClass = prediction[i].className;
            }
        }
        labelContainer.innerHTML = ''; // Clear previous predictions
        const resultElement = document.createElement('div');
        resultElement.style.fontSize = '2em';
        resultElement.style.fontWeight = 'bold';
        resultElement.textContent = `Predicted: ${predictedClass} (${(highestProbability * 100).toFixed(0)}%)`;
        labelContainer.appendChild(resultElement);
    }
});
