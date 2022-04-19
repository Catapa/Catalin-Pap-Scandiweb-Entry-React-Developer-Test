import React, {PureComponent} from 'react';
import styles from './Header.module.css';

// queries
import {CATEGORY_NAMES, PRODUCTS_BY_CATEGORY} from '../../Queries/queries';

// components
import CartOverlay from "../CartOverlay/CartOverlay";
import {client} from "../../index";

export class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        client.query({query: CATEGORY_NAMES})
            .then(result => {
                // console.log(result.data.categories.map(category => category.name))
                this.setState({
                    categories: result.data.categories.map(category => category.name)
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    queryProducts(category) {
        console.log('clicked', category);
        client.query({query: PRODUCTS_BY_CATEGORY, variables: {title: category}})
            .then(result => {
                const {name, products} = result.data.category;
                console.log(products);
            })
            .catch(error => {
                console.log(error);
            });

    }


    render () {

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
                            <img src={'assets/dollar_sign.svg'} alt={'currency is dollar'} className={styles.action_list_item__currency}/>
                            <img src={'assets/arrow_down.svg'} alt={'select currency'} className={styles.action_list_item__arrow}/>
                        </li>
                        <li className={styles.action_list_item}>
                            <img src={'assets/empty_cart_black.svg'} alt={'cart'} className={styles.action_list_item_cart}/>
                            {/*<CartOverlay/>*/}
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;