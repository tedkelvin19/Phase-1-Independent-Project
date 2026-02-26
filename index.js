/* =============================================
   AutoElite — index.js
   Upgraded with: bug fixes, sorting, filtering,
   detail modal, toast notifications, sold counter
   ============================================= */

const API_URL = 'https://phase-1-independent-project-production.up.railway.app'

let allCars = []      // master list fetched from server
let soldCount = 0     // session sold counter

// ── FETCH ALL CARS ──────────────────────────────
function getAllCars() {
  fetch(`${API_URL}/cars`)
    .then(res => {
      if (!res.ok) throw new Error('Server not reachable')
      return res.json()
    })
    .then(cars => {
      allCars = cars
      clearSkeletons()
      cars.forEach(car => renderCar(car))
      updateStockCount()
    })
    .catch(err => {
      clearSkeletons()
      showToast('⚠️ Could not connect to server. Run: json-server --watch db.json', 'error')
      console.error(err)
    })
}

// ── RENDER A CAR CARD ───────────────────────────
function renderCar(car) {
  const carsGrid = document.querySelector('.cars')

  let card = document.createElement('div')
  card.className = 'car'
  card.dataset.id = car.id
  card.dataset.class = (car.class || '').toLowerCase()
  card.dataset.price = car.price
  card.dataset.year = car.start_production

  card.innerHTML = `
    <div class="car-image-wrap">
      <img src="${car.image}" alt="${car.title}" onerror="this.src='https://via.placeholder.com/400x220?text=No+Image'">
      <div class="car-badge">${car.class}</div>
    </div>
    <div class="car-body">
      <h2 class="car-title">${car.title}</h2>
      <div class="car-meta">
        <span class="meta-item"><i class="fas fa-calendar-alt"></i> ${car.start_production}</span>
        <span class="meta-item"><i class="fas fa-tag"></i> $${Number(car.price).toFixed(1)}M</span>
      </div>
      <div class="car-actions">
        <button class="btn-details" onclick="showDetail(${car.id})">
          <i class="fas fa-eye"></i> Details
        </button>
        <button class="btn-buy">
          <i class="fas fa-shopping-cart"></i> Buy Now
        </button>
      </div>
    </div>
  `

  // Buy button
  card.querySelector('.btn-buy').addEventListener('click', () => {
    card.classList.add('removing')
    setTimeout(() => {
      card.remove()
      buyCar(car.id)
      soldCount++
      updateSoldCount()
      updateStockCount()
      checkEmpty()
      showToast(`🎉 You bought the ${car.title}! Congratulations.`, 'success')
    }, 400)
  })

  carsGrid.appendChild(card)
  checkEmpty()
}

// ── SHOW CAR DETAIL MODAL ───────────────────────
function showDetail(id) {
  const car = allCars.find(c => c.id === id)
  if (!car) return

  document.getElementById('detail-content').innerHTML = `
    <img class="detail-img" src="${car.image}" alt="${car.title}" onerror="this.src='https://via.placeholder.com/600x300?text=No+Image'">
    <div class="detail-body">
      <span class="detail-badge">${car.class}</span>
      <h2 class="detail-title">${car.title}</h2>
      <div class="detail-stats">
        <div class="detail-stat">
          <span class="ds-label">Year</span>
          <span class="ds-value">${car.start_production}</span>
        </div>
        <div class="detail-stat">
          <span class="ds-label">Class</span>
          <span class="ds-value">${car.class}</span>
        </div>
        <div class="detail-stat">
          <span class="ds-label">Price</span>
          <span class="ds-value">$${Number(car.price).toFixed(1)}M</span>
        </div>
      </div>
      <button class="submit-btn detail-buy-btn" onclick="handleDetailBuy(${car.id})">
        <i class="fas fa-shopping-cart"></i> Purchase This Vehicle
      </button>
    </div>
  `
  document.getElementById('detail-overlay').classList.add('active')
}

function handleDetailBuy(id) {
  closeDetail()
  const card = document.querySelector(`.car[data-id='${id}']`)
  if (card) {
    card.classList.add('removing')
    setTimeout(() => {
      card.remove()
      buyCar(id)
      soldCount++
      updateSoldCount()
      updateStockCount()
      checkEmpty()
      const car = allCars.find(c => c.id === id)
      showToast(`🎉 You bought the ${car ? car.title : 'car'}! Congratulations.`, 'success')
    }, 400)
  }
}

function closeDetail() {
  document.getElementById('detail-overlay').classList.remove('active')
}

// ── SEARCH ──────────────────────────────────────
function search() {
  const query = document.getElementById('search-car').value.toUpperCase()
  const cards = document.querySelectorAll('.car')
  let visible = 0

  cards.forEach(card => {
    const title = card.querySelector('.car-title')?.textContent.toUpperCase() || ''
    const badge = card.querySelector('.car-badge')?.textContent.toUpperCase() || ''
    const year  = card.dataset.year || ''

    if (title.includes(query) || badge.includes(query) || year.includes(query)) {
      card.style.display = ''
      visible++
    } else {
      card.style.display = 'none'
    }
  })

  const countEl = document.getElementById('search-count')
  if (query) {
    countEl.textContent = `${visible} result${visible !== 1 ? 's' : ''}`
  } else {
    countEl.textContent = ''
  }
  checkEmpty()
}

