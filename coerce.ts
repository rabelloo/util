export const coerce = {
  boolean,
  date,
};

function boolean(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

function date(stamp: Date | string | number): Date {
  if (stamp instanceof Date) {
    return stamp;
  }

  const forced = new Date(stamp);

  return +forced !== NaN ? forced : null;
}
