
export class RestaurantSorter {
  #restaurantSortButton

  constructor() {
    this.#restaurantSortButton = document.querySelectorAll('.Sort-btn')
    this.#sortSetup()
  }

  #sortSetup() {
    this.#restaurantSortButton.forEach(button => {
      button.addEventListener('click', () => this.#sortClick(button))
    })
  }

  #sortClick(button) {
    this.#updateSortButton(button)
  }

  #updateSortButton(clickedButton) {
    this.#restaurantSortButton.forEach(button => button.classList.remove('active'))
    clickedButton.classList.add('active')
  }

}
