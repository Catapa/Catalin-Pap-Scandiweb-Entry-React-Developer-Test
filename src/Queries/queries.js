import { gql } from '@apollo/client';

/**
 * Query all the category names
 */
export const CATEGORY_NAMES = gql`
    {
        categories {
            name
        }
    }
`;

/**
 * Query all the products from a certain category (passed as parameter)
 */
export const PRODUCTS_BY_CATEGORY = gql`
    query category($title: String!) {
        category(input: {title: $title}) {
            name
            products {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
                brand
            }
        }
    }
`;

/**
 * Query all the currencies
 */
export const CURRENCIES = gql`
    {
        currencies {
            label
            symbol
        }
    }
`;

/**
 * Query a certain product based on its ID (passed as parameter)
 */
export const PRODUCT_BY_ID = gql`
        query product($id: String!) {
            product(id: $id) {
                name
                inStock
                gallery
                description
                category
                attributes {
                    id
                    name
                    type
                    items {
                        displayValue
                        value
                        id
                    }
                }
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
                brand
            }
        }
`;