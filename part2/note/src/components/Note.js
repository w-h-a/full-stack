import React from 'react'

const Note =
    ({ note, toggleImportance }) =>
        <>
            <li>
                {note.content}
                <button onClick={toggleImportance}>
                    {note.important ? "make not important" : "make important"}
                </button>
            </li>
        </>

export default Note
