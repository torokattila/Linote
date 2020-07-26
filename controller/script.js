$(document).ready(function () {
    var colors = ['#fff740', '#ef820d', '#fda50f', '#cf9812a'];

    $('.note').each(function () {
        var newColor = colors[Math.floor(Math.random() * colors.length)];
        $(this).css('background-color', newColor)
    });
});

window.onscroll = () => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight)) {
            $('.logout-button').fadeOut();
        } else {
            $('.logout-button').fadeIn();
        }
    }
}

const addButton = document.querySelector('.add-button');

addButton.addEventListener("click", () => {
    let noteContainer = document.querySelector('.note-container');
    let newNoteDiv = document.createElement('div');
    let noteTitleDiv = document.createElement('div');
    let titleInput = document.createElement('input');
    let textArea = document.createElement('textarea');
    let buttonsOnNote = document.createElement('div');
    let deleteButton = document.createElement('button');
    let deleteIcon = document.createElement('img');
    let voiceButton = document.createElement('button');
    let voiceIcon = document.createElement('img');

    newNoteDiv.className = 'note';
    noteTitleDiv.className = 'note-title-div';
    titleInput.className = 'note-title';
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'note-title');
    titleInput.setAttribute('placeholder', 'Title:');
    textArea.className = 'note-textarea';
    textArea.setAttribute('name', 'note-textarea');
    textArea.setAttribute('cols', '15');
    textArea.setAttribute('rows', '5');
    textArea.setAttribute('placeholder', 'Content:');
    deleteButton.setAttribute('type', 'submit');
    deleteButton.setAttribute('title', 'Delete Note');
    deleteButton.className = 'delete-button';
    deleteIcon.className = 'delete-icon';
    deleteIcon.setAttribute('src', 'delete.png');
    voiceButton.setAttribute('type', 'submit');
    voiceButton.setAttribute('title', 'Voice Recognition');
    voiceButton.className = 'voice-button';
    voiceIcon.setAttribute('src', 'voice.png');
    voiceIcon.className = 'voice-icon';

    newNoteDiv.appendChild(noteTitleDiv);
    noteTitleDiv.appendChild(titleInput);
    noteTitleDiv.appendChild(textArea);
    deleteButton.appendChild(deleteIcon);
    voiceButton.appendChild(voiceIcon);
    buttonsOnNote.appendChild(deleteButton);
    buttonsOnNote.appendChild(voiceButton);
    newNoteDiv.appendChild(buttonsOnNote);
    newNoteDiv.style.opacity = 0;

    let steps = 0;
    let timer = setInterval(() => {
        steps++;
        newNoteDiv.style.opacity = 0.1 * steps;

        if (steps >= 20) {
            clearInterval(timer);
            timer = undefined;
        }
    }, 12);
    noteContainer.appendChild(newNoteDiv);
    
});
