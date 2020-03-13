/* Global Variables */
const KEY = 'eac1b09635b32b1416f148329634fc16';
const zipUI = document.querySelector('#zip');
const generateBtn = document.querySelector('#generate');
const feelingUI = document.querySelector('.sec-feel');
const textAreaUI = document.querySelector('.myInput');
const listContentUI = document.querySelector('.list_information');
const dateValueUI = document.querySelector('.date_value');
const tempUI = document.querySelector('#temp');

// Return url with zip code and key.
const baseUrl = zipcode => {
  return `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${KEY}`;
};
const info = [];
// Event listener when click generate button to fetch data.
generateBtn.addEventListener('click', () => {
  if (isEmpty(zipUI.value)) {
    fetch(baseUrl(zipUI.value))
      .then(res => res.json())
      .then(data => {
        console.log(data.weather, data.sys, data.name);
        const { country } = data.sys;
        const { name } = data;
        createItem(`Country: ${country}`, false);
        createItem(`City: ${name}`, false);
        const { icon } = data.weather[0];
        createItem(`http://openweathermap.org/img/w/${icon}.png`, true);
        tempList(data.main);
        return data;
      })
      .catch(err => console.log(err));
    // Put date
    dateValueUI.innerHTML = newDate;
  } else {
    alert('Please enter zip code ');
  }

  // When how are you feeling today not empty
  feelingUI.textContent =
    textAreaUI.value === '' ? '' : `your feeling: ${textAreaUI.value}`;
});
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/**
 * @param {string} value
 * @param {boolean} isIcon if true that means we sent image with src.
 */
function createItem(value, isIcon) {
  const li = document.createElement('li');
  if (isIcon) {
    const img = document.createElement('img');
    img.src = value;
    li.append(img);
  } else {
    li.textContent = value;
  }
  listContentUI.append(li);
}

/**
 * @param {object} object contain main value of temp
 */
function tempList(object) {
  const list = document.createElement('ul');
  list.className = 'list_information';
  for (let [key, value] of Object.entries(object)) {
    const li = document.createElement('li');
    li.textContent = `${key} : ${value}`;
    list.append(li);
  }
  tempUI.append(list);
}

/**
 * @param {string} value for zip code input, check before fetch data.
 */
function isEmpty(value) {
  return value !== '' || null;
}
