// import Logo from '../assets/yt.gif'
import { useState } from "react"
import Button from "./Button"
import { useSideBar } from "../context/SideBarContext";

export function PageHeader(){
    const [fullSearch,setFullSearch] = useState(false);
    // const {toggle} = useSideBar();
    return(
        // It contains nav & logo at left search bar at center & right side functionality icons
        <div className="flex flex-row gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
            <PageHeaderSection fullSearch={fullSearch}/>
            <form className={`gap-3 flex-grow justify-center ${fullSearch?'flex':'hidden sm:flex'}`}>
                <Button vari="ghost" type="icon" className={`px-2 flex-shrink-0 ${fullSearch?'flex':'hidden'}`}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2099/2099166.png" alt="" className="h-6 p-[1px]" onClick={()=>setFullSearch(false)}/>
                </Button>
                <div className="flex flex-grow max-w-[600px]">
                    <input type="search" className="w-full rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-sm focus:border-blue-300  outline-none" placeholder="Search" />
                    <Button className="rounded-r-full border border-l-0 px-4 py-2 flex-shrink-0 border-secondary-border">
                        <img src="https://cdn-icons-png.flaticon.com/128/2652/2652234.png" alt="" className="h-6 p-[1px]"/> 
                    </Button>
                </div>
                <Button type="icon" className="flex-shrink-0">
                    <img src="https://cdn-icons-png.flaticon.com/128/8840/8840275.png" alt="" className="h-6 p-[1px]" />
                </Button>
            </form>
            <div className={`md:gap-2 items-center shrink-0 ${fullSearch?'hidden':'flex'}`}>  {/* center vertically & shrinking to 0*/}
                <Button type="icon" vari="ghost" className="flex-shrink-0 sm:hidden" >
                    <img src="https://cdn-icons-png.flaticon.com/128/2652/2652234.png" alt="" className="h-6 p-[1px]"  onClick={()=>setFullSearch(true)}/>
                </Button>
                <Button type="icon" vari="ghost" className="flex-shrink-0 sm:hidden">
                    <img src="https://cdn-icons-png.flaticon.com/128/8840/8840275.png" alt="" className="h-6 p-[1px]" />
                        {/* <img src="https://cdn-icons-png.flaticon.com/128/2652/2652234.png" alt="" /> search*/} 
                </Button>
                <Button type="icon" vari="ghost">
                     <img src="https://cdn-icons-png.flaticon.com/128/4620/4620095.png" alt="" className="h-6 p-[1px]"/>
                </Button>
                <Button type="icon" vari="ghost">
                     <img src="https://cdn-icons-png.flaticon.com/128/3239/3239958.png" alt="" className="h-6 p-[1px]"  />
                </Button>
                <Button type="icon" vari="ghost">
                     <img src="https://cdn-icons-png.flaticon.com/128/10628/10628940.png" alt="" className="h-6 p-[1px]" />
                </Button>
            </div>
        </div>
    )
}
type PageSecProp={
    fullSearch?:boolean;
}

export function PageHeaderSection({fullSearch}:PageSecProp){
    const {toggle} = useSideBar();

    return(
        <div className={`flex gap-4 items-center shrink-0 ${fullSearch?'hidden':'flex'}`}>  {/* center vertically & shrinking to 0*/}
            <Button vari="ghost" type="icon">
                <img src="https://cdn-icons-png.flaticon.com/128/5259/5259008.png" alt="menu" className="h-6 p-[1px]" onClick={toggle} />
            </Button>
            <a href="/">
                {/* <img src={Logo} alt="Logo" /> */}
                <img src="https://cdn-icons-png.flaticon.com/128/1383/1383260.png" alt="" className="h-6 p-[1px]" />
            </a>
        </div>
    )
}