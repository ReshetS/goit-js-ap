export function addBablo() {
  // створюємо функцію для обробки прослуховувача кліку кнопки
  const countSpan = document.querySelector('#count'); // витягуємо елемент спану у змінну
  let count = Number(countSpan.innerHTML); // витягуємо поточне значення спану
  count++; // збільшуємо значення змінної count на 1
  countSpan.innerHTML = count; // змінюємо контент спану на значення count
  const key = 'LSkey'; // Додаємо ключ для локал сторедж
  localStorage.setItem(key, JSON.stringify(count)); //Додаємо в сторедж значення count (поточне значення спану)
}
