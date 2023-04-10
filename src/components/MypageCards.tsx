import { ReactNode } from "react";
import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Padding } from "@mui/icons-material";

interface Props {
    title: string;
    content: React.ReactNode;
    link: string
}

export const MypageCards = ({ title, content, link }: Props) => { //마이페이지에 들어갈 카드 컴포넌트 포맷
    return (
        <><Card style={{
            minInlineSize: '350px',
            padding: '10px'
        }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography style={{ fontSize: 18, fontWeight: 'bold' }} variant={"h6"}>{title}</Typography>
                    <Link to={link} style={{ fontSize:13 ,marginLeft: '160px', marginRight: '10px', color: "black" }}>더 보기</Link>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    {content}
                </div>

            </div>
        </Card><br /></>
    );
};