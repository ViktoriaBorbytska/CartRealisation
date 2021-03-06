/********************************* Global variables *********************************/
var itemArray = [];
var productsCart = [];
var startPrice = 30;
var startKkals = 630;
var startContents = 'Crispy dough, classic sauce, cheese';

/********************************* Object constructors *********************************/
function Item (name, content, kkals, price, image) {
    this.name = name;
    this.content = content;
    this.kkals = kkals + ' kkals';
    this.price = price + ' uah';
    this.image = image;
}

function ItemCart(name, price, qty) {
    this.name = name;
    this.price = price;
    this.qty = qty;
}

/********************************* Data for objects *********************************/
var tableHeaders = ['Item', 'Price', 'Quantity', 'Total', ''];
var namesArray = ["Pepperoni",
                  "Texas",
                  "Pepperoni Blues",
                  "Hawaiian",
                  "BBQ",
                  "Veggie Feast",
                  "Country",
                  "Provence",
                  "Paparazzi",
                  "Bavarian",
                  "Carbonara",
                  "Toskana",
                  "Munich DeLUX",
                  "Spicy",
                  "BBQ DeLUX",
                  "Florence"];

var contentsArray = ["mozarella, peperoni, tomatoes, BBQ sauce",
                     "corn, mozarella, onion, mushrooms, bavarian sausages, BBQ sauce",
                     "mozarella, bergader blue, peperoni, al'fredo sauce",
                     "chicken, mozarella, pineapple, firm sauce",
                     "chicken, mozarella, onion, bacon, mushrooms, BBQ sauce",
                     "green pepper, mozarella, olives, onion, mushrooms, tomatoes, firm sauce",
                     "mozarella, onion, bacon, ham, mushrooms, pickled cucumbers, garlic sauce",
                     "mozarella, bergader blue, ham, peperoni, tomatoes, al'fredo sauce",
                     "mozarella, olives, peperoni, tomatoes, al'fredo sauce",
                     "mozarella, parmesan, bavarian sausages, BBQ sauce",
                     "mozarella, onion, bacon, ham, mushrooms, al'fredo sauce",
                     "chicken, feta, mozarella, cherry tomatoes, al'fredo sauce, spinach",
                     "mozarella, ham, mustard, bavarian sausages, tomatoes, white sausages, BBQ sauce",
                     "jalapeno, mozarella, bacon, peperoni, tomatoes, firm sauce",
                     "green pepper, meatballs, mozarella, onion, parmesan, mushrooms, peperoni, BBQ sauce",
                     "feta, green pepper, mozarella, olives, mushrooms, tomatoes, al'fredo sauce, spinach"];

var ingredients = [{name: "mozarella", price: 46, kkals: 123},
    {name: "peperoni", price: 51, kkals: 135},
    {name: "tomatoes", price: 3, kkals: 12},
    {name: "BBQ sauce", price: 17, kkals: 15},
    {name: "corn", price: 4, kkals: 36},
    {name: "onion", price: 1, kkals: 13},
    {name: "mushrooms", price: 5, kkals: 16},
    {name: "bavarian sausages", price: 18, kkals: 165},
    {name: "bergader blue", price: 19, kkals: 133},
    {name: "al'fredo sauce", price: 14, kkals: 14},
    {name: "chicken", price: 26, kkals: 49},
    {name: "pineapple", price: 13, kkals: 20},
    {name: "firm sauce", price: 20, kkals: 16},
    {name: "bacon", price: 47, kkals: 220},
    {name: "green pepper", price: 3, kkals: 4},
    {name: "olives", price: 19, kkals: 11},
    {name: "ham", price: 53, kkals: 128},
    {name: "pickled cucumbers", price: 12, kkals: 8},
    {name: "garlic sauce", price: 12, kkals: 15},
    {name: "parmesan", price: 23, kkals: 74},
    {name: "feta", price: 18, kkals: 44},
    {name: "spinach", price: 4, kkals: 6},
    {name: "mustard", price: 11, kkals: 13},
    {name: "white sausages", price: 16, kkals: 143},
    {name: "jalapeno", price: 10, kkals: 5},
    {name: "meatballs", price: 30, kkals: 250}];

