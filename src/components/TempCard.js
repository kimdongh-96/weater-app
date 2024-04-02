const TempCard = ({ fcstDate, fcstTime, category, fcstValue }) => {
  return (
    <div>{`날짜 : ${fcstDate} / 시간 : ${fcstTime} / 기온 : ${fcstValue}℃`}</div>
  );
};

export default TempCard;
