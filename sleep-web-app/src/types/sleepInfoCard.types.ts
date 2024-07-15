export enum SleepInfoCardStateEnum {
  "NOT-FOUND-DATA" = 0,
  "DETAILS" = 1,
  "AVERAGE" = 2
}

export const FeelingEnum: { [key: number]: string } = {
  1: "Bad",
  2: "Ok",
  3: "Good"
};

export const FeelingColorMap: { [key: number]: string } = {
  1: "red.500",
  2: "black",
  3: "green.500"
};

export interface SleepData {
  id: number;
  feeling: number;
  bed_time_start: string;
  bed_time_end: string;
}

export interface PostSleepLogPayload {
  bedTimeStart: string;
  bedTimeEnd: string;
  feeling: number;
}

export interface MonthlySleepLogAverages {
  first_day_of_month: string;
  last_day_of_month: string;
  average_bed_time_start: string;
  average_bed_time_end: string;
  average_slept_time: number;
  feeling_count: {
    "1": number;
    "2": number;
    "3": number;
  };
}
