"use client";

import Rank from "@/components/common/Rank";
import Group from "@/components/common/Group";
import Friend from "@/components/common/Friend";
import Header from "@/components/common/Header";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import SeeAll from "@/components/common/SeeAll";
import { useProfile } from "@/hooks/useProfile";
import { useFriends } from "@/hooks/useFriends";
import { useServers } from "@/hooks/useServers";

export default function Home() {
    const { data: user, error: userError, loading: userLoading } = useProfile();
    const { data: friend, error: friendError, loading: friendLoading } = useFriends();
    const { data: group, error: groupError, loading: groupLoading } = useServers();

    if (groupLoading || friendLoading || userLoading) return <p>読み込み中...</p>;
    if (groupError || friendError || userError)
        return <p className="text-red-500">{groupError || friendError || userError}</p>;

    if (user && friend && group) {
        console.log(user);
        console.log(friend);
        console.log(group);
    }

    const friendIcons = (key: number) => {
        return (
            <div
                key={key}
                className="w-[24px] h-[24px] bg-main border-[3px] border-background rounded-full"
            ></div>
        );
    };

    return (
        <>
            <Header setting addFriend notice />
            <div className="p-[16px]">
                {user ? (
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col justify-between h-[100px]">
                            <h1 className="text-[2rem] font-semibold">{user.user_name}</h1>
                            <p className="text-[#757575] text-[1.4rem]">@{user.user_id}</p>
                            <Rank
                                user_rank={user.user_rank}
                                user_points={user.user_point}
                                rankFontSize="1.8rem"
                            />
                        </div>
                        <div className="w-[70px] h-[70px] bg-main rounded-full"></div>
                    </div>
                ) : null}
                {friend ? (
                    <Link
                        href="/FriendList"
                        passHref
                        className="w-full my-5 rounded-[8px] border border-main h-[50px] flex items-center !justify-between p-4 text-[1.6rem] font-semibold"
                    >
                        フレンド
                        <div className="text-subText text-[2rem] flex items-center">
                            {friend.users.slice(0, 4).map((friend, index) => friendIcons(index))}
                            <IoIosArrowForward />
                        </div>
                    </Link>
                ) : null}

                <div>
                    <h2 className="text-[1.8rem] font-semibold">メッセージ</h2>
                    <div className="flex justify-between mt-4">
                        <h3 className="text-subText text-[1.6rem] font-semibold">フレンド</h3>
                        <SeeAll url="/FriendList" />
                    </div>

                    {friend?.users.slice(0, 2).map((user) => (
                        <Friend key={user.user_id} Name={user.user_name} />
                    ))}

                    <div className="flex justify-between mt-4">
                        <h3 className="text-subText text-[1.6rem] font-semibold">グループ</h3>
                        <SeeAll url="/GroupList" />
                    </div>
                    {group
                        ? group.data
                              .slice(0, 3)
                              .map((group) => (
                                  <Group
                                      key={group.server_id}
                                      Name={group.server_name}
                                      server_id={group.server_id}
                                  />
                              ))
                        : null}
                </div>
            </div>
        </>
    );
}
