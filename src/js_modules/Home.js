import {useEffect, useState} from 'react';
import Form from './Form'
import Card from './Card'

export default function Home() {
    const [breeds, setBreeds] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [options, setOptions] = useState();
    const [cats, setCats] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch('https://api.thecatapi.com/v1/breeds?api_key=84e25b2c-5d42-4ee9-a868-57ebde785aec')
        .then(
            (response) => response.json()
        )
        .then(
            (data) => {
                breeds.length === 0 ? setBreeds(data) : setIsReady(true);
            }
        )
    },[breeds])

    useEffect(() => {
        if(isReady) {
            setOptions(breeds.map((item, index) => <option value={item.id} key={index}>{item.name}</option>))
        }
    },[isReady, breeds])



    function handleChange(e) {
        console.log(e.target.value);
        fetch(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=10&breed_id=${e.target.value}`)
        .then(
            (response) => {
                return response.json()}
        ).then(
            (data) => {
                console.log(data);
                setCats(data)
                setPage(page+1)
                console.log(cats);
            }
        )
    }


    if(!isReady) {
        return <section className="loading">Searching for every available breed!</section>
    } else {
        return(
            <section className="search">
                <h1 className='title'>Search for Cats</h1>
                <Form func={handleChange} options={options} />
                <Card cats={cats}/>
            </section>
        )
    }
}