import React, {PureComponent} from 'react';
import styles from './ProductCard.module.css';
import {Link} from "react-router-dom";
import DataContext from "../../Context/DataContext";
import ProductImage from "./ProductImage/ProductImage";

export class ProductCard extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            price_amount: 0,
            price_label: '',
            price_symbol: '',
            isFloatingButtonVisible: false
        }
    }

    getPrice = () => {
        const price = this.props.details.prices.find(el => el.currency.symbol === this.context.currency.symbol);
        const {amount} = price;
        const {label, symbol} = price.currency;
        this.setState({
            price_amount: amount,
            price_label: label,
            price_symbol: symbol
        })
    }

    /* TODO: Do not allow adding to cart products with no attributes selected (if the case) */
    addToCart = (details) => {
        try {
            const productAlreadyInCart = this.context.productsInCart.find(({ id }) => id === details.id);
            const {id, brand, name, gallery, prices, attributes} = details;

            if (!attributes.length) {
                /* if product already in cart, increase its quantity */
                if (productAlreadyInCart) {
                    const updatedCart = this.context.productsInCart.map(product => (
                        (product.id === id) ? {...product, quantity: product.quantity++} : product
                    ));
                    this.context.setData({updatedCart});
                }
                else {
                    const newProduct = {
                        id: id,
                        brand: brand,
                        name: name,
                        gallery: gallery,
                        prices: prices,
                        attributes: attributes,
                        quantity: 1
                    }
                    this.context.setData({
                        ...this.context,
                        productsInCart: [...this.context.productsInCart, newProduct]
                    });
                }
                alert(`Added ${brand} ${name} to shopping cart`);
            }
            else {
                alert("Before adding product to cart please go to product page and select desired attributes");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    switchFloatingButtonVisibility = (value) => {
        if (value === true && this.props.details.inStock) {
            this.setState({isFloatingButtonVisible: true});
        }
        else {
            this.setState({isFloatingButtonVisible: false});
        }
    }

    render () {
        const thumbnail_source = this.props.details.gallery[0];
        const {id, brand, name, inStock} = this.props.details;
        this.getPrice();
        return (
            <article onMouseEnter={() => this.switchFloatingButtonVisibility(true)}
                     onMouseLeave={() => this.switchFloatingButtonVisibility(false)}
                     className={styles.container}>
                <Link to={`/product/?id=${id}`}>
                    <div className={styles.product_card}>
                        <ProductImage src={thumbnail_source} inStock={inStock}/>

                        <span className={styles.product_name}>{brand} {name}</span>
                        <span className={styles.product_price}>{this.state.price_symbol}{this.state.price_amount}</span>
                    </div>
                </Link>
                <button className={styles.floating_buy_button}
                        onClick={() => this.addToCart(this.props.details)}
                        style={{display: (this.state.isFloatingButtonVisible) ? "block": "none"}}>
                    <img src={'assets/empty_cart_white.svg'} alt={'Add to cart'}/>
                </button>
            </article>
        );
    }
}

export default ProductCard;