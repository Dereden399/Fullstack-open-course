import React, { useState, useEffect } from 'react'
import PersonService from './Services/PersonService'

import Filter from './Components/Filter'
import AddPersonForm from './Components/AddPersonForm'
import Persons from './Components/Persons'
import Notification from './Components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nowFilter, setNowFilter] = useState('')
  const [notificationText, setNotificationText] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const makeNotification = (type, text) => {
    if (type === 'add') {
      setNotificationType('success')
      setNotificationText(text)
      setTimeout(() => { setNotificationText(null); setNotificationType(null) }, 2000)
    }
    if (type === 'delete') {
      setNotificationType('success')
      setNotificationText(text)
      setTimeout(() => { setNotificationText(null); setNotificationType(null) }, 2000)
    }
    if (type === 'change') {
      setNotificationType('success')
      setNotificationText(text)
      setTimeout(() => { setNotificationText(null); setNotificationType(null) }, 2000)
    }
    if (type === 'error') {
      setNotificationType('error')
      setNotificationText(text)
      setTimeout(() => { setNotificationText(null); setNotificationType(null) }, 2000)
    }
  }

  useEffect(() => {
    PersonService.getAll()
      .then(x => setPersons(x))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(x => x.name.toLowerCase() === newName.toLowerCase().trim())) {
      let result = window.confirm(`${newName} on jo listassa, haluatko muuttaa henkilön numeron?`)
      if (result) {
        const person = persons.find(x => x.name.toLowerCase() === newName.toLowerCase().trim())
        const changedPerson = { ...person, number: newNumber }
        PersonService.update(changedPerson.id.toString(), changedPerson).then(response => {
          setPersons(persons.map(y => y.id !== person.id ? y : response))
          makeNotification('change', `${newName} on muokattu`)
        })
        .catch(x => makeNotification('error', x.response.data.error))
      }
    }
    else {
      const person = {
        name: newName.trim(),
        number: newNumber.trim()
      }
      PersonService.create(person).then(x => {
        setPersons(persons.concat(x))
        makeNotification('add', `${x.name} on lisätty`)
      })
      .catch(error => {
        makeNotification('error', error.response.data.error)
      })

    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    let result = window.confirm("Haluatko poistaa henkilön listasta?")
    if (result)
      PersonService.deleteById(id)
        .then(x => makeNotification('delete', `${persons.find(x => x.id === id).name} on poistettu!`))
        .then(() => setPersons(persons.filter(x => x.id !== id))) 
  }

  const personsToShow = nowFilter === '' ? persons : persons.filter(x => x.name.toLowerCase().includes(nowFilter.toLowerCase()))


  return (
    <div>
      <h2 style={{fontSize: 50, textAlign: 'center', color: 'Chocolate'}}>PuhelinLuettelo</h2>
      <Filter filter={nowFilter} filterHandler={setNowFilter} />
      <hr/>
      <Notification type={notificationType} text={notificationText} />
      <h2 style={{fontSize: 40, margin: 10, color: 'chocolate'}}>Lisätä uuden henkilön</h2>
      <AddPersonForm name={newName} nameHandler={setNewName} number={newNumber} numberHandler={setNewNumber} addPersonHandler={addPerson} />
      <hr />
      <h2 style={{fontSize: 40, margin: 10, color: 'chocolate'}}>Henkilöt</h2>
      <Persons toShow={personsToShow} deleteHandler={deletePerson} />
    </div>
  )

}

export default App