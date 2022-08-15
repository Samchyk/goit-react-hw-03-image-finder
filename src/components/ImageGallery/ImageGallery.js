import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, openModal }) {
   return (
      <ul id="ImageGallery" className={s.ImageGallery}>
         {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
               key={id}
               webformatURL={webformatURL}
               alt={tags}
               onOpen={() => openModal(largeImageURL, tags)}
            />
         ))}
      </ul>
   );
}


ImageGallery.propTypes = {
   images: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         webformatURL: PropTypes.string,
         largeImageURL: PropTypes.string,
         tags: PropTypes.string,
      })
   ),
   openModal: PropTypes.func.isRequired,
};
