import React, {PureComponent} from 'react';
import styles from './Header.module.css';

export class Header extends PureComponent {
    render () {
        return (
            <header className={styles.header}>
                <nav className={styles.navigation}>
                    <ul className={styles.category_list}>
                        <li className={styles.category_list_item}><a>women</a></li>
                        <li className={styles.category_list_item}><a>men</a></li>
                        <li className={styles.category_list_item}><a>kids</a></li>
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
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;