// Application State
const state = {
    currentLanguage: 'typescript',
    currentDifficulty: 'beginner',
    currentSample: null,
    userInput: '',
    currentPosition: 0,
    isStarted: false,
    isCompleted: false,
    startTime: null,
    elapsedTime: 0,
    timerInterval: null,
    correctChars: 0,
    incorrectChars: 0,
    lastSampleId: null
};

// DOM Elements
const elements = {
    languageSelect: document.getElementById('language-select'),
    difficultySelect: document.getElementById('difficulty-select'),
    restartBtn: document.getElementById('restart-btn'),
    originalText: document.getElementById('original-text'),
    userInputDiv: document.getElementById('user-input'),
    hiddenInput: document.getElementById('hidden-input'),
    timer: document.getElementById('timer'),
    wpm: document.getElementById('wpm')
};

// Initialize the application
function init() {
    loadNewSample();
    attachEventListeners();
    elements.hiddenInput.focus();
}

// Attach event listeners
function attachEventListeners() {
    elements.languageSelect.addEventListener('change', handleLanguageChange);
    elements.difficultySelect.addEventListener('change', handleDifficultyChange);
    elements.restartBtn.addEventListener('click', handleRestart);
    elements.hiddenInput.addEventListener('input', handleInput);
    elements.hiddenInput.addEventListener('keydown', handleKeyDown);

    // Keep focus on hidden input
    document.addEventListener('click', () => {
        elements.hiddenInput.focus();
    });
}

// Load a new code sample
function loadNewSample() {
    const samples = codeSamples[state.currentLanguage][state.currentDifficulty];
    let selectedSample;

    // Avoid selecting the same sample consecutively
    do {
        const randomIndex = Math.floor(Math.random() * samples.length);
        selectedSample = samples[randomIndex];
    } while (samples.length > 1 && selectedSample.id === state.lastSampleId);

    state.currentSample = selectedSample;
    state.lastSampleId = selectedSample.id;
    resetState();
    renderOriginalText();
    renderUserInput();
}

// Reset application state
function resetState() {
    state.userInput = '';
    state.currentPosition = 0;
    state.isStarted = false;
    state.isCompleted = false;
    state.startTime = null;
    state.elapsedTime = 0;
    state.correctChars = 0;
    state.incorrectChars = 0;

    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }

    elements.hiddenInput.value = '';
    updateTimer();
    updateWPM();
}

// Start the timer
function startTimer() {
    if (state.isStarted) return;

    state.isStarted = true;
    state.startTime = Date.now();

    state.timerInterval = setInterval(() => {
        state.elapsedTime = Math.floor((Date.now() - state.startTime) / 1000);
        updateTimer();
        updateWPM();
    }, 100);
}

// Stop the timer
function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
    }
}

// Update timer display with dynamic formatting
function updateTimer() {
    const seconds = state.elapsedTime;

    if (seconds < 60) {
        // 0-59초: "35초"
        elements.timer.textContent = `${seconds}초`;
    } else if (seconds < 3600) {
        // 1-59분: "01분 42초"
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        elements.timer.textContent = `${String(minutes).padStart(2, '0')}분 ${String(remainingSeconds).padStart(2, '0')}초`;
    } else {
        // 1시간 이상: "01시간 15분 30초"
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        elements.timer.textContent = `${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(2, '0')}분 ${String(remainingSeconds).padStart(2, '0')}초`;
    }
}

// Update WPM (Words Per Minute) display
function updateWPM() {
    if (state.elapsedTime === 0) {
        elements.wpm.textContent = 'WPM: 0';
        return;
    }

    const minutes = state.elapsedTime / 60;
    const wpm = Math.round((state.correctChars / 5) / minutes);
    elements.wpm.textContent = `WPM: ${wpm}`;
}

