import React, {Component, PureComponent} from 'react';
import styles from './CartItemCard.module.css';
import DataContext from "../../Context/DataContext";


// TODO: Create a 'minimize' prop so that you can choose whether to show a big or minimized version of the card (e.g. CartOverlay vs. CartPage)
export class CartItemCard extends Component {
    static contextType = DataContext;

    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.details.quantity
        }
    };

    increaseQuantity = () => {
        // this.setState({
        //     quantity: this.state.quantity + 1
        // })
        this.props.details.quantity += 1;
        this.setState({
            quantity: this.props.details.quantity
        })
        console.log(this.props.details.quantity);
    };

    decreaseQuantity = () => {
        // if (this.state.quantity > 0)
        //     this.setState({
        //         quantity: this.state.quantity - 1
        //     });
        if (this.props.details.quantity > 0)
        {
            this.props.details.quantity -= 1;
            this.setState({
                quantity: this.props.details.quantity
            })
        }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const quantityFromContext = this.context.productsInCart.find(product => product.id === this.props.details.id).quantity;
        if ( quantityFromContext !== this.state.quantity) {
            this.setState({
                quantity: quantityFromContext
            });
            return true;
        }
        else return false;
    }

    render() {
        const {brand, name, gallery, prices, attributes, quantity} = this.props.details;
        const price = prices.find(price => price.currency.label === this.context.currency.label);

        return (
            <div className={styles.item_card}>
                <div className={styles.product_info}>
                    <div>
                        <p className={styles.product_info__name}>{brand} {name}</p>
                        <p className={styles.product_info__price}>{price.currency && price.currency.symbol}{(price.amount * quantity).toFixed(2)}</p>
                    </div>
                    {
                        attributes.map(attribute => {
                            return (
                                <div key={attribute.id} className={styles.product_info__sizes}>
                                    <p>{attribute.name}:</p>
                                    {attribute.items.map(item => {
                                        return (
                                            <></>
                                            // <button key={item.id} className={styles.button}>{item.displayValue}</button>
                                        )
                                    })}

                                    {/*<button className={`${styles.button} ${styles.button_disabled}`}>M</button>*/}
                                </div>
                            );
                        })
                    }

                </div>

                <div className={styles.quantity_selector}>
                    <button className={styles.button} onClick={this.decreaseQuantity}>-</button>
                    <span className={styles.quantity_label}>{this.state.quantity}</span>
                    <button className={styles.button} onClick={this.increaseQuantity}>+</button>
                </div>

                <img src={gallery[0]} alt={'product'} className={styles.image}/>
            </div>
        );
    }
}

export default CartItemCard;