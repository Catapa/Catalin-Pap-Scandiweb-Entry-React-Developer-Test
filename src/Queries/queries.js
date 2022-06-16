import { gql } from '@apollo/client';

export const CATEGORY_NAMES = gql`
    {
        categories {
            name
        }
    }
`;

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

export const CURRENCIES = gql`
    {
        currencies {
            label
            symbol
        }
    }
`;

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