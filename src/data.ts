export interface TimeSeriesData {
  time: string;
  value: number;
}

function generateHourlyData(date: string): TimeSeriesData[] {
  const hourlyData: TimeSeriesData[] = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    hourlyData.push({
      time: `${date}T${hour}:00:00`,
      value: Math.floor(Math.random() * 30) + 10,
    });
  }
  return hourlyData;
}

export const mockData: TimeSeriesData[] = generateHourlyData('2025-04-17');
