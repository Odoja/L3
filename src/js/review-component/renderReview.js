/**
 * A class to render reviews.
 */
export class ReviewRenderer {
  /**
   * Creates an instance of Review.
   *
   * @param {*} shadowRoot - the shadow root of the review-component.
   */
  constructor (shadowRoot) {
    this.shadowRoot = shadowRoot
  }

  /**
  * Renders reviews in the DOM.
  *
  * @param {*} reviews - a list with reviews.
  */
  renderReviews (reviews) {
    const commentSection = this.shadowRoot.getElementById('comment-section')
    commentSection.innerHTML = ''

    reviews.forEach(review => {
      commentSection.appendChild(this.createContainer(review))
    })
  }

  // Helper methods
  createContainer (review) {
    const container = document.createElement('div')
    container.classList.add('comment-container')
    container.appendChild(this.createUsername(review))
    container.appendChild(this.createReview(review))
    container.appendChild(this.createRating(review))
    return container
  }

  createUsername (review) {
    const username = document.createElement('h4')
    username.textContent = review.username
    return username
  }

  createReview (review) {
    const reviewText = document.createElement('p')
    reviewText.textContent = review.review
    return reviewText
  }

  createRating (review) {
    const amountOfStars = review.rating

    const rating = document.createElement('div')
    rating.classList.add('review-rating')

    for (let i = 1; i <= amountOfStars; i++) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.classList.add('star')
      svg.setAttribute('data-value', i)
      svg.setAttribute('viewBox', '0 0 24 24')
      svg.setAttribute('fill', 'currentColor')
      svg.style.pointerEvents = 'none'

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z')

      svg.appendChild(path)
      rating.appendChild(svg)
    }

    return rating
  }
}
