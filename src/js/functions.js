import axios from 'axios';
axios.defaults.baseURL = 'https://668581e2b3f57b06dd4cf9fd.mockapi.io/api/v1'; //задаємо базову адресу нашого бекенду для аксіос

function addBablo(user, element) {
  // створюємо функцію для обробки кліку по кнопці, приймаємо об'єкт юзера і посилання на спан у змінну element
  user.bablo += 1; // збільшуємо значення бабла у об'єкта юзера на 1
  axios
    .put(`user/${user.userID}`, user) // змінюємо значення бабла у юзера на бекенді (нажаль, mockapi не приймає метод PATCH, тому використовуємо PUT і скидаємо весь об'єкт)
    .then(function () {
      element.innerHTML = user.bablo.toString(); // якщо успішно змінилось значення бабла на бекенді, то змінюємо значення і у спанчику на фронтенді
    })
    .catch(function (error) {
      console.log(error);
    });
}
function startFromScratch(user, LS_KEY, element) {
  axios
    .post('user', { bablo: 0 }) // створюємо нового юзера на бекенді
    .then(function (response) {
      user.userID = Number(response.data.userID); // в об'єкт юзера заносимо його новостворений ІД у числовому форматі
      user.bablo = 0; // обнуляємо кількість бабла у об'єкті юзера
      element.innerHTML = '0'; //обнуляємо кількість бабла на сторінці
      localStorage.setItem(LS_KEY, JSON.stringify(user.userID)); // зберігаємо ІД юзера у ЛС
    })
    .catch(function (error) {
      console.log(error);
    });
}

export { addBablo, startFromScratch };
