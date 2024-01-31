import "./App.css";
import { Grid, GridItem, Heading } from '@chakra-ui/react'
import { userNames } from "./components/userList";
import { Center, Square, Circle, Button } from '@chakra-ui/react'
import { useState } from "react";
// Components
import ProgressBar from "./components/ProgressBar";
function App() {
  // States
  const [users, setUsers] = useState(userNames);
  const [winners, setWinner] = useState([]);

  const [uiProps, setUiProps] = useState({
    buttonDisabled: false,
    displayProgressBarr: false,
  });

  const [error, setError] = useState({
    processTime: 3000,
    loading: false,
  });
  // Utility functions
  let randomName;
  function getRandomName() {
    return (randomName = users[Math.floor(Math.random() * userNames.length)]);
  }
  // Handlers
  const handleGetRandomName = () => {
    setUiProps({
      buttonDisabled: true,
      displayProgressBarr: true,
    });
    setTimeout(() => {
      getRandomName();
      console.log(randomName);

      if (typeof randomName === "undefined") {
        // handle error
        setError({ processTime: 1000, loading: true });
        handleGetRandomName();
      } else {
        // Add random name to winner list
        setWinner([...winners, randomName]);
        // Update and Remove the random name form users
        const updateNameList = users.filter((user) => user !== randomName);

        setUsers(updateNameList);

        setUiProps({
          buttonDisabled: false,
          displayProgressBarr: false,
        });
        setError({
          processTime: 3000,
          loading: false,
        });
      }
    }, error.processTime);
    // console.log(getRandomName());
  };

  return (
    
    <div className="App">
      
      <Center h='100px'> <Heading color={"white"} as='h1' size='4xl' noOfLines={1}>RANDOM PLAYER PICKER</Heading></Center>
      <header className="App-header">
        <ul id="userList">
          {users.map((user, index) => (
            <li className="list-item" key={index}>
              {user}
            </li>
          ))}
        </ul>
        <div className="react-container">
          {uiProps.displayProgressBarr && <ProgressBar />}
          

          <h1>{users.length}</h1>

          <Button
          w={800}
          fontSize={50}
          h={65}
          colorScheme="green"
            onClick={handleGetRandomName}
            disabled={uiProps.buttonDisabled}
            bgGradient='linear(to-r, green.200, pink.500)'
          >
            CHANGE PLAYER
          </Button>
        </div>
        <ul className="winners">
          {winners.map((winner, index) => (
            <li key={index} className="list-item">
              {winner}
            </li>
            
          ))}
        </ul>
        
       
      </header>
      <Center>
      <Grid mb={100}  templateColumns='repeat(2, 1fr)' gap={6}>
          {winners.map((winner, index) =>(
  <GridItem width={500} height={50} fontSize={35}  key={index} color={"white"}  bgGradient='linear(to-l, #7928CA, #FF0080)' ><Center>{winner} </Center></GridItem>
  ))}
</Grid>
</Center>
    </div>
  );
}

export default App;