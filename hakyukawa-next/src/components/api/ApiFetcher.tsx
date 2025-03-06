"use client";

import React, { useState } from "react";
import useApi from "@/hooks/useApi";

type ApiFetcherProps = {
    url: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestData?: any;
    headers?: Record<string, string>;
};

const ApiFetcher: React.FC<ApiFetcherProps> = ({ url, method, requestData, headers }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error, loading, fetchData } = useApi<any>(url, method, requestData, headers);
    const [inputData, setInputData] = useState(requestData || {});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        fetchData();
    };

    return (
        <div className="p-4 border rounded shadow">
            <h3>APIリクエスト: {method}</h3>
            <p>エンドポイント: {url}</p>

            {method !== "GET" && (
                <div>
                    {Object.keys(inputData).map((key) => (
                        <input
                            key={key}
                            name={key}
                            placeholder={key}
                            value={inputData[key]}
                            onChange={handleChange}
                            className="border p-2 my-1 w-full"
                        />
                    ))}
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white p-2 mt-2 rounded"
                    >
                        送信
                    </button>
                </div>
            )}

            {loading && <p>ロード中...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {data && <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default ApiFetcher;
