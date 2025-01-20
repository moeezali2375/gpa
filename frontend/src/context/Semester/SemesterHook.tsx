import { useContext } from "react";
import SemestersContext from "./SemesterContext";

const useSemesters = () => {
  const context = useContext(SemestersContext);
  if (context == undefined)
    throw new Error("Semesters Context is being used outside the scope");
  return context;
};

export default useSemesters;
