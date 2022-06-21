import React, {useState, useEffect} from 'react'
import { db } from '../firebase'


const LinkForm = (props) => {

    const initialState =  {
        url: "",
        name: "",
        description: "",
    }   
    const [values, setValues] = useState(initialState)

    const handleInputChange = e =>{
        //console.log(e.target.value)
        const {name, value} = e.target; 
        setValues({...values, [name]:value})
    }
    const handleSubmit = e =>{
        e.preventDefault();
        console.log(values)
        props.addOrEditLink(values);
        setValues({...initialState})
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get()
        setValues({...doc.data()})
    }

    useEffect( () => {
        if(props.currentID === ""){
            setValues({...initialState})
        }else{
           getLinkById(props.currentID)
        } 
    }, [props.currentID])

    return(
        
        <form className='card card-body' onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-ligth">
                    <i className="material-icons">insert_link</i>
                </div>

                <input type="text" name="url" className="form-control" placeholder="https://someurl.com" value={values.url} onChange={handleInputChange}/>
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-ligth">
                    <i className="material-icons">create</i>
                </div>

                <input type="text" name="name" className="form-control" placeholder="Website name" value={values.name} onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <textarea name="description" rows="3" className="form-control" placeholder="Write a description" value={values.description} onChange={handleInputChange}></textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentID === "" ? 'SAVE' : 'UPDATE'}
            </button>
        </form>
    )
}   


export default LinkForm;    