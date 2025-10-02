const template = document.createElement('template')
template.innerHTML = `
  <link rel="stylesheet" href="./css/review-component.css">
  <div class="container">
    <h1>Review</h1>
    <form id="review-form">
      <div id="top-section">
        <input type="text" id="username" name="username" placeholder="Name" required>
        <textarea name="review" placeholder="Write you're review here" required></textarea>
      </div>
      <div id="bottom-section">
        <div id="star-rating">
          <span>Rating:</span>
          <input type="hidden" name="rating" id="rating" value="" required>
          <svg class="star" data-value="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg class="star" data-value="2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg class="star" data-value="3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg class="star" data-value="4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <svg class="star" data-value="5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25 L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <button type="submit" id="review-btn">Send</button>
      </div>
    </form>
    <div id="comment-wrapper"> 
      <select name="" id="filter-option" class="hidden">
        <option value="Newest">Newest Reviews</option>
        <option value="Oldest">Oldest Reviews</option>
        <option value="Top-rated">Highest Rating</option>
        <option value="Lowest-rated">Lowest Rating</option>
      </select>
      <div id="comment-section">
      </div> 
    </div>
  </div>
`
customElements.define('review-component',
  /**
   * Represents a review-component element that can be used to create draggable popup windows.
   */
  class extends HTMLElement {
    /**
     * Creates an instance of the review-component element.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
      this.currentRating = 0
      this.stars = this.shadowRoot.querySelectorAll('.star')
      this.ratingInput = this.shadowRoot.querySelector('#rating')
    }

    /**
     * Sets up event listeners when the element is connected to the DOM.
     */
    connectedCallback () {
      this.ratingSetup()
      this.displayReviews()
      this.formLogic()
      this.filterSetup()
    }

    /**
     * Setups the event listeners for the rating method.
     */
    ratingSetup () {
      this.stars.forEach((star) => {
        star.addEventListener('click', (star) => {
          const rating = star.currentTarget.getAttribute('data-value')
          this.setRating(rating)
        })

        star.addEventListener('mouseenter', (star) => {
          const currentStar = star.currentTarget.getAttribute('data-value')
          this.ratingDisplay(currentStar) // Stars are filled to the star the cursor is on.
        })

        star.addEventListener('mouseleave', () => {
          this.ratingDisplay(this.currentRating) // Stars filled returned to the one that was selected.
        })
      })
    }

    /**
     * Takes the rating obtained from param and gives the input value/the current rating the same.
     *
     * @param {*} rating - data value from stars.
     */
    setRating (rating) {
      this.currentRating = rating
      this.ratingInput.value = rating
      this.ratingDisplay(rating)
    }

    /**
     * Updates the star color depending on the selected amount of stars.
     *
     * @param {*} rating - the amount of stars to be displayed.
     */
    ratingDisplay (rating) {
      this.stars.forEach((star) => {
        const starValue = star.getAttribute('data-value')

        if (starValue <= rating) {
          star.classList.add('filled')
        } else {
          star.classList.remove('filled')
        }
      })
    }

    /**
     * Fetches the reviews from the database and displays them.
     */
    async displayReviews () {
      try {
        const res = await fetch('/review/all') // fill in your own fetch route

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const reviews = await res.json()
        // console.log(reviews)
        this.displaySortOptions(reviews)
        this.renderReviews(reviews)
      } catch (err) {
        console.error(err)
      }
    }

    /**
     * Handles form data and sends it to a database through a POST request.
     */
    formLogic () {
      const form = this.shadowRoot.getElementById('review-form')

      form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = new FormData(form)
        const username = formData.get('username')
        const review = formData.get('review')
        const rating = formData.get('rating')

        if (!username || !review || !rating) {
          alert('Fill in all fields and select a rating')
          return
        }

        try {
          const response = await fetch('/review/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: username.trim(),
              review: review.trim(),
              rating
            })
          })

          if (response.ok) {
            form.reset()
            this.setRating(0)
            this.displayReviews()
          } else {
            console.error('Failed to submit review ' + response.status)
          }
        } catch (error) {
          console.error(error)
        }
      })
    }

    /**
     * Setups the event listeners for option filter.
     */
    filterSetup () {
      const filterOption = this.shadowRoot.getElementById('filter-option')
      filterOption.addEventListener('change', (e) => {
        this.commentFilter(e.target.value)
      })
    }

    /**
     * Sorting logic for the comments.
     *
     * @param {string} filterOption - the filter the code is going to sort by.
     */
    async commentFilter (filterOption) {
      try {
        const res = await fetch('/review/all') // fill in your own fetch route

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const reviews = await res.json()

        this.displaySortOptions(reviews)

        switch (filterOption) {
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

        this.renderReviews(reviews)
      } catch (error) {
        console.error(error)
      }
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

    /**
     * Displays the sorting for reviews depending if there are reviews to be shown or not.
     *
     * @param {*} reviews - a list with reviews.
     */
    displaySortOptions (reviews) {
      const sortList = this.shadowRoot.getElementById('filter-option')

      if (!reviews || reviews.length === 0) {
        sortList.classList.add('hidden')
      } else {
        sortList.classList.remove('hidden')
      }
    }

    async fetchReviews () {

    }

    // Helper methods
    createContainer () {
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
      const rating = document.createElement('span')
      rating.textContent = `Rating: ${review.rating}/5` // change from numbers to stars.
      return rating
    }
  }
)
