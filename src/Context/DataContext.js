import React, {PureComponent} from 'react';

const DataContext = React.createContext( true);

// export const DataProvider = DataContext.Provider;
export const DataConsumer = DataContext.Consumer;

export class DataProvider extends PureComponent {
    setData = (data) => {
        this.setState((prevState) => (data));
    }

    state = {
        currency: {
            label: 'USD',
            symbol: '$'
        },
        products: [],
        setData: this.setData
    };

    render() {
        const {children} = this.props;
        const {data} = this.state;
        const {setData} = this;

        return (
            <DataContext.Provider value={this.state}>
                {children}
            </DataContext.Provider>
        )

    }
}

export default DataContext;