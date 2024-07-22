import axios from 'axios';
import elements from './refs'; // витягуємо елементи кнопки та спану в змінну
import { axiosURL, LS_KEY } from './variables';

axios.defaults.baseURL = axiosURL; //задаємо базову адресу нашого бекенду для аксіос

// Масив текстів для кнопки Бабло, коли вона натиснута
const answers = [
  'Нарахування бабла...',
  'Бабла багато не буває',
  'Треба чекати',
  'Нарахування бабла...',
  'Не квапся, почекай',
  'Всі люблять бабло',
  'Тапай ще',
  'Та зачекайте, нараховується',
  'На що витратиш?',
  'Нарахування бабла...',
  'Копиш на мрію?',
  'Ще бабла?',
  'Зараз буде',
  'Секундочку, додасться',
  'Нарахування бабла...',
  'Давай ще',
  'Не забудь задонатити на ЗСУ',
  'Нарахування бабла...',
  'Поділись із ЗСУ',
  'Тапай, поквапся',
  'Не зволікай, тисни ще',
  'Нарахування бабла...',
];

function addBablo(user) {
  // створюємо функцію для обробки кліку по кнопці, приймаємо об'єкт юзера і посилання на спан у змінну element
  elements.button.disabled = true; //блокуємо кнопку
  const randomIndex = Math.ceil(Math.random() * answers.length); // рандомно вибираємо індекс елемента масиву
  elements.button.innerHTML = `<span class="loader"></span>&nbsp;&nbsp;&nbsp;${answers[randomIndex]}`; //змінюємо текст кнопки і додаємо спіннер
  setTimeout(() => {
    // Імітуємо затримку відповіді бекенду
    if (elements.megaSwitcher.checked && user.bablo !== 0) {
      //перевіряємо якщо поставлений чекбокс на мегабабло і кількість бабла у юзера не дорівнює 0
      user.bablo *= 2; // збільшуємо кількість бабла в 2 рази
    } else {
      user.bablo += 1; // збільшуємо значення бабла у об'єкта юзера на 1
    }

    axios
      .put(`user/${user.userID}`, user) // змінюємо значення бабла у юзера на бекенді (нажаль, mockapi не приймає метод PATCH, тому використовуємо PUT і скидаємо весь об'єкт)
      .then(function () {
        elements.countSpan.innerHTML = user.bablo.toString(); // якщо успішно змінилось значення бабла на бекенді, то змінюємо значення і у спанчику на фронтенді
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        elements.button.innerHTML = 'Бабло!'; //Повертаємо значення кнопки
        elements.button.disabled = false; //Розблокуємо кнопку
      });
  }, Math.random() * 3000); // Рандомна затримка до 3 секунд
}
function startFromScratch(user) {
  axios
    .post('user', { bablo: 0 }) // створюємо нового юзера на бекенді
    .then(function (response) {
      user.userID = Number(response.data.userID); // в об'єкт юзера заносимо його новостворений ІД у числовому форматі
      user.bablo = 0; // обнуляємо кількість бабла у об'єкті юзера
      elements.countSpan.innerHTML = '0'; //обнуляємо кількість бабла на сторінці
      localStorage.setItem(LS_KEY, JSON.stringify(user.userID)); // зберігаємо ІД юзера у ЛС
    })
    .catch(function (error) {
      console.log(error);
    });
}

export { addBablo, startFromScratch };
