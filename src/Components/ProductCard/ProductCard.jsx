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
    // Generates attributesSelect field based on the attributes property of the product, first attribute from each category being selected by default
    attributeValues = (attributes) => {
        const attributeSelector = [];
        attributes.map(attributeSet => {
            const values = {};
            attributeSet.items.map((attribute, index) => {
                values[attribute.id] = (index === 0) ? true : false;
            })
            const item = {};
            item[attributeSet.name] = values;
            attributeSelector.push(item);
        })
        return attributeSelector
    };
    equals = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    addToCart = (details) => {
        try {
            const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
            const {id, brand, name, gallery, prices, attributes} = details;
            /* if product doesn't have any attributes */
            if (!attributes.length) {
                /* if product already in cart, increase its quantity */
                const productAlreadyInCart = productsInCart.find(({ id }) => id === details.id);
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
            /* if product has attributes, generate the attributesSelect field with the default values and add it to cart */
            else {
                const attributesSelect = this.attributeValues(attributes);
                const attributesSelectClone = [...attributesSelect];
                const productAlreadyInCart = productsInCart.find(({id, attributesSelect}) => id === details.id && this.equals(attributesSelect, attributesSelectClone));

                /* if product already in cart, increase its quantity */
                if (productAlreadyInCart) {
                    const updatedCart = productsInCart.map(product => (
                        (product.id === id && this.equals(product.attributesSelect, attributesSelect)) ? {...product, attributesSelect: attributesSelect, quantity: product.quantity++} : {...product, attributesSelect: attributesSelect}
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
                        attributesSelect: attributesSelect,
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
        }
        catch (error) {
            console.log('Error on addToCart', error);
        }
    }
    switchFloatingButtonVisibility = (value) => {
        try {
            if (value === true && this.props.details.inStock) {
                this.setState({isFloatingButtonVisible: true});
            }
            else {
                this.setState({isFloatingButtonVisible: false});
            }
        }
        catch (error) {
            console.log('Error on switchFloatingButtonVisibility', error);
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
                {this.state.isFloatingButtonVisible && <button className={styles.floating_buy_button}
                         onClick={() => this.addToCart(this.props.details)}>
                    <img src={empty_cart_white} alt={'Add to cart'}/>
                </button>}
            </article>
        );
    }
}
export default ProductCard;