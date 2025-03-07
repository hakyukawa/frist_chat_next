"use client";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";

export default function TimePickerOption() {
    const [open, setOpen] = useState(false);
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div>
            <button
                className="bg-background rounded-[12px] w-[150px] h-[42px] border-[2px] border-[#F86649]"
                onClick={toggleDrawer}
            >
                <p className="text-[1.6rem] font-medium text-white">24:00</p>
            </button>
            <Drawer anchor="bottom" open={open} onClose={toggleDrawer}>
                <p>いいいいい</p>
            </Drawer>
        </div>
    );
}
