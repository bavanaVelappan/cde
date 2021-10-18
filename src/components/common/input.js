
const Input = ({label, name, onChange, value, error, type})=>{
    return (
        <div className="md-3">
            <label htmlFor={name} className="form-label">{label}</label>
            <input autoFocus type={type} className="form-control" id={name} name={name} onChange={onChange}  value={value}/>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}

export default Input;