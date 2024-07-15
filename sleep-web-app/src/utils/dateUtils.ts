import { format, differenceInMinutes } from "date-fns";

const getOrdinalNumber = (date: Date) => {
  const day = date.getDate();
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: {
      return "st";
    }
    case 2: {
      return "nd";
    }
    case 3: {
      return "rd";
    }
    default: {
      return "th";
    }
  }
};

export const formatDateToMonthAndOrdinal = (dateString: string) => {
  if (dateString.length === 0) return "";
  const date = new Date(dateString);
  const formattedDate = format(date, "MMMM do");
  const ordinalSuffix = getOrdinalNumber(date);
  return formattedDate.replace("do", `${date.getDate()}${ordinalSuffix}`);
};

export const convertDecimalHoursToHoursAndMinutes = (decimalHours: number) => {
  const totalMinutes = decimalHours * 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.floor(totalMinutes % 60);

  return `${hours}h ${minutes}min`;
};

export const getDifferenceInMinutes = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffMinutes = differenceInMinutes(end, start);

  return diffMinutes;
};

export const getTimeDuration = (startDate: string, endDate: string) => {
  if (startDate.length === 0 || endDate.length === 0) return "";
  const diffMinutes = getDifferenceInMinutes(startDate, endDate);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${hours} h ${minutes} min`;
};

export const formatTimeAMPM = (dateString: string) => {
  if (dateString.length === 0) return "";
  const dateStringWithoutZ = dateString.replace("Z", "");
  const date = new Date(dateStringWithoutZ);

  return format(date, "hh:mm a");
};
