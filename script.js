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
                <span class="days">${time.days}d</span>
                <span class="hours">${time.hours}h</span>
                <span class="minutes">${time.minutes}m</span>
                <span class="seconds">${time.seconds}s</span>
            </div>
            <div class="button-row">
                <button class="add-note-btn" data-index="${index}">Add a Note</button>
                <button class="archive-btn" data-index="${index}">Archive</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="edit-btn" data-index="${index}">Edit</button>
            </div>
        `;
        countdownsContainer.appendChild(countdownElem);

        // Display existing notes
        displayNotes(countdownElem.querySelector('.notes'), index, 'page2');

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

// Function to update countdowns every second
function updateCountdowns() {
    displayCountdowns();
    setTimeout(updateCountdowns, 1000); // Update every second
}

// Call this to start updating countdowns
updateCountdowns();

// Function to display notes for a specific countdown
function displayNotes(notesContainer, index, pageId) {
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
    <div class="countdown-icon">
        <div class="icon-circle">
            <span class="emoji">${countdown.emoji}</span>
        </div>
    </div>
    <div class="countdown-details">
        <h3 class="countdown-title">${countdown.title}</h3>
        <p class="countdown-note">${countdown.notes.length > 0 ? countdown.notes[0] : 'No notes'}</p>
        <p class="countdown-date-time">${formattedDate}</p>
    </div>
    <div class="countdown-days-left">
        <p class="days-number">${time.days}</p>
        <p class="days-text">days left</p>
    </div>
`;

// Rest of your code for event listeners and appending countdownElem

        allCountdownsContainer.appendChild(countdownElem);

        // Add click event listener to display this countdown on page 2
        countdownElem.addEventListener('click', function () {
            displayCountdownOnPage2(index);
        });
    });
}

// Function to display a specific countdown on page 2
function displayCountdownOnPage2(index) {
    // Set countdownData to show only the selected countdown
    countdownsData = [countdownsData[index]];

    // Switch to page 2 (countdown display)
    showPage('page2');

    // Update the display on page 2
    displayCountdown();
}


// Function to create a countdown element
function createCountdownElement(countdown, index) {
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
    countdownElem.id = `countdown-${index}`;
    countdownElem.classList.add('countdown-item');
    countdownElem.innerHTML = `
        <h3>${countdown.title}</h3>
        <div class="emoji">${countdown.emoji}</div>
        <p>${formattedDate}</p>
        <div class="notes"></div> <!-- Container for notes -->
        <div class="countdown">
            <span class="days">${time.days}d</span>
            <span class="hours">${time.hours}h</span>
            <span class="minutes">${time.minutes}m</span>
            <span class="seconds">${time.seconds}s</span>
        </div>
    `;

    // Add edit button on page 2
    if (document.getElementById('page2').style.display !== 'none') {
        countdownElem.innerHTML += `<button class="edit-btn" data-index="${index}">Edit</button>`;

        // Add event listener for edit button
        const editBtn = countdownElem.querySelector('.edit-btn');
        editBtn.addEventListener('click', function () {
            editCountdown(index);
        });
    }

    return countdownElem;
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
        // Update UI to display added note on both page 2 and page 3
        displayNotes(document.getElementById(`countdown-${index}`).querySelector('.notes'), index, 'page2');
        displayNotes(document.getElementById(`countdown-${index}`).querySelector('.notes'), index, 'page3');
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

// Function to handle back button click
document.getElementById('backButton').addEventListener('click', function () {
    // Switch back to page 1 (add countdown form)
    showPage('page1');
});

// Function to handle view all button click on page 1
document.getElementById('viewAllButtonPage1').addEventListener('click', function () {
    // Switch to page 3 (all countdowns)
    showPage('page3');

    // Display all countdowns on page 3
    displayAllCountdowns();
});

// Function to handle view all button click on page 2
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