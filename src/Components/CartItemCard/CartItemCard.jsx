import React, {Component} from 'react';
import styles from './CartItemCard.module.css';
import DataContext from "../../Context/DataContext";
import {Link} from "react-router-dom";
import chevron_right from '../../Graphics/chevron_right.svg';
import chevron_left from '../../Graphics/chevron_left.svg';

class CartItemCard extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 0,
            totalImageCount: this.props.details.gallery.length
        }
    };

    // increase quantity of a product in cart
    increaseQuantity = () => {
        try {
            const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
            const updatedCart = productsInCart.map(product => (
                (product.id === this.props.details.id &&
                    JSON.stringify(product.attributesSelect) === JSON.stringify(this.props.details.attributesSelect)) ? {...product, quantity: product.quantity++} : product
            ));
            this.context.setData({updatedCart});
            window.sessionStorage.setItem("productsInCart", JSON.stringify(productsInCart));
        }
        catch (error) {
            console.log(error);
        }
    };

    // decrease quantity of a product in cart
    decreaseQuantity = () => {
        try {
            const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
            const quantity = this.props.details.quantity;
            /* if quantity bigger than 0, decrease it, else remove product from cart */
            if (quantity > 1) {
                const updatedCart = productsInCart.map(product => (
                    (product.id === this.props.details.id && JSON.stringify(product.attributesSelect) === JSON.stringify(this.props.details.attributesSelect)) ? {...product, quantity: product.quantity--} : product
                ));
                this.context.setData({updatedCart});
                window.sessionStorage.setItem('productsInCart', JSON.stringify(productsInCart));
            }
            if (quantity <= 1) {
                const updatedCart = productsInCart.filter(product => (product.id !== this.props.details.id || JSON.stringify(product.attributesSelect) !== JSON.stringify(this.props.details.attributesSelect)));
                this.context.setData({updatedCart});
                window.sessionStorage.setItem('productsInCart', JSON.stringify(updatedCart));
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    // get the the value (true or false) of a certain attribute in attributesSelect field
    getAttributeValue = (category, value) => this.props.details.attributesSelect.find(
        prop => prop.hasOwnProperty(category)
    )[category][value];

    // switch to next image in gallery
    gallery_next = () => {
        try {
            if (this.state.imageIndex < this.state.totalImageCount - 1) {
                this.setState({
                    imageIndex: this.state.imageIndex + 1
                });
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    // switch to previous image in gallery
    gallery_previous = () => {
        try {
            if (this.state.imageIndex > 0) {
                this.setState({
                    imageIndex: this.state.imageIndex - 1
                });
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    render() {
        const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
        const {id, brand, name, gallery, prices, attributes, attributesSelect} = this.props.details;
        const price = prices.find(price => price.currency.label === JSON.parse(window.sessionStorage.getItem('currency')).label);
        const quantity = productsInCart.find(product => (product.id === this.props.details.id && JSON.stringify(product.attributesSelect) === JSON.stringify(this.props.details.attributesSelect))).quantity;
        /* STYLES */
        const item_card = (this.props.big_format) ? `${styles.item_card_big} ${styles.item_card}` : styles.item_card;
        const product_info = (this.props.big_format) ? `${styles.product_info} ${styles.product_info_big}` : styles.product_info;
        const product_info__brand = (this.props.big_format) ? `${styles.product_info__brand} ${styles.product_info__brand_big}` : styles.product_info__brand;
        const product_info__name = (this.props.big_format) ? `${styles.product_info__name} ${styles.product_info__name_big}` : styles.product_info__name;
        const product_info__price = (this.props.big_format) ? `${styles.product_info__price} ${styles.product_info__price_big}` : styles.product_info__price;
        const product_info__attributes = (this.props.big_format) ? `${styles.product_info__attributes} ${styles.product_info__attributes_big}` : styles.product_info__attributes;
        const attribute_names = (this.props.big_format) ? `${styles.attributes_name} ${styles.attributes_name_big}` : styles.attributes_name;
        const text_attribute = (this.props.big_format) ? `${styles.button} ${styles.button_big}` : styles.button;
        const text_attribute_active = (this.props.big_format) ? `${styles.button} ${styles.button_big} ${styles.button__active}` : `${styles.button} ${styles.button__active}`;
        const swatch_attribute = (this.props.big_format) ? `${styles.button} ${styles.button__swatch_big}` : `${styles.button} ${styles.button__swatch}`;
        const swatch_attribute_active = (this.props.big_format) ? `${styles.button} ${styles.button__swatch_big} ${styles.button__swatch__active}` : `${styles.button} ${styles.button__swatch} ${styles.button__swatch__active}`;
        const quantity_interactable = (this.props.big_format) ? `${styles.button} ${styles.interactable_big}` : `${styles.button} ${styles.interactable}`;
        const quantity_label = (this.props.big_format) ? `${styles.quantity_label} ${styles.quantity_label_big}` : styles.quantity_label;
        const image = (this.props.big_format) ? `${styles.image} ${styles.image_big}` : styles.image;

        return (
            // (id === this.props.details.id && JSON.stringify(attributesSelect) === JSON.stringify(this.props.details.attributesSelect)) &&
            <div className={item_card}>
                <div className={product_info}>
                    <div>
                        <Link to={`/product/?id=${id}`}>
                            <div className={styles.product_link}>
                                <p className={product_info__brand}>{brand}</p>
                                <p className={product_info__name}>{name}</p>
                            </div>
                        </Link>
                        <p className={product_info__price}>{price.currency && price.currency.symbol}{(price.amount * quantity).toFixed(2)}</p>
                    </div>
                    {
                        attributes.map(attributeSet => {
                            return (
                                <div key={attributeSet.id} className={product_info__attributes}>
                                    <p key={attributeSet.id} className={attribute_names}>{attributeSet.name}:</p>
                                    {attributeSet.items.map(attribute => {
                                        const category = attributeSet.name.toString();
                                        const product = attribute.id.toString();

                                        return (
                                            (attributeSet.type === 'swatch') ?
                                                <button key={attribute.id}
                                                        className={(this.getAttributeValue(category, product) === true) ? swatch_attribute_active : swatch_attribute}
                                                        style={{backgroundColor: `${attribute.displayValue}`}}/>
                                                :
                                                <button key={attribute.id}
                                                        className={(this.getAttributeValue(category, product) === true) ? text_attribute_active : text_attribute}>
                                                    {attribute.displayValue}
                                                </button>
                                        );
                                    })}
                                </div>
                            );
                        })
                    }
                </div>
                <div className={styles.quantity_selector}>
                    <button className={quantity_interactable} onClick={this.decreaseQuantity}>-</button>
                    <span className={quantity_label}>{quantity}</span>
                    <button className={quantity_interactable} onClick={this.increaseQuantity}>+</button>
                </div>
                <section className={styles.image_container}>
                    <img src={gallery[this.state.imageIndex]} alt={'product'} className={image}/>
                    {this.props.big_format && this.state.totalImageCount>1 &&
                    <section className={styles.image_selector}>
                        <button className={styles.image_selector_button} onClick={this.gallery_previous} disabled={this.state.imageIndex === 0}>
                            <img src={chevron_left} alt={'previous'}/>
                        </button>
                        <button className={styles.image_selector_button} onClick={this.gallery_next} disabled={this.state.imageIndex === this.state.totalImageCount - 1}>
                            <img src={chevron_right} alt={'next'}/>
                        </button>
                    </section>}
                </section>
            </div>
        );
    }
}
export default CartItemCard;