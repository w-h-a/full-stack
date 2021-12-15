import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App =
    () => {
        const init =
            {
                notes: [],
                showAll: false,
                noteObject: null,
                noteToToggleImportance: null,
                getNotes: true
            }
        const [ model, update ] = useState(init)
        useEffect(() => {
            if (model.getNotes) {
                noteService
                    .getAll()
                    .then(notes => controller({ type: "GET_NOTES_SUCCESS", payload: notes }))
            }
        }, [model.getNotes])
        useEffect(() => {
            if (model.noteObject) {
                noteService
                    .postNew(model.noteObject)
                    .then(note => controller({ type: "POST_NOTE_SUCCESS" }))
            }
        }, [model.noteObject])
        useEffect(() => {
            if (model.noteToToggleImportance) {
                noteService
                    .putImportance(model.noteToToggleImportance.id, model.noteToToggleImportance)
                    .then(note => controller({ type: "PUT_NOTE_SUCCESS" }))
            }
        }, [model.noteToToggleImportance])

        function controller(msg) {
            switch (msg.type) {
                case "TOGGLE_SHOW": {
                    update({ ...model, showAll: !model.showAll })
                    break
                }
                case "TOGGLE_IMPORTANCE": {
                    update({ ...model, noteToToggleImportance: { ...msg.payload, important: !msg.payload.important } })
                    break
                }
                case "ADD_NOTE": {
                    msg.payload.preventDefault()
                    model.noteObject = {
                      content: msg.payload.target[0].value,
                      date: new Date(),
                      important: Math.random() > 0.5,
                    }
                    msg.payload.target.reset()
                    update({ ...model })
                    break
                }
                case "GET_NOTES_SUCCESS": {
                    update({ ...model, notes: msg.payload, getNotes: false })
                    break
                }
                case "POST_NOTE_SUCCESS": {
                    update({ ...model, noteObject: null, getNotes: true })
                    break
                }
                case "PUT_NOTE_SUCCESS": {
                    update({ ...model, noteToToggleImportance: null, getNotes: true })
                    break
                }
                default: {
                    break
                }
            }
        }

        return (
            <div>
                <h1>Notes</h1>
                <div>
                    <button onClick={() => controller({ type: "TOGGLE_SHOW" })}>
                        show {model.showAll ? "important" : "all"}
                    </button>
                </div>
                <ul>
                    {model.showAll
                        ? model.notes
                            .map(note =>
                                <Note
                                    key={note.id}
                                    note={note}
                                    toggleImportance={() => controller({ type: "TOGGLE_IMPORTANCE", payload: note })}
                                />
                            )
                        : model.notes
                            .filter(note => note.important)
                            .map(note =>
                                <Note
                                    key={note.id}
                                    note={note}
                                    toggleImportance={() => controller({ type: "TOGGLE_IMPORTANCE", payload: note })}
                                />
                            )
                    }
                </ul>
                <form onSubmit={e => controller({ type: "ADD_NOTE", payload: e })}>
                    <input />
                    <button type="submit">save</button>
                </form>
            </div>
        )
    }

export default App
