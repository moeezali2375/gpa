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
import { useEffect, useState } from "react";
import mongoose from "mongoose";
import {
  getSemesterNumbers,
  getSemesterSeason,
  getYears,
  SeasonOptions,
} from "@/utils/semesterUtils";
import { getCurrentYear } from "@/utils/commonUtils";

const AddSemester = ({ semesterLength, handleAddSemester }) => {
  const [number, setNumber] = useState((semesterLength + 1).toString());
  const [season, setSeason] = useState(getSemesterSeason());
  const [year, setYear] = useState(getCurrentYear());

  useEffect(() => {
    setNumber((semesterLength + 1).toString());
  }, [semesterLength]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!number) return;
    const newSemester = {
      _id: new mongoose.Types.ObjectId().toString(),
      number: parseInt(number),
      season: SeasonOptions[season],
      year: parseInt(year),
      courses: [],
    };

    handleAddSemester(newSemester);
    setNumber((parseInt(number) + 1).toString());
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
              <Label htmlFor="semesterNumber">Number</Label>
              <Select required={true} value={number} onValueChange={setNumber}>
                <SelectTrigger id="semesterNumber" aria-label="Semester Number">
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
            <div className="grid gap-3">
              <Label htmlFor="season">Season</Label>
              <Select value={season} onValueChange={setSeason}>
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
            <div className="grid gap-3">
              <Label htmlFor="year">Year</Label>
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
            disabled={number && season && year ? false : true}
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
