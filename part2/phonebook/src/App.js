import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Header =
    ({ title }) =>
        <>
            <h2>{title}</h2>
        </>

const Filter =
    ({ handler, text }) =>
        <>
            {text}: <input onChange={handler} />
        </>

const Submit =
    ({ type, text }) =>
        <>
            <button type={type}>
                {text}
            </button>
        </>

const Form =
    ({ handler }) =>
        <>
            <form onSubmit={handler}>
                <div>
                    name: <input />
                </div>
                <div>
                    number: <input />
                </div>
                <div>
                    <Submit
                        type={"submit"}
                        text={"add"}
                    />
                </div>
            </form>
        </>

const Numbers =
    ({ persons, controller }) =>
        <>
            <ul>
                {persons.map(person =>
                    <li key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => controller({ type: "DELETE", payload: person })}>
                            DELETE
                        </button>
                    </li>
                )}
            </ul>
        </>

const App =
    () => {
        const init =
            {
                persons: [],
                toShow: [],
                getPersons: true,
                toAdd: null,
                toDelete: null,
                toEditNum: null,
            }
        const [ model, update ] = useState(init)
        useEffect(() => {
            if (model.getPersons) {
                personService
                    .getAll()
                    .then(persons => controller({ type: "GET_PERSONS_SUCCESS", payload: persons }))
            }
        }, [model.getPersons])
        useEffect(() => {
            if (model.toAdd) {
                personService
                    .postNew(model.toAdd)
                    .then(person => controller({ type: "POST_PERSON_SUCCESS" }))
            }
        }, [model.toAdd])
        useEffect(() => {
            if (model.toDelete) {
                personService
                    .deletePerson(model.toDelete)
                    .then(_ => controller({ type: "DELETE_PERSON_SUCCESS" }))
            }
        }, [model.toDelete])
        useEffect(() => {
            if (model.toEditNum) {
                personService
                    .putNum(model.toEditNum)
                    .then(_ => controller({ type: "PUT_PERSON_SUCCESS" }))
            }
        }, [model.toEditNum])

        function controller(msg) {
            switch (msg.type) {
                case "SUBMIT": {
                    msg.payload.preventDefault()
                    const newName = msg.payload.target[0].value
                    const newNum = msg.payload.target[1].value
                    const found = model.persons.find(ele => ele.name === newName)
                    if (newName === "" || newName === undefined) {
                        alert("Stop that!")
                        update({...model})
                    } else if (found) {
                        if (window.confirm(`Want to edit ${newName}'s number?`)) {
                            update({...model, toEditNum: { name: newName, number: newNum, id: found.id }})
                        } else {
                            update({...model})
                        }
                    } else {
                        update({...model, toAdd: { name: newName, number: newNum }})
                    }
                    msg.payload.target.reset()
                    break
                }
                case "FILTER": {
                    const val = msg.payload.target.value
                    model.toShow =
                        model.persons.filter(p => p.name.toLowerCase().includes(val.toLowerCase()))
                    update({...model})
                    break
                }
                case "DELETE": {
                    if (window.confirm(`Delete ${msg.payload.name}`)) {
                        update({...model, toDelete: msg.payload})
                    }
                    break
                }
                case "GET_PERSONS_SUCCESS": {
                    model.persons = msg.payload
                    update({...model, toShow: model.persons, getPersons: false})
                    break
                }
                case "POST_PERSON_SUCCESS": {
                    update({...model, getPersons: true, toAdd: null})
                    break
                }
                case "DELETE_PERSON_SUCCESS": {
                    update({...model, getPersons: true, toDelete: null})
                    break
                }
                case "PUT_PERSON_SUCCESS": {
                    update({...model, getPersons: true, toEditNum: null})
                    break
                }
                default: {
                    break
                }
            }
        }

        return (
            <div>
                <Header title={"Phonebook"} />
                <Filter
                    handler={e => controller({ type: "FILTER", payload: e })}
                    text={"filter"}
                />
                <Header title={"Add"} />
                <Form handler={e => controller({ type: "SUBMIT", payload: e })} />
                <Header title={"Numbers"} />
                <Numbers
                    persons={model.toShow}
                    controller={controller}
                />
            </div>
        )
    }

export default App
