document.getElementById('linkForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const linkInput = document.getElementById('video-url').value; // Get the value of the input

    // Update with the URL of your FastAPI endpoint
    const endpoint = 'http://127.0.0.1:8000/submit-url';

    // Sending the link using Fetch API
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: linkInput }) // Sending the link in JSON format
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Update the UI with the success message or download link
        document.getElementById('download-status').innerText = "Download started!";
        if (data.downloadLink) {
            document.getElementById('download-link').innerHTML = `<a href="${data.downloadLink}">Download Video</a>`;
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        // Display an error message to the user
        document.getElementById('download-status').innerText = "An error occurred. Please try again.";
    });
});
