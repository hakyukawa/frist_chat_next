interface InputFieldProps {
    label: string;
    error?: string;
    subtext?: string;
    type: string;
    name: string;
    pattern?: string;
    placeholder?: string;
    value?: string;
    forgetPassword?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField(props: InputFieldProps) {
    return (
        <div className="mb-[20px] flex flex-col">
            <div className="flex items-center">
                <label className="text-[14px] font-semibold">{props.label}</label>
                {props.error && (
                    <p className="text-red-500 text-xs text-[11px] px-[10px]">{props.error}</p>
                )}
            </div>
            {!props.error && props.subtext && <p className="text-[11px]">{props.subtext}</p>}

            <input
                type={props.type}
                name={props.name}
                pattern={props.pattern}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                className={`p-[10px] text-[13px]  font-light border ${
                    props.error ? "border-red-500" : "border-main"
                } w-full rounded-lg`}
            />
            {props.forgetPassword && (
                <small className="w-full text-main text-[1.2rem] text-right underline mt-2">
                    <a href="" className="w-full text-right">
                        パスワードをお忘れの方
                    </a>
                </small>
            )}
        </div>
    );
}
