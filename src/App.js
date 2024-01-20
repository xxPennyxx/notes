import React, {useState} from 'react';
import NoteCreate from './components/NoteCreate';
import NoteList from './components/NoteList';

function App(){
    const [notes, setNotes]=useState([]);
    

    const editNoteById=(id,newTitle,newContent)=>{
        const updatedNotes=notes.map((note)=>{
            if(note.id===id){
                return {...note,title:newTitle,content:newContent}
            }
            return note;
        });

        setNotes(updatedNotes);

    }

    const deleteNoteById=(id)=>{
        const updatedNotes=notes.filter((note)=>{
            return note.id!==id
        });
        setNotes(updatedNotes);
    };

    const createNote=(title,content)=>{
        const updatedNotes=[...notes,{id:Math.round(Math.random()*9999),title:title,content:content}]
        console.log('Title:',title,'\nContent:',content)
            setNotes(updatedNotes)
    };

    return <div className='app'>
        <h1>My Notes</h1>
        <NoteCreate onCreate={createNote}/>
        
        <NoteList notes={notes} onDelete={deleteNoteById} onEdit={editNoteById}/></div>
}

export default App;