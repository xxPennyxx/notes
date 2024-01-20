import React, {useState} from 'react';

function NoteCreate({onCreate}){

    const [title, setTitle]=useState('');
    const [content, setContent]=useState('');
    const handleChangeTitle=(event)=>{
        setTitle(event.target.value);

    }
    const handleChangeContent=(event)=>{
        setContent(event.target.value);

    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        onCreate(title,content);
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