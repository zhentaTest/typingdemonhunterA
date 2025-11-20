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
    autoSkippedChars: 0,
    lastSampleId: null
};

// DOM Elements
const elements = {
    languageSelect: document.getElementById('language-select'),
    difficultySelect: document.getElementById('difficulty-select'),
    restartBtn: document.getElementById('restart-btn'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    originalText: document.getElementById('original-text'),
    userInputDiv: document.getElementById('user-input'),
    typedText: document.getElementById('typed-text'),
    hiddenInput: document.getElementById('hidden-input'),
    timer: document.getElementById('timer'),
    wpm: document.getElementById('wpm'),
    cursor: document.getElementById('cursor')
};

// Initialize the application
function init() {
    initTheme();
    loadNewSample();
    attachEventListeners();
    elements.hiddenInput.focus();
}

// Initialize theme from localStorage
function initTheme() {
    const savedTheme = localStorage.getItem('typingPracticeTheme') || 'dark';
    document.body.className = `theme-${savedTheme}`;
}

// Toggle theme between dark and light
function toggleTheme() {
    const currentTheme = document.body.classList.contains('theme-dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.className = `theme-${newTheme}`;
    localStorage.setItem('typingPracticeTheme', newTheme);
}

// Attach event listeners
function attachEventListeners() {
    elements.languageSelect.addEventListener('change', handleLanguageChange);
    elements.difficultySelect.addEventListener('change', handleDifficultyChange);
    elements.restartBtn.addEventListener('click', handleRestart);
    elements.themeToggleBtn.addEventListener('click', handleThemeToggle);
    elements.hiddenInput.addEventListener('input', handleInput);
    elements.hiddenInput.addEventListener('keydown', handleKeyDown);

    // Keep focus on hidden input
    document.addEventListener('click', () => {
        elements.hiddenInput.focus();
    });
}

// Handle theme toggle button click
function handleThemeToggle(e) {
    e.stopPropagation();
    toggleTheme();
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
    state.autoSkippedChars = 0;

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
    // Exclude auto-skipped characters from WPM calculation
    const actualTypedChars = state.correctChars - state.autoSkippedChars;
    const wpm = Math.round((actualTypedChars / 5) / minutes);
    elements.wpm.textContent = `WPM: ${wpm}`;
}

// Syntax highlighting keywords by language
const syntaxKeywords = {
    javascript: ['const', 'let', 'var', 'function', 'if', 'else', 'return', 'class', 'extends', 'import', 'export', 'from', 'async', 'await', 'for', 'while', 'do', 'break', 'continue', 'switch', 'case', 'default', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'static', 'get', 'set'],
    typescript: ['const', 'let', 'var', 'function', 'if', 'else', 'return', 'class', 'extends', 'import', 'export', 'from', 'async', 'await', 'for', 'while', 'do', 'break', 'continue', 'switch', 'case', 'default', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'static', 'get', 'set', 'interface', 'type', 'enum', 'namespace', 'implements', 'private', 'public', 'protected', 'readonly'],
    godotscript: ['const', 'var', 'func', 'if', 'else', 'elif', 'return', 'class', 'extends', 'signal', 'for', 'while', 'break', 'continue', 'pass', 'match', 'enum', 'static', 'export', 'onready', 'setget', 'breakpoint', 'yield', 'preload', 'await']
};

// Apply syntax highlighting to code
function applySyntaxHighlighting(code, language) {
    const isDark = document.body.classList.contains('theme-dark');
    if (!isDark) {
        // No syntax highlighting in light mode
        return code;
    }

    const keywords = syntaxKeywords[language] || [];
    let highlighted = code;

    // Create a map to store positions that should be skipped
    const skipPositions = new Set();

    // 1. Highlight strings (double and single quotes)
    const stringPattern = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
    highlighted = highlighted.replace(stringPattern, (match, quote, offset) => {
        for (let i = offset; i < offset + match.length; i++) {
            skipPositions.add(i);
        }
        return `<span class="syntax-string">${match}</span>`;
    });

    // 2. Highlight comments
    const commentPattern = /(\/\/.*?$|#.*?$)/gm;
    let tempHighlighted = '';
    let lastIndex = 0;
    let match;
    const regex = new RegExp(commentPattern);

    while ((match = regex.exec(highlighted)) !== null) {
        const isInSkipZone = Array.from(match[0]).some((_, i) => skipPositions.has(match.index + i));
        if (!isInSkipZone) {
            tempHighlighted += highlighted.slice(lastIndex, match.index);
            tempHighlighted += `<span class="syntax-comment">${match[0]}</span>`;
            for (let i = match.index; i < match.index + match[0].length; i++) {
                skipPositions.add(i);
            }
            lastIndex = regex.lastIndex;
        }
    }
    if (tempHighlighted) {
        highlighted = tempHighlighted + highlighted.slice(lastIndex);
    }

    // 3. Highlight numbers
    const numberPattern = /\b(\d+\.?\d*)\b/g;
    highlighted = highlighted.replace(numberPattern, (match, num, offset) => {
        const isInSkipZone = Array.from(match).some((_, i) => skipPositions.has(offset + i));
        if (isInSkipZone) return match;
        for (let i = offset; i < offset + match.length; i++) {
            skipPositions.add(i);
        }
        return `<span class="syntax-number">${match}</span>`;
    });

    // 4. Highlight keywords
    keywords.forEach(keyword => {
        const keywordPattern = new RegExp(`\\b(${keyword})\\b`, 'g');
        highlighted = highlighted.replace(keywordPattern, (match, kw, offset) => {
            const isInSkipZone = Array.from(match).some((_, i) => skipPositions.has(offset + i));
            if (isInSkipZone) return match;
            for (let i = offset; i < offset + match.length; i++) {
                skipPositions.add(i);
            }
            return `<span class="syntax-keyword">${match}</span>`;
        });
    });

    // 5. Highlight function calls (identifier followed by opening parenthesis)
    const functionPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
    highlighted = highlighted.replace(functionPattern, (match, funcName, offset) => {
        const isInSkipZone = Array.from(funcName).some((_, i) => skipPositions.has(offset + i));
        if (isInSkipZone) return match;
        for (let i = offset; i < offset + funcName.length; i++) {
            skipPositions.add(i);
        }
        return `<span class="syntax-function">${funcName}</span>` + match.slice(funcName.length);
    });

    return highlighted;
}

// Render original text with character highlighting and syntax highlighting
function renderOriginalText() {
    const code = state.currentSample.code;
    const isDark = document.body.classList.contains('theme-dark');
    let html = '';

    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        const escapedChar = escapeHtml(char);

        let className = 'char';
        let syntaxClass = '';

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

        // Apply syntax highlighting in dark mode
        if (isDark && i >= state.currentPosition) {
            syntaxClass = getSyntaxClass(code, i, state.currentLanguage);
        }

        const finalClass = syntaxClass ? `${className} ${syntaxClass}` : className;
        html += `<span class="${finalClass}">${escapedChar}</span>`;
    }

    elements.originalText.innerHTML = html;
}

// Get syntax class for a specific character position
function getSyntaxClass(code, position, language) {
    const keywords = syntaxKeywords[language] || [];

    // Check if in string
    let inString = false;
    let stringChar = null;
    for (let i = 0; i < position; i++) {
        if ((code[i] === '"' || code[i] === "'" || code[i] === '`') && (i === 0 || code[i - 1] !== '\\')) {
            if (!inString) {
                inString = true;
                stringChar = code[i];
            } else if (code[i] === stringChar) {
                inString = false;
                stringChar = null;
            }
        }
    }
    if (inString) return 'syntax-string';

    // Check if in comment
    const beforePosition = code.slice(0, position);
    const currentLine = beforePosition.split('\n').pop();
    if (currentLine.includes('//') || currentLine.includes('#')) {
        const commentStart = Math.max(currentLine.lastIndexOf('//'), currentLine.lastIndexOf('#'));
        const posInLine = position - (beforePosition.length - currentLine.length);
        if (posInLine >= commentStart) {
            return 'syntax-comment';
        }
    }

    // Check if number
    const charAtPos = code[position];
    if (/\d/.test(charAtPos)) {
        // Check if part of a number
        let start = position;
        let end = position;
        while (start > 0 && /[\d.]/.test(code[start - 1])) start--;
        while (end < code.length - 1 && /[\d.]/.test(code[end + 1])) end++;
        const numberStr = code.slice(start, end + 1);
        if (/^\d+\.?\d*$/.test(numberStr)) {
            return 'syntax-number';
        }
    }

    // Check if keyword
    let wordStart = position;
    let wordEnd = position;
    while (wordStart > 0 && /[a-zA-Z_]/.test(code[wordStart - 1])) wordStart--;
    while (wordEnd < code.length - 1 && /[a-zA-Z_]/.test(code[wordEnd + 1])) wordEnd++;
    const word = code.slice(wordStart, wordEnd + 1);

    if (keywords.includes(word)) {
        return 'syntax-keyword';
    }

    // Check if function name (followed by parenthesis)
    if (/[a-zA-Z_]/.test(charAtPos)) {
        let nextNonSpace = wordEnd + 1;
        while (nextNonSpace < code.length && /\s/.test(code[nextNonSpace])) nextNonSpace++;
        if (code[nextNonSpace] === '(') {
            return 'syntax-function';
        }
    }

    return '';
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

    elements.typedText.innerHTML = html;
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

    // Auto-skip blank lines when user completes a line
    if (value.length > 0 && value[value.length - 1] === '\n') {
        skipBlankLines(e);
    }

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

// Skip blank lines automatically and auto-indent
function skipBlankLines(e) {
    const code = state.currentSample.code;
    let position = state.userInput.length;
    let skippedChars = 0;

    // Keep skipping while the next line is blank
    while (position < code.length) {
        // Find the end of the current line
        let lineEnd = code.indexOf('\n', position);
        if (lineEnd === -1) {
            // No more lines
            break;
        }

        // Get the current line content (excluding the newline)
        const lineContent = code.substring(position, lineEnd);

        // Check if the line is blank (empty or only whitespace)
        if (lineContent.trim() === '') {
            // Auto-skip this blank line by adding it to user input
            const skippedContent = lineContent + '\n';
            state.userInput += skippedContent;
            skippedChars += skippedContent.length;
            position = lineEnd + 1;

            // Update the hidden input
            e.target.value = state.userInput;
            state.currentPosition = state.userInput.length;
        } else {
            // Found a non-blank line, stop skipping
            break;
        }
    }

    // After skipping blank lines, auto-skip leading indentation
    // But only if we're not on the first line (line index > 0)
    const currentLineIndex = (state.userInput.match(/\n/g) || []).length;

    if (position < code.length && currentLineIndex > 0) {
        // Get the current line starting from position
        let lineEnd = code.indexOf('\n', position);
        if (lineEnd === -1) {
            lineEnd = code.length;
        }
        const currentLine = code.substring(position, lineEnd);

        // Count leading whitespace (spaces and tabs)
        let indentCount = 0;
        for (let i = 0; i < currentLine.length; i++) {
            if (currentLine[i] === ' ' || currentLine[i] === '\t') {
                indentCount++;
            } else {
                break; // First non-whitespace character
            }
        }

        // If there is indentation, auto-skip it
        if (indentCount > 0) {
            const indentation = currentLine.substring(0, indentCount);
            state.userInput += indentation;
            skippedChars += indentation.length;
            position += indentCount;

            // Update the hidden input
            e.target.value = state.userInput;
            state.currentPosition = state.userInput.length;
        }
    }

    // Track the total auto-skipped characters
    state.autoSkippedChars += skippedChars;
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
    // Exclude auto-skipped characters from WPM calculation
    const actualTypedChars = state.correctChars - state.autoSkippedChars;
    const finalWPM = Math.round((actualTypedChars / 5) / minutes);

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
