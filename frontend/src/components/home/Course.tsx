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

const Course = ({ course, handleDeleteCourse, handleUpdateCourses }) => {
  const [name, setName] = useState(course.name);
  const [credits, setCredits] = useState(course.credits);
  const [grade, setGrade] = useState(course.grade);
  const courseId = course._id;

  useEffect(() => {
    handleUpdateCourses(courseId, name, credits, grade);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, credits, grade, courseId]);

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
        <Select
          value={credits.toString()}
          onValueChange={(value) => setCredits(Number(value))}
        >
          <SelectTrigger className="w-[60px]">
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(7).keys()].map((i) => (
              <SelectItem key={i} value={i.toString()}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Button variant="link" onClick={() => handleDeleteCourse(courseId)}>
          <Trash size={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Course;
