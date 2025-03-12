import { MdOutlineCameraAlt } from "react-icons/md";

export default function GroupInfo() {
    return (
        <>
            <div className="border border-main rounded-[10px] p-[17px] flex items-center ">
                <div className="rounded-full bg-main w-[70px] h-[70px] shrink-0 relative">
                    <button className="absolute bottom-0 right-0 w-[27px] h-[27px] rounded-full flex items-center justify-center text-[18px] text-subText bg-background">
                        <MdOutlineCameraAlt />
                    </button>
                </div>
                <div className="ml-[16px] w-full">
                    <h2 className="text-[1.3rem] text-subText">グループ名</h2>
                    <input
                        type="text"
                        placeholder="グループ名"
                        className="w-full p-[8px] border border-border rounded-[8px] text-[1.3rem] "
                    />
                </div>
            </div>
        </>
    );
}
