"use client";

import Header from "@/components/common/Header";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useChannels } from "@/hooks/useChannels";
import { VscSend } from "react-icons/vsc";
interface Channel {
    channel_id: string;
    channel_name: string;
}

const WS_BASE_URL = "ws://localhost:3001";
const API_BASE_URL = "http://localhost:3001";

export default function Message() {
    const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
    const [inputMessage, setInputMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    const pathname = usePathname();
    const pathSegments = pathname ? pathname.split("/").filter(Boolean) : [];
    //サーバーIDとチャンネルIDを取得
    const manualServerId = pathSegments.length > 1 ? pathSegments[1] : "";
    const manualChannelId = pathSegments.length > 2 ? pathSegments[2] : "";
    const params = useParams();
    const server_id = (params.server_id as string) || manualServerId || "";
    const channel_id = manualChannelId;
    //送信メッセージの状態
    const [sendText, setSendText] = useState<string>("");
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    interface Message {
        message_id: number | string;
        sender_id: string;
        content: string;
        icon_url: string;
        isMe: boolean;
        created_at: string;
    }

    const [messages, setMessages] = useState<Message[]>([]);

    const { data: channel } = useChannels(server_id || "");
    //ローカルストレージからユーザーIDとアクセストークンを取得
    const myId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const fetchMessagesFromAPI = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/v1/auth/server/channel/message/${channel_id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await response.json();
            console.log("メッセージ取得結果:", data);
            if (data.status === 200 && Array.isArray(data.data[0])) {
                setMessages(
                    data.data[0]
                        .map((msg) => ({
                            message_id: msg.message_id,
                            sender_id: msg.sender_id,
                            content: msg.content,
                            icon_url: "https://i.pravatar.cc/40?img=3",
                            isMe: msg.sender_id === myId,
                            created_at: new Date(msg.created_at || Date.now()).toISOString(),
                        }))
                        .reverse()
                );
            } else {
                console.error("メッセージ取得エラー:", data.message);
            }
        } catch (error) {
            console.error("API通信エラー:", error);
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        fetchMessagesFromAPI();
        const wsUrl = `${WS_BASE_URL}/api/v1/ws?token=${accessToken}`;
        const ws = new WebSocket(wsUrl);

        // WebSocket接続が開かれたときの処理
        ws.onopen = () => {
            console.log("WebSocket接続成功");
            setConnected(true);

            // チャンネルの状態をサーバーに送信
            ws.send(
                JSON.stringify({
                    type: "channel_state",
                    channel_id: channel_id,
                    state: "active",
                })
            );
        };
        // WebSocketメッセージを受信したときの処理
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WebSocketメッセージ受信:", data);

            // チャットメッセージを受信した場合の処理
            if (data.type === "chat_message" || data.type === "new_message") {
                let newMessage: Message;

                if (data.type === "new_message" && data.message) {
                    // 新形式のメッセージ構造
                    newMessage = {
                        message_id: data.message.message_id,
                        sender_id: data.message.sender_id || "不明",
                        content: data.message.content,
                        icon_url: "https://i.pravatar.cc/40?img=3", // デフォルトアバター
                        isMe: data.message.sender_id === myId,
                        created_at: new Date(data.message.created_at || Date.now()).toISOString(),
                    };

                    if (data.message.sender_id !== myId) {
                        // 新しいメッセージをメッセージリストに追加
                        setMessages((prevMessages) => [...prevMessages, newMessage]);
                    }
                } else {
                    // 従来形式のメッセージ
                    newMessage = {
                        message_id: data.message_id,
                        sender_id: data.sender?.user_name || data.sender?.user_id || "不明",
                        content: data.message || data.content,
                        icon_url: data.sender?.icon_url || "https://i.pravatar.cc/40?img=3",
                        isMe: data.sender?.user_id === myId,
                        created_at: new Date(data.message.created_at || Date.now()).toISOString(),
                    };

                    if (data.sender?.user_id !== myId) {
                        // 新しいメッセージをメッセージリストに追加
                        setMessages((prevMessages) => [...prevMessages, newMessage]);
                    }
                }
                // メッセージ処理後、画面を一番下にスクロール
                setTimeout(scrollToBottom, 100); // レンダリングが完了するのを少し待ちます
            } else if (data.type === "connection") {
                // 接続ステータスをログに出力
                console.log("接続ステータス:", data.status);
            } else if (data.type === "message_sent") {
                // メッセージ送信確認をログに出力
                console.log("メッセージ送信確認:", data.message_id);
            }
        };
        // WebSocket接続が閉じられたときの処理
        ws.onclose = () => {
            console.log("WebSocket接続が閉じられました");
            setConnected(false);
        };
        setSocket(ws);

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(
                    JSON.stringify({
                        type: "channel_state",
                        channel_id: channel_id,
                        state: "inactive",
                    })
                );
            }
            ws.close();
        };
    }, [channel_id, accessToken]);


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

        fetch(`${API_BASE_URL}/api/v1/auth/server/channel/message`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 必要に応じて認証トークンを追加
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                channel_id: channel_id,
                content: sendText, // メッセージ内容
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("メッセージの送信に失敗しました");
                }
                return response.json();
            })
            .then((data) => {
                console.log("メッセージ送信成功:", data);
            })
            .catch((error) => {
                console.error("エラー:", error);
            });

        // メッセージが空でなくWebSocketが接続されている場合のみ送信
        // WebSocketでメッセージを送信

        // 自分のメッセージをUIに即時反映（楽観的UI更新）
        const newMessage: Message = {
            message_id: `temp-${Date.now()}`,
            sender_id: myId || "不明", // Ensure sender_id is always a string
            content: sendText,
            icon_url: "https://i.pravatar.cc/40?img=3",
            isMe: true,
            created_at: new Date().toISOString(),
        };

        // メッセージリストに追加
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // 入力欄をクリア（既存のコード）
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
                    {messages.map((msg) =>
                        msg.sender_id === myId ? (
                            <div key={msg.id} className="flex items-end justify-end mt-8">
                                <p className="text-[1rem] text-subText pr-2">
                                    {new Date(msg.created_at).toLocaleTimeString("ja-JP", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                    })}
                                </p>
                                <div
                                    className="py-2 px-6 bg-main max-w-[250px]"
                                    style={{ borderRadius: "30px 30px 10px 30px" }}
                                >
                                    <div className="text-white text-[1.4rem]">{msg.content}</div>
                                </div>
                            </div>
                        ) : (
                            <div key={msg.message_id} className="flex flex-col justify-center mt-4">
                                <div className="text-[1rem]">{msg.sender_id}</div>
                                <div className="flex items-start mt-[5px]">
                                    <div className="w-[36px] h-[36px] bg-main rounded-full" />
                                    <div className="flex items-end">
                                        <div
                                            className="ml-4 py-2 px-7 bg-[#FDBB71] max-w-[250px] flex items-center"
                                            style={{ borderRadius: "10px 30px 30px 30px" }}
                                        >
                                            <div className="text-background text-[1.4rem]">
                                                {msg.content}
                                            </div>
                                        </div>
                                        <p className="text-[1rem] text-subText pl-2">
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
                    <div ref={messagesEndRef} />
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
