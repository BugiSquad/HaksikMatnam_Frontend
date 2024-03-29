import React, {useEffect, useState} from "react";
import {Button, Card, IconButton, Typography} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HandshakeIcon from '@mui/icons-material/Handshake';
import {handleGoBack} from "./Detail/MyMessageDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../store/hooks";
import {getNotesWith, sendNoteToRoom} from "../api/NoteRoom";
import {NoteMessage} from "../types/NoteMessage";
import {getMyInfoFromRemote} from "../api/Member";


function MessageContent(message: NoteMessage) {
    return (<>
        <div style={{
            display: "flex",
            fontWeight: "bold",
            fontSize: "7px",
            alignSelf: 'flex-end'
        }}>{message.name}
            {/*<Typography variant={"subtitle2"}>dummyTime</Typography>*/}
        </div>
        <div>{message.message}</div>
    </>);
}

function MyMessageBody(message: NoteMessage) {
    if (message.firstMessage)
        return <div>{message.message}</div>

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div key={message.noteId} style={{
                alignSelf: 'flex-end',
                backgroundColor: '#007AFF',
                color: 'white',
                borderRadius: '10px',
                padding: '10px',
                margin: '5px'
            }}>
                {MessageContent(message)}
            </div>
        </div>
    );
}

function OthersMessageBody(message: NoteMessage) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{
                alignSelf: 'flex-start',
                backgroundColor: '#E5E5EA',
                borderRadius: '10px',
                padding: '10px',
                margin: '5px'
            }}>
                {MessageContent(message)}
            </div>
        </div>)
}

export const Message: React.FC = () => {
    const [messageList, setMessageList] = useState<NoteMessage[]>([]);
    const [messageInput, setMessageInput] = useState<string>("");
    const [roomName, setRoomName] = useState("Empty Name")
    const [myID, setMyID] = useState<number>(-100);
    const [flag, setFlag] = useState<boolean>(false);
    const navIdx = useAppSelector((state) => state.navIdx)
    const param = useParams()
    const roomId = param.id
    const getMessage = () => {
        getNotesWith(Number(roomId)).then((res: any) => {
            setRoomName(res.data.data.groupTitle)
            const data = res.data.data
            let messages = data.notes.map((message: NoteMessage) => {
                console.log(message.name)
                return message
            })
            setMessageList(messages)
        })
    }
    useEffect(() => {
            getMyInfoFromRemote().then((res) => {
                const id = res.data.data.memberId
                setMyID(id)
                const room = res.data.data.groupList
                    .filter((item: any) => {
                        console.log(`${item.noteRoom} --- ${roomId}`)
                        return item.noteRoom.noteRoom_id === Number(roomId)
                    })
                if (room[0].noteRoom.post.memberCompactDto.memberId === id) {
                    setFlag(true)
                }
                console.log(room.noteRoom_id)
            })
            getMessage()
            const interval = setInterval(() => {
                getMessage()
            }, 1000);
            return () => {
                clearInterval(interval); // 컴포넌트가 언마운트될 때 interval을 정리합니다.
            };
        }, []
    )
    const handleSendButtonClick = () => {
        if (messageInput.trim() === "") {
            return;
        }
        sendNoteToRoom(Number(roomId), messageInput.trim()).then((res: any) => {
            getMessage()
        })
        setMessageInput("");
    };

    return (
        <div style={{width: "100%"}}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "15px"
            }}>
                <Typography variant={"h6"} fontWeight={'bold'}>
                    <Button onClick={handleGoBack} disableElevation sx={{color: '#FE724C'}}>
                        <ArrowBackIosNewIcon/></Button> {roomName}</Typography>
                <div style={{display: "inherit", alignItems: "center", paddingRight: "10px"}}>
                    {flag ?
                        <Link
                            to={`/mypage/message/makeappointment/${roomId}`}><IconButton><HandshakeIcon/></IconButton></Link> : <></>}
                </div>

            </div>

            <Card sx={{
                minWidth: 200,
                minHeight: 500,
                padding: '10px 5',
                marginTop: '10px',
                backgroundColor: '#F0F0F0',
                borderRadius: '15px',
            }}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{
                        alignSelf: 'flex-start',
                        backgroundColor: '#E5E5EA',
                        borderRadius: '10px',
                        padding: '10px',
                        margin: '5px'
                    }}>
                    </div>
                </div>

                {messageList.map((message) => {
                    if (message.memberId === -1)
                        return MyMessageBody(message)
                    else
                        return OthersMessageBody(message)
                })}

            </Card>
            <div className="input-group mb-3" style={{margin: '10px 0'}}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="메세지를 입력하세요."
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" id="button-addon2"
                        onClick={handleSendButtonClick}> 전송
                </button>
            </div>
        </div>
    )
}