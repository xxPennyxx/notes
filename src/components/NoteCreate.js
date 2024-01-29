import React, {useState} from 'react';
import useNotesContext from '../hooks/use-notes-context';
function NoteCreate(){

    const [title, setTitle]=useState('');
    const [content, setContent]=useState('');
    const {createNote}=useNotesContext();
    const handleChangeTitle=(event)=>{
        setTitle(event.target.value);

    }
    const handleChangeContent=(event)=>{
        setContent(event.target.value);

    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        createNote(title,content);
        setContent('');
        setTitle('');
    }
    return <div className='book-create'> 
    <h3>Add a Note</h3>

    <form onSubmit={handleSubmit} >
    <label>Title</label>
    <input className='input' value={title} onChange={handleChangeTitle}/>
    <br/>
    <label>Content</label>
    <input className='input' onChange={handleChangeContent}value={content}/><br/>
    <button className='button'>Add Note</button>
    </form>


    </div>
}

export default NoteCreate;