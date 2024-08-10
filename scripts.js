document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.session-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Fade out the main page
            document.body.classList.add('fade-out');

            // Wait for the fade-out transition to complete
            setTimeout(() => {
                const sessionType = button.getAttribute('data-session').replace('*', '-');
                window.location.href = `${sessionType}.html`;
            }, 1000); // Matches the CSS transition duration
        });
    });

    // Handle Enter key to move to the next text box
    const textBoxes = document.querySelectorAll('.text-boxes input[type="text"]');

    textBoxes.forEach((box, index) => {
        box.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent default Enter key behavior
                const nextIndex = index + 1;
                if (nextIndex < textBoxes.length) {
                    textBoxes[nextIndex].focus(); // Move focus to the next text box
                }
            }
        });
    });

    // Fade in the page on load
    document.body.style.opacity = 1;

    // Save button functionality
    const saveButton = document.getElementById('save-button');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            const textBoxes = document.querySelectorAll('.text-boxes input[type="text"]');
            let fileContent = '';

            textBoxes.forEach((box, index) => {
                const content = box.value.trim() === '' ? 'Empty' : box.value.trim();
                fileContent += `${index + 1} - ${content}\n`;
            });

            // Generate filename based on current date and time
            const now = new Date();
            const day = String(now.getDate()).padStart(2, '0');
            const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const filename = `${day}-${month}-${year}-${hours}-${minutes}.txt`;

            // Create a Blob and download it as a text file
            const blob = new Blob([fileContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }
});
