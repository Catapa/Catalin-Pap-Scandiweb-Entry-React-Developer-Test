import React, {Component, PureComponent} from 'react';
import styles from './CartItemCard.module.css';
import DataContext from "../../Context/DataContext";


// TODO: Create a 'minimize' prop so that you can choose whether to show a big or minimized version of the card (e.g. CartOverlay vs. CartPage)
class CartItemCard extends Component {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.details.quantity
        }
    };

    increaseQuantity = () => {
        const updatedCart = this.context.productsInCart.map(product => (
            (product.id === this.props.details.id) ? {...product, quantity: product.quantity++} : product
        ));
        this.context.setData({updatedCart});
    };

    decreaseQuantity = () => {
        /* if quantity bigger than 0, decrease it, else remove product from cart */
        if (this.state.quantity > 0) {
            const updatedCart = this.context.productsInCart.map(product => (
                (product.id === this.props.details.id) ? {...product, quantity: product.quantity--} : product
            ));
            this.context.setData({updatedCart});
        }
        if (this.state.quantity === 0) {
            const updatedCart = this.context.productsInCart.filter(product => (product.id !== this.props.details.id));
            this.context.setData({updatedCart});
        }
    };

    getAttributeValue = (category, value) => this.props.details.attributesSelect.find(
        prop => prop.hasOwnProperty(category)
    )[category][value];

    render() {
        const {brand, name, gallery, prices, attributes, attributesSelect} = this.props.details;
        const price = prices.find(price => price.currency.label === this.context.currency.label);
        const quantity = this.context.productsInCart.find(product => (product.id === this.props.details.id)).quantity;
        return (
            <div className={styles.item_card}>
                <div className={styles.product_info}>
                    <div>
                        <p className={styles.product_info__name}>{brand} {name}</p>
                        <p className={styles.product_info__price}>{price.currency && price.currency.symbol}{(price.amount * quantity).toFixed(2)}</p>
                    </div>
                    {
                        attributes.map(attributeSet => {
                            return (
                                <div key={attributeSet.id} className={styles.product_info__sizes}>
                                    <p key={attributeSet.id}>{attributeSet.name}:</p>
                                    {attributeSet.items.map(attribute => {
                                        // text button styles
                                        const textButtonStyles = styles.button;
                                        const textButtonActiveStyles = `${styles.button} ${styles.button__active}`;
                                        // swatch button styles
                                        const swatchButtonStyles = `${styles.button} ${styles.button__swatch}`;
                                        const swatchButtonActiveStyles = `${styles.button} ${styles.button__swatch} ${styles.button__swatch__active}`;
                                        const category = attributeSet.name.toString();
                                        const product = attribute.id.toString();

                                        return (
                                            (attributeSet.type === 'swatch') ?
                                                <button key={attribute.id}
                                                        className={(this.getAttributeValue(category, product) === true) ? swatchButtonActiveStyles : swatchButtonStyles}
                                                        style={{backgroundColor: `${attribute.displayValue}`}}/>
                                                :
                                                <button key={attribute.id}
                                                        className={(this.getAttributeValue(category, product) === true) ? textButtonActiveStyles : textButtonStyles}>
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
                    <button className={`${styles.button} ${styles.interactable}`} onClick={this.decreaseQuantity}>-</button>
                    <span className={styles.quantity_label}>{quantity}</span>
                    <button className={`${styles.button} ${styles.interactable}`} onClick={this.increaseQuantity}>+</button>
                </div>

                <img src={gallery[0]} alt={'product'} className={styles.image}/>
            </div>
        );
    }
}

export default CartItemCard;