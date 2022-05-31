import React, {PureComponent} from 'react';
import styles from './ProductCard.module.css';
import {Link} from "react-router-dom";
import DataContext from "../../Context/DataContext";

export class ProductCard extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            price_amount: 0,
            price_label: '',
            price_symbol: ''
        }
    }

    getPrice = () => {
        const price = this.props.details.prices.find(el => el.currency.label === this.context.currency.label);
        const {amount} = price;
        const {label, symbol} = price.currency;
        // console.log(symbol);
        this.setState({
            price_amount: amount,
            price_label: label,
            price_symbol: symbol
        })
    }

    render () {
        const thumbnail_source = this.props.details.gallery[0];
        const {brand, name} = this.props.details;
        this.getPrice();
        return (
            <Link to={`/product/?id=${this.props.details.id}`}>
                <div className={styles.product_card}>
                    {/*<div style={{backgroundImage: `url(${thumbnail_source})` /*backgroundColor: "orange"*!/} className={styles.product_image}/>*/}
                    <img src={thumbnail_source} alt={'asd'} className={styles.product_image}/>
                    <button className={styles.product_buy_button}>
                        <img src={'assets/empty_cart_white.svg'} alt={'Add to cart'}/>
                    </button>
                    <span className={styles.product_name}>{brand} {name}</span>
                    <span className={styles.product_price}>{this.state.price_symbol}{this.state.price_amount}</span>
                </div>
            </Link>
        );
    }
}

export default ProductCard;