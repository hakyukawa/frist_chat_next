import Image from "next/image";
import { Dialog } from "@mui/material";
import { useState } from "react";
import { PiSealCheck } from "react-icons/pi";

interface Item {
    name: string;
    point: number;
    image: string;
}

export default function Item({ name, point, image }: Item) {
    const [open, setOpen] = useState(false);
    const [checkOpen, setCheckOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChangeOpen = () => {
        setCheckOpen(true);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "#2e2f34",
                        padding: "30px",
                        borderRadius: "20px",
                    },
                }}
            >
                <div className="flex justify-center items-center relative w-[265px] h-[265px] rounded-full">
                    <div className="bg-border w-[225px] h-[225px] mx-[11px] my-[10px] rounded-full absolute "></div>
                    <Image
                        src={image}
                        alt={name}
                        width={265}
                        height={265}
                        className="absolute top-0 left-0"
                    />
                </div>
                <div className="text-[2rem]">
                    <p className="text-white">{name}</p>
                    <p className="font-bold text-main">{point}pt</p>
                </div>
                <button
                    onClick={handleChangeOpen}
                    className="w-[220px] h-[50px] m-auto mt-[20px] border border-main rounded-[40px]"
                >
                    <p className="text-main text-[1.5rem] font-semibold">交換する</p>
                </button>
            </Dialog>

            <Dialog
                open={checkOpen}
                onClose={() => setCheckOpen(false)}
                sx={{
                    "& .MuiPaper-root": {
                        backgroundColor: "#2e2f34",
                        padding: "30px",
                        borderRadius: "20px",
                    },
                }}
            >
                <div className="text-main flex flex-col items-center gap-4">
                    <PiSealCheck size="80px" />
                    <p className="text-[1.5rem] font-semibold">交換完了</p>
                </div>
            </Dialog>

            <button
                onClick={handleClickOpen}
                className="border border-border rounded-[10px] px-[9px] py-[7px] my-4 gap-4 text-left"
            >
                <div className="relative w-[90px] h-[90px] rounded-full">
                    <div className="bg-border w-[70px] h-[70px] mx-[11px] my-[10px] rounded-full absolute"></div>
                    <Image
                        src={image}
                        alt={name}
                        width={100}
                        height={100}
                        className="absolute top-0 left-0"
                    />
                </div>
                <div className="text-[1.1rem]">
                    <p>{name}</p>
                    <p className="font-bold text-main">{point}pt</p>
                </div>
            </button>
        </>
    );
}
