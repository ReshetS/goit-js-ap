import axios from 'axios';
axios.defaults.baseURL = 'https://668581e2b3f57b06dd4cf9fd.mockapi.io/api/v1'; //задаємо базову адресу нашого бекенду для аксіос

export function addBablo(user) {
  // створюємо функцію для обробки прослуховувача кліку кнопки
  const countSpan = document.querySelector('#count'); // витягуємо елемент спану у змінну
  user.bablo += 1; // збільшуємо значення бабла у об'єкта юзера на 1
  axios
    .patch(`user/${user.userID}`, { bablo: user.bablo }) //змінюємо значення бабла у юзера на бекенді
    .then(function () {
      countSpan.innerHTML = user.bablo; //якщо змінилось значення бабла на фронтенді то змінюємо значення і на бекенді
    })
    .catch(function (error) {
      console.log(error);
    });
}
