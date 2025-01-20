import { useEffect, useState } from "react";
import SemestersContext from "./SemesterContext";
import useAxios from "@/hooks/useAxios";
import SemesterType from "@/types/semester";
import GradePointsType from "@/types/gradePointsType";

const SemestersProvider = ({ children }) => {
  const [semesters, setSemesters] = useState<SemesterType[]>([]);
  const [grades, setGrades] = useState<GradePointsType>();
  const [isLoading, setIsLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    try {
      console.log("Get Semesters");
      const getSemesters = async () => {
        const res = await axios.get("/semester");
        setSemesters(res.data.semesters);
      };
      const getGrades = async () => {
        const res = await axios.get("/grade");
        setGrades(res.data.grades);
      };
      getSemesters();
      getGrades();
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  }, [axios]);

  return (
    <SemestersContext.Provider
      value={{
        semesters,
        setSemesters,
        grades,
        setGrades,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SemestersContext.Provider>
  );
};

export default SemestersProvider;
