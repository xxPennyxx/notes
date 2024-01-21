import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NoteCreate from './components/NoteCreate';
import NoteList from './components/NoteList';

function App(){
    const [notes, setNotes]=useState([]);

    //fetch all books from the API
    const fetchBooks=async()=>{
        const response=await axios.get('http://localhost:3001/notes');
        setNotes(response.data);

    }

    useEffect(()=>{
        fetchBooks();
    },[]);

    //DON'T DO THIS!!
    //fetchBooks(); //makes request to API and gets the books over and over again for an infinite loop...
    //need to call it only once or at specific points of time

    const editNoteById=async(id,newTitle,newContent)=>{
        const response=await axios.put('http://localhost:3001/notes/'+id,{
            title:newTitle,
            content:newContent
        });
        console.log(response);
        const updatedNotes=notes.map((note)=>{
            if(note.id===id){
                // return {...note,title:newTitle,content:newContent}
                return {...note,...response.data};
            }
            return note;
        });

        setNotes(updatedNotes);

    }

    const deleteNoteById=async(id)=>{
        const response=await axios.delete('http://localhost:3001/notes/'+id);
        console.log(response)
        const updatedNotes=notes.filter((note)=>{
            return note.id!==id
        });
        setNotes(updatedNotes);
    };

    const createNote=async(title,content)=>{
       

        const response=await axios.post('http://localhost:3001/notes',{
            title,content
        });
        // console.log(response);

         const updatedNotes=[...notes,response.data]
        // console.log('Title:',title,'\nContent:',content)
            setNotes(updatedNotes);



    };

    return <div className='app'>
        <h1>My Notes</h1>
        <NoteCreate onCreate={createNote}/>
        
        <NoteList notes={notes} onDelete={deleteNoteById} onEdit={editNoteById}/></div>
}

export default App;