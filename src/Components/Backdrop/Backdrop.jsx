import React, {PureComponent} from 'react';
import styles from './Backdrop.module.css';

export class Backdrop extends PureComponent {
    constructor(props) {
        super(props);
    }
    render () {
        const {visible} = this.props;
        const visibilityClass = visible ? styles.show : styles.hidden;

        return (
            <div className={`${styles.backdrop} ${visibilityClass}`} onClick={this.props.onClick}>
            </div>
        )
    }
}
export default Backdrop;