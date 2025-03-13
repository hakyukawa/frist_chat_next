"use client";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ReplayTimeHeadline from "./ReplayOptionHeadline";
import TimePicker from "./TimePickerOption";
import SelectDate from "@/components/common/GroupOptions/SelectDate";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState, forwardRef, useEffect, useRef } from "react";

interface weeks {
    date: string;
    isSelected: boolean;
}

interface ReplayOptionProps {
    onDataChange?: (data: {
        start_at: string;
        end_at: string;
        start_core_time: string;
        end_core_time: string;
        weeks: weeks[];
        until_replay: string;
    }) => void;
}

const CompatibleSelect = forwardRef<HTMLDivElement, SelectProps<string>>((props, ref) => {
    return <Select {...props} ref={ref} />;
});
CompatibleSelect.displayName = "CompatibleSelect";

export default function ReplayOption({ onDataChange }: ReplayOptionProps) {
    const [start_at, setStartAt] = useState<string>("00:00");
    const [end_at, setEndAt] = useState<string>("00:00");
    const [start_core_time, setStartCoreTime] = useState<string>("00:00");
    const [end_core_time, setEndCoreTime] = useState<string>("00:00");
    const onDataChangeRef = useRef(onDataChange);
    const [weeks, setWeeks] = useState<weeks[]>([
        {
            date: "日",
            isSelected: false,
        },
        {
            date: "月",
            isSelected: false,
        },
        {
            date: "火",
            isSelected: false,
        },
        {
            date: "水",
            isSelected: false,
        },
        {
            date: "木",
            isSelected: false,
        },
        {
            date: "金",
            isSelected: false,
        },
        {
            date: "土",
            isSelected: false,
        },
    ]);

    useEffect(() => {
        onDataChangeRef.current = onDataChange;
    }, [onDataChange]);

    const [until_replay, setUntilReplay] = useState<string>("");

    useEffect(() => {
        if (onDataChangeRef.current) {
            onDataChangeRef.current({
                start_at,
                end_at,
                start_core_time,
                end_core_time,
                weeks,
                until_replay,
            });
        }
    }, [start_at, end_at, start_core_time, end_core_time, weeks, until_replay]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        setUntilReplay(event.target.value);
    };

    const toggleDaySelection = (date: string) => {
        setWeeks((prev) =>
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
                        value={until_replay}
                        onChange={handleChange}
                        variant="outlined" // variant プロパティを追加
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
                        <MenuItem value="">なし</MenuItem>
                        <MenuItem value="01:00:00">1時間</MenuItem>
                        <MenuItem value="02:00:00">2時間</MenuItem>
                    </CompatibleSelect>
                </div>
            </div>
            <div className=" bg-[linear-gradient(to_bottom,#FDBB71_0%,#8E8E8E_78%)] rounded-[10px] py-3 my-6">
                <ReplayTimeHeadline label="コアタイム" />
                <div className="px-[16px] my-[8px] text-[1.6rem] text-background flex justify-between items-center">
                    <TimePicker setQuery={start_core_time} setSetQuery={setStartCoreTime} />
                    <FaArrowRightLong />
                    <TimePicker setQuery={end_core_time} setSetQuery={setEndCoreTime} />
                </div>
                <div className="px-[16px] my-[8px] text-[1.6rem] text-background ">
                    <p className="text-[14px] font-semibold p-[4px]">返信不要の時間帯</p>
                    <div className="flex justify-between items-center">
                        <TimePicker setQuery={start_at} setSetQuery={setStartAt} />
                        <FaArrowRightLong />
                        <TimePicker setQuery={end_at} setSetQuery={setEndAt} />
                    </div>
                </div>
            </div>
            <div className="bg-[#8E8E8E] px-[16px] py-[14px] rounded-[10px]">
                <h2 className="text-background font-semibold text-[14px]">返信不要の曜日</h2>
                <div className="bg-background rounded-[12px] py-[15px] px-[8px]">
                    <p className="border-b border-border px-[7px] pb-1 text-[1.2rem]">
                        {weeks.some((day) => day.isSelected) ? (
                            <>
                                毎週
                                {weeks.map((day, index) =>
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
                        {weeks.map((day, index) => {
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
