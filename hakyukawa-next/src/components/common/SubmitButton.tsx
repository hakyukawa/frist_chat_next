interface Statusprops {
    formData?: string;
    error?: string;
    buttonValue?: string;
}

function SubmitButton({ formData, error, buttonValue }: Statusprops) {
    return (
        <div className="p-[16px] cursor-pointer">
            <input
                type="submit"
                value={buttonValue}
                className={`bg-border border-none rounded-[40px] w-full p-[10px] text-[15px] text-background font-semibold cursor-pointer ${
                    formData?.trim() !== "" && !error ? "bg-main" : "bg-border"
                }`}
            />
        </div>
    );
}

export default SubmitButton;
