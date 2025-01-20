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
import { PlusCircle, Trash2, Edit2 } from "lucide-react";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Course from "./Course";
import SemesterType from "@/types/semester";
import mongoose from "mongoose";
import CourseType from "@/types/course";
import {
  getSemesterNumbers,
  getYears,
  SeasonLabels,
} from "@/utils/semesterUtils";
import { Label } from "@/components/ui/label";

type GpaType = {
  currentCredits: number;
  cgpa: number;
  sgpa: number;
};

type SemesterPropsType = {
  semester: SemesterType;
  handleDeleteSemester: (id: string) => void;
  handleEditSemester: (
    semesterId: string,
    editedNumber: string,
    editedSeason: string,
    editedYear: string,
  ) => void;
  handleUpdateSemesterCourses: (
    semesterId: string,
    courseArray: CourseType[],
  ) => void;
  gpa: GpaType;
};

const Semester: React.FC<SemesterPropsType> = ({
  semester,
  handleDeleteSemester,
  handleEditSemester,
  handleUpdateSemesterCourses,
  gpa,
}) => {
  const [courseArray, setCourseArray] = useState<CourseType[]>(
    semester.courses,
  );
  const [oCourseArray, setOCourseArray] = useState<CourseType[]>(
    semester.courses,
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedNumber, setEditedNumber] = useState(semester.number.toString());
  const [editedSeason, setEditedSeason] = useState(
    SeasonLabels[semester.season],
  );
  const [editedYear, setEditedYear] = useState(semester.year.toString());

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      if (JSON.stringify(oCourseArray) !== JSON.stringify(courseArray)) {
        handleUpdateSemesterCourses(semester._id, courseArray);
        setOCourseArray(courseArray);
      }
    }, 2000);

    return () => {
      clearTimeout(handleDebounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseArray]);

  const handleAddCourse = () => {
    setCourseArray([
      ...courseArray,
      {
        _id: new mongoose.Types.ObjectId().toString(),
        name: "",
        credits: 3,
        grade: "",
      },
    ]);
  };

  const handleDeleteCourse = (courseId: string) => {
    setCourseArray((prevCourse) =>
      prevCourse.filter((course) => course._id !== courseId),
    );
  };

  const handleUpdateCourses = async (
    courseId: string,
    name: string,
    credits: number,
    grade: string,
  ) => {
    setCourseArray((prevCourse) =>
      prevCourse.map((course) =>
        course._id === courseId
          ? { ...course, name: name, credits: credits, grade: grade }
          : course,
      ),
    );
  };

  const handleSaveChanges = () => {
    try {
      setIsEditing(false);
      handleEditSemester(semester._id, editedNumber, editedSeason, editedYear);
    } catch (error) {
      console.log(error);
    }
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditedNumber(semester.number.toString());
    setEditedYear(semester.year.toString());
    setEditedSeason(SeasonLabels[semester.season]);
  };

  return (
    <Card
      x-chunk="dashboard-07-chunk-1"
      className="max-w-xs md:max-w-full lg:max-w-full"
    >
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>Semester {semester.number}</div>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          {SeasonLabels[semester.season]} {semester.year}
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <Edit2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Semester Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* NOTE: Number */}
                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="semesterNumber"
                    className="text-sm font-medium text-gray-700"
                  >
                    Semester Number
                  </Label>
                  <Select
                    required={true}
                    value={editedNumber}
                    onValueChange={setEditedNumber}
                  >
                    <SelectTrigger
                      id="semesterNumber"
                      aria-label="Semester Number"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getSemesterNumbers().map((number: number) => (
                        <SelectItem value={number.toString()} key={number}>
                          {number.toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* NOTE: Season */}
                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="season"
                    className="text-sm font-medium text-gray-700"
                  >
                    Season
                  </Label>
                  <Select value={editedSeason} onValueChange={setEditedSeason}>
                    <SelectTrigger id="season" aria-label="Select Season">
                      <SelectValue placeholder="Select Season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key={1} value="Spring">
                        Spring
                      </SelectItem>
                      <SelectItem key={2} value="Summer">
                        Summer
                      </SelectItem>
                      <SelectItem key={3} value="Fall">
                        Fall
                      </SelectItem>
                      <SelectItem key={4} value="Winter">
                        Winter
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* NOTE: Year */}
                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="year"
                    className="text-sm font-medium text-gray-700"
                  >
                    Year
                  </Label>
                  <Select value={editedYear} onValueChange={setEditedYear}>
                    <SelectTrigger id="year" aria-label="Select Year">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {getYears().map((year: number) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={resetEditing}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardDescription>
        <CardDescription>SGPA: {gpa?.sgpa}</CardDescription>
        <CardDescription>CGPA: {gpa?.cgpa}</CardDescription>
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
                handleUpdateCourses={handleUpdateCourses}
                handleDeleteCourse={handleDeleteCourse}
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
          onClick={handleAddCourse}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add Courses
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="gap-1 hover:bg-red-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Delete Semester</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove this
                semester from your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="hover:bg-red-600"
                onClick={() => handleDeleteSemester(semester._id)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default Semester;
