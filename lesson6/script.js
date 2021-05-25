'use strict';

const cartItem = {
    render(good) {
        return `<div class='cartGood'>
        <div><b>${good.name}</b></div>
        <div>price per piece: ${good.price} amount: ${good.amount}</div>
        <div>total: ${good.price * good.amount}</div>
    </div>`;
    }
}

const catalogItem = {
    render(good) {
        return `<div class='catalogGood'>
        <div class='hidden goodId'>${good.id}</div>
        <div><b>${good.name}</b></div>
        <div>price: ${good.price}</div>
        <div>available amount: ${good.amount}</div>
        <div class="buyButton">
            Add to cart
        </div>
    </div>`;
    }
}

const cart = {

    cartClass: null,
    clearButton: document.querySelector('.clearButton'),

    goodsList: [],

    init() {
        this.cartClass = document.querySelector('.cart');

        this.renderCart(this.cartClass);

        this.initEventHandlers();

    },

    initEventHandlers() {
        this.clearButton.addEventListener('click', (event => {
            this.clearCart();
        }))
    },

    clearCart() {
        this.goodsList = [];
        this.cartClass.textContent = '';
        this.init();
    },

    renderCart(cart) {
        cart.insertAdjacentHTML('afterbegin', `<div>${this.getStatus()}</div>`)
        if (this.goodsList.length) {
            for (const good in this.goodsList) {
                cart.insertAdjacentHTML('beforeend', cartItem.render(this.goodsList[good]));
            };
            this.clearButton.classList.toggle('hidden', false);
        } else {
            this.clearButton.classList.toggle('hidden', true);
        };
    },

    getSum() {
        let sum = 0;
        for (const good in this.goodsList) {
            sum += this.goodsList[good].price * this.goodsList[good].amount;
        };
        return sum;
    },

    getAmount() {
        let amount = 0;
        for (const good in this.goodsList) {
            amount += this.goodsList[good].amount;
        };
        return amount;
    },

    getStatus() {
        if (this.goodsList.length == 0) {
            return 'Cart is empty';
        } else {
            return `In cart ${this.getAmount()} good(s), sum: ${this.getSum()} rub`;
        }
    },

    appendGood(good) {
        const id = this.goodsList.findIndex(x => x.id === good.id)
        if (id >= 0) {
            this.goodsList[id].amount++;
        } else {
            this.goodsList.push(good);
        }
        this.cartClass.textContent = '';
        this.renderCart(this.cartClass);
    }
};




const product = {

    catalog: null,
    buyButton: null,
    cartObject: cart,
    goodsList: [
        {
            id: 1,
            name: 'logitech mouse',
            price: 999,
            amount: 20
        },
        {
            id: 2,
            name: 'logitech keyboard',
            price: 499,
            amount: 15
        },
        {
            id: 3,
            name: 'dell notebook',
            price: 49999,
            amount: 3
        },
        {
            id: 4,
            name: 'razor keyboard',
            amount: 3,
            price: 2500

        }
    ],

    init() {
        this.catalog = document.getElementById('catalog');

        this.renderCatalog(this.catalog);

        this.buyButton = document.getElementsByClassName('.buyButton');

        this.initEventHandlers();


    },

    initEventHandlers() {
        this.catalog.addEventListener('click', (event) => {
            this.addToCart(event);
        })
    },

    addToCart(event) {
        if (!this.isCorrectAddToCartClick(event)) return;
        const id = parseInt(event.target.parentElement.querySelector('.goodId').textContent);
        const good = Object.assign({}, this.goodsList.find(x => x.id === id))
        good.amount = 1;
        cart.appendGood(good);
    },

    isCorrectAddToCartClick(event) {
        if (event.target.className === 'buyButton') return true;
    },

    renderCatalog(catalog) {
        for (const good in this.goodsList) {
            catalog.insertAdjacentHTML('beforeend', catalogItem.render(this.goodsList[good]));
        }
    }
}


product.init();
cart.init();