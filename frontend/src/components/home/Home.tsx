import Main from "./Main";
import StickySide from "./StickySide";

export default function Home() {
  console.log("Home rendered");
  return (
    <div className="flex min-h-screen w-full">
      <Main />
      <StickySide />
    </div>
  );
}
