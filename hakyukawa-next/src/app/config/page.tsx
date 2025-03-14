import React from "react";
import Header from "@/components/common/Header";
import Menu from "@/components/common/option/menu";

function SettingMenu() {

    const nowId = "hakyukawa"
    const nowMail = "hakyukawa@hakyukawa.com"

    return(
        <div>
            <Header backPage backPageLink ="/home" backPageText="アカウント設定"/>
            <div className="p-4">
                <Menu 
                    forwardText ="ユーザーID"
                    subText={nowId}
                    forwardLink="config/useridconfig"
                />
                <Menu 
                    forwardText="メールアドレス"
                    subText={nowMail}
                    forwardLink="config/mailaddressConfig"
                />
                 <Menu
                    forwardText="パスワード"
                    forwardLink="config/passwordConfig"
                />
                <Menu 
                    forwardText="アカウント削除"
                    forwardLink="config/deleteUser"
                />
                <Menu 
                    forwardText="ブロックリスト"
                    forwardLink="config/blockList"
                /> 
                <div className="py-[30px]">
                <div className="border-t border-border">
                    <p className="text-[14px] text-center text-red-500 p-[15px]"><a href="/signup">ログアウト</a></p>
                </div>
                </div>
                
               
            </div>
        </div>
    );
}

export default SettingMenu;