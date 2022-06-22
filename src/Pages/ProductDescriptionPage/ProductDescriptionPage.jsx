import React, {Component} from 'react';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import styles from './ProductDescriptionPage.module.css';
import {client} from '../../index';
import {PRODUCT_BY_ID} from '../../Queries/queries';
import DataContext from '../../Context/DataContext';
import Gallery from '../../Components/Gallery/Gallery';
import {handleError} from '../../Service/service';

export class ProductDescriptionPage extends Component {
    static contextType = DataContext;

    constructor(props) {
        super(props);
        this.state = {
            id: 'default id',
            brand: 'default brand',
            name: 'default name',
            description: 'default description',
            attributes: [],
            gallery: [],
            prices: [],
            inStock: false,
            price: 0,
            attributesSelect: []
        }

    }
    componentDidMount = () => {
        this.updateProductInfo();
    }

    //Get product's info from the search params of the URL
    querySearchParam = (paramName) => {
        const params = new URLSearchParams(window.location.search);
        return params.get(paramName);
    }

    updateProductInfo = () => {
        try {
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
                        attributesSelect: this.attributeValues(attributes)
                    })
                })
                .catch(error => {
                    handleError(error);
                });
        }
        catch (error) {
            handleError(`Error on updateProductInfo ${error}`);
        }
    };

    // Make sure at least one attribute from each category is selected
    withAttributes = (attributes) => {
        let attributesSelected = true;
        attributes.map(attributeSet => {
            let isAtLeastOneSelected = false;
            const category = attributeSet.name.toString();
            attributeSet.items.map(attribute => {
                const product = attribute.id.toString();
                if (this.getAttributeValue(category, product))
                    isAtLeastOneSelected = true;
            });
            if (isAtLeastOneSelected === false)
                attributesSelected = false;
        });
        return attributesSelected;
    }

    addToCart = () => {
        const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
        try {
            const productAlreadyInCart = productsInCart.find(({ id, attributesSelect }) => (id === this.state.id && JSON.stringify(attributesSelect) === JSON.stringify(this.state.attributesSelect)));
            const {id, brand, name, gallery, prices, attributes, attributesSelect, inStock} = this.state;
            if (!inStock) {
                alert('Product is out of stock');
                return;
            }
            if (this.withAttributes(attributes, attributesSelect)) {
                /* if product already in cart, increase its quantity */
                if (productAlreadyInCart) {
                    const updatedCart = productsInCart.map(product => (
                        (product.id === id && JSON.stringify(product.attributesSelect) === JSON.stringify(attributesSelect)) ? {...product, quantity: product.quantity++} : product
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
            else {
                alert("Please select desired attributes");
            }

        }
        catch (error) {
            handleError(error);
        }
    }

    // Generates attributesSelect field based on the attributes property of the product, first attribute from each category being selected by default
    attributeValues = (attributes) => {
        const attributeSelector = [];
        attributes.map(attributeSet => {
            const values = {};
            attributeSet.items.map((attribute, index) => {
                values[attribute.id] = (index === 0);
            })
            const item = {};
            item[attributeSet.name] = values;
            attributeSelector.push(item);
        })
        return attributeSelector
    };


    selectAttribute = (value) => {
        value = value.split(',');
        const category = value[0];
        const id = value[1];
        const attributeSelector = [];
        this.state.attributes.map(attributeSet => {
            const values = {};
            attributeSet.items.map(attribute => {
                values[attribute.id] = (attribute.id === id && attributeSet.name === category);
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
                    if (Object.prototype.hasOwnProperty.call(attribute, propertyName)) {
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

    // get the the value (true or false) of a certain attribute in attributesSelect field
    getAttributeValue = (category, value) => this.state.attributesSelect.find(
        attribute => Object.prototype.hasOwnProperty.call(attribute, category)
    )[category][value];

    render() {
        const price = this.state.prices.find(price => price.currency.label === JSON.parse(window.sessionStorage.getItem('currency')).label );
        const description_safeHTML = DOMPurify.sanitize(this.state.description, { USE_PROFILES: { html: true } });
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
                                            const category = attributeSet.name;
                                            const product = attribute.id;
                                            const id = [category, product];
                                            return (
                                                (attributeSet.type === 'swatch') ?
                                                    <button key={attribute.id}
                                                            value={id}
                                                            className={(this.getAttributeValue(category, product) === true && this.state.inStock) ? swatchButtonActiveStyles : swatchButtonStyles}
                                                            style={{backgroundColor: `${attribute.displayValue}`}}
                                                            onClick={(e) => this.selectAttribute(e.target.value)}
                                                            disabled={!this.state.inStock}>
                                                    </button>
                                                    :
                                                    <button key={attribute.id}
                                                            value={id}
                                                            className={(this.getAttributeValue(category, product) === true  && this.state.inStock) ? textButtonActiveStyles : textButtonStyles}
                                                            onClick={(e) => this.selectAttribute(e.target.value)}
                                                            disabled={!this.state.inStock}>
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

                    {!this.state.inStock && <p className={styles.warning}>Out of stock</p>}
                    {/* Add to cart button */}
                    <button className={styles.panel__add_to_cart_button} onClick={this.addToCart} disabled={!this.state.inStock}>add to cart</button>

                    {/* Description */}
                    <article className={styles.panel__description}>{parse(description_safeHTML)}</article>
                </div>
            </main>
        );
    }
}
export default ProductDescriptionPage;