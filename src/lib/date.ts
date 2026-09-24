import type { DateRange, YearMonth } from '../types/portfolio';

export type MonthFormatter = (value: YearMonth) => string;

function parseYearMonth(value: YearMonth): [year: number, month: number] {
  const [year, month] = value.split('-').map(Number);
  return [year, month];
}

export function createMonthFormatter(locale: string): MonthFormatter {
  const formatter = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' });

  return (value) => {
    const [year, month] = parseYearMonth(value);
    return formatter.format(new Date(Date.UTC(year, month - 1)));
  };
}

export function formatPeriod(period: DateRange, formatMonth: MonthFormatter, presentLabel: string): string {
  const end = period.end ? formatMonth(period.end) : presentLabel;
  return `${formatMonth(period.start)} – ${end}`;
}

/**
 * Localized length of a period, counting both the start and end months
 * (e.g. Jan–Nov = 11 months). Ongoing periods run to the current month.
 * Uses Intl for correct plural forms in every language.
 */
export function formatDuration(period: DateRange, locale: string, now = new Date()): string {
  const [startYear, startMonth] = parseYearMonth(period.start);
  const [endYear, endMonth] = period.end
    ? parseYearMonth(period.end)
    : [now.getUTCFullYear(), now.getUTCMonth() + 1];

  const totalMonths = Math.max(1, (endYear - startYear) * 12 + (endMonth - startMonth) + 1);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const unit = (value: number, name: 'year' | 'month') =>
    new Intl.NumberFormat(locale, { style: 'unit', unit: name, unitDisplay: 'long' }).format(value);
  const parts = [...(years ? [unit(years, 'year')] : []), ...(months ? [unit(months, 'month')] : [])];

  return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(parts);
}
