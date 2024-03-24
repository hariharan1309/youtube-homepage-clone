import React, { Children } from "react";
import Button from "./Button";
import { useState } from "react";
import { playlists, subscriptions } from "../data/data";
import { useSideBar } from "../context/SideBarContext";
import { PageHeaderSection } from "./PageHeader";

export default function SideBar(){
    const {islargeOpen, isSmallOpen,close}=useSideBar();

    return(
        <>
        <aside className={` sticky top-0 overflow-y-auto scrollbar-hidden pb-2 felx flex-col ml-1 ${islargeOpen?' lg:hidden':'lg:flex'} bg-blue-400` }>
            <SmallSideItem Icon="https://cdn-icons-png.flaticon.com/128/263/263115.png" title="Home" url="/" />
            <SmallSideItem Icon="https://cdn-icons-png.flaticon.com/128/10009/10009297.png" title="Shorts" url="/shorts" />
            <SmallSideItem Icon="https://cdn-icons-png.flaticon.com/128/6942/6942894.png" title="Subscription" url="/sub" />
            <SmallSideItem Icon="https://cdn-icons-png.flaticon.com/128/4436/4436848.png" title="Library" url="/lib" />
        </aside>
        {isSmallOpen &&(
            <div onClick={close} className="lg:hidden fixed inset-0 z-[99] backdrop-blur-sm">

            </div>
        )}
        <aside className={`w-48 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-1 ${islargeOpen?'lg:flex':'lg:hidden'} ${isSmallOpen?'flex z-[99] bg-white  max-h-screen':'hidden'}` }>
           
            <div className="lg:hidden p-2 sticky top-0 bg-white">
                <PageHeaderSection  />
            </div>
            <LargeSideSection>
           
                <LargeSideItem isActive={true} Icon="https://cdn-icons-png.flaticon.com/128/263/263115.png" title="Home" url="/" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/10009/10009297.png" title="Shorts" url="/shorts" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/6942/6942894.png" title="Subscription" url="/sub" />
            </LargeSideSection>
            <hr />
            <LargeSideSection visCount={5}>
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/4436/4436848.png" title="Library" url="/lib" /> 
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/5582/5582302.png" title="History" url="/history" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/1294/1294269.png" title="Videos" url="/videos" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/833/833602.png" title="Watch later" url="/later" />
                {playlists.map((playlist)=>(
                    <LargeSideItem title={playlist.name} Icon="https://cdn-icons-png.flaticon.com/128/9297/9297069.png" key={playlist.id} url={`/playlist/list=${playlist.id}`} />
                ))}
            </LargeSideSection>
            <hr />
            <LargeSideSection title="Subscriptions">
                {subscriptions.map((sub)=>(
                    <LargeSideItem title={sub.name} Icon={sub.icon} isProfile key={sub.id} url={`/channel/@${sub.id}`} />
                ))}
            </LargeSideSection>
            <hr />
            <LargeSideSection title="Explore">
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/9226/9226899.png" title="Tredning" url="/trending" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/2639/2639570.png" title="Shopping" url="/shop" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/727/727218.png" title="Music" url="/music" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/4940/4940107.png" title="Movies & TV" url="/movies" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/8191/8191668.png" title="Live" url="/live" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/3743/3743233.png" title="Gaming" url="/game" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/1549/1549668.png" title="News" url="/news" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/4893/4893592.png" title="Sports" url="/sports" />
                <LargeSideItem Icon="https://cdn-icons-png.flaticon.com/128/14245/14245384.png" title="Learning" url="/learn" />
                <LargeSideItem Icon="" title="Fashion & Beauty" url="/fashion" />
                <LargeSideItem Icon="" title="Podcasts" url="/podcast" />

            </LargeSideSection>
        </aside>
        </>
    )
}
type SmallSideItemProps={
    title:string,
    Icon:string,
    url:string,
    isActive?:false | true,
    isProfile?:false | true
}
function SmallSideItem({...props}:SmallSideItemProps){
    return(
        <Button vari="ghost" className="block mx-auto ">
            <a href={props.url} className="flex flex-col items-center rounded">
                <img src={props.Icon} alt="" className="h-6 w-6" />
            </a>
            <span className="text-xs">{props.title}</span> 
        </Button>
    )
}
type LargeSideSectionProps={
    children:React.ReactNode,
    title?:string,
    visCount?:number
}

export function LargeSideSection({visCount=Number.POSITIVE_INFINITY,...props}:LargeSideSectionProps){
    const [showExpand,setShowExpand]=useState(false);// to show the expand button if we have more than visCount elements
    const childArray=Children.toArray(props.children).flat();// as the children can be array of array
    const visibleChild= showExpand? childArray:childArray.slice(0,visCount);// elements that we can show as of the given visCount
    const showExpandBtn = childArray.length > visCount;
    const IconSrc=showExpand? "https://cdn-icons-png.flaticon.com/128/271/271239.png":"https://cdn-icons-png.flaticon.com/128/32/32195.png";
    return (
        <div>
            {props.title && <div className="ml-4 text-sm mt-2">{props.title}</div>}
            {visibleChild}
            {showExpandBtn && 
                    <div onClick={()=>setShowExpand((prev)=>!prev)}>
                    <Button vari="ghost" className=" w-full flex items-center rounded-lg gap-4 p-2">
                        <img src={IconSrc} alt="" className="w-6 h-6"></img>
                        <div>{showExpandBtn ? (showExpand ? "less" : "more") : ""}</div>
                    </Button>
                </div>
            }
        </div>
    )
}
export function LargeSideItem({isActive=false,isProfile=false,...props}:SmallSideItemProps){
    return(
    <div className="rounded hover:bg-gray-100">
        <a href={props.url} className={`flex w-full items-center rounded-lg gap-4 p-2 h-full ${isActive ? 'bg-gray-100 hover:bg-secondary-hover font-semibold' : ''}`}>
        <img src={props.Icon} alt="" className={`h-6 w-6 ${isProfile?'rounded-full':''}`} />
        <span className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">{props.title}</span> 
        </a>
    </div>
)

}