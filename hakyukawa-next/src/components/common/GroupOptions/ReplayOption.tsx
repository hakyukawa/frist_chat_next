"use client";
import Select, { SelectChangeEvent } from "@mui/material/Select"; // SelectChangeEventをインポート
import MenuItem from "@mui/material/MenuItem";
import ReplayTimeHeadline from "./ReplayOptionHeadline";
import TimePicker from "./TimePickerOption";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

export default function ReplayOption() {
    const [dayOfWeekOption, setDayOfWeekOption] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);

    const [selectedTime, setSelectedTime] = useState<string>("");

    // handleChangeの引数をSelectChangeEvent<string>に修正
    const handleChange = (event: SelectChangeEvent<string>) => {
        setSelectedTime(event.target.value);
    };

    return (
        <div>
            <h2 className="text-subText font-semibold text-[14px]">返信設定</h2>
            <div className="bg-[#FDBB71] h-[90px] rounded-[10px] py-3 my-3">
                <ReplayTimeHeadline label="目標返信時間" />
                <div className="px-[14px] py-3">
                    <Select
                        value={selectedTime} // stateから値を取得
                        onChange={handleChange} // 値が変更されたときに更新
                        sx={{
                            width: "100%",
                            height: "35px",
                            borderRadius: "12px",
                            fontSize: "1.3rem",
                            backgroundColor: "#2E2F34", // 背景色を#2E2F34に設定
                            color: "#ffffff", // 文字色を白に
                            "& .MuiSelect-icon": {
                                color: "#ffffff", // ドロップダウンアイコンの色を白に
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#2E2F34", // ボーダーの色を統一
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ffffff", // ホバー時のボーダー色
                            },
                        }}
                        displayEmpty
                    >
                        <MenuItem value="">なし</MenuItem>
                        <MenuItem value={60}>1時間</MenuItem>
                        <MenuItem value={120}>2時間</MenuItem>
                        <MenuItem value={180}>3時間</MenuItem>
                    </Select>
                </div>
            </div>
            <div className=" bg-[linear-gradient(to_bottom,#FDBB71_0%,#8E8E8E_78%)] rounded-[10px] py-3 my-6">
                <ReplayTimeHeadline label="コアタイム" />
                <div className="px-[16px] my-[8px] text-[1.6rem] text-background flex justify-between items-center">
                    <TimePicker />
                    <FaArrowRightLong />
                    <TimePicker />
                </div>
                <div className="px-[16px] my-[8px] text-[1.6rem] text-background ">
                    <p className="text-[14px] font-semibold p-[4px]">返信不要の時間帯</p>
                    <div className="flex justify-between items-center">
                        <TimePicker />
                        <FaArrowRightLong />
                        <TimePicker />
                    </div>
                </div>
            </div>
            <div className="bg-[#8E8E8E] px-[16px] py-[14px] rounded-[10px]">
                <h2 className="text-background font-semibold text-[14px]">返信不要の曜日</h2>
                <div className="bg-background rounded-[12px] py-[15px] px-[8px]"></div>
            </div>
        </div>
    );
}
