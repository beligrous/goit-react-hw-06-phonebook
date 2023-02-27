import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contacts-slice';
import { Form, Button, Input } from './contact-form.styled';

function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  let initContacts = contacts ? contacts : [];
  const dispatch = useDispatch();

  const handleSubmitContact = e => {
    e.preventDefault();
    const data = { name, number };
    addingContact(data);
  };

  const addingContact = data => {
    const nonEqualArray = initContacts.reduce((acc, item) => {
      item.name.toLowerCase() !== data.name.toLowerCase() && acc.push(item);
      return acc;
    }, []);

    if (nonEqualArray.length === initContacts.length) {
      dispatch(addContact(data));
      reset();
    } else {
      alert(`${data.name} is already in contacts!`);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmitContact}>
      <label>
        Name
        <Input
          type="text"
          onChange={({ target }) => setName(target.value)}
          value={name}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <Input
          onChange={({ target }) => setNumber(target.value)}
          value={number}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

export default ContactForm;
