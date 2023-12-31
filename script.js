// Global Variables
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImagesLoaded = 0; // Total images loaded
let photosArray = []; // Initialize the images array
let isInitialLoad = true;
let initialPhotoCount = 5; // Initial photos to load
const apiKey = "hzk2_QIEdAlNj1LDA2TDbuLcXek4NojEmxPfP1MY0p0";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialPhotoCount}`;

function updateAPIURLwithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function allImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImagesLoaded) {
        ready = true;
        loader.hidden = true;
    }
}

// Create elements for links and photos, add to dom

function displayPhotos() {
    imagesLoaded = 0;
    totalImagesLoaded = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> element to link to unsplash
        const item = document.createElement("a");
        item.setAttribute("href", photo.links.html);
        item.setAttribute("target", "_blank");
        // Create img for photo
        const img = document.createElement("img");
        img.setAttribute("src", photo.urls.regular);
        img.setAttribute("alt", photo.alt_description);
        img.setAttribute("title", photo.alt_description);
        // Event listener, check when each photo has loaded
        img.addEventListener("load", allImagesLoaded());
        // put <img> inside <a> then both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash api

async function getPhotosFromUnsplashApi() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if (isInitialLoad) {
            updateAPIURLwithNewCount(30);
            isInitialLoad = false;
        }
    } catch (err) {
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        getPhotosFromUnsplashApi();
    }
});

// On Load
getPhotosFromUnsplashApi();
