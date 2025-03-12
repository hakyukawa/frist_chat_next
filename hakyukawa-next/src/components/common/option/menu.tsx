import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

interface MenuProps {
    forwardText?: string;
    forwardLink?: string;
    subText?: string;
    
}

function Menu ({forwardText,subText,forwardLink}:MenuProps) {
    return(
        <div>
            <div className="flex justify-between py-[10px]">
                <div>
                    <p className="text-[14px] font-semibold">{forwardText}</p>
                    <p className="text-subText text-[13px] font-light">{subText}</p>
                </div>

                <Link href={forwardLink? forwardLink: "#" } className="flex justify-center items-center">
                    <IoIosArrowForward size={16}/>
                </Link>			    
		    </div>
        </div>
    );  
}

export default Menu;