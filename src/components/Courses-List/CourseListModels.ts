import { Timestamp } from "@firebase/firestore";

export interface Course {
    id: string;
    Name: string;
    Last_Review_Name: string;
    Last_Review_date: Timestamp;
    Rate_Avg: number;
    Points: number;
    count: number;
    supplier: string;
    Course_length: number;
    Skills_Learned: string;
    Skills_Required: string;
    Description: string;
    Instructor: string;
    link: string;
    updateRate: (arg: number) => void;
  };