var imagesArray = ["images/pepperoni.jpg",
                   "images/texas.jpg",
                   "images/pepperoni_blues.jpg",
                   "images/hawaiian.jpg",
                   "images/bbq.jpg",
                   "images/veggie_feast.jpg",
                   "images/country.jpg",
                   "images/provence.jpg",
                   "images/paparazzi.jpg",
                   "images/bavarian.jpg",
                   "images/carbonara.jpg",
                   "images/toskana.jpg",
                   "images/munich_delux.jpg",
                   "images/spicy.jpg",
                   "images/bbq_delux.jpg",
                   "images/florence.jpg"];

var additionalArray = [
    {
        value: 'parmesan',
        name: 'Parmesan',
        kkals: 74,
        price: 23
    },
    {
        value: 'sauce',
        name: 'Double sauce',
        kkals: 15,
        price: 20
    },
    {
        value: 'spicy',
        name: 'Spicy sauce',
        kkals: 30,
        price: 12
    }];

/********************************* Objects initialization *********************************/
for (var i = 0; i < namesArray.length; i++) {
    var infoItem = infoCalc(contentsArray[i]);
    var newItem = new Item(namesArray[i], startContents + ', ' + contentsArray[i], infoItem[1], infoItem[0], imagesArray[i]);
    itemArray.push(newItem);
}
if (localStorage.productsCart === undefined) {
    saveCart();
    saveGoods();
}

function infoCalc(itemDescr) {
    var itemPrice = 0;
    var itemKkals = 0;
    for (var i = 0; i < ingredients.length; i++) {
        var regex = new RegExp('' + ingredients[i].name, "i");
        if (itemDescr.match(regex)) {
            itemPrice += ingredients[i].price;
            itemKkals += ingredients[i].kkals;
        }
    }
    return [itemPrice + startPrice, itemKkals + startKkals];
}

function contentsConstructor() {
    var ingredientsList = document.querySelectorAll('input[type=checkbox]');
    var itemContents = '';

    for (var k = 0; k < ingredientsList.length; k++) {
        if (ingredientsList[k].checked) {
            itemContents += ingredientsList[k].value + ', ';
        }
    }
    return normalizeString(itemContents);
}

/********************************* Dynamic page content generation *********************************/
var body = document.getElementsByClassName("super__container")[0];
var menu = document.getElementsByClassName("menu__container")[0];
var displayType = document.createElement('div');
menu.appendChild(displayType);

var blockView = inputCreate('submit', 'Block view', displayType);

var listView = inputCreate('submit', 'List view', displayType);

var createNew = inputCreate('submit', 'Create new', displayType);

var sortings = document.createElement('div');
menu.appendChild(sortings);

var dropdown1 = document.createElement("select");
optionCreate(dropdown1, 'Sort by: ', true);
optionCreate(dropdown1, 'name', false, true, 'name');
optionCreate(dropdown1, 'price', false, true, 'price');
sortings.appendChild(dropdown1);

var dropdown2 = document.createElement("select");
optionCreate(dropdown2, 'Filter by: ', true);
for (var i = 0; i < ingredients.length; i++) {
    optionCreate(dropdown2, ingredients[i].name, false, true, ingredients[i].name);
}
sortings.appendChild(dropdown2);

dropdown1.disabled = true;
dropdown2.disabled = true;

var cart = containerCreate(menu, 'div', 'cart__holder', false);
var cartHldr = containerCreate(cart, 'div', 'logo__holder', false);
imageCreate(cartHldr, 'images/cart.png');
var cartCountHldr = containerCreate(cart, 'div', 'cart__counter', false);
containerCreate(cart, 'div', '', true, 'Cart');
cartCounterUpdate();

/********************************* Update functions *********************************/
function cartCounterUpdate() {
    existenceCheck(cart, '.cart__counter > div', cartCountHldr);
    var counter = 0;
    productsCart = JSON.parse(localStorage.productsCart);
    for (var i in productsCart) {
        counter += productsCart[i].qty;
    }
    containerCreate(cartCountHldr, 'div', '', true, counter);
}

