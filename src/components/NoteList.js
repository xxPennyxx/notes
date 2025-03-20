import NoteShow from './NoteShow'
import useNotesContext from '../hooks/use-notes-context';

function NoteList(){

    const {notes}=useNotesContext();
    const renderedNotes=notes.map((note)=>{
        return <NoteShow key={note.id} note={note}/>
    })
    return <div className='book-list'> 
    
    {renderedNotes}</div>
}

export default NoteList;