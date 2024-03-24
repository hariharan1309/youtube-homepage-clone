import { useEffect, useRef, useState } from "react";

type VideoProps={
    id:string;
    title:string;
    views:number;
    channel:{
        id:string;
        name:string;
        profileUrl:string;
    },
    videoUrl:string,
    thumbnailUrl:string,
    duration:number,
    postedAt:Date,

}
const durationFormat=(duration:number)=>{
    const ZeroFormater=new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    })
    const hr=Math.floor(duration/3600);
    const min = Math.floor((duration-hr*3600)/60);
    const sec = duration%60;
    if(hr>0){
        return `${hr}:${ZeroFormater.format(min)}:${ZeroFormater.format(sec)}`
    } return `${ZeroFormater.format(min)}:${ZeroFormater.format(sec)}`
}

// Time Posted
const formatter=new Intl.RelativeTimeFormat(undefined, {numeric:"always",});
const divisions:{amount:number ; name: Intl.RelativeTimeFormatUnit} []=[
    {amount: 60, name:"second"},
    {amount: 60, name:"minute"},
    {amount: 24, name:"hour"},
    {amount: 7, name:"day"},
    {amount: 4.34524, name:"week"},
    {amount: 12, name:"month"},
    {amount: Number.POSITIVE_INFINITY, name:"year"}
]
const timeAgo=(date:Date)=>{  
    let dur= (new Date(date).getTime()-new Date().getTime())/1000;
    for(let i=0; i<divisions.length; i++){
        const division=divisions[i];
        if(Math.abs(dur)<division.amount){
            return formatter.format(Math.round(dur), division.name);
        }
        dur=dur/division.amount;
    } 

}
const ViewFromatter=new Intl.NumberFormat(undefined, {notation:"compact"});
export default function VideoGrid({id,title,views,channel,videoUrl,thumbnailUrl,duration,postedAt}:VideoProps){
    const [isHovered, setIsHovered] = useState(false);
    const videoref=useRef<HTMLVideoElement>(null);
    useEffect(()=>{
        if (videoref.current==null) return;
            if(isHovered){
                videoref.current.currentTime=0;
                videoref.current.play();
                }
            else{
                videoref.current.pause();
                }}
            ,[isHovered]) 
    return(
        <div className="flex flex-col gap-2" onMouseEnter={()=>{setIsHovered(true)}} onMouseLeave={()=>{setIsHovered(false)}}>
            <a href={`/watch?v=${videoUrl}`} className=" relative aspect-video">
                <img src={thumbnailUrl} alt="ThumbNail" className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${isHovered? 'rounded-none':'rounded-md'}`} />
                <div className="absolute bottom-1 right-1 px-0.5 bg-secondary-dark bg-secondary-text text-xs rounded">
                    {durationFormat(duration)}
                </div>
                <video src={videoUrl} ref={videoref} muted playsInline  
                className={`block h-full w-full object-cover absolute inset-0 transition-opacity duration-200  ${isHovered ? "opacity-100 delay-200" : "opacity-0"}`} 
                // the delay tp match the border effect then playing the video
                />
            </a>
            <div className="flex gap-2">
                <a href={`@/${channel.id}`} className="flex-shrink-0 ">
                    <img src={channel.profileUrl} alt="" className="h-10 w-auto rounded-full" />
                </a>
                <div className="flex flex-col">
                    <a href={`@/watch?v=${id}`} className="font-semibold">
                        {title}
                    </a>
                    <a href={`@/${id}`} className="text-secondary text-xs">
                        {channel.name}
                    </a>
                    <div className="text-secondary text-xs">
                        {ViewFromatter.format(views)} views • {timeAgo(postedAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}