function tileUpdate(holder, source) {
    var menuItem = containerCreate(holder, 'div', 'menu__block', false);
    menuItem.classList.add('demo');

    textCreate('h3', source.name, menuItem);
    imageCreate(menuItem, source.image);
    containerCreate(menuItem, 'p', '', true, source.content);
    displayInfo(source.price, source.kkals, menuItem);
}

/********************************* Menu buttons events *********************************/
blockView.addEventListener("click", function() {
    dropdown1.disabled = true;
    dropdown2.disabled = false;
    displayMenuBlock();
    var container = document.getElementsByClassName('menu__wrapper')[0];
    container.onclick = function(e) {
        var target = e.target;
        while (target !== this) {
            if (target.className === 'corner') {
                target.parentElement.parentElement.toggleClassName('flip');
            } else if (target.tagName === 'INPUT' && target.hasAttribute('id')) {
                var tile = target.parentElement.parentElement;
                var priceDef = parseInt(tile.querySelector('.price').textContent, 10);
                var kkalsDef = parseInt(tile.querySelector('.kkals').textContent, 10);
                for (var k = 0; k < additionalArray.length; k++) {
                    if (target.value === additionalArray[k].value) {
                        if (target.checked) {
                            priceDef += additionalArray[k].price;
                            kkalsDef += additionalArray[k].kkals;
                        } else {
                            priceDef -= additionalArray[k].price;
                            kkalsDef -= additionalArray[k].kkals;
                        }
                        priceDef += ' uah';
                        kkalsDef += ' kkals';
                        displayInfo(priceDef, kkalsDef, target.parentElement.parentElement);
                    }
                }
            } else if (target.tagName === 'INPUT') {
                var tile = target.parentElement;
                addToCart(tile);
                cartCounterUpdate();
            }
            target = target.parentNode;
        }
    };
},false);

listView.addEventListener("click", function() {
    dropdown1.disabled = false;
    dropdown2.disabled = true;
    itemArray = JSON.parse(localStorage.itemArray);
    displayMenuList(itemArray);
},false);

createNew.addEventListener("click", function() {
    dropdown1.disabled = true;
    dropdown2.disabled = true;
    displayNewItemAddition();
}, false);

dropdown1.addEventListener('change', function () {
    var itemArrayCopy = itemArray.concat();
    if (this.value === 'price') {
        sortByPrice(itemArrayCopy);
    } else if (this.value === 'name') {
        sortByName(itemArrayCopy);
    }
    displayMenuList(itemArrayCopy);
}, false);

dropdown2.addEventListener('change', function () {
    var regex = new RegExp('' + this.value, "i");
    var descriptions = document.querySelectorAll('p');
    for (var i = 0; i < descriptions.length; i++) {
        descriptions[i].parentElement.parentElement.style.display = 'block';
        if (!descriptions[i].textContent.match(regex)) {
            descriptions[i].parentElement.parentElement.style.display = 'none';
        }
    }
}, false);

cart.addEventListener("click", function() {
    dropdown1.disabled = true;
    dropdown2.disabled = true;
    existenceCheck(document, '.menu__wrapper', body);
    var holder = menuWrapperCreate();
    textCreate('h2', 'Cart', holder);
    showCart();
}, false);

/********************************* Sortings *********************************/
function sortByPrice(goods) {
    goods.sort(function(a,b){
        var regex = /([0-9 ]+).*/;
        var matchA = regex.exec(a.price)[1].replace(/ /g, '');
        var matchB = regex.exec(b.price)[1].replace(/ /g, '');
        return matchA - matchB;
    })
}

function sortByName(goods) {
    goods.sort(function(a,b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
    })
}

/********************************* Elements creation functions *********************************/
function menuWrapperCreate() {
    var menuWrapper = document.createElement("div");
    menuWrapper.classList.add('menu__wrapper');
    menuWrapper.classList.add('clearfix');
    body.appendChild(menuWrapper);
    return menuWrapper;
}

