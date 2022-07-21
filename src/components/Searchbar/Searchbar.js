import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

class Searchbar extends Component {
   state = { value: '' };
   onFormSubmit = e => {
      e.preventDefault();
      this.props.onSubmit(this.state.value);
   };
   onChangeInput = e => {
      const value = e.target.value;
      this.setState({ value });
   };
   render() {
      const { value } = this.state;
      return (
         <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={this.onFormSubmit}>
               <button type="submit" className={s.SearchFormButton}></button>
               <label className={s.SearchFormButtonLabel}></label>
               <input
                  className={s.SearchFormInput}
                  type="text"
                  autoComplete="off"
                  autoFocus={true}
                  value={value}
                  onChange={this.onChangeInput}
                  placeholder="Search images and photos"
               />
            </form>
         </header>
      );
   }
}
Searchbar.propTypes = {
   onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
