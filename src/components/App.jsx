import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import { addContact } from 'redux/contacts-slice';
import { getContacts } from 'redux/selectors';

export function App() {
  const contacts = useSelector(getContacts);
  // const filter = useSelector(getFilter);
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

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />
      <div>
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </Container>
  );
}
