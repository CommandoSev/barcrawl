import React, { useEffect} from 'react';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed';
import { Link, useNavigate } from "react-router-dom";

function Chat() {

    const navigate = useNavigate();
    const userInfo = localStorage.getItem('username');   
      useEffect(() => { 
         if (!userInfo) { 
          navigate("/login")
        }
      }, [navigate, userInfo]);
    return (
        <ChatEngine
            height="90vh"
            projectID="327ef6ee-a3b0-4e52-829e-9cd277e8e4a5"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            />
    );
}

export default Chat;