import { EditMyInfo } from "../pages/EditMyInfo";
import { ErrorPage } from "../error-page";
import { Signup } from "../pages/Signup";
import { Mypage } from "../pages/Mypage";
import { Login } from "../pages/Login";
import { RecentMeetInfo, recentMeetInfoLoader } from "../pages/RecentMeetInfo";
import { Review } from "../pages/Review";
import { MenuHistory, menuHistoryLoader } from "../pages/MenuHistory";
import { ViewMyInfo } from "../pages/ViewMyInfo";


export const MyPageRoutes = [
    {
        path: "/mypage/editmyinfo",
        element: <EditMyInfo />,
        errorElement: <ErrorPage />,
    }, {
        path: "/mypage/viewmyinfo",
        element: <ViewMyInfo />,
        errorElement: <ErrorPage />,
    }, {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
    }, {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    }, {
        path: "/mypage/recentmeetinfo/:id",
        element: <RecentMeetInfo />,
        loader: recentMeetInfoLoader,
        errorElement: <ErrorPage />,

    },
    {
        path: "/menuhistory/:ordersId",
        element: <MenuHistory />,
        loader: menuHistoryLoader,
        errorElement: <ErrorPage/>,
    },


    {
        path: "/mypage",
        element: <Mypage />,
        errorElement: <ErrorPage />,
    },

]