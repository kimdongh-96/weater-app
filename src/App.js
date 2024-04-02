import "./App.css";
import { useState, useEffect } from "react";
import moment from "moment";

import TempCard from "./components/TempCard";

function App() {
  const API_KEY =
    "f6BiWYV28MUnpKGm2UCue7zs3n5oQiNAOGCunrR3umOVg4OwYANyJYiQW94dGYtMuvmTRoC5u8T9v6vNBoGhgg==";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  let minTmp = "";
  let maxTmp = "";

  let currentDate = String(moment().format("YYYYMMDD"));
  let baseDate = String(moment().format("YYYYMMDD"));
  const baseDateYesterDay = String(
    moment().subtract(1, "day").format("YYYYMMDD")
  );
  const currentTime = String(moment().format("HHmm"));

  let baseTime = "0200";

  if (moment(currentTime).isBetween("1200", "0211")) {
    baseDate = baseDateYesterDay;
    baseTime = "2300";
  } else if (moment(currentTime).isBetween("0211", "0511")) {
    baseTime = "0200";
  } else if (moment(currentTime).isBetween("0511", "0811")) {
    baseTime = "0500";
  } else if (moment(currentTime).isBetween("0811", "1111")) {
    baseTime = "0800";
  } else if (moment(currentTime).isBetween("1111", "1411")) {
    baseTime = "1100";
  } else if (moment(currentTime).isBetween("1411", "1711")) {
    baseTime = "1400";
  } else if (moment(currentTime).isBetween("1711", "2011")) {
    baseTime = "1700";
  } else if (moment(currentTime).isBetween("2011", "2311")) {
    baseTime = "2000";
  } else {
    baseTime = "2300";
  }

  useEffect(() => {
    const getData = async () => {
      const json = await (
        await fetch(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=0200&nx=61&ny=128`
        )
      ).json();
      setData(json.response.body.items.item);
      setLoading(false);
      console.log(json);
    };
    getData();
  }, [baseDate]);

  data.forEach((item) => {
    if (item.fcstDate === baseDate && item.category === "TMN") {
      minTmp = item.fcstValue;
    }
    if (item.fcstDate === baseDate && item.category === "TMX") {
      maxTmp = item.fcstValue;
    }
  });

  return (
    <div>
      <h1>
        {baseDate} / {baseTime}
      </h1>
      {!loading && (
        <div>
          {minTmp} / {maxTmp}
        </div>
      )}
      {loading ? (
        <div>loading...</div>
      ) : (
        data.map((item, idx) => {
          return (
            item.fcstDate + item.fcstTime > currentDate + currentTime && item.category === "TMP" && (
              <TempCard
                key={idx}
                fcstDate={item.fcstDate}
                fcstTime={item.fcstTime}
                category={item.category}
                fcstValue={item.fcstValue}
              />
            )
          );
        })
      )}
    </div>
  );
}

export default App;
