export interface ChartDataPoint {
  value: number;
  label: string;
}

export const weeklyData: ChartDataPoint[] = [
  { value: 20, label: "20" },
  { value: 45, label: "25" },
  { value: 28, label: "28" },
  { value: 30, label: "30" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
];

export const monthlyData: ChartDataPoint[] = [
  { value: 20, label: "J" },
  { value: 45, label: "F" },
  { value: 28, label: "M" },
  { value: 30, label: "A" },
  { value: 15, label: "M" },
  { value: 20, label: "J" },
  { value: 35, label: "J" },
  { value: 40, label: "A" },
  { value: 32, label: "S" },
  { value: 25, label: "O" },
  { value: 18, label: "N" },
  { value: 42, label: "D" },
];


export const graphSpacing: { "month": number, "year": number } = {
  "month": 65,
  "year": 30,
}