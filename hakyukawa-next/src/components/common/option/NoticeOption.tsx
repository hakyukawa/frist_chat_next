"use client";

import React, {useState} from "react";
import NoticeSwitchButton from "../GroupOptions/NoticeSwitchButton";

interface SwitchItem {
    name: string;
    label: string;
    checked: boolean;
}

export function NoticeOption () { 
    const [switches,setSwitches] = useState<SwitchItem []> ([
        {name:"notification", label:"通知", checked:true},
        {name:"addFriend", label:"フレンド追加通知", checked:true},
        {name:"groupMember", label:"グループメンバー参加通知", checked:true}
    ]);

    const handleSwitchChange = (name:string , checked:boolean) => {
        //通知がオフになった場合、すべてのスイッチをオフにする
        if(name === "notification" && !checked){
            setSwitches(
                switches.map((items) => ({
                    ...items,
                    checked: false,
                }))
            );
            
        }

        //通知がオンになった場合、すべてのスイッチをオンにする
        else if(name === "notification" && checked){
            setSwitches(
                switches.map((items) => ({
                    ...items,
                    checked: true,
                }))
            );
            
        }
        //いずれかのスイッチがオンになった場合、
        else if(name !== "notification" && checked){
            setSwitches(
                switches.map((items) => 
                    items.name === name 
                        ? {...items, checked} 
                        : items.name === "notification" 
                        ? {...items, checked:true} 
                        : items
                ) 
            );
        }else{
            setSwitches(switches.map((items) => (items.name === name ?{...items, checked} : items)));
        }
    }



    return(
        <div>
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
        </div>
    );
}
export default NoticeOption;