import React from 'react'
import Course from "./Course"

const Header1 =
    ({ title }) =>
        <>
            <h1>{title}</h1>
        </>

const Header2 =
    ({ name }) =>
        <>
            <h2>{name}</h2>
        </>

const Courses =
    ({ courses }) =>
        <>
            <Header1 title={"Web Dev Curriculum"} />
            <ul>
                {courses.map(course =>
                    <li key={course.id}>
                        <Header2 name={course.name}/>
                        <Course course={course} />
                    </li>
                )}
            </ul>
        </>

const App =
    () => {
        const courses =
        [
            {
              name: 'Half Stack application development',
              id: 1,
              parts: [
                {
                  name: 'Fundamentals of React',
                  exercises: 10,
                  id: 1
                },
                {
                  name: 'Using props to pass data',
                  exercises: 7,
                  id: 2
                },
                {
                  name: 'State of a component',
                  exercises: 14,
                  id: 3
                },
                {
                  name: 'Redux',
                  exercises: 11,
                  id: 4
                }
              ]
            },
            {
              name: 'Node.js',
              id: 2,
              parts: [
                {
                  name: 'Routing',
                  exercises: 3,
                  id: 1
                },
                {
                  name: 'Middlewares',
                  exercises: 7,
                  id: 2
                }
              ]
            }
        ]

        return <Courses courses={courses} />
    }

export default App
