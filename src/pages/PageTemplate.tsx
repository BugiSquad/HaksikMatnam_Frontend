import {BottomNavigationGroup} from "../components/BottomNavigationGroup";
import React, {FC, ReactNode} from "react";
import {PageHeaderParam, SimpleHeaderParam} from "../types/PageHeaderParam";
import {PageHeader} from "../components/PageHeaders/PageHeader";
import {SimpleHeader} from "../components/PageHeaders/SimpleHeader";
import {useAppSelector} from "../store/hooks";

export const PageTemplate: FC<{ children: ReactNode, param: PageHeaderParam }> = ({children, param}) => {
    const idx = useAppSelector((state) => state.navIdx)
    return (
        <>
            <div className="App container">
                <PageHeader {...param}/>
                {children}
                <BottomNavigationGroup idx={idx.cur}/>
            </div>
        </>)

}

export const SimpleTemplate: FC<{ children: ReactNode, param: SimpleHeaderParam }> = ({children, param}) => {
    const idx = useAppSelector((state) => state.navIdx)
    return (
        <>
            <div className="App container">
                <SimpleHeader {...param}/>
                {children}
                <BottomNavigationGroup idx={idx.cur}/>
            </div>
        </>)
}