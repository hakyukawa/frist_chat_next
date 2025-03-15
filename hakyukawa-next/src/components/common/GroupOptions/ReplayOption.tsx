"use client";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ReplayTimeHeadline from "./ReplayOptionHeadline";
import TimePicker from "./TimePickerOption";
import SelectDate from "@/components/common/GroupOptions/SelectDate";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState, forwardRef, useEffect, useRef } from "react";

interface ReplayOptionData {
    start_at: string;
    end_at: string;
    start_core_time: string;
    end_core_time: string;
    weeks: string[];
    until_reply: string; // until_reply から until_replay に変更
}
interface WeekDay {
    date: string;
    isSelected: boolean;
}

interface ReplayOptionProps {
    onDataChange?: (data: ReplayOptionData) => void;
    data?: InfoData;
}

interface InfoData {
    start_at: string;
    end_at: string;
    start_core_time: string;
    end_core_time: string;
    weeks: string[];
    until_replay: string;
}

const CompatibleSelect = forwardRef<HTMLDivElement, SelectProps<string>>((props, ref) => {
    return <Select {...props} ref={ref} />;
});
CompatibleSelect.displayName = "CompatibleSelect";

// 時間を HH:MM から HH:MM:SS 形式に変換する関数
const formatTimeToHHMMSS = (time: string): string => {
    if (!time) return "00:00:00";

    // すでに HH:MM:SS 形式ならそのまま返す
    if (/^\d{1,2}:\d{1,2}:\d{1,2}$/.test(time)) {
        return time;
    }

    // HH:MM 形式なら秒を追加
    if (/^\d{1,2}:\d{1,2}$/.test(time)) {
        const [hours, minutes] = time.split(":").map(Number);
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
    }

    return "00:00:00";
};

export default function ReplayOption({ onDataChange, data }: ReplayOptionProps) {
    const onDataChangeRef = useRef(onDataChange);
    const [startAt, setStartAt] = useState<string>("00:00");
    const [endAt, setEndAt] = useState<string>("00:00");
    const [startCoreTime, setStartCoreTime] = useState<string>("00:00");
    const [endCoreTime, setEndCoreTime] = useState<string>("00:00");
    const [untilReplay, setUntilReplay] = useState<string>("");
    const [weekDays, setWeekDays] = useState<WeekDay[]>([
        { date: "日", isSelected: false },
        { date: "月", isSelected: false },
        { date: "火", isSelected: false },
        { date: "水", isSelected: false },
        { date: "木", isSelected: false },
        { date: "金", isSelected: false },
        { date: "土", isSelected: false },
    ]);

    useEffect(() => {
        onDataChangeRef.current = onDataChange;
    }, [onDataChange]);

    useEffect(() => {
        if (onDataChangeRef.current) {
            // 選択された曜日だけの配列を作成
            const selectedWeeks = weekDays.filter((day) => day.isSelected).map((day) => day.date);

            onDataChangeRef.current({
                start_at: formatTimeToHHMMSS(startAt),
                end_at: formatTimeToHHMMSS(endAt),
                start_core_time: formatTimeToHHMMSS(startCoreTime),
                end_core_time: formatTimeToHHMMSS(endCoreTime),
                weeks: selectedWeeks,
                until_reply: untilReplay || "00:00:00", // 空の場合はデフォルト値を設定
            });
        }
    }, [startAt, endAt, startCoreTime, endCoreTime, weekDays, untilReplay]);

    useEffect(() => {
        if (data) {
            setStartAt(data.start_at);
            setEndAt(data.end_at);
            setStartCoreTime(data.start_core_time);
            setEndCoreTime(data.end_core_time);
            setUntilReplay(data.until_replay);
            setWeekDays((prev) =>
                prev.map((day) => ({
                    ...day,
                    isSelected: data.weeks.includes(day.date),
                }))
            );
        }
    }, [data]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setUntilReplay(event.target.value);
    };

    const toggleDaySelection = (date: string) => {
        setWeekDays((prev) =>
            prev.map((day) => (day.date === date ? { ...day, isSelected: !day.isSelected } : day))
        );
    };

    return (
        <div>
            <h2 className="text-subText font-semibold text-[14px]">返信設定</h2>
            <div className="bg-[#FDBB71] h-[90px] rounded-[10px] py-3 my-3">
                <ReplayTimeHeadline label="目標返信時間" />
                <div className="px-[14px] py-3">
                    <CompatibleSelect
                        value={untilReplay || "00:00:00"}
                        onChange={handleChange}
                        variant="outlined"
                        sx={{
                            width: "100%",
                            height: "35px",
                            borderRadius: "12px",
                            fontSize: "1.3rem",
                            backgroundColor: "#2E2F34",
                            color: "#ffffff",
                            "& .MuiSelect-icon": {
                                color: "#ffffff",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#2E2F34",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ffffff",
                            },
                        }}
                        displayEmpty
                    >
                        <MenuItem value="00:00:00">なし</MenuItem>
                        <MenuItem value="01:00:00">1時間</MenuItem>
                        <MenuItem value="02:00:00">2時間</MenuItem>
                    </CompatibleSelect>
                </div>
            </div>
            <div className=" bg-[linear-gradient(to_bottom,#FDBB71_0%,#8E8E8E_78%)] rounded-[10px] py-3 my-6">
                <ReplayTimeHeadline label="コアタイム" />
                <div className="px-[16px] my-[8px] text-[1.6rem] text-background flex justify-between items-center">
                    <TimePicker setQuery={startCoreTime} setSetQuery={setStartCoreTime} />
                    <FaArrowRightLong />
                    <TimePicker setQuery={endCoreTime} setSetQuery={setEndCoreTime} />
                </div>
                <div className="px-[16px] my-[8px] text-[1.6rem] text-background ">
                    <p className="text-[14px] font-semibold p-[4px]">返信不要の時間帯</p>
                    <div className="flex justify-between items-center">
                        <TimePicker setQuery={startAt} setSetQuery={setStartAt} />
                        <FaArrowRightLong />
                        <TimePicker setQuery={endAt} setSetQuery={setEndAt} />
                    </div>
                </div>
            </div>
            <div className="bg-[#8E8E8E] px-[16px] py-[14px] rounded-[10px]">
                <h2 className="text-background font-semibold text-[14px]">返信不要の曜日</h2>
                <div className="bg-background rounded-[12px] py-[15px] px-[8px]">
                    <p className="border-b border-border px-[7px] pb-1 text-[1.2rem]">
                        {weekDays.some((day) => day.isSelected) ? (
                            <>
                                毎週
                                {weekDays.map((day, index) =>
                                    day.isSelected ? (
                                        <span key={index} className="ml-1">
                                            {day.date}
                                        </span>
                                    ) : null
                                )}
                            </>
                        ) : (
                            "なし"
                        )}
                    </p>

                    <div className="flex items-center justify-between text-center mt-[11px] px-[15px] w-full">
                        {weekDays.map((day, index) => {
                            return (
                                <SelectDate
                                    key={index}
                                    value={day.date}
                                    isSelected={day.isSelected}
                                    onClick={() => toggleDaySelection(day.date)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
