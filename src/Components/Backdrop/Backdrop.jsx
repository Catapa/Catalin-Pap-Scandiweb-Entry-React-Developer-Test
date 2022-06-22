import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './Backdrop.module.css';

/**
 * Component representing a transparent backdrop
 */
export class Backdrop extends PureComponent {
    /**
     * @constructor
     * @param {any} props
     **/
    constructor(props) {
        super(props);
    }
    render () {
        const {visible} = this.props;
        return (
            visible && <div className={styles.backdrop} onClick={this.props.onClick}>
            </div>
        )
    }
}
export default Backdrop;

Backdrop.propTypes = {
    /** Specify whether the component should be visible or not */
    visible: PropTypes.bool.isRequired,
    /** Reference to the onClick handler */
    onClick: PropTypes.func
}