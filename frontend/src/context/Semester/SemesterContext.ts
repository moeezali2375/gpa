import { createContext } from "react";
import SemesterType from "@/types/semester";
import GradePointsType from "@/types/gradePointsType";

type SemesterContextType = {
  semesters: SemesterType[];
  setSemesters: React.Dispatch<React.SetStateAction<SemesterType[]>>;
  grades: GradePointsType;
  setGrades: React.Dispatch<React.SetStateAction<GradePointsType>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SemestersContext = createContext<SemesterContextType | undefined>(
  undefined
);

export default SemestersContext;
