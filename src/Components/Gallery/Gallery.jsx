import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './Gallery.module.css';

class Gallery extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selected_image: props.gallery[0],
        }
    }
    selectImage = (source) => {
        this.setState({
            selected_image: source
        });
    }
    render () {
        const {gallery} = this.props;
        return (
            <div className={styles.product_view}>
                {/* Image Gallery */}
                <div className={styles.gallery}>
                    { gallery.map(imageSource => {
                        return (
                            <img key={imageSource}
                                 src={imageSource}
                                 alt={'asl'}
                                 className={styles.gallery__image}
                                 onClick={() => this.selectImage(imageSource)}
                            />
                        )
                    })
                    }

                </div>

                {/* Image in focus */}
                <div className={styles.product_view__main}>
                    <img src={this.state.selected_image} alt={'main image'}
                         className={styles.product_view__main__image}/>
                </div>
            </div>
        )
    }
}
export default Gallery;

Gallery.propTypes = {
    gallery: PropTypes.array.isRequired
}