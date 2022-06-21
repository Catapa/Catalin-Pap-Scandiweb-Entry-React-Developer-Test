import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './Heading.module.css';

export class Heading extends PureComponent {
    constructor(props) {
        super(props);
    }
    render () {
        const {text} = this.props;
        return (
            <h2 className={styles.category_name}>{text}</h2>
        )
    }
}
export default Heading;

Heading.propTypes = {
    text: PropTypes.string.isRequired
}