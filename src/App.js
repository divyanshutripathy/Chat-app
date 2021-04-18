import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Message from "./Message";
import db from "./firebase";
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function App() {

  // {username: 'Divyanshu', message: 'Hi'}, {username: 'Tarun', message: 'Yo!'}
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  /* useEffect is a listenner, it listens to changes in the things provided in the array after code, if there is 
  any change in thos things this code will get executed. If the array is empty, it'll only execute once when the
  web-app is loaded. */

  useEffect(() => {
    // onSnapshot gives a capture of the DB from firebase when the DB is changed and stores it in snapshot variable
    // We iterate through snapshot.docs, which are the documents in the messages collection using map
    /* doc.data returns a JS object, exactly like {username: 'Divyanshu', message: 'Hi'}, so we append this object
    in the messages array.*/
    db.collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => (
        ({id: doc.id, message: doc.data()})
      )))
    });
  }, [])

  useEffect(() => {
    setUsername(prompt("Please enter your name: "))
  }, [])

  function sendMessage(event) {
    event.preventDefault(); // It prevents the page from refreshing on form submission
    // We add the data in the form of a JS object
    db.collection('messages').add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //setMessages([...messages, {text: input, username: username}]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello! {username}</h1>
      <form className="form__box">
        <FormControl className="message__box">
          <InputLabel>Enter message</InputLabel>
          <Input fullWidth="true" className="input" value={input} onChange={event => setInput(event.target.value)} />
          <Button className="submit__button" variant="contained" disabled={!input} color="primary" onClick={sendMessage} type='submit'>Send</Button>
        </FormControl>
        {/* <input value={input} onChange={event => setInput(event.target.value)}/> */}
        
      </form>
        <FlipMove className="message">
          {
            // After adding id, now the entire messages won't be refreshed every time a new message is added.
            // In the messages array, we have JS objects having id and the message, which is again a JS object, containing message and the username.
            messages.map(({id, message}) => (
            <Message key={id} message={message} username={username}/>
            // <p>{message}</p>
            ))
          }
        </FlipMove>
        

      {/* Before adding id, so the entire list of messages was getting refreshed when a new message is added {
        messages.map(message => (
          <Message message={message} username={username}/>
          // <p>{message}</p>
          ))
      } */}
    </div>
  );
}

export default App;
