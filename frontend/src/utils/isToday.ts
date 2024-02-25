const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function isToday(date: Date) {
  return date.toDateString() === new Date().toDateString()
    ? "TODAY"
    : `${addZero(date.getDate())}/${monthNames[date.getMonth()]}`;
}

function addZero(num: number) {
  return num < 10 ? `0${num}` : num;
}
