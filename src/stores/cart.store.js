import { defineStore } from 'pinia';

import { router } from '@/router';

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: JSON.parse(localStorage.getItem('cart'))
            ? JSON.parse(localStorage.getItem('cart'))
            : {
                "userId": "",
                "products": [
                    {
                        "_id": "",
                        "name": "",
                        "type": "",
                        "price": 0,
                        "image": "",
                        "amount": 0,
                    }
                ]
            }
    }),
    actions: {
        async addCart(data) {
            try {
                const { userId, product } = data;

                // update pinia state
                this.$state.cart.userId = userId;

                // flag for checking exist product in cart
                let isExistProductInCart = false;

                this.$state.cart.products.map((item, index) => {
                    item = JSON.parse(JSON.stringify(item));
                    if (product?._id === item?._id) {
                        // update amount if product exists in cart
                        this.$state.cart.products[index].amount = this.$state.cart.products[index].amount + product?.amount;
                        isExistProductInCart = true;
                    }
                });
                // if not exist product in cart
                if (isExistProductInCart === false) {
                    this.$state.cart.products.push(product);
                }

                // store user cart in local storage
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } catch (error) {
                console.log(error);
            }
        },
        getCart() {
            return JSON.parse(localStorage.getItem('cart'));
        },
        removeProduct(productId) {
            // find product index in state array
            const productIndex = this.$state.cart.products.findIndex(item => item._id === productId);
            // remove this product from the array
            this.$state.cart.products.splice(productIndex, 1);
            // update local storage
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        increaseAmount(data) {
            try {
                const { userId, product } = data;

                // update pinia state
                this.$state.cart.userId = userId;
                this.$state.cart.products.map((item, index) => {
                    item = JSON.parse(JSON.stringify(item));
                    if (product?._id === item?._id) {
                        // update amount if product exists in cart
                        if (this.$state.cart.products[index].amount < 10) {
                            this.$state.cart.products[index].amount++;
                        } else {
                            this.$state.cart.products[index].amount = 10;
                        }
                    }
                });

                // store user cart in local storage
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } catch (error) {
                console.log(error);
            }
        },
        decreaseAmount(data) {
            try {
                const { userId, product } = data;

                // update pinia state
                this.$state.cart.userId = userId;
                this.$state.cart.products.map((item, index) => {
                    item = JSON.parse(JSON.stringify(item));
                    if (product?._id === item?._id) {
                        // update amount if product exists in cart
                        if (this.$state.cart.products[index].amount > 1) {
                            this.$state.cart.products[index].amount--;
                        } else {
                            this.$state.cart.products[index].amount = 1;
                        }
                    }
                });

                // store user cart in local storage
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } catch (error) {
                console.log(error);
            }
        },
        getTotalAmount() {
            let totalAmount = 0;
            this.$state.cart.products.map((item, index) => {
                totalAmount += this.$state.cart.products[index].amount;
            });
            return totalAmount;
        },
        getTotalPrice() {
            let totalPrice = 0;
            this.$state.cart.products.map((item, index) => {
                totalPrice += this.$state.cart.products[index].amount * this.$state.cart.products[index].price;
            });
            return totalPrice;
        },
        clearAllCarts() {
            localStorage.removeItem('cart');
        }
    },
    persist: true,
});