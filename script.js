//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

 function loadImage(image) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => resolve(img); // Resolve with the image element
        img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Reject with error
      });
    }

    // Function to handle downloading and displaying images
    function downloadAndDisplayImages() {
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = ''; // Clear any previous content

      const imagePromises = images.map(loadImage); // Map URLs to promises

      Promise.all(imagePromises)
        .then((loadedImages) => {
          // All images downloaded successfully
          loadedImages.forEach((img) => {
            outputDiv.appendChild(img); // Append each image to the output div
          });
        })
        .catch((error) => {
          // Handle any errors during image loading
          console.error(error);
          outputDiv.innerHTML = `<p style="color: red;">${error}</p>`;
        });
    }

    // Attach event listener to the button
    document
      .getElementById('download-images-button')
      .addEventListener('click', downloadAndDisplayImages);
