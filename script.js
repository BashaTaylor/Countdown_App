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

// Function to display countdowns on page 2
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
            <div class="notes"></div> <!-- Container for notes -->
            <div class="countdown">
                <span>${time.days}d</span>
                <span>${time.hours}h</span>
                <span>${time.minutes}m</span>
                <span>${time.seconds}s</span>
            </div>
            <div class="countdown-menu">
                <button class="add-note-btn" data-index="${index}">Add a Note</button>
                <button class="archive-btn" data-index="${index}">Archive</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
            <button class="edit-btn" data-index="${index}">Edit</button>
        `;
        countdownsContainer.appendChild(countdownElem);

        // Display existing notes
        displayNotes(index);

        // Add event listener for add note button
        const addNoteBtn = countdownElem.querySelector('.add-note-btn');
        addNoteBtn.addEventListener('click', function () {
            addNoteToCountdown(index);
        });

        // Add event listener for archive button
        const archiveBtn = countdownElem.querySelector('.archive-btn');
        archiveBtn.addEventListener('click', function () {
            archiveCountdown(index);
        });

        // Add event listener for delete button
        const deleteBtn = countdownElem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            deleteCountdown(index);
        });

        // Add event listener for edit button
        const editBtn = countdownElem.querySelector('.edit-btn');
        editBtn.addEventListener('click', function () {
            editCountdown(index);
        });
    });
}

// Function to display notes for a specific countdown
function displayNotes(index) {
    const notesContainer = document.querySelectorAll('.countdown-item .notes')[index];
    notesContainer.innerHTML = ''; // Clear existing notes

    countdownsData[index].notes.forEach(note => {
        const noteElem = document.createElement('p');
        noteElem.textContent = note;
        notesContainer.appendChild(noteElem);
    });
}

// Function to display all countdowns on page 3
function displayAllCountdowns() {
    const allCountdownsContainer = document.getElementById('allCountdowns');
    allCountdownsContainer.innerHTML = '';

    countdownsData.forEach((countdown, index) => {
        const endTime = new Date(countdown.date);
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
            <div class="notes"></div> <!-- Container for notes -->
            <button class="edit-btn" data-index="${index}">Edit</button>
        `;
        allCountdownsContainer.appendChild(countdownElem);

        // Display existing notes
        displayNotes(index);

        // Add event listener for edit button
        const editBtn = countdownElem.querySelector('.edit-btn');
        editBtn.addEventListener('click', function () {
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
        emoji: eventEmoji,
        notes: [] // Initialize notes array
    });

    // Switch to page 2 (countdowns display)
    showPage('page2');

    // Update the display on page 2
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
            emoji: editedCountdown.emoji,
            notes: editedCountdown.notes // Retain existing notes
        };

        // Update the display on page 2
        displayCountdowns();
        // Update the display on page 3
        displayAllCountdowns();
    }
}

// Function to add a note to a countdown
function addNoteToCountdown(index) {
    const countdownTitle = countdownsData[index].title;
    const noteText = prompt(`Add a note to "${countdownTitle}":`);

    if (noteText) {
        countdownsData[index].notes.push(noteText);
        // Update UI to display added note
        displayNotes(index);
    } else {
        alert('Note addition canceled.');
    }
}

// Function to archive a countdown
function archiveCountdown(index) {
    const confirmArchive = confirm(`Do you want to archive "${countdownsData[index].title}"?`);

    if (confirmArchive) {
        // Archive logic here (can be implemented as needed)
        alert(`"${countdownsData[index].title}" archived.`);
        // For demonstration, let's remove from countdownsData array
        countdownsData.splice(index, 1);

        // Update the display on page 2
        displayCountdowns();
        // Update the display on page 3
        displayAllCountdowns();
    }
}

// Function to delete a countdown
function deleteCountdown(index) {
    const confirmDelete = confirm(`Do you want to delete "${countdownsData[index].title}"?`);

    if (confirmDelete) {
        countdownsData.splice(index, 1); // Remove from countdownsData array

        // Update the display on page 2
        displayCountdowns();
        // Update the display on page 3
        displayAllCountdowns();
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

// Function to handle view all button click
document.getElementById('viewAllButtonPage1').addEventListener('click', function () {
    // Switch to page 3 (all countdowns)
    showPage('page3');

    // Display all countdowns on page 3
    displayAllCountdowns();
});

// Function to handle view all button click
document.getElementById('viewAllButtonPage2').addEventListener('click', function () {
    // Switch to page 3 (all countdowns)
    showPage('page3');

    // Display all countdowns on page 3
    displayAllCountdowns();
});

// Function to handle back to page 2 button click from page 3
document.getElementById('backToPage2').addEventListener('click', function () {
    // Switch back to page 2 (countdowns display)
    showPage('page2');
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

// JavaScript for toggling Add Note form visibility
document.getElementById('toggleNoteForm').addEventListener('click', function () {
    const addNoteForm = document.getElementById('addNoteForm');
    if (addNoteForm.style.display === 'none') {
        addNoteForm.style.display = 'block';
    } else {
        addNoteForm.style.display = 'none';
    }
});

// JavaScript for handling Add Note form submission
document.getElementById('addNoteSubmit').addEventListener('click', function () {
    const noteText = document.getElementById('noteText').value.trim();
    if (noteText !== '') {
        addNoteToNewCountdown(noteText);
        document.getElementById('noteText').value = ''; // Clear input field
        document.getElementById('addNoteForm').style.display = 'none'; // Hide the form after submission (optional)
    } else {
        alert('Please enter a note.');
    }
});

// Function to add a note to a new countdown
function addNoteToNewCountdown(noteText) {
    // Implement logic to add note to the new countdown in countdownsData array
    // For demonstration, let's alert the note text
    alert(`Note added: ${noteText}`);
    // You would typically add this note to your countdownsData array and update UI accordingly
}

