import { io } from 'socket.io-client';


/*Local */

const socket = io('http://localhost:3001'); 




/*Depoly */

//const socket = io('https://h-pf18b-campeonesdelmundo-b.onrender.com'); 




export default socket;
