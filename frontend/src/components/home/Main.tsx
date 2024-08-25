import Semester from "./Semester";
import AddSemester from "./AddSemester";

const Main = ({ semesters, setSemesters }) => {
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full md:w-8/12">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            {semesters.map((semester) => (
              <Semester
                key={semester._id}
                semester={semester}
                semesters={semesters}
                setSemesters={setSemesters}
              />
            ))}
            <AddSemester semesters={semesters} setSemesters={setSemesters} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
