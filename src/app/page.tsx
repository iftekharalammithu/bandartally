import Ship_Details from "@/Component/Ship_Details";
import Tally_Table from "@/Component/Tally_Table";
import Title from "@/Component/Title";

export default function Home() {
  return (
    <div className="flex bdr  items-center m-3 md:m-6 overflow-auto h-screen flex-col">
      <Title></Title>
      <Ship_Details></Ship_Details>
      <Tally_Table></Tally_Table>
    </div>
  );
}
