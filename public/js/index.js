import './review-component/index.js'
import { RestaurantFilter } from './Restaurant-Filter&Sorter/Restaurant-Filter.js'
import { RestaurantSorter } from './Restaurant-Filter&Sorter/Restaurant-Sorter.js'

class Script {
  static start() {
    new RestaurantFilter()
    new RestaurantSorter()
  }
}

Script.start()
