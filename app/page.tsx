import Image from "next/image";
import data from "../data/data.json";
import Quiz from "@/components/Quiz";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <Quiz data={data} />
    </main>
  );
}
