import { ReviewFetcher } from './Review-Fetcher.js'
import { ReviewRenderer } from './Review-Renderer.js'

/**
 * A class to render reviews.
 */
export class ReviewSorter {
  /**
   * Creates an instance of Review.
   *
   * @param {*} shadowRoot - the shadow root of the review-component.
   */
  constructor(shadowRoot) {
    this.shadowRoot = shadowRoot
    this.reviewFetcher = new ReviewFetcher(this.shadowRoot)
    this.reviewRenderer = new ReviewRenderer(this.shadowRoot)
  }

  /**
   * Setups the event listeners for sorting.
   */
  sortSetup() {
    const sortOption = this.shadowRoot.getElementById('sort-option')
    sortOption.addEventListener('change', (event) => {
      this.reviewSorting(event.target.value)
    })
  }

  /**
   * Sorting logic for the reviews.
   *
   * @param {string} sortOption - the sorting the code is going to sort by.
   */
  async reviewSorting(sortOption) {
    try {
      const reviews = await this.reviewFetcher.fetchReviews()

      this.displaySortOptions(reviews)
      this.sortReviewsByOption(reviews, sortOption)

      this.reviewRenderer.renderReviews(reviews)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Displays the sorting for reviews depending if there are reviews to be shown or not.
   *
   * @param {*} reviews - a list with reviews.
   */
  displaySortOptions(reviews) {
    const sortList = this.shadowRoot.getElementById('sort-option')

    if (!reviews || reviews.length === 0) {
      sortList.classList.add('hidden')
    } else {
      sortList.classList.remove('hidden')
    }
  }

  /**
   * Sorts reviews array based on the selected sorting option.
   *
   * @param {Array} reviews - the array of reviews to sort.
   * @param {string} sortOption - the sorting option.
   */
  sortReviewsByOption(reviews, sortOption) {
    switch (sortOption) {
      case 'Newest':
        reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'Oldest':
        reviews.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'Top-rated':
        reviews.sort((a, b) => b.rating - a.rating)
        break
      case 'Lowest-rated':
        reviews.sort((a, b) => a.rating - b.rating)
        break
      default:
        break
    }
  }
}
