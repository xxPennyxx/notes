import React, {createContext, useState} from 'react';

const NotesContext=createContext();

function Provider({children}){
    const [count, setCount]=useState(5);
    const valueToShare={
        count,
        incrementCount:()=>{
            setCount(count+1)
        }

    };

    return <NotesContext.Provider value={valueToShare}>
        {children}
    </NotesContext.Provider>

}

export {Provider};
export default NotesContext;

//import NotesContext, {Provider} from '<location>'
