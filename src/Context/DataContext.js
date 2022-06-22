import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export const DataContext = React.createContext( true);

// export const DataProvider = DataContext.Provider;
// export const DataConsumer = DataContext.Consumer;

export class DataProvider extends PureComponent {
    constructor(props) {
        super(props);
    }
    setData = (data) => {
        this.setState(() => (data));
    }
    state = {
        currency: {
            label: 'USD',
            symbol: '$'
        },
        products: [],
        setData: this.setData,
        productsInCart: []
    };
    render() {
        const {children} = this.props;
        return (
            <DataContext.Provider value={this.state}>
                {children}
            </DataContext.Provider>
        )

    }
}
export default DataContext;

DataProvider.propTypes = {
    children: PropTypes.node.isRequired
}