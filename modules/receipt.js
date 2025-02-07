import VIEWPORT from "../index.js"
import { USER_DATA } from "../app.js";
import LOGIC from './logic.js';
import Payment from './payment.js';

const {iterateElementsArray, generateReceiptDiv} = LOGIC;

export default function Receipt(e) {
    
    const RECEIPT_VIEW = e.closest('#receipt-view');

    RECEIPT_VIEW.classList.add('toggle-receipt');
    RECEIPT_VIEW.classList.add('fade-in');










    const CREATE_RECEIPT = (x, y, z) => {

        const receiptDiv = document.createElement('div');
    
        // --- INIT LOGO --- //
        const h1 = document.createElement('h1');
        h1.textContent = 'Receipt';

        // --- INIT openButton --- //
        const openButton = document.createElement('button');
        const openIcon = document.createElement('i');
        openIcon.classList = `fa-solid fa-chevron-${z}`;
        openIcon.dataset[x] = y;
        openButton.append(openIcon);
        openButton.id = 'open-btn';
    
        receiptDiv.id = 'receipt-controls';
        receiptDiv.append(h1, openButton);
        
        // --- RETURN ARRAY OF OBJECT HTMLs --- //
        return receiptDiv;
    
    }








    const ORDER_DATA = USER_DATA

    // in flat map use Generate div

    const ITEM_MAP = () => {
        return USER_DATA.flatMap(categories => {
            return categories.menus.flatMap(restaurant => {
                return restaurant.items.filter(item => item.quantity > 0).flatMap(item => {
                    return generateReceiptDiv(item);
                })
    
            })
        })
    }


    const ITEM_PRICE = () => {
        return USER_DATA.flatMap(categories => {
            return categories.menus.flatMap(restaurant => {
                return restaurant.items.filter(item => item.quantity > 0).flatMap(item => {
                        return item.price * item.quantity;               
                    })
            })
        })
    }



    
    const ORDER_TOTAL = () => {
        const total = ITEM_PRICE() || ['0'];
        if (total.length) {
            return total.reduce((x, y) => x + y);
        }
    }



    const itemsDiv = document.createElement('div');
    itemsDiv.id = 'menu-items';

    const itemDivs = ITEM_MAP()

    iterateElementsArray(itemsDiv, ITEM_MAP())



    const payBtn = document.createElement('button');
    payBtn.id = 'pay-btn';
    payBtn.textContent = 'checkout';
    payBtn.dataset['action'] = 'checkout';
    
    const totals = document.createElement('div');
    const totalStrong = document.createElement('strong');
    const totalNumberSpan = document.createElement('span');
    totalNumberSpan.id = 'total'

    totalStrong.textContent = 'TOTAL';
    totalNumberSpan.textContent = `£${ORDER_TOTAL() || '0'}`

    totals.append(totalStrong, totalNumberSpan)
    totals.id = 'totals'

    const paymentTotalsDiv = document.createElement('div');
    paymentTotalsDiv.id = 'payment-totals';


    paymentTotalsDiv.append(totals, payBtn)

    const innerReceiptDiv = document.createElement('div');

    const receiptControls = CREATE_RECEIPT('state', 'open', 'down');

    innerReceiptDiv.append(receiptControls, itemsDiv, paymentTotalsDiv);
    innerReceiptDiv.id = 'inner-receipt';


    const CLOSE_MENU = (e) => {
        if (e.target.dataset.state === 'open') {
            const innerReceipt = RECEIPT_VIEW.lastElementChild
            innerReceipt.remove();
            RECEIPT_VIEW.classList.remove('toggle-receipt');
            RECEIPT_VIEW.innerHTML = CREATE_RECEIPT('action', 'receipt', 'up').outerHTML;
            document.removeEventListener('click', CLOSE_MENU)

        };
    };



    document.addEventListener('click', CLOSE_MENU);

    document.addEventListener('click', (e)=>{
        if (e.target.dataset.action === 'checkout')
        RECEIPT_VIEW.innerHTML = Payment(RECEIPT_VIEW);
    });



    return innerReceiptDiv.outerHTML;
}