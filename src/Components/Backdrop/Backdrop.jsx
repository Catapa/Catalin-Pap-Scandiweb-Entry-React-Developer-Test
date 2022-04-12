import React, {PureComponent} from 'react';
import styles from './Backdrop.module.css';

export class Backdrop extends PureComponent {
    render () {
        return (
            <div className={styles.backdrop}>

            </div>
        )
    }
}

export default Backdrop;