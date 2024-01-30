import React, {createContext, useState, useCallback} from 'react';
import axios from 'axios';

const NotesContext=createContext();

function Provider({children}){

    const [notes, setNotes]=useState([]);

    //fetch all notes from the API
    const fetchNotes=useCallback(async()=>{
        const response=await axios.get('http://localhost:3001/notes');
        setNotes(response.data);

    },[]);

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

   const valueToShare={
    notes,
    deleteNoteById,
    editNoteById,
    createNote,
    fetchNotes
   }

    return <NotesContext.Provider value={valueToShare}>
        {children}
    </NotesContext.Provider>

}

export {Provider};
export default NotesContext;

//import NotesContext, {Provider} from '<location>'
