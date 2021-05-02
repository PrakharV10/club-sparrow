import { Route, Routes } from 'react-router';
import './App.css';
import ChatListing from './Pages/chatListing/ChatListing';
import GroupChat from './Pages/GroupChat/GroupChat';
import Landing from './Pages/Landing/Landing';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chats" element={<ChatListing />} />
        <Route path="/group/:groupId" element={<GroupChat />} />
      </Routes>
    </div>
  );
}

export default App;
