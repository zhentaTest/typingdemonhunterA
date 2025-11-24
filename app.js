// Application State
const state = {
    currentLanguage: 'typescript',
    currentDifficulty: 'beginner',
    currentChapter: '--',
    isEducationMode: false,
    currentSample: null,
    currentChapterData: null,
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
    chapterSelect: document.getElementById('chapter-select'),
    restartBtn: document.getElementById('restart-btn'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    originalText: document.getElementById('original-text'),
    userInputDiv: document.getElementById('user-input'),
    typedText: document.getElementById('typed-text'),
    hiddenInput: document.getElementById('hidden-input'),
    timer: document.getElementById('timer'),
    wpm: document.getElementById('wpm'),
    cursor: document.getElementById('cursor'),
    lessonContent: document.getElementById('lesson-content'),
    lessonTitle: document.getElementById('lesson-title'),
    lessonDescription: document.getElementById('lesson-description'),
    expectedOutput: document.getElementById('expected-output'),
    terminalContent: document.getElementById('terminal-content')
};

// Initialize the application
function init() {
    initTheme();
    initStickyHeader();
    updateChapterOptions();
    loadNewSample();
    attachEventListeners();
    elements.hiddenInput.focus();
}

// Initialize sticky header (spacing and scroll effects)
function initStickyHeader() {
    adjustHeaderSpacing();

    // Adjust spacing on window resize
    window.addEventListener('resize', adjustHeaderSpacing);

    // Add scroll effect for header shadow
    window.addEventListener('scroll', handleScroll);
}

// Adjust header spacer height based on actual header height
function adjustHeaderSpacing() {
    const header = document.querySelector('.sticky-header');
    const spacer = document.querySelector('.header-spacer');

    if (header && spacer) {
        const headerHeight = header.offsetHeight;
        spacer.style.height = headerHeight + 'px';
    }
}

// Handle scroll event for header shadow effect
function handleScroll() {
    const header = document.querySelector('.sticky-header');

    if (header) {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
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
    elements.chapterSelect.addEventListener('change', handleChapterChange);
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

// Update chapter options based on language and difficulty
function updateChapterOptions() {
    const language = state.currentLanguage;
    const difficulty = state.currentDifficulty;

    // Get chapters for current language and difficulty
    const chapterList = chapters[language] && chapters[language][difficulty]
        ? chapters[language][difficulty]
        : [];

    // Clear existing options except the first one (--)
    elements.chapterSelect.innerHTML = '<option value="--">--</option>';

    // Add chapter options
    chapterList.forEach((chapter, index) => {
        const option = document.createElement('option');
        option.value = String(chapter.id).padStart(2, '0');
        option.textContent = String(chapter.id).padStart(2, '0');

        // Check if chapter is completed
        const progress = loadProgress(language, difficulty);
        if (progress[option.value]?.completed) {
            option.textContent += ' ✓';
        }

        elements.chapterSelect.appendChild(option);
    });
}

// Handle chapter selection change
function handleChapterChange(e) {
    state.currentChapter = e.target.value;
    loadNewSample();
}

// Load a new code sample
function loadNewSample() {
    if (state.currentChapter === '--') {
        // Mode A: Random code sample (existing mode)
        state.isEducationMode = false;
        const samples = codeSamples[state.currentLanguage][state.currentDifficulty];
        let selectedSample;

        // Avoid selecting the same sample consecutively
        do {
            const randomIndex = Math.floor(Math.random() * samples.length);
            selectedSample = samples[randomIndex];
        } while (samples.length > 1 && selectedSample.id === state.lastSampleId);

        state.currentSample = selectedSample;
        state.lastSampleId = selectedSample.id;
        state.currentChapterData = null;

        hideEducationMode();
    } else {
        // Mode B: Chapter-based education mode
        state.isEducationMode = true;
        const chapterNumber = parseInt(state.currentChapter);
        const chapterData = loadChapterData(state.currentLanguage, state.currentDifficulty, chapterNumber);

        if (chapterData) {
            state.currentChapterData = chapterData;
            state.currentSample = { id: `chapter-${chapterNumber}`, code: chapterData.code };

            showEducationMode();
        } else {
            // Fallback to random mode if chapter not found
            console.error('Chapter not found:', chapterNumber);
            state.currentChapter = '--';
            elements.chapterSelect.value = '--';
            return loadNewSample();
        }
    }

    resetState();
    renderOriginalText();
    renderUserInput();
}

// Load chapter data
function loadChapterData(language, difficulty, chapterNumber) {
    const chapterList = chapters[language] && chapters[language][difficulty]
        ? chapters[language][difficulty]
        : [];

    return chapterList.find(ch => ch.id === chapterNumber);
}

// Show education mode UI
function showEducationMode() {
    if (!state.currentChapterData) return;

    // Show lesson content
    elements.lessonTitle.textContent = state.currentChapterData.title;
    // Use innerHTML to render HTML structure in description
    elements.lessonDescription.innerHTML = state.currentChapterData.description;

    elements.lessonContent.style.display = 'block';

    // Show expected output with terminal formatting
    renderTerminalOutput(state.currentChapterData.expectedOutput);
    elements.expectedOutput.style.display = 'block';
}

// Render terminal output with proper formatting
function renderTerminalOutput(outputData) {
    if (!elements.terminalContent) return;

    if (typeof outputData === 'object' && outputData.type === 'console') {
        // Terminal-style output with commands
        let html = '';

        outputData.commands.forEach((line, index) => {
            if (index === 0) {
                // First line: command with prompt ($)
                const command = line.startsWith('$ ') ? line.substring(2) : line;
                html += `<div>
                    <span class="terminal-prompt">$</span>
                    <span class="terminal-command">${escapeTerminalHtml(command)}</span>
                </div>`;
            } else {
                // Other lines: output results
                html += `<div class="terminal-result">${escapeTerminalHtml(line)}</div>`;
            }
        });

        elements.terminalContent.innerHTML = html;
    } else {
        // Plain text output (backward compatibility)
        elements.terminalContent.innerHTML = `<div class="terminal-result">${escapeTerminalHtml(String(outputData))}</div>`;
    }
}

// Escape HTML for terminal output (simpler than full escapeHtml)
function escapeTerminalHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Hide education mode UI
function hideEducationMode() {
    elements.lessonContent.style.display = 'none';
    elements.expectedOutput.style.display = 'none';
}

// Save progress to localStorage
function saveProgress(language, difficulty, chapter, completed) {
    const key = `progress_${language}_${difficulty}`;
    let progress = JSON.parse(localStorage.getItem(key)) || {};
    progress[chapter] = {
        completed: completed,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem(key, JSON.stringify(progress));
}

// Load progress from localStorage
function loadProgress(language, difficulty) {
    const key = `progress_${language}_${difficulty}`;
    return JSON.parse(localStorage.getItem(key)) || {};
}

// Reset application state
function resetState() {
    console.log('=== 타이핑 초기화 ===');
    console.log('userInput (초기화 전):', JSON.stringify(state.userInput));
    console.log('userInput length (초기화 전):', state.userInput.length);

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

    console.log('userInput (초기화 후):', JSON.stringify(state.userInput));
    console.log('userInput length (초기화 후):', state.userInput.length);
    console.log('✅ 초기화 완료: 입력 영역이 완전히 비어있어야 함');

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
    console.log('=== skipBlankLines 호출됨 ===');
    console.log('userInput length:', state.userInput.length);
    console.log('userInput:', JSON.stringify(state.userInput));
    console.log('currentPosition:', state.currentPosition);

    // ✅✅✅ 첫 번째 줄 절대 보호 ✅✅✅
    // 사용자가 첫 번째 줄을 타이핑하는 중이면 들여쓰기를 건너뛰지 않음
    const currentLineNumber = (state.userInput.match(/\n/g) || []).length;
    if (currentLineNumber === 0) {
        console.log('❌ 첫 번째 줄이므로 들여쓰기 건너뛰기를 실행하지 않습니다');
        return; // 즉시 종료!
    }

    console.log('✅ 들여쓰기 처리 진행 (현재 줄 번호:', currentLineNumber, ')');

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
    if (position < code.length) {
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
            console.log('들여쓰기 추가:', indentCount, '개의 공백');
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
    console.log('총 건너뛴 글자 수:', skippedChars);
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

// Check if all characters are correct (for completion validation)
function areAllCharactersCorrect() {
    const originalText = state.currentSample.code;
    const userText = state.userInput;

    // ✅ 길이가 같고 내용이 정확히 일치하는지 확인
    if (userText.length !== originalText.length) {
        console.log('길이 불일치: 원본', originalText.length, '입력', userText.length);
        return false;
    }

    // ✅ 모든 글자가 정확히 일치하는지 확인
    for (let i = 0; i < originalText.length; i++) {
        if (userText[i] !== originalText[i]) {
            console.log(`틀린 글자 발견: 위치 ${i}, 예상 "${originalText[i]}", 입력 "${userText[i]}"`);
            return false;
        }
    }

    console.log('✅ 모든 글자가 정확함');
    return true; // 모든 글자가 정확함
}

// Handle typing completion
function handleCompletion() {
    if (state.isCompleted) return;

    // ✅ 완료 조건 재확인: 모든 글자가 정확해야 함
    if (!areAllCharactersCorrect()) {
        console.log('완료 조건을 만족하지 않아 완료 처리를 중단합니다');
        return;
    }

    state.isCompleted = true;
    stopTimer();

    // Calculate final stats
    const accuracy = Math.round((state.correctChars / state.currentSample.code.length) * 100);
    const minutes = state.elapsedTime / 60;
    // Exclude auto-skipped characters from WPM calculation
    const actualTypedChars = state.correctChars - state.autoSkippedChars;
    const finalWPM = Math.round((actualTypedChars / 5) / minutes);

    console.log('✅ 타이핑 완료!');
    console.log('시간:', formatTime(state.elapsedTime));
    console.log('WPM:', finalWPM);
    console.log('정확도:', accuracy + '%');

    // Save progress if in education mode
    if (state.isEducationMode && state.currentChapter !== '--') {
        saveProgress(state.currentLanguage, state.currentDifficulty, state.currentChapter, true);
        updateChapterOptions(); // Update UI to show completion checkmark
    }

    // Show completion message
    setTimeout(() => {
        showCompletionMessage(finalWPM, accuracy);
    }, 100);
}

// Show completion message with next chapter option
function showCompletionMessage(finalWPM, accuracy) {
    let message = `완료!\n시간: ${formatTime(state.elapsedTime)}\nWPM: ${finalWPM}\n정확도: ${accuracy}%`;

    // Add next chapter option in education mode
    if (state.isEducationMode && state.currentChapter !== '--') {
        const currentChapterNum = parseInt(state.currentChapter);
        const chapterList = chapters[state.currentLanguage] && chapters[state.currentLanguage][state.currentDifficulty]
            ? chapters[state.currentLanguage][state.currentDifficulty]
            : [];

        const nextChapter = chapterList.find(ch => ch.id === currentChapterNum + 1);

        if (nextChapter) {
            message += `\n\n다음 챕터로 이동하시겠습니까?\n챕터 ${String(nextChapter.id).padStart(2, '0')}: ${nextChapter.title}`;

            if (confirm(message)) {
                // Move to next chapter
                state.currentChapter = String(nextChapter.id).padStart(2, '0');
                elements.chapterSelect.value = state.currentChapter;
                loadNewSample();
                return;
            }
        }
    }

    alert(message);
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
    state.currentChapter = '--';
    elements.chapterSelect.value = '--';
    updateChapterOptions();
    loadNewSample();
}

// Handle difficulty change
function handleDifficultyChange(e) {
    state.currentDifficulty = e.target.value;
    state.currentChapter = '--';
    elements.chapterSelect.value = '--';
    updateChapterOptions();
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
