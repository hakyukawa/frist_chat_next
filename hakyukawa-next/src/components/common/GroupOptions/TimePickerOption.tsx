"use client";

interface TimePickerOptionProps {
    setQuery: string;
    setSetQuery: (query: string) => void;
}

export default function TimePickerOption({ setQuery, setSetQuery }: TimePickerOptionProps) {
    return (
        <input
            type="time"
            className="bg-background text-center rounded-[12px] w-[150px] h-[42px] border-[2px] text-white border-[#F86649]"
            value={setQuery}
            onChange={(e) => setSetQuery(e.target.value)}
        />
    );
}
