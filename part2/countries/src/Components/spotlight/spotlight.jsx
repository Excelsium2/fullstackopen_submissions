
const Spotlight = (props) => {
    if (props.display) {
      return (
        <div>
          <h1> {props.display.name.common} </h1>
          <p>Capital {props.display.capital} </p>
          <p>Area {props.display.area} </p>
          <h1> Languages </h1>
          <ul>
          {Object.entries(props.display.languages).map(([code, language]) => <li key={code}> {language}</li>)}
          </ul>
          <img
            src={props.display.flags.png}
            alt={props.display.flags.alt}
          />
        </div>
      )
    } else {
      return null
    }
  }


export default Spotlight