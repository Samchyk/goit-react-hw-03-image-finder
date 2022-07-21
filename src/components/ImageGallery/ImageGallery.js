import s from './ImageGallery.module.css';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ params, openModal }) {
   return (
      <ul id="ImageGallery" className={s.ImageGallery}>
         {params.map(({ id, webformatURL, largeImageURL, tags }) => (
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
   params: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         webformatURL: PropTypes.string,
         largeImageURL: PropTypes.string,
         tags: PropTypes.string,
      })
   ),
   openModal: PropTypes.func.isRequired,
};
