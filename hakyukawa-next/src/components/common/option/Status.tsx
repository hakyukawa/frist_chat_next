interface Statusprops{
    nowState?: string;
}

function Status ({nowState}: Statusprops) {
    return(
            <div className="py-[10px]">
                <p className="text-[14px] text-subText font-semibold">現在</p>
                <p className="text-[18px] text-subText font-light">{nowState}</p>
            </div>        
    );
   
}

export default Status;