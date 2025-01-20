import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import { LoaderCircle } from "lucide-react";

export default function Stalk() {
  const axios = useAxios();
  const [rollNumber, setRollNumber] = useState<string>("");
  const [year, setYear] = useState<number>();
  const [session, setSession] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getPlainRollNumber = (roll: string) => {
    const pattern = /^[0-9]{2}[A-Z]-[0-9]{4}$/;
    if (typeof roll === "string" && pattern.test(roll)) {
      return roll.replace(/[A-Z-]/g, "");
    } else {
      throw new Error("Invalid roll number format. Expected format: XXA-XXXX.");
    }
  };

  const getSession = (session: string) => {
    switch (session) {
      case "Spring":
        return 1;
      case "Summer":
        return 2;
      case "Fall":
        return 3;
      default:
        return null;
    }
  };

  const handleStalking = async () => {
    try {
      setIsLoading(true);
      const roll = getPlainRollNumber(rollNumber);
      const s = getSession(session);
      if (!roll || !year || !s) return;
      await axios.post("/stalk", {
        rollNo: parseInt(`1220${roll}`),
        semID: parseInt(`${year}${s}`),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Link to={"#"} className="text-lg font-semibold ">
          Stalk!
        </Link>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stalk</DialogTitle>
          <DialogDescription>
            Stalking someone else’s GPA? 👀📊 That’s sneaky! 😂 But let’s keep
            it ethical, yeah? 🤔✨
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rollNumber" className="text-right">
              Roll Number
            </Label>
            <Input
              id="rollNumber"
              placeholder="20L-0000"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year" className="text-right">
              Year
            </Label>
            <Input
              id="year"
              value={year}
              placeholder="2020"
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="session" className="text-right">
              Session
            </Label>
            <Select value={session} onValueChange={setSession}>
              <SelectTrigger id="session" aria-label="Select Session">
                <SelectValue placeholder="Select Session" />
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
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleStalking} disabled={isLoading}>
            {isLoading ? <LoaderCircle className="spinner" /> : "Hack! 💻"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
