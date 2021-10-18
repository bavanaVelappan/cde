
export const validate = (schema, data) => {
    const {error} = schema.validate(data);  
    if(!error) return null;
    const errorObj ={};
    for (let item of error.details) errorObj[item.path[0]] = item.message;
    return errorObj;
}
export const validateSubmit = (e, schema, data)=>{
    e.preventDefault();    
    const errorData = validate(schema, data);
    return errorData;
}
