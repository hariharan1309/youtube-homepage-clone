import CategoryPills from "./Components/CategoryPills";
import {PageHeader} from "./Components/PageHeader";
import SideBar from "./Components/SideBar";
import VideoGrid from "./Components/VideoGrid";
import { category, videos } from "./data/data";
import { useState } from "react";
import { SideBarProvider } from "./context/SideBarContext";
export default function App() {
  const [selectCat,setSelectCat] = useState(0);
return(
      <SideBarProvider >
        <div className="max-h-screen flex flex-col text-sm">
          <PageHeader />
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-y-auto">
            {/* grid 2 cokumn 1 for nav bar other for rwhich takes rest of the page which has category and video areas */}
              <SideBar />
            <div className="overflow-x-hidden px-8 pb-4">
              {/* This is the top category section  */}
              <div className="sticky top-0 bg-white z-10 pb-5">
                <CategoryPills categories={category} selected={selectCat} setSelect={setSelectCat} />
              </div>
              <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">{/* This will make the video to be highest of 300px width ie columns and make full single column for lesser size page*/}
                {/* This is the video section */}
                {videos.map((video)=>(
                    <VideoGrid key={video.id} {...video}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SideBarProvider>
  )
}