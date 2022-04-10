import { gql } from '@apollo/client';

const CATEGORY_NAMES = gql`
    {
        categories {
            name
        }
    }
`;

export {CATEGORY_NAMES};