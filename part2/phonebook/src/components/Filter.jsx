const Filter = (props) => {

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        props.setFilterKeyword(event.target.value)
    }
    
    return (
        <form>
        <div>
          filter down with <input value={props.filterKeyword}
                                  onChange={handleFilterChange} />
        </div>
        </form>
    )
}

export default Filter
