import Entries from "./Entries";
import { useEffect, useState } from "react";
import axios from "axios";
// Array of movie data that will be passed as props to the Movies component
const data = [
    {
        "Steps": "1000",
        "Distance(km)": "2000",
        "Weight": "100kg",
        "CaloriesBurned": "150",
        "CaloriesConsumed": "2000"
    },
    {
        "Steps": "10000",
        "Distance(km)": "5000",
        "Weight": "500kg",
        "CaloriesBurned": "2222",
        "CaloriesConsumed": "3000"
    },
    {
        "Steps": "10500",
        "Distance(km)": "20500",
        "Weight": "1050kg",
        "CaloriesBurned": "1550",
        "CaloriesConsumed": "20500"
    }
];

const ReadHealthData = () => {
    return (
        <div>
            <h1>read data</h1>;
            <Entries myEntries={data}/>
        </div>
    )

};

export default ReadHealthData;