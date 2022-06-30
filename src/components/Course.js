function Course ({ course }) {
  console.log(course.parts)
  let sum = 0
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => {
         sum += part.exercises
        return (
        <p key={part.id}>{part.name} {part.exercises}</p>
        )
      })
      }
    <p> total of {sum} exercises</p>
    </div>
  );
}

export default Course;