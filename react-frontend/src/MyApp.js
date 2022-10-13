import Form from './Form';
//import React, {useState} from 'react';
import Table from './Table'
import axios from 'axios';
import React, {useState, useEffect} from 'react';


function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );

  async function fetchAll(){
    try {
        const response = await axios.get('http://localhost:5000/users');
        return response.data.users_list;     
    }
    catch (error){
        //We're not handling errors. Just logging into the console.
        console.log(error); 
        return false;         
    }
  };

  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:5000/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
 };

 const makeDeleteCall = async (id) => {
   //console.log("ID!!!:%s",id);
  try {
    const result = await axios.delete(`http://localhost:5000/users/${id}`);
    //const result = await axios.delete(`http://localhost:5000/users/` + id);
    return result;
  }
  catch (error) {
    console.log(error);
    return false;
  }
};

const deleteCharacter = (id) => {
  //console.log("ID2:%s",id);
  makeDeleteCall(id).then(result => {
    if (result && (result.status === 204)) {
      removeOneCharacterByID(id);
    };
  });
};
  
  const updateList = (person) => {
    makePostCall(person).then( result => {
      if (result && result.status === 201){
        setCharacters([...characters, result.data] );
      };
    });
 };

 const removeOneCharacterByID = (id) =>{
  const updated = characters.filter(character => {
    return id !== character._id;
  });
    setCharacters(updated);
};
 

  
  return (
      <div className="container">
        <Table characterData={characters} removeCharacter={deleteCharacter} />
        <Form handleSubmit={updateList} />
      </div>
      
  );
    
}

// function MyApp() {
//     return (
//         <div className="container">
//           <Table characterData={characters} />
//         </div>
//       ) 
// }


export default MyApp;