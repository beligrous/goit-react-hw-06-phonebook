// import { nanoid } from 'nanoid';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export function App() {
  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <div>
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </Container>
  );
}
