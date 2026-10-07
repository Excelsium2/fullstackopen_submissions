import Course from './course/Course' 

const Curriculum = ({courses}) => {
    return (
        <div>
            {courses.map(course =><Course course={course}/>)}
         
        </div>
    )
}

export default Curriculum

