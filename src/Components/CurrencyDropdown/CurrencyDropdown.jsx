import React, {PureComponent} from "react";
import styles from "./CurrencyDropdown.module.css";
import {client} from "../../index";
import {CURRENCIES} from "../../Queries/queries";
import DataContext from "../../Context/DataContext";

class CurrencyDropdown extends PureComponent {
    static contextType = DataContext;
    constructor(props) {
        super(props);
        this.state = {
            all_currencies: [],
            isDropdownOpen: false
        }
    }
    queryCurrencies = () => {
        client.query({query: CURRENCIES})
            .then(result => {
                this.setState({
                    all_currencies: result.data.currencies
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    changeCurrency = (currency) => {
        const {symbol, label} = currency;
        try {
            this.context.setData({...this.context, currency: {label, symbol}});
        }
        catch (error) {
            console.log(error);
        }
    }
    componentDidMount = () => {
        this.queryCurrencies();
    }
    toggleDropdown = () => {
        if (this.state.isDropdownOpen) {
            this.setState({isDropdownOpen: false});
        }
        else {
            this.setState({isDropdownOpen: true});
        }
    }
    closeDropdown = () => {
        this.setState({isDropdownOpen: false});
    }
    render () {
        return (
            <div className={styles.container}>
                <button className={styles.currency_select} onClick={this.toggleDropdown}>
                    <span>{this.context.currency.symbol}</span>
                    <img src={this.state.isDropdownOpen ? 'assets/arrow_up.svg' : 'assets/arrow_down.svg'} alt={'arrow'}/>
                </button>
                {this.state.isDropdownOpen &&
                    <div className={styles.dropdown}>
                    {this.state.all_currencies.map(currency => {
                        return (
                            <p key={currency.label}
                               className={styles.dropdown_option}
                               onClick={() => {
                                this.changeCurrency(currency);
                                this.closeDropdown();
                            }}>{currency.symbol} {currency.label}</p>
                        )
                    })}
                </div>}
            </div>
        )
    }
}
export default CurrencyDropdown;