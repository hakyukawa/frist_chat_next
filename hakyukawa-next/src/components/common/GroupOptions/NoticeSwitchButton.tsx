"use client";

import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#2E2F34",
            "& + .MuiSwitch-track": {
                backgroundColor: "#EC891F",
                opacity: 1,
                border: 0,
            },
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.5,
        },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22,
        backgroundColor: "#2E2F34",
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: "#AFAFAF",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500,
        }),
    },
}));

interface NoticeSwitchButtonProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function NoticeSwitchButton(props: NoticeSwitchButtonProps) {
    return (
        <div className="flex items-center justify-between">
            <p className="font-semibold text-[1.4rem]">{props.label}</p>
            <FormGroup>
                <FormControlLabel
                    sx={{ mr: 0 }}
                    control={
                        <IOSSwitch
                            sx={{ mx: 0, my: 1 }}
                            checked={props.checked}
                            onChange={(e) => props.onChange(e.target.checked)}
                        />
                    }
                    label=""
                />
            </FormGroup>
        </div>
    );
}
