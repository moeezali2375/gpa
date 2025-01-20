import CourseType from "./course";
type SemesterType = {
  _id: string;
  number: number;
  season: number;
  year: number;
  courses: CourseType[];
};

export default SemesterType;
