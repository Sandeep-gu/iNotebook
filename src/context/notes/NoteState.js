import { useState } from 'react'
import React from 'react'
import NoteContext from './NoteContexts'
const NoteState = (props) => {
    const host="http://localhost:5000";
   // const s={
   //     "name":"sandeep",
 //       "class":"5h"
 //   }
 //   const [state,setState] = useState(s)
   // const update=()=>{
    //    setTimeout(()=>{
     //       setState({
    //            "name":"ankit",
     //           "class":"23b"
    //        })
    //    },1000)
  //  }
  const notes1 = []
  const [notes,setNotes]  = useState(notes1)
  //get all notes
  const getNotes = async()=>{
    //API Call
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
            },

      });
      const json = await response.json()
      console.log(json)
      setNotes(json)
    }
  //Add a Note
  const addNote=async ({title,description,tag})=>{

    //TODO:API call
    const response = await fetch(`${host}/api/notes/addnote`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')      
             },
        body:JSON.stringify({title,description,tag})

    });
    
    let note={
        "_id": "645632d7e5c119f7bcfc2ecf",
        "user": "6453a6de33833ab334e7eee0",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-05-06T10:58:31.064Z",
        "__v": 0
      };
      setNotes(notes.concat(note))

    
  }

  //Delete a Note
const deleteNote = async(id)=>{
    //ToDo:API Call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
            },
        body:JSON.stringify({id})

    });
    const json = await response.json();
    console.log(json)
    console.log("deleting note successfully")
    const newNotes = notes.filter((note)=>{ return note._id!==id})
    setNotes(newNotes)


}
//Edit a Note
const editNote=async (id, title,description,tag)=>{
    //API Call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
        method:'POST',
        Headers:{
            'Content-Type':'application/json',
            "auth-token":localStorage.getItem('token')
            },
        body:JSON.stringify({title,description,tag})

    });
    const json = response.json();
    console.log(json)

    //Logic to edit in client
    for (let index=0;index<notes.length;index++){
        const element = notes[index];
        if(element._id===id){
            element.title = title;
            element.description=description;
            element.tag=tag;
        }
    }

}
  //Edit a Note
  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
