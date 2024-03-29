import React from "react";
import { Card, Typography } from "@mui/material";
import { OrderList } from "../types/Order";
import { useNavigate } from "react-router-dom";
import { normalCard } from "./styled/Cards";


export const RecentOrder: React.FC<OrderList> = (detail: OrderList) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/menuhistory/${detail.ordersId}`);
    };

    return (<>
        <Card sx={normalCard} onClick={handleCardClick}>
            <Typography variant={"subtitle2"} fontWeight='bold'>{detail.ordersId}</Typography>
            <Typography
                variant={"subtitle2"}>{detail.paymentDto.detail != null ? detail.paymentDto.detail : ""}</Typography>
            <Typography variant={"subtitle2"} fontWeight='bold'
                style={{ color: "#FE724C" }}>{detail.ordersType}</Typography>
        </Card> </>)
}