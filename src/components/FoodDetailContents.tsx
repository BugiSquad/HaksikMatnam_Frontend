import { Box, Button, Link, Modal, Paper, Snackbar, Typography } from "@mui/material"
import { FaStar } from "react-icons/fa"
import React, { useState } from "react";

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import {MdAddCircleOutline, MdRemoveCircleOutline} from 'react-icons/md';
import {useAppDispatch} from "../store/hooks";
import {add} from "../store/cart";
import {CartItem, ReviewItem} from "../types/CartItem";
import {useNavigate} from "react-router-dom";
import {ReviewBar} from "./ReviewBar";
import {ReviewList} from "./ReviwList";
import {getFoodsWith, removeFoodFromStorage, saveFoodToStorage, StorageType} from "../store/LocalStorage";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import { getMyToken } from "../api/Common";
import { ReviewContent } from "./ReviewContent";
import { OrangeButton, WhiteButton } from "./styled/Buttons";
import { modalBox, normalTypography } from "./styled/Text";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function scrollToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth' // 부드러운 스크롤링 효과를 위해 'smooth' 옵션을 추가합니다.
    });
}

interface FoodDetailContentsProps {
    food: CartItem;
    reviews: ReviewItem[]
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const FoodDetailContents: React.FC<FoodDetailContentsProps> = ({ food, reviews }) => {
    const [count, setCount] = useState<number>(1);
    const [liked, setLiked] = useState<boolean>(
        getFoodsWith(StorageType.FAVORITE).filter((item: CartItem) => item.id === food.id).length !== 0
    );
    const [reviewText, setReviewText] = useState<string>("");
    const navigate = useNavigate();

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const dispatch = useAppDispatch()

    const handleClick = () => {
        if (liked) {
            removeFoodFromStorage(StorageType.FAVORITE, food);
        } else {
            saveFoodToStorage(StorageType.FAVORITE, food);
        }
        setLiked(!liked);
    };

    const [open, setOpen] = React.useState(false);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleClickLike = () => {
        if (liked == false)
            setOpenSnackbar(true);
    };

    const handleCloseLike = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const clickSnackBarCancle = (event: React.SyntheticEvent | Event, reason?: string) => {
        removeFoodFromStorage(StorageType.FAVORITE, food);
        handleCloseLike(event, reason);
        setLiked(false);
    }


    const action = (
        <React.Fragment>
            <Button disableElevation color="warning" size="small" onClick={clickSnackBarCancle}>
                <Typography fontWeight={'bold'} fontSize="15px">되돌리기</Typography>
            </Button>
            <IconButton
                disableFocusRipple
                size="small"
                aria-label="close"
                onClick={handleCloseLike}
            >
                <CloseIcon fontSize="large" />
            </IconButton>
        </React.Fragment>
    );
    const snackMessage = `${food.name}을 찜했습니다!`;

    const rateArray = [
        { rate: 1, ratio: 0, counts: 0 },
        { rate: 2, ratio: 0, counts: 0 },
        { rate: 3, ratio: 0, counts: 0 },
        { rate: 4, ratio: 0, counts: 0 },
        { rate: 5, ratio: 0, counts: 0 }
    ]
    let totalCount = 0;
    reviews.forEach((item, idx) => {
        totalCount += 1;
        rateArray[Math.floor(item.rating) - 1].counts += 1;
    })

    axios.defaults.withCredentials = true

    const handleOpen = async () => {
        setOpen(true);

    }
    const handleClose = () => {
        setOpen(false);
    }

    const formattedPrice = food.price.toLocaleString();
    const formattedPriceTotal = (food.price * count).toLocaleString();

    return (<>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: "column", paddingTop: '10px' }}>
            <Paper sx={{ borderRadius: '1rem' }} elevation={3}>
                <img src={food.imageUrl} alt="Food"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} />
                <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <Button
                        disableElevation
                        disableRipple
                        sx={{
                            translate: "0 0.5vh 0",
                            color: liked ? 'pink' : 'black',
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleClick();
                            handleClickLike();
                        }}
                    >
                        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </Button>
                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleCloseLike}
                        message={snackMessage}
                        action={action}
                    />
                </Box>
            </Paper>
            <div style={{ display: "flex", alignContent: "flex-start" }}>
                <Typography fontSize={'28px'}
                    sx={{ paddingTop: "10px", fontWeight: "bold" }}> {food.name}</Typography>
            </div>
            <div style={{display: "flex", alignContent: "flex-start"}}>
                <Typography fontSize={'12px'} color={'#3EA1FC'}> 평균 소요시간 8분</Typography>
            </div>
            <div style={{display: "flex", alignContent: "flex-start", alignItems: "center", fontSize: '14px'}}>
                <FaStar
                    style={{color: "orange"}}/> {food.totalRating === 0 || food.totalRating === undefined ? 5.0 : food.totalRating.toFixed(2)}점 {`(${reviews.length})`}
                <Link color={'#FE724C'} sx={{fontSize: '14px', paddingLeft: '10px'}} onClick={scrollToBottom}>리뷰
                    보기</Link>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                paddingTop: '10px'
            }}>
                <Typography fontSize={'24px'} fontWeight={'bold'}>{formattedPrice}원</Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography sx={{ ...normalTypography, padding: "0px", margin: "0px" }}>✔️수량</Typography>
                    <Button disableElevation
                        style={{ minWidth: 'unset', borderRadius: '50%', color: '#FE724C' }}
                        onClick={handleDecrement}
                        startIcon={<MdRemoveCircleOutline />}
                    />
                    {/* <Box
                            component="span"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bold',
                            }}
                        > */}
                    <Typography sx={{ ...normalTypography, padding: "0px", margin: "0px" }}>{count}개</Typography>
                    {/* </Box> */}
                    <Button disableElevation
                        style={{ minWidth: 'unset', borderRadius: '50%', color: '#FE724C' }}
                        onClick={handleIncrement}
                        startIcon={<MdAddCircleOutline />}
                    />
                </Box>
            </div>
            <div style={{ display: "flex", alignContent: "flex-start", paddingTop: '10px' }}>
                <Typography fontSize={'18px'} fontWeight={'bold'}>설명</Typography>
            </div>
            <div style={{ display: "flex", alignContent: "flex-start" }}>
                <Typography align={'left'} fontSize={'15px'} fontWeight={'bold'}
                    color={'#858992'}>{food.description}</Typography>
            </div>

            <Typography sx={{ ...normalTypography, backgroundColor: "ButtonShadow" }}>총 가격 : {formattedPriceTotal}원</Typography>
            <Button disableElevation disableRipple sx={{
                paddingLeft: '10px',
                paddingRight: '10px',
                margin: "5px",
                flex: "1",
                justifyContent: "center",
                alignItems: "center",
                minWidth: 280,
                backgroundColor: '#FE724C',
                color: "",
                fontWeight: "bold",
                borderRadius: "2rem",
                padding: "0.5rem",
                boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)"
            }} onClick={() => {
                dispatch(add({ ...food, quantity: count }))
                handleOpen()
            }}>
                <Typography color={'white'}><ShoppingBagIcon /> 장바구니 담기</Typography>
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={
                        modalBox}
                >
                    <Typography
                        id="modal-modal-title"
                        component="h1"
                        fontWeight="bold"
                        fontSize="22px"
                        mb={2}
                        color="White"
                    >
                        메뉴가 장바구니에 담겼습니다. </Typography>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: '30px',
                            paddingRight: '30px',
                        }}
                    >
                        <Typography fontSize={14} fontWeight="bold" color="White" >
                            - {food.name}
                        </Typography>
                        <Typography fontSize={14} fontWeight="bold" color="White" >
                            {count} 개
                        </Typography>

                    </div>
                    <Typography sx={{ mt: 2 }} fontSize={17} fontWeight="bold" color="White">
                        장바구니로 이동할까요?
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Button sx={{ ...OrangeButton, width: "50%" }} onClick={() => {
                            navigate('/cart')
                        }}>네!</Button>
                        <Button sx={{ ...WhiteButton, width: "50%" }} onClick={handleClose}>더 담을래요.</Button>
                    </div>
                </Box>
            </Modal>

            <div className="ReviewBar"
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingTop: "20px" }}>
                <Typography fontWeight={'bold'} fontSize={18}> 리뷰</Typography>
                {rateArray.reverse().map((item, idx) => {
                    return (
                        <ReviewBar rate={`${item.rate}점`} ratio={item.counts / totalCount * 100}
                            counts={item.counts} />)
                })}
            </div>

            <div className="ReviewList"
                style={{ display: 'flex', flexDirection: "column", alignItems: "flex-start", paddingTop: "20px" }}>
                {reviews.map((item, idx) => {
                    return (<ReviewList userId={item.memberCompactDto.name} dayBefore={"18일 전"} rating={item.rating}
                        contents={item.text} />)
                })}
            </div>
            <div
                style={{ display: 'flex', flexDirection: "column", alignItems: "flex-start", paddingTop: "20px" }}>
                <Typography fontWeight={'bold'} fontSize={18}> 리뷰 작성하기</Typography>
                {getMyToken() == null || getMyToken() === "" ?
                    <Typography variant={"body2"}>로그인이 필요합니다.</Typography> :
                    <ReviewContent menuItem={food}></ReviewContent>}
            </div>
        </div>
    </>
    )
}