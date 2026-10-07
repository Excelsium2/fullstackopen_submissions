import Part from './Part'




const Content = ({parts}) => {
    const total = parts.reduce((sum, part) => {
        console.log('sum', sum, part)
        return sum + part.exercises
    }, 0)
    return (
        <div>
             {parts.map(part => 
                    (<Part key={part.id} name={part.name} exercises={part.exercises}/>))}
            <b> total of {total} exercises </b>
        </div>
    )
}

export default Content



