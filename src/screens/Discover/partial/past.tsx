import moment from "moment";
export const past = (newsArray: any, value: any) => {
  const currentDate: any = new Date();
  const Milliseconds =
    value === "24"
      ? 24 * 60 * 60 * 1000
      : value === "week"
        ? 7 * 24 * 60 * 60 * 1000
        : value === "month"
          ? 30 * 24 * 60 * 60 * 1000
          : 365 * 24 * 60 * 60 * 1000;
  const pastNews = newsArray.filter((news) => {
    const pubDate: any = moment
      .utc(news.pubDate, "YYYY-MM-DD HH:mm:ss")
      .toDate();
    const timeDifference = currentDate - pubDate;
    return timeDifference <= Milliseconds;
  });
  // console.log(pastNews, value);
  return pastNews;
};
