const Checkbox = ({title, state, onChange}) => {
    return (
        <div>
            <input className="check-box"
                type="checkbox"
                onChange={onChange}
                checked={state}
            />
            <label>{title}</label>
        </div>
    )
}
export default Checkbox;
