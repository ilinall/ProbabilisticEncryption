const buttonEncrypt = document.querySelector('#encrypt');
const buttonDecrypt = document.querySelector('#decrypt');
const buttonMixBits = document.querySelector('#mix-bits'); 
const textarea = document.querySelector('#text');
const keyInput = document.querySelector('#key'); 

const listLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let newText = '';

function generateRandomLetter() {
    const randomIndex = Math.floor(Math.random() * listLetters.length);
    return listLetters[randomIndex];
}

function mixRandomBits(text) {
    let mixedText = '';
    for (let i = 0; i < text.length; i++) {
        mixedText += text[i]; 
        mixedText += generateRandomLetter(); 
    }
    return mixedText;
}

function removeRandomBits(text) {
    let originalText = '';
    for (let i = 0; i < text.length; i += 2) {
        originalText += text[i]; 
    }
    return originalText;
}

buttonEncrypt.addEventListener('click', () => {
    let text = textarea.value.trim();
    let key = parseInt(keyInput.value, 10); 

    if (text.length === 0) {
        alert('Пожалуйста, введите текст для шифрования.');
        return;
    }

    if (isNaN(key) || key < 0) {
        alert('Пожалуйста, введите корректное значение ключа (положительное число).');
        return;
    }

    newText = '';

    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const isUpperCase = letter === letter.toUpperCase();
        const lowerLetter = letter.toLowerCase();

        if (letter === ' ') {
            newText += ' ';
            continue;
        }
        if (!listLetters.includes(lowerLetter)) {
            newText += letter; 
            continue;
        }

        const indexLetter = listLetters.findIndex((item) => item === lowerLetter);
        let indexNewLetter = (indexLetter + key) % 26; 

        newText += isUpperCase ? listLetters[indexNewLetter].toUpperCase() : listLetters[indexNewLetter];
    }
    textarea.value = newText;
});

buttonDecrypt.addEventListener('click', () => {
    let text = textarea.value.trim();
    let key = parseInt(keyInput.value, 10); 

    if (text.length === 0) {
        alert('Пожалуйста, введите текст для дешифрования.');
        return;
    }

    if (isNaN(key) || key < 0) {
        alert('Пожалуйста, введите корректное значение ключа (положительное число).');
        return;
    }

    newText = '';

    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const isUpperCase = letter === letter.toUpperCase();
        const lowerLetter = letter.toLowerCase();

        if (letter === ' ') {
            newText += ' ';
            continue;
        }
        if (!listLetters.includes(lowerLetter)) {
            newText += letter; 
            continue;
        }

        const indexLetter = listLetters.findIndex((item) => item === lowerLetter);
        let indexNewLetter = (indexLetter - key + 26) % 26; 

        newText += isUpperCase ? listLetters[indexNewLetter].toUpperCase() : listLetters[indexNewLetter];
    }

    newText = removeRandomBits(newText);

    textarea.value = newText;
});

buttonMixBits.addEventListener('click', () => {
    let text = textarea.value.trim();

    if (text.length === 0) {
        alert('Пожалуйста, введите текст для подмешивания случайных битов.');
        return;
    }

    text = mixRandomBits(text);

    textarea.value = text;
});