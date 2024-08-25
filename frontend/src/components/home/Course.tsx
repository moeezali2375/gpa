import { useEffect, useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

const Course = ({ course, courseArray, setCourseArray }) => {
  const [name, setName] = useState(course.name);
  const [credits, setCredits] = useState(course.credits);
  const [grade, setGrade] = useState(course.grade);

  useEffect(() => {
    if (!name || !credits || !grade) return;
    const handleDebounce = setTimeout(() => {
      const newCourseArray = [...courseArray];
      newCourseArray[course._id - 1].name = name;
      newCourseArray[course._id - 1].credits = credits;
      newCourseArray[course._id - 1].grade = grade;
      setCourseArray(newCourseArray);
    }, 2000);
    return () => {
      clearTimeout(handleDebounce);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, credits, grade]);

  const handleDelete = () => {
    const newCourseArray = courseArray.filter((cr) => course._id !== cr._id);
    setCourseArray(newCourseArray);
  };

  return (
    <TableRow>
      <TableCell>
        <Label htmlFor="course" className="sr-only"></Label>
        <Input
          id="course"
          type="text"
          className="w-[100px] md:[200-px] lg:w-[300px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Label htmlFor="credits" className="sr-only">
          Credits
        </Label>
        <Input
          id="credits"
          type="number"
          className="w-[50px]"
          value={credits}
          onChange={(e) => setCredits(Number(e.target.value))}
        />
      </TableCell>
      <TableCell>
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger className="w-[60px]">
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A">A</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B">B</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="C+">C+</SelectItem>
            <SelectItem value="C">C</SelectItem>
            <SelectItem value="C-">C-</SelectItem>
            <SelectItem value="D+">D+</SelectItem>
            <SelectItem value="D">D</SelectItem>
            <SelectItem value="D-">D-</SelectItem>
            <SelectItem value="F">F</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">
        <Button variant="link" onClick={handleDelete}>
          <Trash size={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Course;
