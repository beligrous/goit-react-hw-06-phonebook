import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { addContact, delContact } from 'redux/contacts-slice';
import { setFilter } from 'redux/filter-slice';
import { getContacts, getfilter } from 'redux/selectors';

export function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getfilter);
  const dispatch = useDispatch();
  let initContacts = contacts ? contacts : [];

  const formSubmit = data => {
    const { name, number } = data;
    const newContact = {
      name,
      id: nanoid(),
      number,
    };
    const nonEqualArray = initContacts.reduce((acc, item) => {
      item.name.toLowerCase() !== newContact.name.toLowerCase() &&
        acc.push(item);
      return acc;
    }, []);

    if (nonEqualArray.length === initContacts.length) {
      dispatch(addContact(newContact));
    } else {
      alert(`${newContact.name} is already in contacts!`);
    }
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
