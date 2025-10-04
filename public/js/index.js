import './review-component/index.js'


/* ----------- Main Image shifting ------------- */
document.addEventListener('DOMContentLoaded', () => {
  const images = [
    './img/Main/Main1.jpg',
    './img/Main/Main2.jpg',
    './img/Main/Main3.jpg',
    './img/Main/Main4.jpg'
  ]

let currentIndex = 0
  const img = document.querySelector('.rotation')

  if (img) {
    setInterval(() => {
      img.style.opacity = 0
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length
        img.src = images[currentIndex]
        img.style.opacity = 1
      }, 1500)
    }, 15000)
  }
})