/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
import { useState, useEffect } from "react";
import APIHelper from '../../components/APIHelper'
import './index.css'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const GoodNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='good'>
      {message}
    </div>
  )
}

function PersonForm(props) {
  return (
    <div>
      <form onSubmit={props.addName}>
        Name: <input value={props.newName} onChange={props.handleNameChange} />
        <div>
          Number:{" "}
          <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
}

function Numbers(props) {
  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
          {props.persons.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td><button onClick={() => props.handleDeleteButton(person.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const [goodMessage, setGoodMessage] = useState(null)


  useEffect(() => {
    APIHelper
      .getAll()
      .then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.find((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the number?`)) {
        APIHelper
          .update(persons.find((person) => person.name === newName).id, personObject)
          .then((updatedPerson) => {
            setPersons(persons.map((person) => person.id === updatedPerson.id ? updatedPerson : person));
            setGoodMessage(`Note ${newName}'s number was updated`)  
            setTimeout(() => {
              setGoodMessage(null)
            }, 5000)
          }
            
        )
        .catch (error => {
          setErrorMessage(
            `Note '${newName}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          let id = persons.find((person) => person.name === newName).id
          setPersons(persons.filter(n => n.id !== id))
        }
        );
        setNewName("");
        setNewNumber("");
      }
    } else {

      APIHelper
      .create(personObject)
      .then(returnedPersonObject => {
        setPersons(persons.concat(returnedPersonObject))
        setNewName("");
        setNewNumber("");
        setGoodMessage(`Note '${newName}''s contact was added`)  
            setTimeout(() => {
              setGoodMessage(null)
            }, 5000)
      })
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDeleteButton = (id) => {
    if (id) {
    APIHelper
      .remove(id)
      .then(returnedPersonObject => {
        setPersons(persons.filter(n => n.id !== id))
      })
    }
  }

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <GoodNotification message={goodMessage} />
      <h2>Phonebook</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Numbers persons={persons} handleDeleteButton={handleDeleteButton} />
    </div>
  );
}

export default App;
