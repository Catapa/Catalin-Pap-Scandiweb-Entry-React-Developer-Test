import React, {Component, PureComponent} from 'react';
import styles from './ProductDescriptionPage.module.css';
import {client} from "../../index";
import {PRODUCT_BY_ID} from "../../Queries/queries";
import DataContext from "../../Context/DataContext";
import Gallery from "../../Components/Gallery/Gallery";
import ProductAttributes from "../../Components/ProductAttributes/ProductAttributes";

export class ProductDescriptionPage extends Component {
    static contextType = DataContext;

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            brand: 'Guccci',
            name: 'ala bun',
            description: 'nu bate nu troncane',
            attributes: [],
            gallery: [],
            prices: [],
            inStock: false,
            price: 0,
            attributesSelect: []
        }
        this.updateProductInfo();
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
                    id: productId,
                    brand: brand,
                    name: name,
                    description: description,
                    attributes: attributes,
                    gallery: gallery,
                    prices: prices,
                    inStock: inStock,
                    // selected_image: gallery[0],
                    attributesSelect: this.attributeValues(attributes)
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

    withAttributes = (attributes) => {
        let attributesSelected = true;
        attributes.map(attributeSet => {
            let isAtleastOneSelected = false;
            const category = attributeSet.name.toString();
            attributeSet.items.map(attribute => {
                const product = attribute.id.toString();
                if (this.getAttributeValue(category, product))
                    isAtleastOneSelected = true;
            });
            if (isAtleastOneSelected === false)
                attributesSelected = false;
        });

        return attributesSelected;
}

    addToCart = () => {
        try {
            const productAlreadyInCart = this.context.productsInCart.find(({ id }) => id === this.state.id);
            const {id, brand, name, gallery, prices, attributes, attributesSelect} = this.state;

            if (this.withAttributes(attributes, attributesSelect)) {
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
                        attributesSelect: attributesSelect,
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
                alert("Please select desired attributes");
            }

        }
        catch (error) {
            console.log(error);
        }
    }

    attributeValues = (attributes) => {
        const attributeSelector = [];
        attributes.map(attributeSet => {
            const values = {};
            attributeSet.items.map(attribute => {
                values[attribute.id] = false;
            })
            const item = {};
            item[attributeSet.name] = values;
            attributeSelector.push(item);
        })
        return attributeSelector
    };

    selectAttribute = (id) => {
        const attributeSelector = [];
        this.state.attributes.map(attributeSet => {
            const values = {};
            attributeSet.items.map(attribute => {
                values[attribute.id] = (attribute.id === id) ? true : false;
            })
            const item = {};
            item[attributeSet.name] = values;
            attributeSelector.push(item);
        })

        const originalAttributesSelect = this.state.attributesSelect

        const getProperties = obj => Object.getOwnPropertyNames(obj)

        attributeSelector.forEach(attributeSet => {
            const propertyName = getProperties(attributeSet)[0]
            const property = attributeSet[propertyName]
            const isChanged = getProperties(property).some(value => property[value] === true)

            if (isChanged) {
                originalAttributesSelect.forEach(attribute => {
                    if (attribute.hasOwnProperty(propertyName)) {
                        attribute[propertyName] = property
                    }
                })
            }
        })

        this.setState({
                ...this.state,
                attributesSelect: originalAttributesSelect
            }
        )
    };

    getAttributeValue = (category, value) => this.state.attributesSelect.find(
        prop => prop.hasOwnProperty(category)
    )[category][value];

    render() {
        const price = this.state.prices.find(price => price.currency.label === this.context.currency.label );
        return (
            <main className={styles.description_page}>
                {/* Gallery */}
                {this.state.gallery.length && <Gallery gallery={this.state.gallery}/>}

                {/* Info Panel */}
                <div className={styles.panel}>
                    {/* Product name */}
                    <div className={styles.panel__name}>
                        <h2 className={styles.panel__name__brand}>{this.state.brand}</h2>
                        <h3 className={styles.panel__name__product}>{this.state.name}</h3>
                    </div>

                    {/* Product Attributes */}
                    {/*<ProductAttributes attributes={this.state.attributes} attributesSelect={this.state.attributesSelect} selectable={true}/>*/}

                    <div className={styles.panel__attributes}>
                        {this.state.attributes.map(attributeSet => {
                            return (
                                <div key={attributeSet.id}>
                                    <p className={styles.panel__attributes__label}>{attributeSet.name}:</p>
                                    <div className={styles.panel__attributes_selector}>
                                        {attributeSet.items.map(attribute => {
                                            // text button styles
                                            const textButtonStyles = styles.panel__attributes_selector__button;
                                            const textButtonActiveStyles = `${styles.panel__attributes_selector__button} ${styles.panel__attributes_selector__button__active}`;
                                            // swatch button styles
                                            const swatchButtonStyles = `${styles.panel__attributes_selector__button} ${styles.panel__attributes_selector__swatch}`;
                                            const swatchButtonActiveStyles = `${styles.panel__attributes_selector__button} ${styles.panel__attributes_selector__swatch} ${styles.panel__attributes_selector__swatch__active}`;
                                            const category = attributeSet.name.toString();
                                            const product = attribute.id.toString();
                                            return (
                                                (attributeSet.type === 'swatch') ?
                                                    <button key={attribute.id}
                                                            value={attribute.id}
                                                            className={(this.getAttributeValue(category, product) === true) ? swatchButtonActiveStyles : swatchButtonStyles}
                                                            style={{backgroundColor: `${attribute.displayValue}`}}
                                                            onClick={(e) => this.selectAttribute(e.target.value)}>
                                                    </button>
                                                    :
                                                    <button key={attribute.id}
                                                            value={attribute.id}
                                                            className={(this.getAttributeValue(category, product) === true) ? textButtonActiveStyles : textButtonStyles}
                                                            onClick={(e) => this.selectAttribute(e.target.value)}>
                                                        {attribute.displayValue}
                                                    </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Product Price */}
                    <div className={styles.panel__price}>
                        <p className={styles.panel__price__label}>price:</p>
                        <p className={styles.panel__price__value}>
                            {price && price.currency && price.currency.symbol}
                            {price && price.amount}
                        </p>
                    </div>

                    {/* Add to cart button */}
                    <button className={styles.panel__add_to_cart_button} onClick={this.addToCart}>add to cart</button>

                    {/* Description */}
                    <article className={styles.panel__description}
                             dangerouslySetInnerHTML={{__html: this.state.description}}/>
                </div>
            </main>
        );
    }
}
export default ProductDescriptionPage;