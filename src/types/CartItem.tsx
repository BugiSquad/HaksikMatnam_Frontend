import {MenuItem} from "./MenuItem";

export interface CartItem extends MenuItem {
    starRatio: number; //별점
    totalRating: number; // 평균별점
    rateCounts: number; //리뷰 수
    quantity: number;
}

export interface ReviewList {
    reviewList: ReviewItem[];
}

export interface ReviewItem {
    reviewId: number;
    rating: number;
    text: string;
    title: string;
    memberCompactDto: MemberCompactDto;
}

export interface MemberCompactDto {
    name: string;
}

export interface ReviewDto {
    menuId: number;
    rating: number;
    text: string;
    title: string;

}

