import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delContact } from 'redux/contacts-slice';
import { getContacts, getFilter } from '../../redux/selectors';
import { List, Delete, ListItem } from './contact-list.styled';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  let initContacts = contacts ? contacts : [];

  const onClickDelete = id => {
    dispatch(delContact(id));
  };

  const findContacts = () => {
    let filtered;
    if (filter === '') {
      return initContacts;
    } else {
      filtered = initContacts.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return filtered;
  };

  return (
    <List>
      {findContacts().map(item => {
        return (
          <ListItem key={item.id}>
            <span>
              {item.name}:{item.number}
            </span>

            <Delete onClick={() => onClickDelete(item.id)} type="button">
              Delete
            </Delete>
          </ListItem>
        );
      })}
    </List>
  );
}

export default ContactList;
