import React, {PureComponent} from 'react';
import styles from './ProductDescriptionPage.module.css';
import {client} from "../../index";
import {PRODUCT_BY_ID} from "../../Queries/queries";
import DataContext from "../../Context/DataContext";

export class ProductDescriptionPage extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            brand: 'Guccci',
            name: 'ala bun',
            description: 'nu bate nu troncane',
            attributes: [],
            gallery: [],
            prices: [],
            inStock: false,
            price: {}
        }
    }

    querySearchParam = (paramName) => {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get(paramName);
        return productId;
    }

    updateProductInfo = () => {
        const productId = this.querySearchParam('id');
        client.query({query: PRODUCT_BY_ID, variables: {id: productId}})
            .then(result => {
                const {brand, name, description, attributes, gallery, prices, inStock} = result.data.product;
                this.setState({
                    brand: brand,
                    name: name,
                    description: description,
                    attributes: attributes,
                    gallery: gallery,
                    prices: prices,
                    inStock: inStock,
                    price: this.state.prices.find(price =>
                        price.currency.label === this.context.currency.label )
                })
            } )
            .catch(error => {
                console.log(error);
            })
    }

    render () {
        this.updateProductInfo();
        return (
            <main className={styles.description_page}>
                <div className={styles.product_view}>
                    {/* Image Gallery */}
                    <div className={styles.gallery}>
                        {
                            this.state.gallery.map(imageSource => {
                                return (
                                    <img key={imageSource} src={imageSource} alt={'asl'} className={styles.gallery__image}/>
                                )
                            })
                        }
                    </div>

                    {/* Image in focus */}
                    <div className={styles.product_view__main}>
                        <img src={this.state.gallery[0]} alt={'main image'} className={styles.product_view__main__image}/>
                    </div>
                </div>

                {/* Info Panel */}
                <div className={styles.panel}>
                    {/* Product name */}
                    <div className={styles.panel__name}>
                        <h2 className={styles.panel__name__brand}>{this.state.brand}</h2>
                        <h3 className={styles.panel__name__product}>{this.state.name}</h3>
                    </div>

                    {/* Product Sizes */}
                    <div className={styles.panel__attributes}>
                        {this.state.attributes.map(attribute => {
                            return (
                                <>
                                <p className={styles.panel__attributes__label}>{attribute.name}:</p>
                                <div className={styles.panel__attributes_selector}>
                                    {attribute.items.map(item => {
                                        return (
                                            <button className={styles.panel__attributes_selector__button}>{item.displayValue}</button>
                                        )
                                    })}
                                </div>
                                </>
                            )
                        })}
                        <p className={styles.panel__attributes__label}>Size:</p>
                        <div className={styles.panel__attributes_selector}>
                            <button className={`${styles.panel__attributes_selector__button} ${styles.panel__attributes_selector__button__disabled}`}>XS</button>
                            <button className={`${styles.panel__attributes_selector__button} ${styles.panel__attributes_selector__button__active}`}>S</button>
                            <button className={styles.panel__attributes_selector__button}>M</button>
                            <button className={styles.panel__attributes_selector__button}>L</button>
                        </div>
                    </div>

                    {/* Product Price */}
                    <div className={styles.panel__price}>
                        <p className={styles.panel__price__label}>price:</p>
                        <p className={styles.panel__price__value}>
                            {this.state.price && this.state.price.currency && this.state.price.currency.symbol}
                            {this.state.price && this.state.price.amount}
                        </p>
                    </div>

                    {/* Add to cart button */}
                    <button className={styles.panel__add_to_cart_button}>add to cart</button>

                    {/* Description */}
                    <article className={styles.panel__description}>
                        {this.state.description}
                    </article>
                </div>
            </main>
        );
    }
}

export default ProductDescriptionPage;