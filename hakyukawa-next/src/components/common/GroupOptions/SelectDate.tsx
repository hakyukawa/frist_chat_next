interface SelectDateProps {
    value: string;
    isSelected: boolean;
    onClick: () => void;
}

export default function SelectDate({ value, isSelected, onClick }: SelectDateProps) {
    return (
        <button
            className={`text-center text-white w-[27px] h-[27px] rounded-full transition-colors duration-200 ${
                isSelected && "bg-main"
            }`}
            onClick={onClick}
        >
            <p className="text-[1.5rem]">{value}</p>
        </button>
    );
}
