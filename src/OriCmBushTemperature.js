import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const OriCmBushTemperature = () => {
  const [temperatureThreshold, setTemperatureThreshold] = useState(80);
  const [hotspotThreshold, setHotspotThreshold] = useState(90);
  const [data, setData] = useState([
    { name: 'Temp 1', value: 75 },
    { name: 'Temp 2', value: 82 },
    { name: 'Temp 3', value: 88 },
  ]);

  const handleTemperatureThresholdChange = (event) => {
    setTemperatureThreshold(parseInt(event.target.value)); // Ensure value is parsed as integer
  };

  const handleHotspotThresholdChange = (event) => {
    setHotspotThreshold(parseInt(event.target.value)); // Ensure value is parsed as integer
  };

  const getColor = (value) => {
    if (value >= hotspotThreshold) {
      return 'red';
    } else if (value >= temperatureThreshold) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  // Determine CM-Bush color based on all temperatures
  const getBushColor = () => {
    const maxTemperature = Math.max(...data.map(temp => temp.value));
    if (maxTemperature >= hotspotThreshold) {
      return 'red';
    } else if (maxTemperature >= temperatureThreshold) {
      return 'yellow';
    } else {
      return 'green';
    }
  };

  return (
    <div>
      <h2 style={{ color: getBushColor() }}>ORI-CM-Bush Temperature</h2>
      <div>
        <label>
          Temperature Threshold:
          <input
            type="number"
            value={temperatureThreshold}
            onChange={handleTemperatureThresholdChange}
          />
        </label>
        <label>
          Hotspot Threshold:
          <input
            type="number"
            value={hotspotThreshold}
            onChange={handleHotspotThresholdChange}
          />
        </label>
      </div>
      <AreaChart width={600} height={400} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
          isAnimationActive={false}
        />
      </AreaChart>
      <div>
        {data.map((temp, index) => (
          <div
            key={index}
            style={{
              backgroundColor: getColor(temp.value),
              color: 'white',
              padding: '8px',
              marginBottom: '8px',
            }}
          >
            {temp.name}: {temp.value}°C
          </div>
        ))}
      </div>
    </div>
  );
};

export default OriCmBushTemperature;
