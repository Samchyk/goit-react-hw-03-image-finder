import ImageGallery from 'components/ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar/Searchbar';
import React, { Component } from 'react';
import SearchApi from 'services/Api';
import Notiflix from 'notiflix';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import * as Scroll from 'react-scroll';

class App extends Component {
   state = {
      searchName: ' ',
      page: 1,
      perPage: 12,
      images: [],
      showModal: false,
      loading: false,
      modal: { url: '', alt: '' },
   };
  
   componentDidUpdate(prevProps, prevState) {
      const { searchName, perPage, page, images } = this.state;

      if (prevState.page !== page || prevState.searchName !== searchName) {
         this.setState({ showLoadMore: false, loading: true });
         SearchApi(searchName, page, perPage)
            .then(data => {
               const filterDataHits = data.hits.map(img => {
                  return Object.fromEntries(
                     Object.entries(img).filter(([key]) =>
                        [
                           'id',
                           'tags',
                           'largeImageURL',
                           'webformatURL',
                        ].includes(key)
                     )
                  );
               });
               this.setState(prev => ({
                  images: [...prev.images, ...filterDataHits],
                  totalHits: data.totalHits,
                  loading: false,
               }));
               if (data.total !== data.hits.length) {
                  this.setState({ showLoadMore: true });
               }
               if (page === 1) {
                  Notiflix.Notify.success(
                     `Hooray! We found ${data.totalHits} images.`
                  );
               }
               if (data.total <= images.length + perPage) {
                  this.setState({ showLoadMore: false });
                  Notiflix.Notify.info(
                     "We're sorry, but you've reached the end of search results."
                  );
               }
            })
            .catch(this.onApiError);
      }
   }
   onApiError = () => {
      Notiflix.Notify.failure(
         'Sorry, there are no images matching your search query. Please try again.'
      );
      this.setState({ showLoadMore: false, loading: false });
   };

   onSubmit = name => {
      this.setState(prev =>
         prev.searchName === name && prev.page === 1
            ? { page: 1 }
            : {
                 searchName: name,
                 page: 1,
                 images: [],
              }
      );
   };

   onloadeMore = () => {
      this.setState(prev => ({
         page: prev.page + 1,
      }));
      this.scrollSlowly();
   };

   scrollSlowly = () => {
      const { height: cardHeight } = document
         .querySelector('#ImageGallery')
         .firstElementChild.getBoundingClientRect();
      Scroll.animateScroll.scrollMore(cardHeight * 2);
   };
   openModal = (url, alt) => {
      const modal = { url, alt };
      this.setState({
         showModal: true,
         modal,
      });
   };
   closeModal = () => {
      this.setState({ showModal: false });
   };
   render() {
      const { images, showModal, modal, showLoadMore, loading } =
         this.state;
      return (
         <div className="App">
            <Searchbar onSubmit={this.onSubmit} />
            {showModal && (
               <Modal
                  url={modal.url}
                  alt={modal.alt}
                  onClose={this.closeModal}
               />
            )}
            <ImageGallery images={images} openModal={this.openModal} />
            {loading && <Loader />}
            {showLoadMore && (
               <Button onClick={this.onloadeMore} title="Load more" />
            )}
         </div>
      );
   }
}

export default App;
