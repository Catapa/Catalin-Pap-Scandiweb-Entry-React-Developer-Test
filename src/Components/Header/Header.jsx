import React, {PureComponent} from 'react';
import styles from './Header.module.css';

// queries
import {CATEGORY_NAMES, CURRENCIES, PRODUCTS_BY_CATEGORY} from '../../Queries/queries';

// context
import DataContext from '../../Context/DataContext';

// components
import CartOverlay from "../CartOverlay/CartOverlay";
import {client} from "../../index";
import {Link} from "react-router-dom";

export class Header extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            all_currencies: [],
            showCartOverlay: false
        };
    }

    componentDidMount() {
        this.queryCategories();
        this.queryCurrencies();

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
                // console.log('asd', products);
                this.context.setData({products: products});
            })
            .catch(error => {
                console.log(error);
            });
    }

    queryCurrencies() {
        client.query({query: CURRENCIES})
            .then(result => {
                // console.log(result.data.currencies);
                this.setState({
                    all_currencies: result.data.currencies
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onCurrencyChange(value) {
        const [symbol, label] = value.toString().split(' ');
        try {
            this.context.setData({...this.context, currency: {label, symbol}});
        }
        catch (error) {
            console.log(error);
        }

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
        // console.log(this.context);
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
                            {/*TODO: make the currency dropdown a standalone component*/}
                            <select
                                name={'currencies'}
                                className={styles.action_list_item__currency}
                                onChange={(event) => this.onCurrencyChange(event.target.value)}
                                // value={`${this.context.currency.symbol} ${this.context.currency.label}`}
                            >
                                {this.state.all_currencies.map(currency => {
                                    const obj = {label: currency.label, symbol: currency.symbol}
                                    return (
                                        <option key={currency.label}
                                                data-value={obj}
                                                // label={currency.symbol}
                                                >{currency.symbol} {currency.label}</option>
                                    );
                                })}
                            </select>
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