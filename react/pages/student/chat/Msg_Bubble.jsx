
import React, { useContext } from "react";
import './Msg_Bubble.css';
import { HomeRouter_context } from "../../pub/Home_router";

function Msg_Bubble({ message_obj, chatSessionID }) {

    const { userAlias_state } = useContext(HomeRouter_context);
    console.log(message_obj);

    return (
        <div className="bubble-frame">
            <div className="bubble-carpet">
                <div className="bubble-items-container">
                    <div className="bubble-item">
                        <div className='er3chat-message-item'>Session ID: {chatSessionID}</div>
                    </div>
                    <div className="bubble-item">
                        <div className='er3chat-message-item'>Scenario ID: {message_obj?.scenario_id}</div>
                    </div>
                    <div>
                        <div className='er3chat-message-item'>Sender ID: {message_obj.sender_id}</div>
                    </div>
                    <div>
                        <div className='er3chat-message-item'>Sender Alias: {userAlias_state}</div>
                    </div>
                    <div>
                        <div className='er3chat-message-item'>
                            Time Stamp: {
                                new Date(message_obj?.timestamp).toLocaleDateString()
                            } {` at `} {
                                new Date(message_obj?.timestamp).toLocaleTimeString()
                            }
                        </div>
                    </div>
                    <div>
                        <div className='er3chat-message-item'>Message: {message_obj.message}</div>
                    </div>

                </div>
            </div>

        </div>
    )
} export default Msg_Bubble