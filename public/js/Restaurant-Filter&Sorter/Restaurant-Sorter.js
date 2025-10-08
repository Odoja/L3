/**
 * Class to sort restaurants based on preference.
 */
export class RestaurantSorter {
  #restaurantSortButton
  #restaurantWrappers
  #pictureRow
  
  /**
   * Initializes the filter by selecting DOM elements and setting up event listener.
   */
  constructor() {
    this.#restaurantSortButton = document.querySelectorAll('.Sort-btn')
    this.#pictureRow = document.querySelector('.PictureRow')
    this.#restaurantWrappers = document.querySelectorAll('.PicWrapper')
    this.#sortSetup()
  }

  /**
   * Sets up event listner for each button.
   */
  #sortSetup() {
    this.#restaurantSortButton.forEach(button => {
      button.addEventListener('click', () => this.#sortClick(button))
    })
  }

  /**
   * Handles the click event for the sort buttons.
   * 
   * @param {HTMLElement} button - the clicked button.
   */
  #sortClick(button) {
    const sortType = button.dataset.pref
    this.#updateSortButton(button)
    this.#sortRestaurantsByOption(sortType)
  }

  /**
   * Adds/removes the active class on the clicked button.
   * 
   * @param {HTMLElement} clickedButton - the clicked button.
   */
  #updateSortButton(clickedButton) {
    this.#restaurantSortButton.forEach(button => button.classList.remove('active'))
    clickedButton.classList.add('active')
  }

  /**
   * Sorts the restaurants based on the selected sorting option.
   * 
   * @param {String} sortType - the sorting the code is going to sort by.
   */
  #sortRestaurantsByOption(sortType) {
    const restaurantWrappers = [...this.#restaurantWrappers]

    restaurantWrappers.sort((firstRestaurant, secondRestaurant) => {
      switch (sortType) {
        case 'Top-Rated':
          return this.#compareByRating(secondRestaurant, firstRestaurant)

        case 'Lowest-Rated':
          return this.#compareByRating(firstRestaurant, secondRestaurant)

        case 'Highest-Price':
          return this.#compareByPrice(secondRestaurant, firstRestaurant)

        case 'Lowest-Price':
          return this.#compareByPrice(firstRestaurant, secondRestaurant)

        default:
          return 0
      }
    })
    this.#updateRestaurantOrder(restaurantWrappers)
  }

  // Helper methods

  /**
   * Compares restaurant elements based on their rating in ascending order.
   * 
   * @param {HTMLElement} firstRestaurant - first restaurant element.
   * @param {HTMLElement} secondRestaurant - second resstaurant element.
   * @returns {Number} - comparison result.
   */
  #compareByRating(firstRestaurant, secondRestaurant) {
    const ratingA = parseFloat(firstRestaurant.querySelector('.Rating').textContent)
    const ratingB = parseFloat(secondRestaurant.querySelector('.Rating').textContent)
    return ratingA - ratingB
  }

  /**
   * Compares two restaurant elements based on their price level
   * 
   * @param {HTMLElement} firstRestaurant - first restaurant element.
   * @param {HTMLElement} secondRestaurant - second resstaurant element.
   * @returns {Number} - comparison result.
   */
  #compareByPrice(firstRestaurant, secondRestaurant) {
    const priceA = firstRestaurant.querySelector('.RestaurantPrice').textContent.trim().length
    const priceB = secondRestaurant.querySelector('.RestaurantPrice').textContent.trim().length
    return priceA - priceB
  }

  /**
   * Updates the order of restaurant elements in the DOM.
   * 
   * @param {Array<HTMLElement>} sortedRestaurants - the sorted array of restaurant elements.
   */
  #updateRestaurantOrder(sortedRestaurants) {
    sortedRestaurants.forEach(wrapper => this.#pictureRow.appendChild(wrapper))
  }
}
