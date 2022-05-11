import React, {PureComponent} from 'react';
import styles from './CartPage.module.css';
import CartItemCard from "../../Components/CartItemCard/CartItemCard";
import DataContext from "../../Context/DataContext";


export class CartPage extends PureComponent {
    static contextType = DataContext;
    render () {
        return (
            <div className={styles.page}>
                {/* TODO: display big versions of CartItemCard */}
                {
                    this.context.productsInCart.map(product => {
                        return (
                            <CartItemCard key={product.id} details={product}/>
                        )
                    })
                }
            </div>
        )
    }
}

export default CartPage;