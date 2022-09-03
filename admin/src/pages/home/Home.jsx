import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState, useMemo } from "react";
import axios from 'axios';

export default function Home() {
  const months = useMemo(() => ['Jan','Feb','Mar','Apr','May','Jun','Jul','Agu','Sep','Oct','Nov','Dec'],[]) 
  const [userStats,setUserStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      try{
          let url = 'http://localhost:9091/api/users/stats';
          const response = await axios.get(url, {
          headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem('user')).accessToken
          }
        })
        const statList = response.data.sort((a,b) => a._id - b._id)
        statList.map(item => setUserStats(prev => [...prev, {name: months[item._id -1], "New User": item.total}]))
      } catch(err) {
        console.log(err);
      }
    }
    getStats();
  },[months])
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
