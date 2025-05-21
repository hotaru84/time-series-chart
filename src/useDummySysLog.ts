import { useMemo, useState } from 'react';

interface SyslogEntry {
  id: number;
  timestamp: string;
  severity: string;
  message: string;
}

const generateData = (start: number, limit: number): SyslogEntry[] => {

  const data: SyslogEntry[] = [];
  for (let i = start; i < start + limit; i++) {
    data.push({
      id: i,
      timestamp: new Date().toISOString(),
      severity: ['INFO', 'WARNING', 'ERROR'][Math.floor(Math.random() * 3)],
      message: `This is a dummy syslog message ${i}`,
    });
  }
  return data;
};

const PAGE_SIZE = 50;
const DISPLAY_LIMIT = 100;
const DATA_MAX_SIZE = 200;

export const useDummySysLog = () => {
  const [data, setData] = useState(() => generateData(0, PAGE_SIZE));
  const [loading, setLoading] = useState(false);

  const { min, max } = useMemo(() => {
    return data.length > 0
      ? data.reduce(
        (acc, item) => {
          if (item.id < acc.min) acc.min = item.id;
          if (item.id > acc.max) acc.max = item.id;
          return acc;
        },
        { min: data[0].id, max: data[0].id }
      )
      : { min: 0, max: 0 }
  }, [data]);

  const hasPrevious = useMemo(() => min > 0, [min]);
  const hasNext = useMemo(() => max < DATA_MAX_SIZE, [max]);

  // 下方向の読み込み
  const loadNext = async () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      try {
        const newData = generateData(max + 1, PAGE_SIZE);
        setData((prev) => [...prev, ...newData].slice(-DISPLAY_LIMIT));
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  // 上方向の読み込み
  const loadPrevious = async () => {
    if (loading || min <= 0) return;
    setLoading(true);
    setTimeout(() => {
      const newStart = Math.max(0, min - PAGE_SIZE);
      try {
        const newData = generateData(newStart, PAGE_SIZE);
        setData((prev) => [...newData, ...prev].slice(0, DISPLAY_LIMIT));
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return {
    data,
    loading,
    loadNext,
    loadPrevious,
    hasNext,
    hasPrevious,
  };
};

export default useDummySysLog;
