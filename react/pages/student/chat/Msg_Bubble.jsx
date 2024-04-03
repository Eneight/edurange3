
import React from "react";
import './Msg_Bubble.css';

function Msg_Bubble({message_obj, chatSessionID}){

    console.log(message_obj);

    return (
        <div className="bubble-frame">
            <div className="bubble-carpet">
                <div className="bubble-items-container">
                    <div className="bubble-item">
                        <div className='er3chat-message-item'>Session ID: {chatSessionID}</div>
                    </div>
                    <div>
                        <div className='er3chat-message-item'>Sender ID: {message_obj.sender_id}</div>
                    </div>
                    <div>
                        <div className='er3chat-message-item'>Sender Alias: {message_obj.userAlias}</div>
                    </div>
                    <div>
                        <div className='er3chat-message-item'>Time Stamp: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</div>
                    </div>
                    <div>
                        <div className='er3chat-message-item'>Message: {message_obj.content}</div>
                    </div>

                </div>
            </div>

        </div>
    )
} export default Msg_Bubble