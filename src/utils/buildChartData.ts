import type { TRawDay, TVariation, TViewMode } from "../types";

export const buildChartData = (
  variations: TVariation[],
  data: TRawDay[],
  mode: TViewMode = "day",
) => {
  if (mode === "week") {
    return aggregateByWeek(variations, data);
  }

  return data.reduce(
    (acc, day) => {
      const chartItem: Record<string, string | number> = {
        date: day.date,
      };

      variations.forEach((variation) => {
        const visits = day.visits[variation.id];
        const conversions = day.conversions[variation.id];

        if (visits !== undefined && conversions !== undefined) {
          chartItem[variation.name] = (conversions / visits) * 100;
        }
      });

      if (Object.keys(chartItem).length > 1) {
        acc.push(chartItem);
      }

      return acc;
    },
    [] as Array<Record<string, string | number>>,
  );
};

const aggregateByWeek = (variations: TVariation[], data: TRawDay[]) => {
  const map = new Map<
    string,
    { visits: Record<number, number>; conversions: Record<number, number> }
  >();

  for (const day of data) {
    const weekKey = getWeekKey(day.date);

    if (!map.has(weekKey)) {
      map.set(weekKey, {
        visits: {},
        conversions: {},
      });
    }

    const bucket = map.get(weekKey)!;

    for (const v of variations) {
      const visits = day.visits[v.id] ?? 0;
      const conv = day.conversions[v.id] ?? 0;

      bucket.visits[v.id] = (bucket.visits[v.id] ?? 0) + visits;
      bucket.conversions[v.id] = (bucket.conversions[v.id] ?? 0) + conv;
    }
  }

  return Array.from(map.entries()).map(([weekKey, bucket]) => {
    const row: Record<string, string | number> = { date: weekKey };

    for (const v of variations) {
      const visits = bucket.visits[v.id] ?? 0;
      const conversions = bucket.conversions[v.id] ?? 0;

      row[v.name] = visits > 0 ? (conversions / visits) * 100 : 0;
    }

    return row;
  });
};

const getWeekKey = (dateStr: string) => {
  const d = new Date(dateStr);

  const dayNum = ((d.getUTCDay() + 6) % 7) + 1;

  const thursday = new Date(d);
  thursday.setUTCDate(d.getUTCDate() + (4 - dayNum));

  const year = thursday.getUTCFullYear();

  const yearStart = new Date(Date.UTC(year, 0, 1));
  const weekNo = Math.ceil(
    ((thursday.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  const month = thursday.toLocaleString("en-US", { month: "short" });

  return `${month} ${year} — W${weekNo}`;
};
