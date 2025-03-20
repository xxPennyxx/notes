import React, { useEffect,useContext} from 'react';
import NoteCreate from './components/NoteCreate';
import NoteList from './components/NoteList';
import NotesContext from './context/notes';

function App(){

    const {fetchNotes}= useContext(NotesContext);
    
    useEffect(()=>{
        fetchNotes();
    },[]);

    // useEffect(()=>{
    //     fetchNotes();
    // },[fetchNotes]);

    //NEVER DO THIS!! Even though it may be working fine, the app still makes infinite requests to the API
    //Here's why: Every time we fetch the notes, we update state. When we re-render, a new version of fetchNotes() is created. 
    //The useEffect function runs again and again because it sees an element in its dependency aray has changed.

    //DON'T DO THIS!!
    //fetchNotes(); //makes request to API and gets the books over and over again for an infinite loop...
    //need to call it only once or at specific points of time

    return <div className='app'>
        <h1>My Notes</h1>
        <NoteCreate/>
        <NoteList />
        </div>
}

export default App;