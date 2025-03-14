import React from "react";
import Header from "@/components/common/Header";
import Notice from "@/components/common/Notice";

//通知が新しいか判定
const isNew = (time:number)  => {
    const onDayinTime = 1440;
    return  time <= onDayinTime;
}

export default function NoticeInfo() {
    const alertValues = [
        {id:1,userId:"user01",groupName:"餃子",time: 10,type: "friend"},
        {id:2,userId:"user01",groupName:"餃子",time: 360,type: "group-join"},
        {id:3,userId:"user03",groupName:"餃子",time:5550,type: "addFriend"},
        {id:4,userId:"user04",groupName:"餃子",time:200,type: "group-invite"},  
        {id:5,userId:"user11",groupName:"餃子",time:60,type: "friend"},
        {id:6,userId:"はきゅかわ",groupName:"餃子",time:14400,type: "group-join"},       
    ]

    const getMessage = (alertType:string, groupName:string) => {
        switch(alertType){
            case "friend" : 
                return `とフレンドになりました`;
            case "group-join" :
                return `が${groupName}に参加しました`
            case "group-invite" :
                return `があなたを${groupName}に招待しました`
            case "addFriend" :
                return `にフレンド追加されました`       
        }
    }

    return(
        <div>
            <Header backPage backPageLink="/home" backPageText="通知一覧" setting/>
            <div className="p-4">
                <p className="text-[14px] font-semibold">新着</p>
                {alertValues
                    .filter((times) => isNew(times.time))
                    .sort((a,b) => a.time -b.time)
                    .map((alert) => (
                        <div key={alert.id}>
                            <Notice userId={alert.userId} lastNoticeTime={alert.time} messages={`${alert.userId}${getMessage(alert.type,alert.groupName)}`}/>
                        </div>
                        
                    ))}
                <p className="pt-[10px] text-[14px] font-semibold ">以前</p>
                {alertValues
                    .filter((times) => !isNew(times.time))
                    .sort((a,b) => a.time -b.time)
                    .map((alert) => (
                        <div key={alert.id}>
                            <Notice userId={alert.userId} lastNoticeTime={alert.time} messages={`${alert.userId}${getMessage(alert.type,alert.groupName)}`}/>
                        </div>
                ))}
            </div>
           
        </div>
    )
}