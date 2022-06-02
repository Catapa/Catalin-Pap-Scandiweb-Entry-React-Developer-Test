import React, {PureComponent} from 'react';
import styles from './Header.module.css';

// queries
import {CATEGORY_NAMES, PRODUCTS_BY_CATEGORY} from '../../Queries/queries';

// context
import DataContext from '../../Context/DataContext';

// components
import CartOverlay from "../CartOverlay/CartOverlay";
import {client} from "../../index";
import {Link} from "react-router-dom";
import CurrencyDropdown from "../CurrencyDropdown/CurrencyDropdown";

export class Header extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            showCartOverlay: false
        };
    }

    componentDidMount() {
        this.queryCategories();

        // TODO: find a non-hard-coded solution for this
        this.queryProducts('all');
    }

    queryCategories() {
        client.query({query: CATEGORY_NAMES})
            .then(result => {
                this.setState({
                    categories: result.data.categories.map(category => category.name)
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    queryProducts(category) {
        // console.log('clicked', category);
        client.query({query: PRODUCTS_BY_CATEGORY, variables: {title: category}})
            .then(result => {
                const {name, products} = result.data.category;
                this.context.setData({category: category, products: products});
            })
            .catch(error => {
                console.log(error);
            });
    }

    toggleCartOverlay = () => {
        if (this.state.showCartOverlay === true) {
            this.setState({
                showCartOverlay: false
            })
        }
        else {
            this.setState({
                showCartOverlay: true
            })
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
                                <Link to={'/'} key={category}
                                    className={styles.category_list_item}
                                    onClick={() => this.queryProducts(category)}>{category}</Link>
                            )
                        })}
                    </ul>
                </nav>

                {/*LOGO*/}
                <img src={'assets/logo.svg'} alt={'logo'} className={styles.logo}/>

                <nav className={styles.navigation}>
                    {/*CURRENCIES*/}
                    <ul className={styles.action_list}>
                        <li className={styles.action_list_item}>
                            <CurrencyDropdown/>
                        </li>
                        {/*CART*/}
                        <li className={styles.action_list_item} onClick={this.toggleCartOverlay}>
                            <img src={'assets/empty_cart_black.svg'} alt={'cart'}
                                 className={styles.action_list_item_cart}/>
                            <CartOverlay visible={this.state.showCartOverlay}/>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;