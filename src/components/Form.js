export default function Form(props) {
    return(
        <form className="breeds">
            <select className="breeds__list" value={props.value} onChange={props.func}>
                <option value=''>Select Breed</option>
                {props.options}
            </select>
        </form>
    )
}