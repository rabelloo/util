/**
 * Creates a `Date` object with time calculated from a difference string.
 *
 * @param diffString
 * Time difference from `new Date()`.
 *
 * Format: `0y 0M 0d 0h 0m 0s`.
 *
 * All parts of the format string are optional,
 * accept any number (positive or negative),
 * and positive signs can be omitted,
 * e.g. `+40M -30h 180s`.
 *
 * @example
 * new Date().toISOString()
 * // 2000-01-01T15:00:00.000Z
 * dateFrom('5h' || '+5h')
 * // 2000-01-01T20:00:00.000Z
 * dateFrom('-5h' || '-300m' || '-18000s')
 * // 2000-01-01T10:00:00.000Z
 */
export function dateFrom(diffString: string): Date {
  return new Date(timestampFrom(diffString));
}

/**
 * Returns the difference string between two `Date` objects.
 */
export function diff(dateA: Date, dateB: Date): string {
  return getDiffString(+dateA - +dateB);
}

/**
 * Gets an Unix Epoch UTC timestamp from a difference string.
 *
 * @param diffString
 * Time difference from `new Date()`.
 *
 * Format: `0y 0M 0d 0h 0m 0s`.
 *
 * All parts of the format string are optional,
 * accept any number (positive or negative),
 * and positive signs can be omitted,
 * e.g. `+40M -30h 180s`.
 *
 * @example
 * new Date().getTime()
 * // 0
 * timestampFrom('5h' || '+5h')
 * // 18000000
 * timestampFrom('-5h' || '-300m' || '-18000s')
 * // -18000000
 */
export function timestampFrom(diffString: string): number {
  const splits = `${diffString}`.trim().split(' ');
  const diffs = {
    years: find(splits, 'y'),
    months: find(splits, 'M'),
    days: find(splits, 'd'),
    hours: find(splits, 'h'),
    minutes: find(splits, 'm'),
    seconds: find(splits, 's'),
  };

  const [nowDate, nowTime] = new Date().toISOString().split('T');
  const [year, month, day] = nowDate.split('-');
  const [time, ms] = nowTime.replace('Z', '').split('.');
  const [hour, minute, second] = time.split(':');

  return Date.UTC(
    +year + diffs.years,
    +month + diffs.months - 1,
    +day + diffs.days,
    +hour + diffs.hours,
    +minute + diffs.minutes,
    +second + diffs.seconds,
    +ms
  );
}

// ============================================================
// ========================= Private ==========================
// ============================================================

const groups = [
  { size: 1000, unit: 'ms' },
  { size: 60, unit: 's' },
  { size: 60, unit: 'm' },
  { size: 24, unit: 'h' },
  { size: 30, unit: 'd' },
  { size: 12, unit: 'M' },
  { size: Infinity, unit: 'y' },
];

function find(splits: string[], finalChar: string): number {
  return +(splits.find(s => s.endsWith(finalChar)) || '').slice(0, -1) || 0;
}

function format(time: number, unit: string, last: string): string {
  return time ? `${time}${unit} ${last}`.trim() : last;
}

function getDiffString(time: number, iter = 0, last = ''): string {
  const group = groups[iter];

  return Math.abs(time) >= group.size
    ? getDiffString(
        Math.trunc(time / group.size),
        iter + 1,
        format(time % group.size, group.unit, last)
      )
    : format(time, group.unit, last);
}
