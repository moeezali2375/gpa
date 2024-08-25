import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Course from "./Course";

const Semester = ({ semester, semesters, setSemesters }) => {
  const [courseArray, setCourseArray] = useState(semester.courses);

  useEffect(() => {
    console.log("Api call to update courses.");
  }, [courseArray]);

  const handleClick = () => {
    setCourseArray([
      ...courseArray,
      { _id: courseArray.length + 1, name: "", credits: null, grade: "" },
    ]);
  };

  const handleDeleteSemester = () => {
    const newArray = semesters.filter((s) => s._id != semester._id);
    setSemesters([...newArray]);
  };
  const semesterName = semester.name;
  const semesterDesc = semester.desc;
  return (
    <Card
      x-chunk="dashboard-07-chunk-1"
      className="max-w-xs md:max-w-full lg:max-w-full"
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          {/* {semesterName} */}
          <div>{semesterName}</div>
          <h3 className="text-xl">3.67</h3>
        </CardTitle>
        <CardDescription>{semesterDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead className="w-[30px]">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseArray.map((course) => (
              <Course
                key={course._id}
                course={course}
                courseArray={courseArray}
                setCourseArray={setCourseArray}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-around border-t p-4">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={handleClick}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add Courses
        </Button>
        {/* //! Todo */}
        <Button size="sm" variant="ghost" className="gap-1 hover:bg-red-600">
          <AlertDialog>
            <AlertDialogTrigger className="flex items-center justify-center space-x-2">
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Semester</span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove
                  this semester from your account and remove your data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-700 hover:bg-red-700"
                  onClick={handleDeleteSemester}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Semester;
