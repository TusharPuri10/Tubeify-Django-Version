'use client';
import axios from "axios";

export default function summary () {

    const fetchSummary = async () => {
        console.log("fetching....");
        try {
            const { data } = await axios.post("http://127.0.0.1:8000/api/generate_summary/", {
                transcript : ""});
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return <div>
    summaflfas
    <button className="bg-blue-500 text-white rounded-lg shadow-md w-40 h-12" onClick={()=>{
        console.log("entered")
        fetchSummary();
        }}>press me</button>
    </div>
}