// Render original text with character highlighting
function renderOriginalText() {
    const code = state.currentSample.code;
    let html = '';

    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        const escapedChar = escapeHtml(char);

        let className = 'char';

        if (i < state.currentPosition) {
            // Already typed
            if (state.userInput[i] === char) {
                className += ' completed';
            } else {
                className += ' completed incorrect';
            }
        } else if (i === state.currentPosition) {
            // Current character to type
            className += ' current';
        }

        html += `<span class="${className}">${escapedChar}</span>`;
    }

    elements.originalText.innerHTML = html;
}

// Render user input with error highlighting
function renderUserInput() {
    const code = state.currentSample.code;
    let html = '';

    for (let i = 0; i < state.userInput.length; i++) {
        const char = state.userInput[i];
        const expectedChar = code[i];
        const escapedChar = escapeHtml(char);

        let className = 'char-input';

        if (char !== expectedChar) {
            className += ' incorrect';
        } else {
            className += ' correct';
        }

        html += `<span class="${className}">${escapedChar}</span>`;
    }

    elements.userInputDiv.innerHTML = html;
}

// Handle input event
function handleInput(e) {
    const value = e.target.value;

    // Start timer on first input
    if (!state.isStarted && value.length > 0) {
        startTimer();
    }

    // Prevent typing beyond the original text length
    if (value.length > state.currentSample.code.length) {
        e.target.value = value.slice(0, state.currentSample.code.length);
        return;
    }

    state.userInput = value;
    state.currentPosition = value.length;

    // Count correct and incorrect characters
    countCharacters();

    // Check if typing is completed
    if (state.currentPosition === state.currentSample.code.length) {
        handleCompletion();
    }

    renderOriginalText();
    renderUserInput();
    updateWPM();
}

// Handle keydown event for special keys
function handleKeyDown(e) {
    // Handle Tab key for code samples
    if (e.key === 'Tab') {
        e.preventDefault();
        const currentValue = e.target.value;
        e.target.value = currentValue + '\t';

        // Trigger input event
        const event = new Event('input', { bubbles: true });
        e.target.dispatchEvent(event);
    }
}

// Count correct and incorrect characters
function countCharacters() {
    let correct = 0;
    let incorrect = 0;

    const code = state.currentSample.code;

    for (let i = 0; i < state.userInput.length; i++) {
        if (state.userInput[i] === code[i]) {
            correct++;
        } else {
            incorrect++;
        }
    }

    state.correctChars = correct;
    state.incorrectChars = incorrect;
}

// Handle typing completion
function handleCompletion() {
    if (state.isCompleted) return;

    state.isCompleted = true;
    stopTimer();

    // Calculate final stats
    const accuracy = Math.round((state.correctChars / state.currentSample.code.length) * 100);
    const minutes = state.elapsedTime / 60;
    const finalWPM = Math.round((state.correctChars / 5) / minutes);

    // Show completion message (optional - can be implemented later)
    setTimeout(() => {
        alert(`완료!\n시간: ${formatTime(state.elapsedTime)}\nWPM: ${finalWPM}\n정확도: ${accuracy}%`);
    }, 100);
}

// Format time for display
function formatTime(seconds) {
    if (seconds < 60) {
        return `${seconds}초`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}분 ${String(remainingSeconds).padStart(2, '0')}초`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(hours).padStart(2, '0')}시간 ${String(minutes).padStart(2, '0')}분 ${String(remainingSeconds).padStart(2, '0')}초`;
    }
}

// Handle language change
function handleLanguageChange(e) {
    state.currentLanguage = e.target.value;
    loadNewSample();
}

// Handle difficulty change
function handleDifficultyChange(e) {
    state.currentDifficulty = e.target.value;
    loadNewSample();
}

// Handle restart button click
function handleRestart() {
    loadNewSample();
    elements.hiddenInput.focus();
}

// Escape HTML special characters
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
        ' ': '&nbsp;',
        '\n': '<br>',
        '\t': '&nbsp;&nbsp;&nbsp;&nbsp;'
    };

    return map[text] || text;
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
