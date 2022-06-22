import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './Gallery.module.css';

/**
 * Component that displays a gallery of product images
 */
class Gallery extends PureComponent {
    /**
     * @constructor
     * @param {any} props
     **/
    constructor(props) {
        super(props);
        this.state = {
            selected_image: props.gallery[0],
        }
    }
    /**
     * Selects a certain image to be highlighted in the gallery
     * @function
     * @param {string} source - image's path
     */
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

                {/* Image in focus (highlighted) */}
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
    /** An array with the paths to all the images to be displayed in the gallery */
    gallery: PropTypes.array.isRequired
}