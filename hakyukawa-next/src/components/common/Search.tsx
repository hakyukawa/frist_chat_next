import { IoIosSearch } from "react-icons/io";

export default function Search() {
    return (
        <div className="p-3 w-full border border-border rounded-[10px] flex items-center text-[1.3rem]">
            <IoIosSearch size="20px" style={{ marginRight: "5px" }} />
            <input type="text" className="w-full  rounded-md" placeholder="検索" />
        </div>
    );
}
