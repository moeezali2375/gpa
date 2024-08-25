import { useState } from "react";
import Main from "./Main";
import StickySide from "./StickySide";
const cr1 = [
  {
    _id: 1,
    name: "DSA",
    credits: 3,
    grade: "A+",
  },
];
const cr2 = [
  {
    _id: 1,
    name: "DAA",
    credits: 3,
    grade: "A+",
  },
];
const array = [
  { _id: 1, name: "Semester 1", desc: "Spring 2024", courses: cr1 },
  { _id: 2, name: "Semester 2", desc: "Fall 2024", courses: cr2 },
];

export default function Home() {
  const [semesters, setSemesters] = useState(array);

  return (
    <div className="flex min-h-screen w-full">
      <Main semesters={semesters} setSemesters={setSemesters} />
      <StickySide semesters={semesters} />
    </div>
  );
}
