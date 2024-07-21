import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { addBablo, startFromScratch } from './js/functions'; // імпортуємо функцію прослуховувача
import elements from './js/refs'; // витягуємо елементи кнопки та спану в змінну
import { axiosURL, LS_KEY } from './js/variables';

axios.defaults.baseURL = axiosURL; //задаємо базову адресу нашого бекенду для аксіос

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
      elements.countSpan.innerHTML = user.bablo.toString(); // змінюємо контент спану на кількість бабла в об'єкті юзера
    })
    .catch(function (error) {
      // Оброблюємо помилку
      console.log(error);
      if (error.response && error.response.status === 404) {
        //робимо перевірку на наявність 404 помилки(коли юзера не існує на бекенді)
        startFromScratch(user); //викликаємо функцію для створення нового юзера
      } else {
        // виводимо помилку
        iziToast.error({
          title: 'Помилка',
          message: `Виникла помилка при запиті Ваших даних з серверу. Спробуйте пізніше`,
          position: 'topRight',
        });
      }
    });
}

elements.button.addEventListener('click', () => {
  // додаємо прослуховувач по кліку
  addBablo(user); // викликаємо функцію для обробки кліку
});