function textCreate(titleType, title, parent) {
    var element = document.createElement(titleType);
    var elementText = document.createTextNode(title);
    element.appendChild(elementText);
    parent.appendChild(element);
    return element;
}

function imageCreate(parent, source) {
    var image = document.createElement('img');
    image.setAttribute('src', source);
    parent.appendChild(image);
    return image;
}

function inputCreate(inputType, attrValue, holder) {
    var inputName = document.createElement('input');
    inputName.setAttribute('type', inputType);
    inputName.setAttribute('value', attrValue);
    holder.appendChild(inputName);
    return inputName;
}

function optionCreate(dropdown, value, isActive, isAttrSet, attrValue) {
    var dropdownOption = document.createElement('option');
    if (isAttrSet) {
        dropdownOption.setAttribute('value', attrValue);
    }
    dropdownOption.selected = isActive;
    dropdownOption.disabled = isActive;
    var optionText = document.createTextNode(value);
    dropdownOption.appendChild(optionText);
    dropdown.appendChild(dropdownOption);
}

function containerCreate(parent, elemType, elemClass, isTextNeeded, elemText) {
    var menuItem = document.createElement(elemType);
    if (elemClass !== '') {
        menuItem.classList.add(elemClass);
    }
    if (isTextNeeded) {
        var menuItemText = document.createTextNode(elemText);
        menuItem.appendChild(menuItemText);
    }
    parent.appendChild(menuItem);
    return menuItem;
}

function existenceCheck(selectionObject, selectorRule, parent) {
    var element = selectionObject.querySelector(selectorRule);
    if ( element !== null) {
        parent.removeChild(element);
    }
}

/********************************* Display functions *********************************/
function displayMenuBlock() {
    existenceCheck (document, '.menu__wrapper', body);
    var holder = menuWrapperCreate();
    textCreate('h2', 'Menu', holder);
    itemArray = JSON.parse(localStorage.itemArray);
    for (var i = 0; i < itemArray.length; i++) {
        var menuItem = containerCreate(holder, 'div', 'menu__block', '', false);
        var figure = containerCreate(menuItem, 'figure','', false);

        textCreate('h3', itemArray[i].name, figure);
        textCreate('p', itemArray[i].content, figure);

        for (var k = 0; k < additionalArray.length; k++) {
            var additionalHolder = containerCreate(figure, 'div', 'additional__holder', false);

            var additionalIngr = inputCreate ('checkbox', additionalArray[k].value, additionalHolder);
            additionalIngr.setAttribute('id', additionalArray[k].value + '' + i);
            var additionalIngrLabel = document.createElement('label');
            additionalIngrLabel.setAttribute('for', additionalArray[k].value + '' + i);
            var additionalIngrText = document.createTextNode(additionalArray[k].name);
            additionalIngrLabel.appendChild(additionalIngrText);
            additionalHolder.appendChild(additionalIngrLabel);
        }

        displayInfo(itemArray[i].price, itemArray[i].kkals, figure);
        inputCreate ('submit', 'Add to cart', figure);
        containerCreate(figure, 'div', 'corner', false);
        var figureBack = containerCreate(menuItem, 'figure', 'back__side', false);
        imageCreate(figureBack, itemArray[i].image);
        containerCreate(figureBack, 'div', 'corner', false);
    }
}

function displayInfo(price, kkals, figure) {
    existenceCheck (figure, 'div.info__holder', figure);
    var infoHolder = containerCreate(figure, 'div', 'info__holder', false);
    containerCreate(infoHolder, 'span', 'kkals', true, kkals);
    containerCreate(infoHolder, 'span', 'price', true, price);
}

function displayMenuList(source) {
    existenceCheck (document, '.menu__wrapper', body);
    var holder = menuWrapperCreate();
    textCreate('h2', 'List of our finest pizzas', holder);

    for (var i = 0; i < source.length; i++) {
        var menuItem = containerCreate(holder, 'div', 'menu__list', false);
        var menuItemImg = imageCreate(menuItem, source[i].image);
        menuItemImg.classList.add('img__list');
        textCreate('h3', source[i].name, menuItem);
        containerCreate(menuItem, 'div', 'price', true, source[i].price);
    }
}

