export default function Form(props) {
    return(
        <form className="breeds">
            <select className="breeds__list" onChange={props.func}>
                <option value=''>Select Breed</option>
                {props.options}
            </select>
        </form>
    )
}