import React, {useState} from 'react';
import NoteEdit from './NoteEdit';
import useNotesContext from '../hooks/use-notes-context';

function NoteShow({note}){

    const [showEdit, setShowEdit]=useState(false);

    const {deleteNoteById}=useNotesContext();
    const handleDeleteClick=()=>{
        deleteNoteById(note.id);
    }

    const handleEditClick=()=>{
        setShowEdit(!showEdit);
    }

    const handleSubmit = () => {
        setShowEdit(false);
      };
    let title1= <div><h6 style={{fontSize:'1.25rem', fontWeight:'550'}}> {note.title}</h6> <p>{note.content}</p><br/></div>
    if(showEdit){
        title1=<NoteEdit note={note} onSubmit={handleSubmit}/>
    }

    return <div className='book-show'>
       {title1}
    
    <div className='actions'>
        <button className='edit' onClick={handleEditClick}>Edit</button>
    <button className='delete' onClick={handleDeleteClick}>X</button>
    </div>
    
    </div>
}

export default NoteShow;