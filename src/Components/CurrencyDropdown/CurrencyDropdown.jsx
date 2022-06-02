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
            all_currencies: []
        }
    }
    queryCurrencies() {
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
    onCurrencyChange(value) {
        const [symbol, label] = value.toString().split(' ');
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

    render () {
        return (
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
        )
    }
}
export default CurrencyDropdown;