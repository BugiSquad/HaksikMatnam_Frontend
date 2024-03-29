import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { MenuItem } from "../types/MenuItem";
import 'react-swipeable-list/dist/styles.css';
import { useNavigate } from "react-router-dom";
import { resetScrollPosition } from "../pages/MainPage";
import { CartItem } from "../types/CartItem";


const FoodCard: React.FC<MenuItem & CartItem> = (props, key: number) => {
    const navigate = useNavigate()

    return <>
        <Card onClick={() => { navigate(`/fooddetail/${props.id}`); resetScrollPosition(); }} sx={{
            display: 'inline-block',
            position: "relative",
            flex: "0 0 auto",
            width: 345,
            borderRadius: "14px",
            marginLeft: '0.5rem',
            marginRight: '0.5rem',
            marginBottom: "0.5rem",
            boxShadow: "0px 5px 5px rgba(0, 0,0, 0.3)"
        }} key={key}>
            <CardMedia component={"img"} height={140} image={props.imageUrl} title={props.name} />
            <CardContent>
                <Typography gutterBottom variant="h6" fontWeight={"bold"} component="div">
                    {props.name}
                </Typography>
                <Typography gutterBottom variant="body1" fontWeight={"bold"} component="div">
                    {props.price}원
                </Typography>
                <Typography style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }} gutterBottom variant="body2"
                    color="text.secondary">
                    {props.description}
                </Typography>
                <Typography gutterBottom variant="body2" fontWeight={"bold"} color="text.secondary">

                    <FaStar
                        style={{color: "orange"}}/>{props.totalRating === 0 || props.totalRating === undefined ? 5.0 : props.totalRating.toFixed(2)}점
                </Typography>
            </CardContent>
        </Card>

    </>;
}
export default FoodCard;