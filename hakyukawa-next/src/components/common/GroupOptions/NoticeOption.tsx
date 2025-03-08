"use client";

import { useState } from "react";
import NoticeSwitchButton from "./NoticeSwitchButton";

export default function NoticeOption() {
    const [switches, setSwitches] = useState({
        notification: true,
        message: true,
        coreTime: true,
        noReplyTime: true,
        noReplyDay: true,
    });

    const handleSwitchChange = (key: keyof typeof switches, checked: boolean) => {
        if (key === "notification" && !checked) {
            setSwitches({
                notification: false,
                message: false,
                coreTime: false,
                noReplyTime: false,
                noReplyDay: false,
            });
        } else {
            setSwitches((prev) => ({ ...prev, [key]: checked }));
        }
        if (key !== "notification" && checked) {
            setSwitches((prev) => ({ ...prev, notification: true }));
        }
    };

    return (
        <>
            <h2 className="text-subText font-semibold text-[14px] ">通知設定</h2>
            <h3 className="border-b border-border ">
                <NoticeSwitchButton
                    label="通知"
                    checked={switches.notification}
                    onChange={(checked) => handleSwitchChange("notification", checked)}
                />
            </h3>
            <NoticeSwitchButton
                label="メッセージ通知"
                checked={switches.message}
                onChange={(checked) => handleSwitchChange("message", checked)}
            />
            <NoticeSwitchButton
                label="コアタイム通知"
                checked={switches.coreTime}
                onChange={(checked) => handleSwitchChange("coreTime", checked)}
            />
            <NoticeSwitchButton
                label="返信不要時間帯のメッセージ通知"
                checked={switches.noReplyTime}
                onChange={(checked) => handleSwitchChange("noReplyTime", checked)}
            />
            <NoticeSwitchButton
                label="返信不要曜日のメッセージ通知"
                checked={switches.noReplyDay}
                onChange={(checked) => handleSwitchChange("noReplyDay", checked)}
            />
        </>
    );
}
