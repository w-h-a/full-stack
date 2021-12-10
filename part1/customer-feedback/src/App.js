import React, { useState } from 'react'

const Content =
    ({ msg }) =>
        <>
            <p>
                {msg}
            </p>
        </>

const Figure =
    ({ text, value }) =>
        <div>
            {text} {value}
        </div>


const Figures =
    ({ model }) =>
        (total =>
            total === 0
                ? <>nein feedback</>
                : (viewFigures =>
                    viewFigures
                )(
                    <>
                        <Figure text={"good"} value={model.good} />
                        <Figure text={"neutral"} value={model.neutral} />
                        <Figure text={"bad"} value={model.bad} />
                        <Figure text={"total"} value={total} />
                        <Figure text={"avg"} value={1*model.good/total + 0*model.neutral/total + -1*model.bad/total} />
                        <Figure text={"%positive"} value={(model.good/total)*100} />
                    </>
                )
        )(model.good + model.neutral + model.bad)

const Button =
    ({ handler, text }) =>
        <>
            <button onClick={handler}>
                {text}
            </button>
        </>

const App =
    () => {
        const [ model, update ] =
            useState({ good: 0, neutral: 0, bad: 0 })

        return (
            <div>
                <Content msg={"please give feedback"}/>
                <Button
                    handler={() => update({ ...model, good: model.good+1 })}
                    text={"good"}
                />
                <Button
                    handler={() => update({ ...model, neutral: model.neutral+1 })}
                    text={"neutral"}
                />
                <Button
                    handler={() => update({ ...model, bad: model.bad+1 })}
                    text={"bad"}
                />
                <Content msg={"some figures assuming data is coming in from same type of entity ;-)"}/>
                <Figures model={model}/>
            </div>
        )
    }

export default App
