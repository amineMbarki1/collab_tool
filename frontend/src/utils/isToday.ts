

export default function isToday(date: Date) {
  const toDay = new Date();
  return (
    date.getMonth() === toDay.getMonth() && date.getDay() === toDay.getDay()
  );
}

