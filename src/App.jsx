import { useState } from 'react'
import './App.css'
import Notes from './components/Notes'
import Form from './components/Form'


export const dataAPI = (method, data, callback) => {

  let jsonData = {
    id:0,
    content: data
  };


  let params = {
    method: method,
    headers: {
      Accept: 'application/json'
    }
  };

  if (method === 'POST'){
    params.body = jsonData ? JSON.stringify(jsonData) : '';

    fetch(import.meta.env.VITE_API_URL, params);
  }
  else if (method === 'GET'){
    fetch(import.meta.env.VITE_API_URL, params).then((res=>res.json())).then(json => {
      if (callback)
        callback(json);
    }).catch(()=>{console.log('err: ');})
  }
  else if (method === 'DELETE'){
    params.body = jsonData ? JSON.stringify(jsonData) : '';
    fetch(import.meta.env.VITE_API_URL + '/' + data, params).then((res=>res.text())).then(_text => {
      if (callback)
        callback([]);
    }).catch(()=>{console.log('err: ');})
  }
}

function App() {
  const [noteCount, setNoteCount] = useState(0);

  const handleSubmit = (event, data) => {
    event.preventDefault();
    const {note} = data;
    dataAPI('POST', note);
    setNoteCount((prev)=>prev + 1);
  }

  return (
    <>
    <Notes key={noteCount}/>
    <Form note="" onNoteSumbit={handleSubmit}/>
    </>
  )
}

export default App
