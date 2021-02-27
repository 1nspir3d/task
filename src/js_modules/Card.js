import {Link} from 'react-router-dom'

export default function Card(props) {
    if(!props.cats) {
        return <div className="no-result">No Cats Available</div>
    } else {
        return(
            <div className="cards">
                {props.cats.map((item, index) => {
                    return(
                    <div key={index} className="cards__item">
                        <img className="cat-image" src={item.url} alt={item.breeds.name}></img>
                        <Link to={`/${item.id}`} className="cards__button">View Details</Link>
                    </div>)
                })}
            </div>
        )
    }
    
}