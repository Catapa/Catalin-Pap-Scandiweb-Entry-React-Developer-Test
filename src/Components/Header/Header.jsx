import React, {PureComponent} from 'react';
import styles from './Header.module.css';
import logo from '../../Graphics/logo.svg';

// queries
import {CATEGORY_NAMES, PRODUCTS_BY_CATEGORY} from '../../Queries/queries';

// context
import DataContext from '../../Context/DataContext';

// components
import {client} from "../../index";
import {Link} from "react-router-dom";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";
import Cart from "../Cart/Cart";
import {handleError} from '../../utils/utils';

/**
 * Component that represents the header of the website
 */
export class Header extends PureComponent {
    static contextType = DataContext;
    /**
     * @constructor
     * @param {any} props
     **/
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }
    componentDidMount() {
        this.queryCategories();
        // TODO: find a non-hard-coded solution for this (optional)
        this.queryProducts('all');
    }
    /**
     * Queries the list of all available categories from the endpoint
     * @function
     */
    queryCategories() {
        try {
            client.query({query: CATEGORY_NAMES})
                .then(result => {
                    this.setState({
                        categories: result.data.categories.map(category => category.name)
                    })
                })
                .catch(error => {
                    handleError(error);
                });
        }
        catch (error) {
            handleError(`Error on queryCategories ${error}`);
        }
    }
    /**
     * Queries the list of all available products from the endpoint, that belong to a certain category
     * @function
     * @param {string} category - the category name that is queried
     */
    queryProducts(category) {
        try {
            client.query({query: PRODUCTS_BY_CATEGORY, variables: {title: category}})
                .then(result => {
                    const { products } = result.data.category;
                    this.context.setData({category: category, products: products});
                })
                .catch(error => {
                    handleError(error);
                });
        }
        catch (error) {
            handleError(`Error on queryProducts ${error}`);
        }
    }
    render () {
        return (
            <header className={styles.header}>

                {/*CATEGORIES*/}
                <nav className={styles.navigation}>
                    <ul className={styles.category_list}>
                        {this.state.categories.map(category => {
                            return (
                                <Link to={`products/?category=${category}`} key={category}
                                      className={styles.category_list_item}
                                      onClick={() => this.queryProducts(category)}>{category}</Link>
                            )
                        })}
                    </ul>
                </nav>

                {/*LOGO*/}
                <img src={logo} alt={'logo'} className={styles.logo}/>

                <nav className={styles.navigation}>
                    <ul className={styles.action_list}>
                        {/*CURRENCIES*/}
                        <li className={styles.action_list_item}>
                            <CurrencyDropdown/>
                        </li>
                        {/*CART*/}
                        <li className={styles.action_list_item}>
                            <Cart/>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}
export default Header;