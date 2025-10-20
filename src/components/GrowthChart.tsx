import { useMemo } from 'react';

type GrowthChartProps = {
  data: number[];
  label: string;
  color: string;
  value: string;
  change: string;
};

export default function GrowthChart({ data, label, color, value, change }: GrowthChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = useMemo(() => {
    return data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
  }, [data, min, range]);

  const isPositive = change.startsWith('+');

  return (
    <div className={`rounded-lg p-5 border-2 ${
      isPositive
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
        : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
    }`}>
      <div className="mb-3">
        <div className={`text-sm font-medium mb-1 ${
          isPositive ? 'text-green-700' : 'text-blue-700'
        }`}>
          {label}
        </div>
        <div className={`text-3xl font-black mb-0.5 ${
          isPositive ? 'text-green-900' : 'text-blue-900'
        }`}>
          {value}
        </div>
        <div className={`text-sm font-semibold ${
          isPositive ? 'text-green-600' : 'text-blue-600'
        }`}>
          {change}
        </div>
      </div>

      <div className="relative h-24 w-full">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <polygon
            points={`0,100 ${points} 100,100`}
            fill={`url(#gradient-${color})`}
          />

          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {data.map((_, idx) => {
            const x = (idx / (data.length - 1)) * 100;
            const y = 100 - ((data[idx] - min) / range) * 100;
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="1.5"
                fill={color}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
