import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const getYears = () => {
  const currentYear = new Date().getFullYear();
  const yearsArray = [];

  for (let i = currentYear - 6; i <= currentYear + 6; i++) {
    yearsArray.push(i);
  }
  return yearsArray;
};

const AddSemester = ({ semesters, setSemesters }) => {
  const [number, setNumber] = useState(null);
  const [session, setSession] = useState(null);
  const [year, setYear] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!number) return;
    const newSemester = {
      _id: semesters.length + 1,
      name: "Semester " + number,
      desc: session ? session + (year ? " " + year : "") : year ? year : "",
      courses: [],
    };
    setSemesters([...semesters, newSemester]);
    setNumber(null);
    setSession(null);
    setYear(null);
  };
  return (
    <Card
      x-chunk="dashboard-07-chunk-2"
      className="max-w-xs md:max-w-full lg:max-w-full"
    >
      <CardHeader>
        <CardTitle>Add Semester</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="grid gap-3">
              <Label htmlFor="number">Number</Label>
              <Select required={true} value={number} onValueChange={setNumber}>
                <SelectTrigger id="semesterNumber" aria-label="Semester Number">
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, index) => index + 1).map(
                    (number) => (
                      <SelectItem value={number.toString()} key={number}>
                        {number.toString()}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="session">Session (optional)</Label>
              <Select value={session} onValueChange={setSession}>
                <SelectTrigger id="session" aria-label="Select Session">
                  <SelectValue placeholder="Select Session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={1} value="Fall">
                    Fall
                  </SelectItem>
                  <SelectItem key={2} value="Summer">
                    Summer
                  </SelectItem>
                  <SelectItem key={3} value="Spring">
                    Spring
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="year">Year (optional)</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="year" aria-label="Select Year">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {getYears().map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t p-4">
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            className="gap-1"
            disabled={number ? false : true}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Add Semester
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddSemester;
