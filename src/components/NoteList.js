import React, {useContext} from 'react';
import NotesContext from '../context/notes';
import NoteShow from './NoteShow'

function NoteList({notes,onDelete,onEdit}){

    const {count, incrementCount}=useContext(NotesContext);
    const renderedNotes=notes.map((note)=>{
        return <NoteShow onEdit={onEdit} onDelete={onDelete} key={note.id} note={note}/>
    })
    return <div className='book-list'> 
    {count}
    <button onClick={incrementCount}>Click me</button>
    {renderedNotes}</div>
}

export default NoteList;