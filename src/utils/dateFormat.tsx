// https://shinyks.com/2024/03/javascript/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-date-%EB%82%A0%EC%A7%9C-%ED%8F%AC%EB%A7%B7-yyyy-mm-dd/

function padTwoDigits(num: number) {
  return num.toString().padStart(2, "0");
}

export default function dateFormat(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  // yyyy/mm/dd hh:mm:ss
  return (
    [year, padTwoDigits(month), padTwoDigits(day)].join("/") +
    " " +
    [padTwoDigits(hour), padTwoDigits(min), padTwoDigits(sec)].join(":")
  );
}
