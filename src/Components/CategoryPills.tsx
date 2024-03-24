import Button from "./Button";
import { useRef, useState } from "react";
type CategoryProps={
    categories: string[];
    selected: number;
    setSelect: (index:number)=>void;
}
const TRANSLATE=200;

export default function CategoryPills({categories, selected, setSelect}:CategoryProps){
    const [translate,setTranslate]=useState(0);
    const [isLeft,setIsLeft] = useState(false);
    const [isRight,setIsRight] = useState(true);
    const containerREF=useRef<HTMLDivElement>(null);
    return(
        <div className="overflow-x-hidden relative" ref={containerREF}>
            {/* This is the element that actually contains the overflow property which has all categories so that has to contain the ref */}
            <div  className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style={{transform:`translateX(-${translate}px)`}}>
                {categories.map((category,index)=>(
                    // Button({type:'default',vari:'ghost',children:category,className:'px-4 py-2'})
                    <div onClick={()=>setSelect(index)}>
                        <Button 
                            key={index} type="default" vari={index===selected?"dark":"default"} className="px-4 py-2">
                            {category}
                        </Button>
                    </div>
                ))}
            </div>
            {isLeft &&
                <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent h-full w-24" 
                onClick={()=>{
                    setTranslate(()=>{
                        const ntranslate=translate-TRANSLATE;
                        if(ntranslate<=0){
                            setIsLeft(false)
                            return 0;
                        }
                        setIsRight(true);
                        return ntranslate;
                    })
                    }}>
                    <Button vari="ghost" type="icon" className="p-1.5 h-full w-auto aspect-square">
                        <img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" alt="" className="h-6 p-1" />
                    </Button>
                </div>}
            {isRight &&
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent h-full w-24 flex justify-end" 
            onClick={()=>{
                setTranslate(translate=>{
                    if(containerREF.current== null) return translate;
                    const edge=containerREF.current.scrollWidth;// returns the width of the whole element
                    const width=containerREF.current.clientWidth;// current view width
                    const ntranslate=translate+TRANSLATE;
                    if(ntranslate+width >= edge){
                        setIsRight(false);
                        return edge-width;
                    }
                    setIsLeft(true);
                    return ntranslate;
                })
                }}>
                <Button vari="ghost" type="icon" className="p-1.5 h-full w-auto aspect-square">
                    <img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="" className="h-6 p-1" />
                </Button>
            </div>}
        </div>
    )
}