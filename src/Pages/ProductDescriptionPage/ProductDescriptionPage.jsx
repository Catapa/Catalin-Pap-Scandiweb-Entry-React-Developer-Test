import React, {PureComponent} from 'react';
import styles from './ProductDescriptionPage.module.css';

export class ProductDescriptionPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    queryParams = () => {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        console.log('ProductDescriptionPage - location',  productId)
    }

    render () {
        return (
            <main className={styles.description_page}>
                <div className={styles.product_view}>
                    {/* Image Gallery */}
                    <div className={styles.gallery}>
                        <img src={'assets/demo_cart.svg'} alt={'image'} className={styles.gallery__image}/>
                        <img src={'assets/demo_cart.svg'} alt={'image'} className={styles.gallery__image}/>
                        <img src={'assets/demo_cart.svg'} alt={'image'} className={styles.gallery__image}/>
                    </div>

                    {/* Image in focus */}
                    <div className={styles.product_view__main}>
                        <img src={'assets/demo_cart.svg'} alt={'main image'} className={styles.product_view__main__image}/>
                    </div>
                </div>

                {/* Info Panel */}
                <div className={styles.panel}>
                    {/* Product name */}
                    <div className={styles.panel__name}>
                        <h2 className={styles.panel__name__brand}>Apollo</h2>
                        <h3 className={styles.panel__name__product}>Running Short</h3>
                    </div>

                    {/* Product Sizes */}
                    <div className={styles.panel__sizes}>
                        <p className={styles.panel__sizes__label}>Size:</p>
                        <div className={styles.panel__sizes_selector}>
                            <button className={`${styles.panel__sizes_selector__button} ${styles.panel__sizes_selector__button__disabled}`}>XS</button>
                            <button className={`${styles.panel__sizes_selector__button} ${styles.panel__sizes_selector__button__active}`}>S</button>
                            <button className={styles.panel__sizes_selector__button}>M</button>
                            <button className={styles.panel__sizes_selector__button}>L</button>
                        </div>
                    </div>

                    {/* Product Price */}
                    <div className={styles.panel__price}>
                        <p className={styles.panel__price__label}>price:</p>
                        <p className={styles.panel__price__value}>$50.00</p>
                    </div>

                    {/* Add to cart button */}
                    <button className={styles.panel__add_to_cart_button}>add to cart</button>

                    {/* Description */}
                    <article className={styles.panel__description}>
                        Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.
                    </article>
                </div>
            </main>
        );
    }
}

export default ProductDescriptionPage;