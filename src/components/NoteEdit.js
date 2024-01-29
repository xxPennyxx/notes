import React, {useState}from 'react';
import useNotesContext from '../hooks/use-notes-context';

function NoteEdit({note, onSubmit}){

    const [title, setTitle]=useState(note.title);
    const [content, setContent]=useState(note.content);
    const {editNoteById}=useNotesContext();
    
    const handleChangeTitle=(event)=>{
        setTitle(event.target.value);
    };

    const handleChangeContent=(event)=>{
        setContent(event.target.value);
    };

    const handleSubmit=(event)=>{
        event.preventDefault();
        onSubmit();
        editNoteById(note.id,title,content)

    }
    return <div> 
        <form onSubmit={handleSubmit} className='book-edit'>
            <label>Title</label>
            <input className='input' value={title} onChange={handleChangeTitle}/>
            <label>Content</label>
            <input className='input' value={content} onChange={handleChangeContent}/>
            <button className='button is-primary' >Save</button>
        </form>
    </div>
}

export default NoteEdit;