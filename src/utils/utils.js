/** Default error handling mechanism
 * @function
 * @param {string} error - the error message
 */
export const handleError = (error) => {
    console.log(error); /* eslint-disable-line no-console */
}

/** Generates attributesSelect field based on the attributes property of the product,
 * first attribute from each category being selected (true) by default
 * @function
 * @param {array} attributes - the attributes of the product
 * @return {array} attributesSelect - an array consisting of the product's attributes,
 * each associated to an either true or false value
 * */
export const attributeValues = (attributes) => {
    const attributesSelect = [];
    attributes.map(attributeSet => {
        const values = {};
        attributeSet.items.map((attribute, index) => {
            values[attribute.id] = (index === 0);
        })
        const item = {};
        item[attributeSet.name] = values;
        attributesSelect.push(item);
    })
    return attributesSelect
};

/** Get the the value (true or false) of a certain attribute in attributesSelect field
 * @function
 * @param {string} category - the category of the attribute
 * @param {string} value - the value of the attribute
 * @param {array} attributesSelect - the attributesSelect field of a product
 * @return {boolean} value - true if the attribute is selected, false otherwise
 * */
export const getAttributeValue = (category, value, attributesSelect) => attributesSelect.find(
    attribute => Object.prototype.hasOwnProperty.call(attribute, category)
)[category][value];

/** Get the value of a searchParam in the webpage's URL
 * @function
 * @param {string} paramName - the name of the searchParam
 * @return {string} - the value of the searchParam
 * */
export const  querySearchParam = (paramName) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramName);
}

/**
 * Compare if two entities are equal in value
 * @param {any} a
 * @param {any} b
 * @return {boolean} 'true' if they are equal, 'false' otherwise
 */
export const equals = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}