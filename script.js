// Countdown data array
let countdownsData = [];

// Function to calculate time remaining
function getTimeRemaining(endTime) {
    const total = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

// Function to display countdowns
function displayCountdowns() {
    const countdownsContainer = document.getElementById('countdowns');
    countdownsContainer.innerHTML = '';

    countdownsData.forEach((countdown, index) => {
        const endTime = new Date(countdown.date);
        const time = getTimeRemaining(endTime);

        const formattedDate = endTime.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });

        const countdownElem = document.createElement('div');
        countdownElem.classList.add('countdown-item');
        countdownElem.innerHTML = `
        <h3>${countdown.title}</h3>
        <div class="emoji">${countdown.emoji}</div>
        <p>${formattedDate}</p>
        <div class="countdown">
        <span>${time.days}d</span>
        <span>${time.hours}h</span>
        <span>${time.minutes}m</span>
            <span>${time.seconds}s</span>
        </div>
        <button class="edit-btn" data-index="${index}">Edit</button>
    `;
        countdownsContainer.appendChild(countdownElem);
    });

    // Add event listeners to edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            editCountdown(index);
        });
    });
}

// Function to handle form submission
document.getElementById('addCountdownForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const eventTitle = document.getElementById('eventTitle').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventEmoji = document.getElementById('eventEmoji').value;

    // Combine date and time into a single date-time string
    const eventDateTime = `${eventDate}T${eventTime}`;

    // Add the new countdown to the data array
    countdownsData.push({
        title: eventTitle,
        date: eventDateTime,
        emoji: eventEmoji
    });

    // Switch to page 2 (countdowns display)
    showPage('page2');

    // Update the display
    displayCountdowns();

    // Clear form fields
    document.getElementById('addCountdownForm').reset();
});

// Function to handle countdown editing
function editCountdown(index) {
    const editedCountdown = countdownsData[index];
    const confirmEdit = confirm(`Do you want to edit "${editedCountdown.title}"?`);

    if (confirmEdit) {
        // Simulate editing for demonstration (replace with your edit logic)
        const newTitle = prompt('Enter new title:', editedCountdown.title);
        const newDate = prompt('Enter new date:', editedCountdown.date);
        const newTime = prompt('Enter new time:', editedCountdown.date.split('T')[1]); // Extract time part

        // Update the countdown data
        countdownsData[index] = {
            title: newTitle || editedCountdown.title,
            date: newDate ? `${newDate}T${newTime}` : editedCountdown.date, // Combine date and existing time
            emoji: newEmoji || editedCountdown.emoji
        };

        // Update the display
        displayCountdowns();
    }
}

// Function to handle save button click
document.getElementById('saveButton').addEventListener('click', function () {
    // For demonstration, alert that data is saved (replace with actual save logic)
    alert('Changes saved successfully!');
});

// Function to handle back button click
document.getElementById('backButton').addEventListener('click', function () {
    // Switch back to page 1 (add countdown form)
    showPage('page1');
});

// Function to switch between pages
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Initial display (page 1)
showPage('page1');

// Initialize Twemoji for emoji support
document.addEventListener('DOMContentLoaded', function () {
    twemoji.parse(document.body);
});

// Add event listener for tabbing between date and time inputs
document.getElementById('eventDate').addEventListener('keydown', function (event) {
    if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault();
        document.getElementById('eventTime').focus();
    }
});

document.getElementById('eventTime').addEventListener('keydown', function (event) {
    if (event.key === 'Tab' && event.shiftKey) {
        event.preventDefault();
        document.getElementById('eventDate').focus();
    }
});