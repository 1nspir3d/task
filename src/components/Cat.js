import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

export default function Cat(props) {

    const [cat, setCat] = useState(false)

    useEffect(() => {

        fetch(`https://api.thecatapi.com/v1/images/${props.match.params.id}`)
        .then((response) => response.json())
        .then((data) => setCat(data))

    },[props.match.params.id])

    
    if(!cat) {
        return <section className="loading">Loading</section>
    } else {
        return(
            <section className="single">
                <div className="single__item">
                    <Link to={`/task/?breed=${cat.breeds[0].id}`} className="single__button--back">Back</Link>
                    <img className="cat-image__single" src={cat.url} alt={cat.breeds.name}></img> 
                    <h1 className="single__info"><b>{cat.breeds[0].name}</b></h1>
                    <h2 className="single__info">Origin: {cat.breeds[0].origin}</h2>
                    <h3 className="single__info">{cat.breeds[0].temperament}</h3>
                    <p className="single__info">{cat.breeds[0].description}</p>
                </div>
            </section>
        )
    }
}