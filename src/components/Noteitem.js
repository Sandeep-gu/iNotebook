

import NoteContext from '../context/notes/NoteContexts';
import React,{useContext} from 'react';

const Noteitem = (props) => {
    const context = useContext(NoteContext)
    const { note,updateNote } = props;

    const {deleteNote}=context;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa-solid fa-delete-left mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                </div>

            </div>

        </div>
    )
}

export default Noteitem
