import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Rocket } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const PriorSemesterGPA = ({ gpaArray }) => {
  const [previousCredits, setPreviousCredits] = useState<string>("");
  const [previousCGPA, setPreviousCGPA] = useState<string>("");
  const [newGPA, setNewGPA] = useState<number | null>(null);

  const calculateNewGPA = () => {
    const prevCredits = parseFloat(previousCredits);
    const prevCGPA = parseFloat(previousCGPA);

    if (
      !isNaN(prevCredits) &&
      !isNaN(prevCGPA) &&
      gpaArray?.length > 0 &&
      prevCredits > 0 &&
      prevCGPA > 0
    ) {
      const last = gpaArray[gpaArray.length - 1];
      const overallCredits = prevCredits + last.currentCredits;
      const overallGPA =
        (prevCGPA * prevCredits + last.cgpa * last.currentCredits) /
        overallCredits;
      setNewGPA(overallGPA);
    } else {
      setNewGPA(null);
    }
  };

  return (
    <Card
      x-chunk="dashboard-07-chunk-3"
      className="max-w-xs md:max-w-full lg:max-w-full"
    >
      <CardHeader>
        <CardTitle>Prior Semester GPA</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-3">
            <Label htmlFor="previousCredits">Previous Credits</Label>
            <Input
              id="previousCredits"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={previousCredits}
              onChange={(e) => setPreviousCredits(e.target.value)}
              min={0}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="previousCGPA">Previous CGPA</Label>
            <Input
              id="previousCGPA"
              type="number"
              step="0.01"
              inputMode="decimal"
              pattern="[0-9]*"
              value={previousCGPA}
              onChange={(e) => setPreviousCGPA(e.target.value)}
              min={0}
              max={4.0}
            />
          </div>
        </div>
        {newGPA !== null && (
          <div className="mt-4 text-center max-w-sm mx-auto">
            <p className="text-green-500 text-sm">
              Your new CGPA, including the prior semester, is{" "}
              {newGPA.toFixed(2)}.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={calculateNewGPA}
        >
          <Rocket className="h-3.5 w-3.5" />
          Calculate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PriorSemesterGPA;
