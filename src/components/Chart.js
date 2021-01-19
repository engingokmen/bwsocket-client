import React from 'react';
import Chart from 'react-google-charts';

export default React.memo(({ data, width, height, vTitle }) => {
  return (
    <Chart
      width={width}
      height={height}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        hAxis: {
          title: 'Time (Last 24 Hours Data)',
        },
        vAxis: {
          title: vTitle,
        },
      }}
    />
  );
});
