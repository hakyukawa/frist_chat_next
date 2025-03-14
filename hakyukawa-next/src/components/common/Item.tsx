import Image from "next/image";

interface Item {
    selected: boolean;
    onClick?: () => void;
    name: string;
    image: string;
}

export default function Item({ name, selected, onClick, image }: Item) {
    return (
        <button
            className={`border rounded-[10px] px-[9px] py-[7px] mt-6 text-left ${
                selected ? "border-main" : "border-border"
            }`}
            onClick={onClick}
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
                <p className={`font-bold ${selected ? "text-main" : "text-subText"}`}>
                    {selected ? "選択中" : "選択する"}
                </p>
            </div>
        </button>
    );
}
