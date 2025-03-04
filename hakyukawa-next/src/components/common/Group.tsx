import { BsChatTextFill } from "react-icons/bs";

interface GroupProps {
    GroupName: string;
    LastMessageTime: number;
    NumberOfPerson: number;
}

export default function Group(props: GroupProps) {
    return (
        <div className="my-[20px] flex items-center">
            <div className="bg-blue-400 w-[46px] h-[46px] rounded-full mr-[16px]"></div>
            <div>
                <h2 className="text-[18px] flex items-center">
                    {props.GroupName}
                    {props.NumberOfPerson >= 2 && `(${props.NumberOfPerson})`}
                </h2>
                <p className="text-[15px] text-blue-400 flex items-center">
                    <BsChatTextFill className="w-[21px]" />
                    受信
                    {props.LastMessageTime < 60
                        ? `${props.LastMessageTime}分前`
                        : `${Math.floor(props.LastMessageTime / 60)}時間前`}
                </p>
            </div>
        </div>
    );
}
