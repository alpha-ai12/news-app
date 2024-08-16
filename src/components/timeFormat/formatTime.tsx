import moment from "moment";
export const formatTime = (dateString: any) => {
  const dateObj: any = convertUTCToLocalTime(dateString);
  const currentDate: any = new Date();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const timezone = new Date()
    .toLocaleDateString("en-US", {
      day: "2-digit",
      timeZoneName: "short",
    })
    .slice(4);
  const elapsedMilliseconds = currentDate - dateObj;
  const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  let elapsedString;
  if (elapsedMinutes < 60) {
    elapsedString = `${elapsedMinutes} minute${
      elapsedMinutes !== 1 ? "s" : ""
    } ago`;
  } else if (elapsedHours < 24) {
    elapsedString = `${elapsedHours} hour${elapsedHours !== 1 ? "s" : ""} ago`;
  } else {
    elapsedString = `${elapsedDays} day${elapsedDays !== 1 ? "s" : ""} ago`;
  }
  const formattedDate = `${month} ${day}, ${year} ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${hours >= 12 ? "PM" : "AM"} -${timezone} - Updated ${elapsedString}`;
  return formattedDate;
};
const convertUTCToLocalTime = (dateString: any) => {
  const localTime = moment.utc(dateString, "YYYY-MM-DD HH:mm:ss").toDate();
  return localTime;
};
