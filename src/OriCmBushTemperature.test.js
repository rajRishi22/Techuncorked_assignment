import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OriCmBushTemperature from './OriCmBushTemperature';

describe('OriCmBushTemperature', () => {
  test('renders temperature chart and boxes', () => {
    const { getByText, getAllByText } = render(<OriCmBushTemperature />);
    expect(getByText('ORI-CM-Bush Temperature')).toBeInTheDocument();
    expect(getAllByText(/°C/).length).toBe(3);
  });

  test('updates temperature threshold', () => {
    const { getByLabelText, getAllByText } = render(<OriCmBushTemperature />);
    const temperatureThresholdInput = getByLabelText('Temperature Threshold:');
    fireEvent.change(temperatureThresholdInput, { target: { value: '100' } }); // Adjusted threshold
    const temperatureBoxes = getAllByText(/°C/);
    expect(temperatureBoxes[0]).toHaveStyle('background-color: green');
    expect(temperatureBoxes[1]).toHaveStyle('background-color: green');
    expect(temperatureBoxes[2]).toHaveStyle('background-color: green');
  });

});

