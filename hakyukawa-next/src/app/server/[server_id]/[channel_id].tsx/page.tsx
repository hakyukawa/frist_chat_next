"use client";

import Header from "@/components/common/Header";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useChannels } from "@/hooks/useChannels";
import { VscSend } from "react-icons/vsc";
interface Channel {
    channel_id: string;
    channel_name: string;
}

export default function Message() {
    const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
    const pathname = usePathname();
    const pathSegments = pathname ? pathname.split("/").filter(Boolean) : [];
    const manualServerId = pathSegments.length > 1 ? pathSegments[1] : "";
    const manualChannelId = pathSegments.length > 2 ? pathSegments[2] : "";
    const [sendText, setSendText] = useState<string>("");
    const params = useParams();
    const server_id = (params.server_id as string) || manualServerId || "";
    const channel_id = manualChannelId;
    const { data: channel } = useChannels(server_id || "");
    const myId = "test1";

    const message = [
        {
            id: 1,
            sender_id: "test1",
            content: "test_message",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 2,
            sender_id: "test2",
            content: "test_message",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 3,
            sender_id: "test3",
            content: "test_messageあああああああああああああああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 4,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 5,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 6,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 7,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 8,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 9,
            sender_id: "test1",
            content: "あああああああああああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 10,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 11,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 12,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 13,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 14,
            sender_id: "test1",
            content: "ああああああああああああああああああ",
            created_at: "2025-03-11 12:09:23",
        },
        {
            id: 15,
            sender_id: "test2",
            content: "iiiiiiiiiiiiiiiiiiiiiiiiiii",
            created_at: "2025-03-11 12:09:23",
        },
    ];

    useEffect(() => {
        if (channel && channel.data && channel_id) {
            console.log("Searching for channel with ID:", channel_id);
            console.log("Available channels:", channel.data);
            const foundChannel = channel.data.find((ch) => ch.channel_id === channel_id);

            if (foundChannel) {
                console.log("Channel found:", foundChannel);
                setCurrentChannel(foundChannel);
            } else {
                console.log("No matching channel found");
            }
        }
    }, [channel, channel_id]);

    const send = () => {
        console.log(sendText);
        setSendText("");
    };

    return (
        <div className=" pt-[50px] pb-[88px] h-[100%] bg-[#424243]">
            <div className="fixed top-0 left-0 right-0 w-full bg-background">
                <Header
                    backPage
                    backPageLink={`/server/${server_id}`}
                    backPageText={currentChannel ? currentChannel.channel_name : "Server"}
                    search
                />
            </div>
            <div>
                <div className="w-[100vw] px-[16px] pt-[5px] pb-[5px]">
                    {message.map((msg) =>
                        msg.sender_id === myId ? (
                            <div key={msg.id} className="flex items-end justify-end mt-8">
                                <p className="text-[1rem] text-subText">
                                    {new Date(msg.created_at).toLocaleTimeString("ja-JP", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    })}
                                </p>
                                <div
                                    className="py-2 px-6 bg-main max-w-[250px]"
                                    style={{ borderRadius: "70px 90px 30px 70px" }}
                                >
                                    <div className="text-white text-[1.6rem]">{msg.content}</div>
                                </div>
                            </div>
                        ) : (
                            <div key={msg.id} className="flex flex-col justify-center mt-4">
                                <div className="text-[1rem]">{msg.sender_id}</div>
                                <div className="flex items-start">
                                    <div className="w-[36px] h-[36px] mt-[5px] bg-main rounded-full" />
                                    <div className="flex items-end">
                                        <div
                                            className="ml-4 py-2 px-6 bg-[#FDBB71] max-w-[250px] flex items-center"
                                            style={{ borderRadius: "70px 70px 70px 30px" }}
                                        >
                                            <div className="text-background text-[1.6rem]">
                                                {msg.content}
                                            </div>
                                        </div>
                                        <p className="text-[1rem] text-subText">
                                            {new Date(msg.created_at).toLocaleTimeString("ja-JP", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: false,
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className="fixed bottom-0 left-0 right-0 w-full bg-background flex items-center justify-between text-main text-[26px] p-[21px]">
                    <input
                        type="text"
                        className="w-full px-4 mr-4 border border-border h-[40px] rounded-[40px] text-[14px] text-white"
                        value={sendText}
                        onChange={(e) => setSendText(e.target.value)}
                    />
                    <VscSend onClick={send} />
                </div>
            </div>
        </div>
    );
}
