"use client";

import { useState } from "react";
import NoticeSwitchButton from "./NoticeSwitchButton";

interface SwitchItem {
    name: string;
    label: string;
    checked: boolean;
}

export default function NoticeOption() {
    const [switches, setSwitches] = useState<SwitchItem[]>([
        { name: "notification", label: "通知", checked: true },
        { name: "message", label: "メッセージ通知", checked: true },
        { name: "coreTime", label: "コアタイム通知", checked: true },
        { name: "noReplyTime", label: "返信不要時間帯のメッセージ通知", checked: true },
        { name: "noReplyDay", label: "返信不要曜日のメッセージ通知", checked: true },
    ]);

    const handleSwitchChange = (name: string, checked: boolean) => {
        // 通知がオフになった時、全ての通知をオフにする
        if (name === "notification" && !checked) {
            setSwitches(
                switches.map((item) => ({
                    ...item,
                    checked: false,
                }))
            );
        }
        // 通知スイッチがオンになった場合、すべてのスイッチをオンにする
        else if (name === "notification" && checked) {
            setSwitches(
                switches.map((item) => ({
                    ...item,
                    checked: true,
                }))
            );
        }
        // いずれかの通知がオンになった時、通知をオンにする
        else if (name !== "notification" && checked) {
            setSwitches(
                switches.map((item) =>
                    item.name === name
                        ? { ...item, checked }
                        : item.name === "notification"
                        ? { ...item, checked: true }
                        : item
                )
            );
        } else {
            setSwitches(switches.map((item) => (item.name === name ? { ...item, checked } : item)));
        }
    };

    return (
        <>
            <h2 className="text-subText font-semibold text-[14px] ">通知設定</h2>

            {switches.map((switchItem, index) =>
                index === 0 ? (
                    <h3 key={switchItem.name} className="border-b border-border ">
                        <NoticeSwitchButton
                            label={switchItem.label}
                            checked={switchItem.checked}
                            onChange={(checked) => handleSwitchChange(switchItem.name, checked)}
                        />
                    </h3>
                ) : (
                    <NoticeSwitchButton
                        key={switchItem.name}
                        label={switchItem.label}
                        checked={switchItem.checked}
                        onChange={(checked) => handleSwitchChange(switchItem.name, checked)}
                    />
                )
            )}
        </>
    );
}
