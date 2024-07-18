import axios from 'axios';
import { addBablo } from './js/functions'; // імпортуємо функцію прослуховувача

const button = document.querySelector('.button'); // витягуємо елемент кнопки для додавання прослуховувача
const countSpan = document.querySelector('#count'); // витягуємо елемент спану у змінну

axios.defaults.baseURL = 'https://668581e2b3f57b06dd4cf9fd.mockapi.io/api/v1'; //задаємо базову адресу нашого бекенду для аксіос
const LS_KEY = 'UserID'; //задаємо ключ для локал сторедж
const user = { bablo: 0 }; // створюємо об'єкт юзера з дефолтними даними
const savedData = localStorage.getItem(LS_KEY); // дістаємо значення із стореджу

if (savedData === null) {
  //якщо сторедж пустий, то ...
  axios
    .post('user', user) // створюємо нового юзера на бекенді
    .then(function (response) {
      user.userID = Number(response.data.userID); // в об'єкт юзера заносимо його новостворений ІД у числовому форматі
      localStorage.setItem(LS_KEY, JSON.stringify(user.userID)); // зберігаємо ІД юзера у ЛС
    })
    .catch(function (error) {
      console.log(error);
    });
} else {
  // якщо сторедж не пустий, то ...
  user.userID = Number(savedData); //в об'єкт юзера заносимо його ІД з ЛС
  axios
    .get(`user/${user.userID}`) // здійснюємо запит на бекенд по ІД юзера
    .then(function (response) {
      console.log(response);
      user.bablo = response.data.bablo; // в об'єкт юзера записуємо кількість його бабла
      countSpan.innerHTML = user.bablo.toString(); // змінюємо контент спану на кількість бабла в об'єкті юзера
    })
    .catch(function (error) {
      // Оброблюємо помилку
      console.log(error);
      // А тут треба буже буде вивести помилку на фронтенд таким чином, щоб юзер зміг обнулити свій LS
      // По типу "Виникла помилка при запиті Ваших даних з серверу. Спробуйте пізніше або почніть зпочатку, натиснувши кнопку"
      // То ж ще й напишемо функцію startFromScratch(), яка буде створювати нового юзера на бекенді і перезаписувати значення userID в LS
    });
}

button.addEventListener('click', () => {
  // додаємо прослуховувач по кліку
  addBablo(user, countSpan); // викликаємо функцію для обробки кліку
});
