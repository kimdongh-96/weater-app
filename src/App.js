import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const API_KEY = "f6BiWYV28MUnpKGm2UCue7zs3n5oQiNAOGCunrR3umOVg4OwYANyJYiQW94dGYtMuvmTRoC5u8T9v6vNBoGhgg==";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const json = await (
      await fetch(
        `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20240331&base_time=2000&nx=61&ny=128`
      )
    ).json();
    setData(json.response.body.items.item);
    setLoading(false);
    console.log(json);
  };
  useEffect(() => {
    getData();
  }, []);

  return <div>
    {
      loading ? 
      <div>loading...</div> 
      : 
      data.map((item, idx) => {
        return (
          <div key={idx}>
            {item.category === "TMP" && `날짜 : ${item.fcstDate} / 시간 : ${item.fcstTime} / 기온 : ${item.fcstValue}℃`}
            {item.category === "TMN" && `날짜 : ${item.fcstDate} / 시간 : ${item.fcstTime} / 최저기온 : ${item.fcstValue}℃`}
            {item.category === "TMX" && `날짜 : ${item.fcstDate} / 시간 : ${item.fcstTime} / 최고기온 : ${item.fcstValue}℃`}
          </div>
        );
      })
    }
    </div>;
}

export default App;
