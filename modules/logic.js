const LOGIC = {
    addDataset: (element, dataAttributes) => {
                    // Check if element exists
                    if (!element) { throw new Error('Element is required'); }
                    // Ensure dataAttributes is an object
                    if (typeof dataAttributes !== 'object' || dataAttributes === null) {
                        throw new Error('Data attributes must be an object');
                    }
                    // Iterate through the data attributes
                    Object.entries(dataAttributes).forEach(([key, value]) => {
                        // Convert camelCase to kebab-case for data attribute names
                        const attributeName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                        // Set the data attribute
                        element.dataset[key] = value;
                    });
                    return element;
                },
    generateDiv: (elements) => {

                    const {item, price, quantity} = elements;

                    const itemDiv = document.createElement('div');
                    LOGIC.addDataset(itemDiv, elements);

                    const itemNameDiv = document.createElement('div');
                    itemNameDiv.classList.add('menu-item-info');
                    const quantityDiv = document.createElement('div');
                    quantityDiv.classList.add('menu-item-quantity');
                    
                    const subtractBtn = document.createElement('button');
                    subtractBtn.dataset['action'] = 'subtract';
                    subtractBtn.dataset['item'] = item;

                    const additionBtn = document.createElement('button');
                    additionBtn.dataset['action'] = 'addition'
                    additionBtn.dataset['item'] = item;

                    const itemText = document.createElement('strong');
                    const priceText = document.createElement('span');
                    priceText.textContent = '£';
                    const quantityText = document.createElement('span');
                    quantityText.classList.add('quantity');

                    if (item) itemText.textContent = item;
                    if (price) priceText.textContent += price;
                    quantityText.textContent = quantity;

                    subtractBtn.textContent = '-';
                    additionBtn.textContent = '+';

                    itemNameDiv.append(itemText, priceText)
                    quantityDiv.append(subtractBtn, quantityText, additionBtn)

                    itemDiv.append(itemNameDiv, quantityDiv);
                    itemDiv.classList.add('menu-item');
                    return itemDiv;
                },
    generateReceiptDiv: (elements) => {

                    const {item, price, quantity} = elements;

                    const itemDiv = document.createElement('div');
                    LOGIC.addDataset(itemDiv, elements);

                    const itemNameDiv = document.createElement('div');
                    itemNameDiv.classList.add('menu-item-info-receipt');
                    const quantityDiv = document.createElement('div');
                    quantityDiv.classList.add('menu-item-quantity');
                    


                    const itemText = document.createElement('strong');
                    const priceText = document.createElement('span');
                    priceText.textContent = '£';
                    const quantityText = document.createElement('span');
                    quantityText.classList.add('quantity');

                    if (item) itemText.textContent = item;
                    if (price) priceText.textContent += price;
                    quantityText.textContent = quantity;


                    itemNameDiv.append(itemText, priceText)
                    

                    itemDiv.append(itemNameDiv);
                    itemDiv.classList.add('menu-item');
                    return itemDiv;
                },
    generateIcon: (elements) => {
                    const {name, img} = elements;
                    const image = document.createElement('img');
                    const text = document.createElement('span')
                    const button = document.createElement('button');
                    if (img) image.src = img;
                    if (name) text.textContent = name;
                    button.append(image, text)
                    const criteria = {
                        action: "menu",
                        restaurant: name
                    }
                    button.classList = 'cat-btn';
                    LOGIC.addDataset(button, criteria);
                    return button;
                },
    iterateElementsArray: (location, data) => {
        data.forEach(element => {
            location.append(element);
        });
    }
    
}

export default LOGIC;

// // function Order(item, price) {
// //     this.orderData = new Array();
// //     this.updateOrder = function(item, price) {
// //         this.orderData.push([item, price])
// //     }
// //     this.removeOrder = function(item, price) {
// //         this.orderData.slice([item, price])
// //     }
// // }

// const order = new Order(item, price);

// order.updateOrder(item, price);
// order.removeOrder(item, price)

// order.orderData



// const orderArray = new Array();
// const updateOrder = (arr, item, price) => {
//     arr.push(new Order(item, price));
// };
// updateOrder(order, item, price);

// const removeOrder = (arr, item, price) => {
//     const filteredObject = arr.filter(order => {
//         return Object.entries(new Order(item, price)).every(([key, value]) => order[key] === value)
//     })
//     arr.slice(filteredObject);
//     // filter object from array
//     // remove object from array
// }

// removeOrder(order, item, price)


// function updateReceipt() {
//     if (receipt === 'open') return;

// }



// class Order {
//     constructor(item, price) {
//         this.item = item;
//         this.price = price;
//     };
// }




// const ul = document.createElement('ul')

// const listItems = items.map(item=>{
//     const listItem = document.createElement('li')
//     const divItem = document.createElement('div')
//     divItem.appendChild([item.name, item.price])
//     listItem.append(divItem)
// });
// ul.appendChild(listItems)








// function generateDiv(elements) {
//     const {img, item, price} = elements;
//     const itemDiv = document.createElement('div');
//     const image = document.createElement('img');
//     const button = document.createElement('button');
//     itemDiv.classList.add('item-div');
//     const data = [image, item, price, button];
//     addDataset(itemDiv, elements);
//     itemDiv.appendChild(data)
// };



// class Generator {
//     generateDiv() {
        
//     }
// }
