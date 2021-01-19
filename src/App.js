import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';

//Localization
function local(value, location = 'tr-TR') {
  return Number(value).toLocaleString(location, {
    style: 'currency',
    currency: 'USD',
  });
}

export default () => {
  const [btcUsd, setBtcUsd] = useState('0');
  const [chartData, setChartData] = useState([['x', 'BTC']]);

  useEffect(() => {
    const HOST = location.origin.replace(/^http/, 'ws');
    const socket = new WebSocket(HOST);
    socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        const arrays = data.map((x) => [
          //converting date to timestamp and getting its only part which can represent 24 hours in seconds
          Number(String(new Date(x.createdAt).getTime()).slice(-8, -3)),
          Number(x.a),
        ]);
        setChartData([['xAxis', 'BTC'], ...arrays]);
      } else if (typeof data === 'object') {
        setBtcUsd(data.a);
      }
    });
  }, []);

  return (
    <div>
      <h4>Bitcoin</h4>
      <div>{btcUsd}</div>
      <div>{local(btcUsd)}</div>
      <Chart data={chartData} vTitle="USD" width="100%" height="400px" />
    </div>
  );
};
