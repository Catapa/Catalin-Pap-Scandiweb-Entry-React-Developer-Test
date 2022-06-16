import React, {PureComponent} from 'react';
import styles from './Backdrop.module.css';

export class Backdrop extends PureComponent {
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