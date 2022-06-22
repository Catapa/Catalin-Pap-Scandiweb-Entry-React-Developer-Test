import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './Heading.module.css';

/**
 * Component that displays text as heading on different pages
 */
export class Heading extends PureComponent {
    /**
     * @constructor
     * @param {any} props
     **/
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
    /** The text that should be displayed */
    text: PropTypes.string.isRequired
}