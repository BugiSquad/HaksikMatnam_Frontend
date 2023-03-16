import React from "react";
import {PostItem} from "../types/PostItem";
import {faker} from "@faker-js/faker";
import {Post} from "./Post";

export const Posts: React.FC = () => {
    const list: Array<PostItem> = [];
    for (let i = 0; i < 100; i++) {
        list.push({
            "postName": faker.name.fullName(),
            "avatarUrl": faker.image.avatar(),
            "postTime": Math.trunc(Math.random() * 60) + "분 전"
        })
    }
    return (
        <div style={{width: "100%"}}>
            {list.map((user, idx) =>
                <Post key={idx} postName={user.postName} avatarUrl={user.avatarUrl} postTime={user.postTime}/>)
            }
        </div>
    )
}