import './review-component/index.js'
import { RestaurantFilter } from './Restaurant-Filter&Sorter/Restaurant-Filter.js'
import { RestaurantSorter } from './Restaurant-Filter&Sorter/Restaurant-Sorter.js'

class Application {
  start() {
    new RestaurantFilter()
    new RestaurantSorter()
  }
}

new Application().start()
