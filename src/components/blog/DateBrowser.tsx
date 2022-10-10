import { useMemo } from 'react';
import Link from 'next/link';
import { countBy, groupBy, toNumber } from 'lodash';

interface Props {
  dates: { year: number; month: number }[];
}

interface MonthDisplayProps {
  year: string;
  month: string;
  count: number;
}

interface YearDisplayProps {
  year: string;
  months: { [month: number]: number };
}

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MonthDisplay = ({ year, month, count }: MonthDisplayProps) => (
  <li className='hover:bg-slate-200 px-2 rounded-md'>
    <Link href={`/blog?year=${year}&month=${month}`}>{`${
      monthNames[toNumber(month) - 1]
    } (${count})`}</Link>
  </li>
);

const YearDetails = ({ year, months }: YearDisplayProps) => (
  <details className='mb-1 cursor-pointer group'>
    <summary className='group-hover:bg-slate-200 rounded-md px-2'>{year}</summary>
    <div className='ml-6'>
      <ul className='list-none'>
        {Object.entries(months).map(([month, count]) => (
          <MonthDisplay key={month} year={year} month={month} count={count} />
        ))}
      </ul>
    </div>
  </details>
);

const DateBrowser = ({ dates }: Props) => {
  const testObj = [
    { year: 2022, month: 8 },
    { year: 2022, month: 10 },
    { year: 2022, month: 1 },
    { year: 2022, month: 10 },
    { year: 2022, month: 2 },
    { year: 2022, month: 1 },
    { year: 2021, month: 1 },
    { year: 2021, month: 10 },
    { year: 2022, month: 1 },
    { year: 2022, month: 1 },
    { year: 2023, month: 1 },
    { year: 2023, month: 1 },
    { year: 2023, month: 10 },
  ];

  const datesMap = useMemo(() => {
    const mapping = new Map<string, { [month: number]: number }>();

    const groupedByYear = groupBy(testObj, 'year');

    for (const year in groupedByYear) {
      const yearData = groupedByYear[year];
      const counted = countBy(yearData, (item) => item.month);

      mapping.set(year, counted);
    }

    return mapping;
  }, [dates]);

  return (
    <div>
      {Array.from(datesMap.entries()).map((item) => (
        <YearDetails key={item[0]} year={item[0]} months={item[1]} />
      ))}
    </div>
  );
};

export default DateBrowser;
