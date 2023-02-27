import React from 'react';
import { Input } from '../ContactForm/contact-form.styled';
import { useSelector, useDispatch } from 'react-redux';
import { getFilter } from '../../redux/selectors';
import { setFilter } from 'redux/filter-slice';

function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onChange = ({ target }) => dispatch(setFilter(target.value));
  return (
    <label>
      Find contacts by name:
      <Input type="text" value={filter} onChange={onChange} />
    </label>
  );
}

export default Filter;
