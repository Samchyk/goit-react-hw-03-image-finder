import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
   componentDidMount() {
      window.addEventListener('keydown', this.handelKeyUp);
   }
   componentWillUnmount() {
      window.removeEventListener('keydown', this.handelKeyUp);
   }
   handelKeyUp = e => {
      if (e.code === 'Escape') {
         this.addCloseClass();
         setTimeout(() => {
            this.props.onClose();
         }, 1000);
      }
   };
   handleBackdropClick = e => {
      if (e.target === e.currentTarget) {
         this.addCloseClass();
         setTimeout(() => {
            this.props.onClose();
         }, 1000);
      }
   };
   addCloseClass = () => {
      const Overlay = document.querySelector('#CloseAnimateOverlay');
      const Modal = document.querySelector('#CloseAnimateModal');
      Overlay.classList.add(`${s.CloseAnimate}`);
      Modal.classList.add(`${s.CloseAnimate}`);
   };
   render() {
      const { url, alt } = this.props;
      return createPortal(
         <div
            id="CloseAnimateOverlay"
            className={s.Overlay}
            onClick={this.handleBackdropClick}
         >
            <div id="CloseAnimateModal" className={s.Modal}>
               <img src={url} alt={alt} />
            </div>
         </div>,
         modalRoot
      );
   }
}
Modal.propTypes = {
   url: PropTypes.string.isRequired,
   alt: PropTypes.string.isRequired,
   onClose: PropTypes.func.isRequired,
};
export default Modal;
