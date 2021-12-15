import React from 'react'

const Part =
    ({ name, exs }) =>
        <>
            {name} {exs}
        </>

const Content =
    ({ parts }) =>
        <div>
            <ul>
                {parts.map(part =>
                    <li key={part.id}>
                        <Part
                            name={part.name}
                            exs={part.exercises}
                        />
                    </li>
                )}
            </ul>
        </div>

const Total =
    ({ parts }) =>
        <div>
            <b>
                {"total of "}
                {parts.reduce((acc, ele) => acc + Number(ele.exercises), 0)}
                {" exercises"}
            </b>
        </div>

const Course =
    ({ course }) =>
        <>
            <Content parts={course.parts} />
            <br/>
            <Total parts={course.parts} />
        </>

export default Course