function displayNewItemAddition() {
    existenceCheck (document, '.menu__wrapper', body);
    var holder = menuWrapperCreate();
    textCreate('h2', 'Create your own pizza!', holder);

    var creationPart = containerCreate(holder, 'div', 'item__creation', false);
    var nameWrapper = containerCreate(creationPart, 'div', 'input__wrapper', false);

    var nameInput = inputCreate ('text', '', nameWrapper);
    nameInput.setAttribute('placeholder', 'Your pizza name');
    nameInput.setAttribute('required', 'true');

    for (var k = 0; k < ingredients.length; k++) {

        var ingredientsHolder = containerCreate(creationPart, 'div', 'ingredients__holder', false);
        var ingr = inputCreate ('checkbox', ingredients[k].name, ingredientsHolder);
        ingr.setAttribute('id', ingredients[k].name);
        var ingrLabel = containerCreate(ingredientsHolder, 'label', '', true, ingredients[k].name);
        ingrLabel.setAttribute('for', ingredients[k].name);
    }

    var saveBtn = inputCreate ('submit', 'Save changes', creationPart);
    saveBtn.classList.add('save');
    itemArray = JSON.parse(localStorage.itemArray);
    var displayPart = containerCreate(holder, 'div', 'item__display', false);
    tileUpdate(displayPart, itemArray[itemArray.length - 1]);

    var container = document.getElementsByClassName('menu__wrapper')[0];
    container.onclick = function(e) {
        var target = e.target;
        while (target !== this) {
            if (target.tagName === 'INPUT' && target.hasClassName('save')) {
                var itemName = creationPart.querySelector('input[type=text]');
                itemName.style.borderColor = '#808080';
                if (itemName.value === '') {
                    itemName.style.borderColor = 'red';
                    alert('You must set the name first!');
                } else {
                    var itemContents = contentsConstructor();
                    var infoItem = infoCalc(itemContents);
                    var newItem = new Item(toUpper(itemName.value), startContents + ', ' + itemContents, infoItem[1], infoItem[0], 'images/default.jpg');
                    itemArray.push(newItem);
                    saveGoods();
                    alert('Your pizza has been successfully added!');
                }
            } else if (target.tagName === 'INPUT' && target.hasAttribute('id')) {
                var tile = displayPart.querySelector('.menu__block');
                var itemName = creationPart.querySelector('input[type=text]');
                itemName.style.borderColor = '#808080';
                if (itemName.value === '') {
                    itemName.style.borderColor = 'red';
                    alert('You must set the name first!');
                } else {
                    if (tile != null) {
                        displayPart.removeChild(tile);
                    }
                    var itemContents = contentsConstructor();
                    var infoItem = infoCalc(itemContents);
                    var newItem = new Item(toUpper(itemName.value), startContents + ', ' + itemContents, infoItem[1], infoItem[0], 'images/default.jpg');
                    tileUpdate(displayPart, newItem);
                }
            }
            target = target.parentNode;
        }
    };
}

/********************************* Additional functions *********************************/
function normalizeString(string) {
    return string.substring(0, string.length-2);
}

function toUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

