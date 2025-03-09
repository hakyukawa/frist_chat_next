interface Item {
    name: string;
    selected: boolean;
    onClick?: () => void;
}

export default function Item({ name, selected, onClick }: Item) {
    return (
        <button
            className={`border rounded-[10px] px-[9px] py-[7px] mt-6 text-left ${
                selected ? "border-main" : "border-border"
            }`}
            onClick={onClick}
        >
            <div className="bg-main w-[70px] h-[70px] mx-[11px] my-[10px] rounded-full"></div>
            <div className="text-[1.1rem]">
                <p>{name}</p>
                <p className={`font-bold ${selected ? "text-main" : "text-subText"}`}>
                    {selected ? "選択中" : "選択する"}
                </p>
            </div>
        </button>
    );
}
