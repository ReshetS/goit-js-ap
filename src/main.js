import { addBablo } from './js/functions'; // імпортуємо функцію прослуховувача

const button = document.querySelector('.button'); // витягуємо елемент кнопки для додавання прослуховувача
const countSpan = document.querySelector('#count'); // витягуємо елемент спану у змінну

const key = 'LSkey'; // Додаємо ключ для локал сторедж
const savedInfo = localStorage.getItem(key); //дістаємо значення із стореджу
if (savedInfo) {
  //якщо сторедж не пустий, то...
  countSpan.innerHTML = JSON.parse(savedInfo); //розпарсили значення стореджу і перезаписали значення спану
}

button.addEventListener('click', addBablo); // додаємо прослуховувач по кліку
