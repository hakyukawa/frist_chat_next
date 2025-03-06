import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function ReplayOption() {
    return (
        <div>
            <h2 className="text-subText font-semibold text-[14px] ">返信設定</h2>
            <div className="bg-[#FDBB71] h-[90px] rounded-[10px]">
                <div className="p-[14px] ">
                    <Select
                        sx={{
                            width: "100%",
                            backgroundColor: "#2E2F34", // 背景色を#2E2F34に設定
                            color: "#ffffff", // 文字色を白に
                            "& .MuiSelect-icon": {
                                color: "#ffffff", // ドロップダウンアイコンの色を白に
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#2E2F34", // ボーダーの色を統一
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#ffffff", // ホバー時のボーダー色
                            },
                        }}
                        displayEmpty
                    >
                        <MenuItem value="">なし</MenuItem>
                        <MenuItem value={60}>1時間</MenuItem>
                        <MenuItem value={120}>2時間</MenuItem>
                        <MenuItem value={180}>3時間</MenuItem>
                    </Select>
                </div>
            </div>
        </div>
    );
}
