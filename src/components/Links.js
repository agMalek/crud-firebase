import React, {useState, useEffect} from 'react'
import LinkForm from './LinkForm'
import {db} from '../firebase'
import { toast } from 'react-toastify' 

const Links = () => {
    
    const [links, setLinks] = useState([])
    const [currentID, setcurrentID] = useState("")

    useEffect( () => {
        console.log('getting data...')
        getLinks()

    }, [])

    const getLinks = () => {
        db.collection('links').onSnapshot(querySnapshot => {
            const docs = [];
            querySnapshot.forEach(doc => {
            /*console.log(doc.data())
                console.log(doc.id) */
                docs.push({...doc.data(), id:doc.id})
            })

            setLinks(docs)  
            
      })
    
    }
    const addOrEditLink = async (linkObjet) => {

        if(currentID === "") {
            await db.collection('links').doc().set(linkObjet)
            toast('Se agrego exitosamente', {type: 'success', autoClose: 3000})
        } 
        else {
            await db.collection('links').doc(currentID).update(linkObjet)
            toast('Se actualizo correctamente', {type: 'info', autoClose: 3000})
            setcurrentID("")
        }
    }

    const onDelete = async (id) => {
        if(window.confirm("estas seguro?")){
            await db.collection('links').doc(id).delete()
            toast('Se borró exitosamente', {type: 'error', autoClose: 3000})
        }
    }
    
    return(
        <div>
            <div className="col-md-4 p-2">
                <LinkForm {...{addOrEditLink, currentID, links}}/>
            </div>

            <div className="col-md-8 p-2">
                {links.map((link) => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons" onClick={() => setcurrentID(link.id)} >create</i>
                                    <i className="material-icons text-danger" onClick={ () => onDelete(link.id)}>close</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Links;