// ── SORT ────────────────────────────────────────
function sortCars() {
  const val = document.getElementById('sort-select').value
  const grid = document.querySelector('.cars')
  const cards = Array.from(grid.querySelectorAll('.car'))

  cards.sort((a, b) => {
    if (val === 'price-asc')  return Number(a.dataset.price) - Number(b.dataset.price)
    if (val === 'price-desc') return Number(b.dataset.price) - Number(a.dataset.price)
    if (val === 'year-desc')  return Number(b.dataset.year)  - Number(a.dataset.year)
    if (val === 'year-asc')   return Number(a.dataset.year)  - Number(b.dataset.year)
    return 0
  })

  cards.forEach(c => grid.appendChild(c))
}

// ── FILTER BUTTONS ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')

      const filter = btn.dataset.filter
      document.querySelectorAll('.car').forEach(card => {
        const cls = card.dataset.class || ''
        if (filter === 'all' || cls.includes(filter)) {
          card.style.display = ''
        } else {
          card.style.display = 'none'
        }
      })
      checkEmpty()
    })
  })

  // Request car modal
  const requestBtn = document.querySelector('#new-car-btn')
  const overlay    = document.querySelector('#modal-overlay')
  const closeBtn   = document.querySelector('#modal-close')

  requestBtn.addEventListener('click', () => overlay.classList.add('active'))
  closeBtn.addEventListener('click',   () => overlay.classList.remove('active'))
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('active')
  })

  // Detail modal close
  document.getElementById('detail-close').addEventListener('click', closeDetail)
  document.getElementById('detail-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('detail-overlay')) closeDetail()
  })
})

// ── REQUEST / ADD NEW CAR ───────────────────────
const form = document.querySelector('#request-car')
form.addEventListener('submit', requestNewCar)

function requestNewCar(e) {
  e.preventDefault()
  const submitBtn = form.querySelector('.submit-btn')
  submitBtn.disabled = true
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...'

  const carobj = {
    image: e.target.image.value,
    title: e.target.name.value,
    start_production: e.target.year.value,
    class: e.target.class.value,
    price: e.target.price.value
  }

  handlePostCar(carobj)
    .then(savedCar => {
      allCars.push(savedCar)
      renderCar(savedCar)
      updateStockCount()
      form.reset()
      document.getElementById('modal-overlay').classList.remove('active')
      showToast(`✅ "${savedCar.title}" added to inventory!`, 'success')
    })
    .catch(() => {
      // Still render locally even if server is down
      renderCar({...carobj, id: Date.now()})
      form.reset()
      document.getElementById('modal-overlay').classList.remove('active')
      showToast('⚠️ Car added locally (server offline).', 'warning')
    })
    .finally(() => {
      submitBtn.disabled = false
      submitBtn.innerHTML = '<i class="fas fa-car"></i> Add to Inventory'
    })
}

function handlePostCar(carobj) {
  return fetch(`${API_URL}/cars`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(carobj)
  }).then(res => {
    if (!res.ok) throw new Error('POST failed')
    return res.json()
  })
}

// ── BUY / DELETE CAR ────────────────────────────
function buyCar(id) {
  if (!id) return
  fetch(`${API_URL}/cars/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }).catch(() => {/* silent fail if offline */})
}

// ── COMMENTS ────────────────────────────────────
const commentsList = document.querySelector('#comments-list')

function renderComments() {
  const commentForm = document.querySelector('#comment-form')
  commentForm.addEventListener('submit', e => {
    e.preventDefault()
    const val = document.getElementById('comment').value.trim()
    if (!val) return

    const li = document.createElement('li')
    li.className = 'comment-item'

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    li.innerHTML = `
      <div class="comment-avatar">${val.charAt(0).toUpperCase()}</div>
      <div class="comment-content">
        <div class="comment-text">${val}</div>
        <div class="comment-time">${now}</div>
      </div>
      <button class="comment-del" title="Delete"><i class="fas fa-trash-alt"></i></button>
    `

    li.querySelector('.comment-del').addEventListener('click', removeComment)
    commentsList.prepend(li)
    commentForm.reset()
    showToast('💬 Comment posted!', 'success')
  })
}

function removeComment(e) {
  e.target.closest('.comment-item').remove()
}

// ── HELPERS ─────────────────────────────────────
function clearSkeletons() {
  document.querySelectorAll('.skeleton-card').forEach(s => s.remove())
}

function checkEmpty() {
  const visible = Array.from(document.querySelectorAll('.car')).filter(c => c.style.display !== 'none')
  document.getElementById('empty-state').style.display = visible.length === 0 ? 'flex' : 'none'
}

function updateStockCount() {
  const count = document.querySelectorAll('.car').length
  document.getElementById('total-cars').textContent = count
}

function updateSoldCount() {
  document.getElementById('total-sold').textContent = soldCount
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast')
  toast.textContent = message
  toast.className = `toast ${type} show`
  setTimeout(() => toast.classList.remove('show'), 3500)
}

// ── INIT ─────────────────────────────────────────
getAllCars()
renderComments()
