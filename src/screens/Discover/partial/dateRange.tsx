export const DateRange = (value: any) => {
  console.log(value);
  const currentDate: any = new Date();
  console.log();
  const Milliseconds =
    value === "past24hours"
      ? 24 * 60 * 60 * 1000
      : value === "pastweek"
        ? 7 * 24 * 60 * 60 * 1000
        : value === "pastmonth"
          ? 30 * 24 * 60 * 60 * 1000
          : 365 * 24 * 60 * 60 * 1000;

  const endDate = new Date(currentDate.getTime() - Milliseconds);
  return endDate;
};
