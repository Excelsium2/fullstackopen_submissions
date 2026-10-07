


const Searchbar = (props) => {
    return (
        <div>
            find countries 
            <input
                value={props.filter}
                onChange={props.handleChange}
            />
        </div>
    )
}

export default Searchbar








