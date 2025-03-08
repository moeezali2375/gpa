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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

const TargetGPA = ({ gpaArray }) => {
  const [completedCredits, setCompletedCredits] = useState<string>("");
  const [currentCGPA, setCurrentCGPA] = useState<string>("");
  const [targetGPA, setTargetGPA] = useState<string>("");
  const [additionalCredits, setAdditionalCredits] = useState<string>("");
  const [requiredGPA, setRequiredGPA] = useState<number | null>(null);

  useEffect(() => {
    if (gpaArray?.length > 0 && gpaArray[gpaArray.length - 1]?.currentCredits) {
      const last = gpaArray[gpaArray.length - 1];
      setCompletedCredits(last.currentCredits?.toString() || "");
      setCurrentCGPA(last.cgpa?.toString() || "");
    }
  }, [gpaArray]);

  const calculateRequiredGPA = () => {
    const completed = parseFloat(completedCredits);
    const additional = parseFloat(additionalCredits);
    const current = parseFloat(currentCGPA);
    const target = parseFloat(targetGPA);

    if (
      !isNaN(completed) &&
      !isNaN(additional) &&
      !isNaN(current) &&
      !isNaN(target) &&
      completed > 0 &&
      additional > 0 &&
      current > 0 &&
      target > 0
    ) {
      const totalCredits = completed + additional;
      const requiredGPA =
        (target * totalCredits - current * completed) / additional;
      setRequiredGPA(Math.max(0, requiredGPA)); // Ensure no negative GPA
    } else {
      setRequiredGPA(null); // Invalid input
    }
  };

  return (
    <Card
      x-chunk="dashboard-07-chunk-2"
      className="max-w-xs md:max-w-full lg:max-w-full"
    >
      <CardHeader>
        <CardTitle>Target GPA</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-3">
            <Label htmlFor="creditHoursCompleted">Credit Hours Completed</Label>
            <Input
              id="creditHoursCompleted"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={completedCredits}
              onChange={(e) => setCompletedCredits(e.target.value)}
              min={0}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="additionalCredits">Additional Credit Hours</Label>
            <Input
              id="additionalCredits"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={additionalCredits}
              onChange={(e) => setAdditionalCredits(e.target.value)}
              min={0}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="currentCGPA">Current CGPA</Label>
            <Input
              id="currentCGPA"
              type="number"
              step="0.01"
              inputMode="decimal"
              pattern="[0-9]*"
              value={currentCGPA}
              onChange={(e) => setCurrentCGPA(e.target.value)}
              min={0}
              max={4.0}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="targetGPA">Target CGPA</Label>
            <Input
              id="targetGPA"
              type="number"
              step="0.01"
              inputMode="decimal"
              pattern="[0-9]*"
              value={targetGPA}
              onChange={(e) => setTargetGPA(e.target.value)}
              min={0}
              max={4.0}
            />
          </div>
        </div>
        {requiredGPA !== null && (
          <div className="mt-4 text-center max-w-sm mx-auto">
            {requiredGPA <= 4.0 ? (
              <p className="text-green-500 text-sm">
                To achieve your target CGPA of {targetGPA}, you need an average
                GPA of {requiredGPA.toFixed(2)} in the additional{" "}
                {additionalCredits} credit hours.
              </p>
            ) : (
              <p className="text-red-500 text-sm">
                Achieving a target CGPA of {targetGPA} is not possible with the
                current inputs.
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={calculateRequiredGPA}
        >
          <Rocket className="h-3.5 w-3.5" />
          Calculate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TargetGPA;
