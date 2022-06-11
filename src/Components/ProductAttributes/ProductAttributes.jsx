import React, {PureComponent} from 'react';
import styles from './ProductAttributes.module.css';

/* TODO: Finish migrating attributes to stand-alone component and find out why jacket now has shoes' attributes */
export class ProductAttributes extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            attributesSelect: []
        }
    }

    getAttributeValue = (category, value) => this.props.attributesSelect.find(
        prop => prop.hasOwnProperty(category)
    )[category][value];

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

    render () {
        const { attributes } = this.props;
        return (
                attributes.map(attributeSet => {
                    return (
                        <div key={attributeSet.id} className={styles.product_info__sizes}>
                            <p key={attributeSet.id}>{attributeSet.name}:</p>
                            {attributeSet.items.map(attribute => {
                                // text button styles
                                const textButtonStyles = `${styles.button} ${styles.interactable}`;
                                const textButtonActiveStyles = `${styles.button} ${styles.interactable} ${styles.button__active}`;
                                // swatch button styles
                                const swatchButtonStyles = `${styles.button} ${styles.interactable} ${styles.button__swatch}`;
                                const swatchButtonActiveStyles = `${styles.button} ${styles.interactable} ${styles.button__swatch} ${styles.button__swatch__active}`;
                                const category = attributeSet.name.toString();
                                const product = attribute.id.toString();

                                return (
                                    (attributeSet.type === 'swatch') ?
                                        <button key={attribute.id}
                                                className={(this.getAttributeValue(category, product) === true) ? swatchButtonActiveStyles : swatchButtonStyles}
                                                style={{backgroundColor: `${attribute.displayValue}`}}
                                                onClick={(e) => this.selectAttribute(e.target.value)}/>
                                        :
                                        <button key={attribute.id}
                                                className={(this.getAttributeValue(category, product) === true) ? textButtonActiveStyles : textButtonStyles}
                                                onClick={(e) => this.selectAttribute(e.target.value)}>
                                            {attribute.displayValue}
                                        </button>
                                );
                            })}
                        </div>
                    );
                })
        )
    }
}
export default ProductAttributes;