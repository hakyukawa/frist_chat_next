import { IoIosSearch } from "react-icons/io";

interface SearchProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function Search({ searchQuery, setSearchQuery }: SearchProps) {
    return (
        <div className="p-3 w-full border border-border rounded-[10px] flex items-center text-[1.3rem]">
            <IoIosSearch size="20px" style={{ marginRight: "5px" }} />
            <input
                type="text"
                className="w-full rounded-md"
                placeholder="検索"
                value={searchQuery} // 🔍 入力値をバインド
                onChange={(e) => setSearchQuery(e.target.value)} // 🔍 変更時に更新
            />
        </div>
    );
}
