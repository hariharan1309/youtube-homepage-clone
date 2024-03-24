import { ReactNode, createContext, useContext, useState, useEffect } from "react"

type SideBarContextProps = {
    children:ReactNode
}
type SideBarContextType = {
    islargeOpen:boolean;
    isSmallOpen:boolean;
    toggle:()=>void;
    close:()=>void;

}
const SideBarContext=createContext<SideBarContextType | null>(null);

export function useSideBar(){
    const value=useContext(SideBarContext);
    if(!value){
        throw new Error('useSideBar must be used within a SideBarProvider');
    }
    return value;
}
export function SideBarProvider({children}: SideBarContextProps)
{
    const [islargeOpen,setIsLargeOpen]=useState(true);
    const [isSmallOpen,setIsSmallOpen]=useState(true);

// Additional
    useEffect(()=>{
        const listener=()=>{
            if(!isScreenSmall()){
                setIsSmallOpen(false);
            }

        window.addEventListener('resize',listener);
        return  ()=> window.removeEventListener('resize',listener);
        }
        listener();// automatically call the listener to check the screen size and chnage the side bar if needed
    },[])

    function isScreenSmall(){
        return window.innerWidth < 1024;
    }
    function toggle(){
        if(isScreenSmall()){
            setIsSmallOpen(s=> !s);
        }
        else{
            setIsLargeOpen(l=> !l);
        }
    }
    function close(){
        if(isScreenSmall()){
            setIsSmallOpen(false);
        }
        else{
            setIsLargeOpen(false);
        }
    }
    return <SideBarContext.Provider value={{islargeOpen,isSmallOpen,toggle,close}}>{children}</SideBarContext.Provider>;
    
    }