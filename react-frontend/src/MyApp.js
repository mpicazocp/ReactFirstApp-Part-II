import Form from './Form';
import React, {useState} from 'react';
import Table from './Table'


function MyApp() {
    const [characters, setCharacters] = useState([]);
    

    function removeOneCharacter (index) {
        const updated = characters.filter((character, i) => {
            return i !== index
          });
          setCharacters(updated);
    }
    function updateList(person) {
        setCharacters([...characters, person]);
      }

    return (
        <div className="container">
          <Table characterData={characters} removeCharacter={removeOneCharacter} />
          <Form handleSubmit={updateList} />
        </div>
        
    )
    
}

// function MyApp() {
//     return (
//         <div className="container">
//           <Table characterData={characters} />
//         </div>
//       ) 
// }


export default MyApp;