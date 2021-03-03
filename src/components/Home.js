import {useEffect, useState} from 'react';
import Form from './Form'
import Card from './Card'

export default function Home(history) {
    const [breeds, setBreeds] = useState([]);
    const [isBreedsReady, setIsBreedsReady] = useState(false);
    const [isImagesLoaded, setIsIamagesLoaded] = useState(false);
    const [currentBreed, setCurrentBreed] = useState('');
    const [isAbleToLoad, setIsAbleToLoad] = useState(true);
    const [options, setOptions] = useState([]);
    const [cats, setCats] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setCurrentBreed(() => {
            let breed = history.location.search.split('=')
            return breed[1]
        })
        fetch('https://api.thecatapi.com/v1/breeds?api_key=84e25b2c-5d42-4ee9-a868-57ebde785aec')
        .then(
            (response) => response.json()
        )
        .then(
            (data) => {
                breeds.length === 0 ? setBreeds(data) : setIsBreedsReady(true);
            }
        )

        handlePageLoad(currentBreed)
    },[breeds])

    useEffect(() => {
        if(isBreedsReady) {
            setOptions(breeds.map((item, index) => <option value={item.id} key={index}>{item.name}</option>))
        }
    },[isBreedsReady, breeds])

    function handlePageLoad(breed) {
        if(breed) {
            fetch(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${breed}`)
            .then(
                (response) => {
                    return response.json()}
            ).then(
                (data) => {
                    setCats(data)
                    setIsIamagesLoaded(true)
                    setPage(1)
                    setIsAbleToLoad(true)
                }
            )   
        }
    }

    function handleChange(e) {
        if (e === undefined || e.target.value === '' ) {
            setCats([])
            setIsAbleToLoad(false)
            setIsIamagesLoaded(false)
            setCurrentBreed('')
            return
        }
        setCurrentBreed(e.target.value)
        fetch(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${e.target.value}`)
        .then(
            (response) => {
                return response.json()}
        ).then(
            (data) => {
                setCats(data)
                setIsIamagesLoaded(true)
                setPage(1)
                setIsAbleToLoad(true)
            }
        )
    }

    function loadMore() {
        fetch(`https://api.thecatapi.com/v1/images/search?page=${page+1}&limit=10&breed_id=${currentBreed}`)
        .then(
            (response) => {
                return response.json()}
        ).then(
            (data) => {
                let newCats = []
                data.forEach(cat => {
                    let newCat = cats.find(newCat => {
                        return cat.id === newCat.id
                    })
                    if(!newCat) {
                        newCats.push(cat)
                    }
                })
                if(!newCats.length) {
                    setIsAbleToLoad(false)
                }
                setCats((oldCats) => ([...oldCats, ...newCats]))
            }
        )
        setIsIamagesLoaded(true)
        setPage(page+1)
    }

    if(!isBreedsReady) {
        return <section className="loading">Searching for available breeds!</section>
    } else {
        return(
            <section className="search">
                <h1 className='title'>Search for Cats</h1>
                <Form func={handleChange} options={options} value={currentBreed}/>
                <Card cats={cats}/>
                {
                    (isImagesLoaded && isAbleToLoad) ?
                    <button className="load-more" onClick={loadMore}>Load more</button> :
                    <button disabled style={{display: 'none'}} className="load-more">Load more</button>
                }
            </section>
        )
    }
}