import React, {PureComponent} from 'react';
import styles from './Cart.module.css';
import DataContext from '../../Context/DataContext';
import CartOverlay from '../CartOverlay/CartOverlay';
import Backdrop from '../Backdrop/Backdrop';
import empty_cart_black from '../../Graphics/empty_cart_black.svg';

class Cart extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            showCartOverlay: false
        }
        this.containerRef = React.createRef();
        this.closeCartOverlay = this.closeCartOverlay.bind(this);
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
    closeCartOverlay = (event) => {
        try {
            if (this.containerRef && !this.containerRef.current.contains(event.target)) {
                this.setState({
                    showCartOverlay: false
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    componentDidMount() {
        try {
            document.addEventListener('mousedown', this.closeCartOverlay, true);
            const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
            this.context.setData({productsInCart: productsInCart});
        }
        catch (error) {
            console.log(error);
        }
    }
    componentWillUnmount() {
        try {
            document.removeEventListener('mousedown', this.closeCartOverlay, true);
        }
        catch (error) {
            console.log(error);
        }
    }

    render() {
        const productsInCart = JSON.parse(window.sessionStorage.getItem("productsInCart"));
        const cartItemsCounter = productsInCart.reduce(
            (accumulator, product) =>
                accumulator +
                product.quantity
            , 0
        );
        return (
            <span tabIndex={4} ref={this.containerRef}>
                {/* Backdrop */}
                <Backdrop visible={this.state.showCartOverlay} onClick={this.toggleCartOverlay}/>
                {/* Cart Icon */}
                <span onClick={this.toggleCartOverlay} className={styles.container}>
                    <img src={empty_cart_black} alt={'cart'}
                         className={styles.cart_image}/>
                         <span className={styles.items_counter}
                               style={{display: (cartItemsCounter) ? "flex" : "none"}}>{cartItemsCounter}</span>
                </span>
                {/* Cart Overlay */}
                <CartOverlay visible={this.state.showCartOverlay} toggleCartOverlay={this.toggleCartOverlay}/>
            </span>
        );
    }
}
export default Cart;