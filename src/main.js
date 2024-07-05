import { addBablo } from './js/functions'; // імпортуємо функцію прослуховувача

const button = document.querySelector('#babloBtn'); // витягуємо елемент кнопки для додавання прослуховувача

button.addEventListener('click', addBablo); // додаємо прослуховувач по кліку
