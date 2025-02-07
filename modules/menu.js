import LOGIC from "./logic.js";
import {USER_DATA} from '../app.js'

const {generateDiv, iterateElementsArray} = LOGIC;

export default function Menu(category, restaurant) {
    const CATEGORY = category;
    const RESTAURANT = restaurant;

    const ITEM_MAP = () => {
        return USER_DATA.filter(categories => categories.category === CATEGORY).flatMap(categories => {
            return categories.menus.filter(restaurants => restaurants.name === RESTAURANT).flatMap(restaurant => {
                return restaurant.items.flatMap(item => {
                    return generateDiv(item);
                })
    
            })
        })
    }
    
    //needs renaming
    const REVIEWS_DATA = () => {
        return USER_DATA.filter(categories => categories.category === CATEGORY).flatMap(categories => {
            return categories.menus.filter(restaurants => restaurants.name === RESTAURANT).flatMap(restaurant => {
                return {name: restaurant.name,
                        review: restaurant.review,
                        rating: restaurant.rating}
            })
        })
    }
    
    const QUANTITY = (itemCriteria) => {
        return USER_DATA.filter(categories => categories.category === CATEGORY).map(categories => {
            return categories.menus.filter(restaurants => restaurants.name === RESTAURANT).map(restaurant => {
                return restaurant.items.filter(item => item.item === itemCriteria).map(item => {
                    return item.quantity;
                })
            })
        })
    }
 
    const ADD_QUANTITY = (itemCriteria) => {
        const category = USER_DATA.find(category => category.category === CATEGORY);
        if (category) {
            const restaurant = category.menus.find(rest => rest.name === RESTAURANT);
            if (restaurant) {
                const item = restaurant.items.find(item => item.item === itemCriteria);
                if (item) {
                    item.quantity++;
                }
            }
        }
    };
    const SUBTRACT_QUANTITY = (itemCriteria) => {
        const category = USER_DATA.find(category => category.category === CATEGORY);
        if (category) {
            const restaurant = category.menus.find(rest => rest.name === RESTAURANT);
            if (restaurant) {
                const item = restaurant.items.find(item => item.item === itemCriteria);
                if (item) {
                    item.quantity--;
                }
            }
        }
    };

    const UPDATE_QUANTITY_SPAN = (location, itemCriteria) => {
        location.closest('.quantity').textContent = QUANTITY(itemCriteria).join('')
    }

    

    const exitBtn = document.createElement('button');

    const menuText = document.createElement('span');
    const reviewText = document.createElement('span');
    const ratingText = document.createElement('span');

    const contentDiv = document.createElement('div');
    const topBarDiv = document.createElement('div');
    
    const itemsDiv = document.createElement('div');
    itemsDiv.id = 'menu-items';
    const reviewDiv = document.createElement('div');
    reviewDiv.id = 'menu-reviews';
    const menuView = document.createElement('div');
    

    menuView.id = 'menu';

    exitBtn.textContent = 'x';
    exitBtn.dataset['action'] = 'close'

    const tempRevData = REVIEWS_DATA();
    tempRevData.forEach(element => {
        menuText.textContent = element.name;
        reviewText.textContent = element.review;
        ratingText.textContent = element.rating;
    })

    reviewDiv.append(reviewText,ratingText)

    iterateElementsArray(itemsDiv, ITEM_MAP())

    topBarDiv.append(menuText, exitBtn);
    topBarDiv.id = 'menu-top-bar';

    contentDiv.append( reviewDiv, itemsDiv);
    contentDiv.id = 'menu-contents';

    menuView.classList.add('fade-in');
    menuView.append(topBarDiv, contentDiv);

    const CLOSE_MENU = (e) => {
        if (e.target.dataset.action === 'close') {
            e.target.closest('#menu').remove();
            document.removeEventListener('click', UPDATE_QUANTITY)
            document.removeEventListener('click', CLOSE_MENU)
        };
    }

    const UPDATE_QUANTITY = (e) => {
        const item = e.target.dataset.item;
        if (e.target.dataset.action === 'subtract' && QUANTITY(item) > 0) {
            SUBTRACT_QUANTITY(item);
            let spanText = e.target.parentElement.children[1]
            UPDATE_QUANTITY_SPAN(spanText, item)
        }
        if (e.target.dataset.action === 'addition') {
            ADD_QUANTITY(item);
            let spanText = e.target.parentElement.children[1]
            UPDATE_QUANTITY_SPAN(spanText, item)
        }
    }

    document.addEventListener('click', CLOSE_MENU)

    // this is the reason why its duplicating
    document.addEventListener('click', UPDATE_QUANTITY)
    

    return menuView.outerHTML;
};