import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { addContact, delContact } from 'redux/contacts-slice';
import { setFilter } from 'redux/filter-slice';

export function App() {
  const contacts = useSelector(store => store.contacts);
  const filter = useSelector(store => store.filter);
  const dispatch = useDispatch();

  const formSubmit = data => {
    const { name, number } = data;
    const newContact = {
      name,
      id: nanoid(),
      number,
    };
    const nonEqualArray = contacts.reduce((acc, item) => {
      item.name.toLowerCase() !== newContact.name.toLowerCase() &&
        acc.push(item);
      return acc;
    }, []);

    if (nonEqualArray.length === contacts.length) {
      dispatch(addContact(newContact));
    } else {
      alert(`${newContact.name} is already in contacts!`);
    }
  };

  const findContacts = () => {
    let filtered;
    if (filter === '') {
      return contacts;
    } else {
      filtered = contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return filtered;
  };

  const onClickDelete = id => {
    dispatch(delContact(id));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />
      <div>
        <h2>Contacts</h2>
        <Filter
          value={filter}
          onChange={({ target }) => dispatch(setFilter(target.value))}
        />
        <ContactList
          findContactsArray={findContacts()}
          onClick={onClickDelete}
        />
      </div>
    </Container>
  );
}
