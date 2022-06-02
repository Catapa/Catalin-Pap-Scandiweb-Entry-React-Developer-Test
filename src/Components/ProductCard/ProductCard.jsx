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

    addToCart = (details) => {
        try {
            const {id, brand, name, gallery, prices, attributes} = details;
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
            alert(`Added ${brand} ${name} to shopping cart`);
        }
        catch (error) {
            console.log(error);
        }
    }

    render () {
        const thumbnail_source = this.props.details.gallery[0];
        const {id, brand, name} = this.props.details;
        this.getPrice();
        return (
            <article>
                <Link to={`/product/?id=${id}`}>
                    <div className={styles.product_card}>
                        {/*<div style={{backgroundImage: `url(${thumbnail_source})` /*backgroundColor: "orange"*!/} className={styles.product_image}/>*/}
                        <img src={thumbnail_source} alt={'asd'} className={styles.product_image}/>

                        <span className={styles.product_name}>{brand} {name}</span>
                        <span className={styles.product_price}>{this.state.price_symbol}{this.state.price_amount}</span>
                    </div>
                </Link>
                <button className={styles.product_buy_button}
                        onClick={() => this.addToCart(this.props.details)}>
                    <img src={'assets/empty_cart_white.svg'} alt={'Add to cart'}/>
                </button>
            </article>
        );
    }
}

export default ProductCard;