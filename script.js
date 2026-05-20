const surnames = [ // База данных
  { id: 1, name: "Запухляк", region: "slav", type: "real" },
  { id: 2, name: "Бабкин", region: "slav", type: "real" },
  { id: 3, name: "Червяков", region: "slav", type: "fictional" },
  { id: 4, name: "Свиножиров", region: "slav", type: "fictional" },
  { id: 5, name: "Головач", region: "slav", type: "real" },
  { id: 6, name: "Шаманский", region: "slav", type: "real" },
  { id: 7, name: "Непей-Пиво", region: "slav", type: "real" },
  { id: 8, name: "Огрызкин", region: "slav", type: "real" },
  { id: 9, name: "Тиклер", region: "eng", type: "fictional" },
  { id: 10, name: "Гейб-Хорн", region: "eng", type: "fictional" },
  { id: 11, name: "Гейлорд", region: "eng", type: "real" },
  { id: 12, name: "Гейвуд", region: "eng", type: "real" },
  { id: 13, name: "Пуп", region: "eng", type: "real" },
  { id: 14, name: "Бутылкин", region: "slav", type: "fictional" },
  { id: 15, name: "Титяк", region: "slav", type: "real" },
  { id: 16, name: "Император", region: "slav", type: "real" },
  { id: 17, name: "Конус", region: "slav", type: "fictional" },
  { id: 18, name: "Бучка", region: "slav", type: "fictional" },
  { id: 19, name: "Кучка", region: "slav", type: "fictional" },
  { id: 20, name: "Вареников", region: "slav", type: "fictional" },
  { id: 21, name: "Мамочкин", region: "slav", type: "real" },
  { id: 22, name: "Хайлов", region: "slav", type: "fictional" },
  { id: 23, name: "Невменяев", region: "slav", type: "fictional" },
  { id: 24, name: "Чмырь", region: "slav", type: "real" },
]

const list = document.getElementById('surnames-list');

// Отображение карточек фамилий
const mapSurnames = (arr) => {
  list.innerHTML = ''
  for (let i = 0; i < arr.length; i++) {
    list.innerHTML += `
      <div class="card">
        <p>${arr[i].name}</p>
        <button class="fav-btn" data-id="${arr[i].id}">☆</button>
      </div>`
  }
}

mapSurnames(surnames)

const tabs = document.querySelectorAll('.tab')
const screens = document.querySelectorAll('.screen')

// Переключение между вкладками
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.dataset.tab === 'favorites') renderFavorites()
    screens.forEach(t => t.classList.remove('active'))
    tabs.forEach(t => t.classList.remove('active'))
    document.getElementById(tab.dataset.tab).classList.add('active')
    tab.classList.add('active')
  })
})

// Фильтры
const filterSurnames = () => {
  const filters = document.querySelectorAll('input[type="checkbox"]:checked')
  let filtered = [...surnames]

  filters.forEach(f => {
    const key = f.dataset.filter
    const val = f.value
    filtered = filtered.filter(item => item[key] === val)
  })

  mapSurnames(filtered)
}

document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', filterSurnames)
})

document.getElementById('clear-filters').addEventListener('click', () => {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false)
  mapSurnames(surnames)
})

// Избранное
let favorites = []

list.addEventListener('click', (e) => {
  if (!e.target.classList.contains('fav-btn')) return

  const id = Number(e.target.dataset.id)

  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id)
  } else {
    favorites.push(id)
  }

  e.target.classList.toggle('active')
  e.target.textContent = favorites.includes(id) ? '★' : '☆'
})

const renderFavorites = () => {
  const favList = document.getElementById('favorites-list')
  const favSurnames = surnames.filter(item => favorites.includes(item.id))
  
  if (favSurnames.length === 0) {
    favList.innerHTML = '<p>Пока ничего нет. Добавьте фамилии через ☆</p>'
    return
  }

  favList.innerHTML = ''
  favSurnames.forEach(item => {
    favList.innerHTML += `<div class="card"><p>${item.name}</p></div>`
  })
}
