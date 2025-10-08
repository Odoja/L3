/**
 * Class to filter restaurants based on cuisine type.
 */
export class RestaurantFilter {
  #restaurantEmblem
  #restaurantWrappers
  #restaurantShowcaseTitle

  /**
   * Initializes the filter by selecting DOM elements and setting up event listener.
   */
  constructor() {
    this.#restaurantEmblem = document.querySelectorAll('.emblem')
    this.#restaurantWrappers = document.querySelectorAll('.PicWrapper')
    this.#restaurantShowcaseTitle = document.querySelector('.Cuisine-Header h2')
    this.#filterSetup()
  }

  /**
   * Sets up event listner for each emblem.
   */
  #filterSetup() {
    this.#restaurantEmblem.forEach(emblem => {
      emblem.addEventListener('click', () => this.#filterClick(emblem))
    })
  }

  /**
   * Handles the click event for the filter emblems.
   * 
   * @param {*} emblem - the clicked emblem.
   */
  #filterClick(emblem) {
    const cuisineType = emblem.dataset.pref
    this.#updateFilterEmblem(emblem)
    this.#updateShowcaseTitle(cuisineType)
    this.#updateRestaurants(cuisineType)
  }

  /**
   * Adds/removes the active class on the clicked emblem.
   * 
   * @param {*} clickedEmblem - the clicked emblem.
   */
  #updateFilterEmblem(clickedEmblem) {
    this.#restaurantEmblem.forEach(emblem => emblem.classList.remove('active'))
    clickedEmblem.classList.add('active')
  }

  /**
   * Updates the title of the restaurant showcase based on the selected filter.
   * 
   * @param {String} header - the header text to set.
   */
  #updateShowcaseTitle(header) {
    if (header === 'All') {
      this.#restaurantShowcaseTitle.textContent = 'All Restaurants'
    } else {
      this.#restaurantShowcaseTitle.textContent = header
    }
  }

  /**
   * Filters restaurants based on restaurant type and hides/shows them based on that.
   * 
   * @param {String} type - the type of cuisine to filter by.
   */
  #updateRestaurants(type) {
    this.#restaurantWrappers.forEach(wrapper => {
      const restaurantType = wrapper.querySelector('.RestaurantType').textContent.trim()

      if (type === 'All' || restaurantType === type) {
        wrapper.classList.remove('hidden')
      } else {
        wrapper.classList.add('hidden')
      }
    })
  }
}
