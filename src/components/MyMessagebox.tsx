import React, { useEffect, useState } from "react";
import { MyMessage } from "./MyMessage";
import { GroupType } from "../types/PostDto";
import { getMyNoteRoom } from "../api/NoteRoom";
import { Typography } from "@mui/material";
import { normalTypography } from "./styled/Text";

interface NoteInfo {
    postId: number;
    title: string;
    body: string;
    minutesLeftUntilMeal: number;
    groupType: GroupType;
    noteRoomId: number;
    creatorId: number;
}

interface NoteGroup {
    postId: number;
    title: string;
    body: string;
    groupType: GroupType;
    noteRooms: NoteInfo[];
}

export const MyMessagebox: React.FC = () => {
    const [noteRooms, setNoteRooms] = useState<NoteInfo[]>([]);
    const [noteGroups, setNoteGroup] = useState<NoteGroup[]>([])
    useEffect(() => {
        getMyNoteRoom().then((res) => {
            const data = res.data.data
            const notes = data.map((note: NoteInfo) => note)
            const tmp = notes.reduce((posts: NoteGroup[], note: NoteInfo) => {
                let filtered = posts.filter((item: NoteGroup) => item.postId === note.postId)
                if (filtered.length === 0)
                    posts.push({
                        noteRooms: [note],
                        body: note.body,
                        groupType: note.groupType,
                        postId: note.postId,
                        title: note.title
                    })
                else
                    posts.forEach((item) => {
                        if (item.postId === note.postId)
                            item.noteRooms = [...item.noteRooms, note]
                    })
                return posts
            }, [])
            setNoteRooms(notes)
            setNoteGroup(tmp)
        })
    }, [])
    return (
        <div style={{width:"100%"}}>
            {
                noteRooms.length === 0 ?
                    <Typography sx={normalTypography} color={"lightgrey"}>
                        조회 내역이 없습니다.</Typography> :
                    noteRooms.map((value, idx) =>
                        <MyMessage key={idx} content={value.title} count={3}
                                   isGroup={value.groupType === GroupType.ORGANIZATION}
                                   msgLinkTo={`/mypage/message/${value.noteRoomId}`}/>)
            }
                </div>
    )
}