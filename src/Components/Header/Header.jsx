import React, {PureComponent} from 'react';
import styles from './Header.module.css';

// queries
import {CATEGORY_NAMES, CURRENCIES, PRODUCTS_BY_CATEGORY} from '../../Queries/queries';

// context
import DataContext from '../../Context/DataContext';

// components
import CartOverlay from "../CartOverlay/CartOverlay";
import {client} from "../../index";

export class Header extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            all_currencies: [],
        };
    }

    componentDidMount() {
        this.queryCategories();
        this.queryCurrencies();
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
        // console.log(this.context);
        this.context.setData({...this.context, currency: {label, symbol}});
    }


    render () {
        // console.log(this.context);
        return (
            <header className={styles.header}>
                <nav className={styles.navigation}>
                    <ul className={styles.category_list}>
                        {this.state.categories.map(category => {
                            return (
                                <li key={category}
                                    className={styles.category_list_item}
                                    onClick={() => this.queryProducts(category)}><a>{category}</a></li>
                            )
                        })}
                    </ul>
                </nav>

                <img src={'assets/logo.svg'} alt={'logo'} className={styles.logo}/>
                <nav className={styles.navigation}>
                    <ul className={styles.action_list}>
                        <li className={styles.action_list_item}>
                            {/*TODO: make the currency dropdown a standalone component*/}
                            <select
                                name={'currencies'}
                                className={styles.action_list_item__currency}
                                onChange={(event) => this.onCurrencyChange(event.target.value)}
                                value={this.context.currency.label}
                            >
                                {this.state.all_currencies.map(currency => {
                                    const obj = {'label': currency.label, 'symbol': currency.symbol}
                                    return (
                                        <option key={currency.label}
                                                data-value={obj}>{currency.symbol} {currency.label}</option>
                                    );
                                })}
                            </select>
                        </li>

                        <li className={styles.action_list_item}>
                            <img src={'assets/empty_cart_black.svg'} alt={'cart'}
                                 className={styles.action_list_item_cart}/>
                            {/*<CartOverlay/>*/}
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;