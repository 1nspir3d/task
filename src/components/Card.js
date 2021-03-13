import {Link} from 'react-router-dom'

export default function Card(props) {
    if(props.cats.length === 0 || !props.cats) {
        return <div className="no-result">No Cats Available</div>
    } else {
        return(
            <div className="cards">
                {props.cats.map((item, index) => {
                    if(item !== undefined) {
                        return(
                            <div key={index} className="cards__item">
                                <img className="cat-image" alt='' src={item.url}></img>
                                <Link to={`/cat-browser/${item.id}`} className="cards__button">View Details</Link>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
    
}