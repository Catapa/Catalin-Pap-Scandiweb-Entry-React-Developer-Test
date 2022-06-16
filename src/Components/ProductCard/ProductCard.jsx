import React, {PureComponent} from 'react';
import styles from './ProductCard.module.css';
import {Link} from "react-router-dom";
import DataContext from "../../Context/DataContext";
import ProductImage from "./ProductImage/ProductImage";
import empty_cart_white from '../../Graphics/empty_cart_white.svg';

export class ProductCard extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            isFloatingButtonVisible: false
        }
    }
    addToCart = (details) => {
        try {
            const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
            const productAlreadyInCart = productsInCart.find(({ id, attributesSelect }) => id === details.id && attributesSelect === details.attributesSelect);
            const {id, brand, name, gallery, prices, attributes} = details;

            if (!attributes.length) {
                /* if product already in cart, increase its quantity */
                if (productAlreadyInCart) {
                    const updatedCart = productsInCart.map(product => (
                        (product.id === id) ? {...product, quantity: product.quantity++} : product
                    ));
                    this.context.setData({updatedCart});
                    window.sessionStorage.setItem('productsInCart', JSON.stringify(productsInCart));
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
                        productsInCart: [...productsInCart, newProduct]
                    });
                    sessionStorage.setItem('productsInCart', JSON.stringify(
                       [...productsInCart, newProduct]
                    ));
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
        const price = this.props.details.prices.find(el => el.currency.label === JSON.parse(window.sessionStorage.getItem('currency')).label);
        return (
            <article onMouseEnter={() => this.switchFloatingButtonVisibility(true)}
                     onMouseLeave={() => this.switchFloatingButtonVisibility(false)}
                     className={styles.container}>
                <Link to={`/product/?id=${id}`}>
                    <div className={styles.product_card}>
                        <ProductImage src={thumbnail_source} inStock={inStock}/>

                        <span className={styles.product_name}>{brand} {name}</span>
                        <span className={styles.product_price}>{price.currency.symbol}{price.amount}</span>
                    </div>
                </Link>
                <button className={styles.floating_buy_button}
                        onClick={() => this.addToCart(this.props.details)}
                        style={{display: (this.state.isFloatingButtonVisible) ? "block": "none"}}>
                    <img src={empty_cart_white} alt={'Add to cart'}/>
                </button>
            </article>
        );
    }
}
export default ProductCard;