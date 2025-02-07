// --- IMPORTS --- //
import Menu from './modules/menu.js';
import Receipt from './modules/receipt.js';
import SOURCE_DATA from './modules/data.js';
import VIEWPORT from './index.js';
import LOGIC from './modules/logic.js';

// --- SETTING QUERY --- //
const INNER_VIEWPORT = document.querySelector('#inner-view');
const RECEIPT_VIEWPORT = document.querySelector('#receipt-view');


// --- DYNAMIC USER DATA --- //
const USER_DATA = structuredClone(SOURCE_DATA);
const {generateIcon, addDataset, iterateElementsArray} = LOGIC;


// --- --- --- --- --- --- --- --- --- --- //





const CREATE_CATEGORY = () => {

    // --- RETURN MAP WITH HTML OBJECTS x # OF CATEGORIES --- //
    return USER_DATA.map(category => {
        const createUl = document.createElement('div');
        
        // createUl.textContent += category.category;

        // --- MAP OF HTML OBJECTS OF RESTAURANTS --- //
        const categoryMap = category.menus.map(restaurant => {

            const createLi = document.createElement('div');

            // --- BUTTON OF EACH RESTAURANT, THEN APPEND TO LI --- //
            const restaurantDiv = generateIcon(restaurant);
            createLi.append(restaurantDiv);
            
            const criteriaData = {category: category.category};

            addDataset(createLi, criteriaData);
            
            return createLi;

        })

        // --- ITERATE OVER MAP, THEN APPEND TO UL --- //
        categoryMap.forEach(ul => {
            createUl.append(ul);
            
        });

        createUl.id = 'ul-div'        

        // --- RETURNING UL OBJECT OF CATEGORY --- //
        return createUl;
    })

}

const CREATE_RECEIPT = () => {

    const receiptDiv = document.createElement('div');

    // --- INIT LOGO --- //
    const h1 = document.createElement('h1');
    h1.textContent = 'Receipt';

    // --- INIT closedButton --- //
    const closedButton = document.createElement('button');
    const closedIcon = document.createElement('i');
    closedIcon.classList = 'fa-solid fa-chevron-up';
    closedIcon.dataset['action'] = 'receipt';
    closedButton.append(closedIcon);
    closedButton.id = 'closed-btn';

    receiptDiv.id = 'receipt-controls';
    receiptDiv.append(h1, closedButton);
    
    // --- RETURN ARRAY OF OBJECT HTMLs --- //
    return [receiptDiv];

}


// --- DEFAULT STATE FUNCTION --- //
const DEFAULT_STATE = () => {

    // --- INIT HTML SECTIONS --- //
    const innerViewport = document.createElement('div');
    innerViewport.id = 'inner-view';
    
    
    // DELETE
    innerViewport.style.position = 'relative';


    const receiptViewport = document.createElement('div');
    receiptViewport.id = 'receipt-view';

    // --- INIT HTML ARRAYS --- //
    const categoryHTML = CREATE_CATEGORY();
    const receiptHTML = CREATE_RECEIPT();

    // --- ITERATING OVER ARRAY & APPENDING VIEWS --- //
    iterateElementsArray(innerViewport, categoryHTML);
    iterateElementsArray(receiptViewport, receiptHTML);
    
    // --- RETURN CONCAT VIEWPORTS --- //
    return innerViewport.outerHTML + receiptViewport.outerHTML;
    
}



// --- APP SWITCH FUNCTION --- //
const APP_SWITCH = (e) => {

    // --- CHECKING e FOR data-action --- //
    if (!e.target.dataset.action) return;
    
    // --- data-action SWITCH STATEMENT => INIT VIEWPORTS --- //
    switch (e.target.dataset.action) {
        case 'menu':

        
        // cant stay like that, otherwise, buggy
        // e.target.closest throw new Error() || let current = element;
                                                // while (current && !current.matches('.target-class')) {
                                                //     current = current.parentElement;
                                                // }




            return e.target.closest('#inner-view').innerHTML += Menu(e.target.parentElement.dataset.category, e.target.dataset.restaurant);
        case 'receipt':
            return e.target.closest('#receipt-view').innerHTML = Receipt(e.target);
        case 'default':
            return VIEWPORT.innerHTML = DEFAULT_STATE();
    };

};


// --- APP FUNCTION --- //
export default function App() {

    // --- CHECKING VIEWPORT --- //
    if (!VIEWPORT) {throw new Error('Viewport Obstructed')};

    // --- EVENT LISTENER: SWITCHING VIEW --- //
    document.addEventListener('click', APP_SWITCH);

    // --- RETURN DEFAULT --- //
    return DEFAULT_STATE();

};

export {USER_DATA}