Element.prototype.hasClassName = function (a) {
    return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function (a) {
    if (!this.hasClassName(a)) {
        this.className = [this.className, a].join(" ");
    }
};

Element.prototype.removeClassName = function (b) {
    if (this.hasClassName(b)) {
        var a = this.className;
        this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
    }
};

Element.prototype.toggleClassName = function (a) {
    this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
};

/********************************* Cart functions *********************************/
function addToCart(source) {
    var priceToCart = source.querySelector('.price').textContent;
    var nameToCart = source.querySelector('h3').textContent;
    var qtyToCart = 1;
    productsCart = JSON.parse(localStorage.productsCart);
    for (var i in productsCart) {
        if (productsCart[i].name === nameToCart)
        {
            productsCart[i].qty += qtyToCart;
            saveCart();
            return;
        }
    }
    var newItemCart = new ItemCart(nameToCart, priceToCart, qtyToCart);
    productsCart.push(newItemCart);
    saveCart();
}

function deleteItem(index) {
    productsCart = JSON.parse(localStorage.productsCart);
    for (var i in productsCart) {
        if (i === index) {
            if (productsCart[i].qty !== 1) {
                productsCart[i].qty--;
            } else {
                productsCart.splice(index, 1);
            }
        }
    }
    saveCart();
}

function cartClear() {
    productsCart = JSON.parse(localStorage.productsCart);
    productsCart.splice(0, productsCart.length);
    saveCart();
}

function saveCart() {
    if ( window.localStorage) {
        localStorage.productsCart = JSON.stringify(productsCart);
    }
}

function saveGoods() {
    if ( window.localStorage) {
        localStorage.itemArray = JSON.stringify(itemArray);
    }
}

function showCart() {
    var menuWrapper = document.querySelector('.menu__wrapper');
    existenceCheck (document, '.cart__wrapper', menuWrapper);
    var cartHolder = containerCreate(menuWrapper,'div', 'cart__wrapper', false);

    if (productsCart.length === 0) {
        emptyCartMessage(cartHolder);
        return;
    }

    var cartTable = document.createElement('table');
    var cartTableHead = document.createElement('thead');
    var cartTableBody = document.createElement('tbody');
    cartTable.appendChild(cartTableHead);
    cartTable.appendChild(cartTableBody);
    cartHolder.appendChild(cartTable);

    rowCreate(cartTableHead, 'th', tableHeaders, true);

    var totalPrice = 0;
    for (var i in productsCart) {
        var item = productsCart[i];
        rowCreate(cartTableBody, 'td', item, false, i);
        totalPrice += parseInt(item.price) * item.qty;
    }

    containerCreate(cartHolder,'div', 'total', true, 'Total: ' + totalPrice + ' uah');

    var buyBtn = inputCreate ('submit', 'Buy', cartHolder);
    buyBtn.classList.add('buy__btn');

    var container = document.getElementsByClassName('menu__wrapper')[0];
    var innerContainer = document.getElementsByClassName('cart__wrapper')[0];
    container.onclick = function(e) {
        var target = e.target;
        while (target !== innerContainer) {
            if (target.tagName === 'INPUT' && target.hasClassName('delete__btn')) {
                deleteItem(target.getAttribute('id'));
                cartCounterUpdate();
                showCart();

            } else if (target.tagName === 'INPUT' && target.hasClassName('buy__btn')) {
                cartClear();
                alert('Your request has been sent. Wait for an administrator call to confirm your order.');
                cartCounterUpdate();
                showCart();
            }
            target = target.parentNode;
        }

    };
}

function emptyCartMessage(parent) {
    containerCreate(parent, 'div', 'empty__message', true, 'Oops, seems like your cart is empty!');
}

function rowCreate(parent, dataType, dataSource, isHeader, index) {
    var row = document.createElement('tr');
    parent.appendChild(row);
    if (isHeader) {
        for (var k = 0; k < dataSource.length; k++) {
            tdCreate(dataType, dataSource[k], row);
        }
    } else {
        tdCreate(dataType, dataSource.name, row);
        tdCreate(dataType, dataSource.price, row);
        tdCreate(dataType, dataSource.qty, row);
        tdCreate(dataType, parseInt(dataSource.price) * dataSource.qty + ' uah', row);
        var tData = document.createElement(dataType);
        var deleteBtn = inputCreate('submit', 'Delete', tData);
        deleteBtn.setAttribute('id', index);
        deleteBtn.classList.add('delete__btn');
        row.appendChild(tData);
    }
}

function tdCreate(dataType, value, parent) {
    var tData = document.createElement(dataType);
    var tDataText = document.createTextNode(value);
    tData.appendChild(tDataText);
    parent.appendChild(tData);
}