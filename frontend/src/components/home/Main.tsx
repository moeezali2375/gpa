import Semester from "./Semester";
import AddSemester from "./AddSemester";
import useSemesters from "@/context/Semester/SemesterHook";
import useAxios from "@/hooks/useAxios";
import SemesterType from "@/types/semester";
import { useEffect, useState } from "react";
import CourseType from "@/types/course";
import { SeasonOptions } from "@/utils/semesterUtils";
import TargetGPA from "./TargetGPA";
import PriorSemesterGPA from "./PriorSemesterGPA";

const Main = () => {
  const { semesters, setSemesters, setIsLoading, grades } = useSemesters();
  const [gpaArray, setGpaArray] = useState([]);
  const axios = useAxios();

  console.log("helo");
  console.log(grades);

  useEffect(() => {
    const calculateGpas = () => {
      const array = [];
      let totalPoints = 0;
      let totalCredits = 0;

      semesters.forEach((semester: SemesterType) => {
        const object = {};
        let currentPoints = 0;
        let currentCredits = 0;
        semester.courses.forEach((course: CourseType) => {
          if (course.grade && course.credits) {
            currentPoints += grades[course.grade] * course.credits;
            currentCredits += course.credits;
          }
        });
        object["currentCredits"] = currentCredits;
        object["sgpa"] = (currentPoints / currentCredits || 0).toFixed(2);
        totalCredits += currentCredits;
        totalPoints += currentPoints;
        object["cgpa"] = (totalPoints / totalCredits || 0).toFixed(2);
        array.push(object);
      });
      setGpaArray([...array]);
    };
    calculateGpas();
  }, [semesters, grades]);

  const handleAddSemester = async (newSemester: SemesterType) => {
    const previousSemesters = [...semesters];
    try {
      setIsLoading(true);
      setSemesters([...semesters, newSemester]);
      await axios.post("/semester", {
        _id: newSemester._id,
        number: newSemester.number,
        season: newSemester.season,
        year: newSemester.year,
      });
    } catch (error) {
      setSemesters(previousSemesters);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSemester = async (semesterId: string) => {
    const previousSemesters = [...semesters];
    try {
      setIsLoading(true);
      const newArray = semesters.filter((s) => s._id != semesterId);
      setSemesters([...newArray]);
      await axios.delete(`/semester/${semesterId}`);
    } catch (error) {
      setSemesters(previousSemesters);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSemester = async (
    semesterId: string,
    editedNumber: string,
    editedSeason: string,
    editedYear: string,
  ) => {
    try {
      setIsLoading(true);
      await axios.put(`/semester/${semesterId}`, {
        number: parseInt(editedNumber),
        season: SeasonOptions[editedSeason],
        year: parseInt(editedYear),
      });
      const updatedSemesters = semesters.map((s) =>
        s._id === semesterId
          ? {
              ...s,
              number: parseInt(editedNumber),
              season: SeasonOptions[editedSeason],
              year: parseInt(editedYear),
            }
          : s,
      );
      setSemesters(updatedSemesters);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSemesterCourses = async (
    semesterId: string,
    courseArray: CourseType[],
  ) => {
    console.log("Api call to update courses.");
    try {
      setIsLoading(true);
      await axios.put(`/semester/${semesterId}/course`, {
        courses: courseArray,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    const newSemesters = semesters.map((s) =>
      s._id === semesterId ? { ...s, courses: courseArray } : s,
    );
    setSemesters([...newSemesters]);
  };

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full md:w-8/12">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            {semesters.map((semester: SemesterType, index) => {
              return (
                <Semester
                  key={semester._id}
                  semester={semester}
                  handleDeleteSemester={handleDeleteSemester}
                  handleEditSemester={handleEditSemester}
                  handleUpdateSemesterCourses={handleUpdateSemesterCourses}
                  gpa={gpaArray[index]}
                />
              );
            })}
            <AddSemester
              semesterLength={semesters.length}
              handleAddSemester={handleAddSemester}
            />
            <TargetGPA gpaArray={gpaArray} />
            <PriorSemesterGPA gpaArray={gpaArray} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
