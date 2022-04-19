import { gql } from '@apollo/client';

const CATEGORY_NAMES = gql`
    {
        categories {
            name
        }
    }
`;

const PRODUCTS_BY_CATEGORY = gql`
    query category($title: String!) {
        category(input: {title: $title}) {
            name
            products {
                id
                name
            }
        }
    }
`;

const CURRENCIES = gql`
    {
        currencies {
            label
            symbol
        }
    }
`;

export {CATEGORY_NAMES, PRODUCTS_BY_CATEGORY, CURRENCIES};