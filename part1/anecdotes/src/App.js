import React, { useState } from 'react'

const Header =
    ({ msg }) =>
        <>
            <h1>{msg}</h1>
        </>

const Anecdote =
    ({ anec }) =>
        <>
            <p>
                {anec}
            </p>
        </>

const Votes =
    ({ count }) =>
        <>
            <p>
                has {count} votes
            </p>
        </>

const Button =
    ({ handler, text }) =>
        <>
            <button onClick={handler}>
                {text}
            </button>
        </>

const App =
    () => {
        const anecdotes = [
          'If it hurts, do it more often',
          'Adding manpower to a late software project makes it later!',
          'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
          'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
          'Premature optimization is the root of all evil.',
          'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
          'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
        ]

        const [ model, update ] =
            useState(
                {
                    anecdotes: anecdotes,
                    selected: 0,
                    votes: Array.from(anecdotes, ele => 0),
                    idxWithMostest: 0
                }
            )

        function controller(msg) {
            switch (msg) {
                case "INCREASE": {
                    const votes =
                        Array.from(model.votes, (ele, idx) => idx === model.selected ? ele + 1 : ele)
                    return update({...model, votes: votes, idxWithMostest: votes.indexOf(Math.max(...votes))})
                }
                case "NEXT": {
                    return update({...model, selected: randomIntOfMinMax(0, model.anecdotes.length-1)})
                }
                default: {
                    return update({...model})
                }
            }
        }

        return (
          <div>
            <Header msg={"Programmer Anecdotes!"}/>
            <Anecdote anec={model.anecdotes[model.selected]} />
            <Votes count={model.votes[model.selected]} />
            <Button
                handler={() => controller("INCREASE")}
                text={"+1"}
            />
            <Button
                handler={() => controller("NEXT")}
                text={"next"}
            />
            <Header msg={"Winner So Far!"}/>
            <Anecdote anec={model.anecdotes[model.idxWithMostest]}/>
            <Votes count={model.votes[model.idxWithMostest]} />
          </div>
        )
    }

function randomIntOfMinMax (min, max) {
    return Math.floor (Math.random () * (max - min + 1) + min)
}

export default App
