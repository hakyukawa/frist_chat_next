import Image from "next/image";
interface Item {
    name: string;
    point: number;
    image: string;
}

export default function Item({ name, point, image }: Item) {
    return (
        <button className="border border-border rounded-[10px] px-[9px] py-[7px] my-4 gap-4 text-left">
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
    );
}
