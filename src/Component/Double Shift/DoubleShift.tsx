import Ship_Details from "@/Component/Ship_Details";
import Tally_Table from "@/Component/Tally_Table";
import Title from "@/Component/Title";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const DoubleShift = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    pageStyle: `
    @import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap");

      @page {
        size: A4 landscape;
        margin: 20mm;
        margin-top: 0;
        margin-bottom: 0;
        marks: none;
      }
      @media print {
        body * {
          visibility: hidden;
          font-family: "Lora";
        }
        .print-content, .print-content * {
          visibility: visible;
          font-family: "Lora";
        }
        .print-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          font-family: "Lora" , serif !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  });

  const handlereset = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col gap-4 w-full h-full items-center">
      <div ref={contentRef} className="print-content">
        <Title />
        <Ship_Details />
        <Tally_Table />
        <div className="flex justify-between w-full mt-20  px-4">
          <div className="text-center">
            <div className="border-t border-black w-full "></div>{" "}
            {/* Line above Supervisor */}
            <h1>Supervisor</h1>
          </div>
          <div className="text-center">
            <div className="border-t border-black w-full "></div>{" "}
            {/* Line above Captain/Chief */}
            <h1>Captain/Chief</h1>
          </div>
        </div>
      </div>
      <div className=" flex gap-16">
        <Button
          size={"lg"}
          variant={"destructive"}
          onClick={handlereset}
          className="no-print"
        >
          Reset Page
        </Button>
        <Button
          size={"lg"}
          variant={"print"}
          onClick={handlePrint}
          className="no-print"
        >
          Print Tally
        </Button>
      </div>
    </div>
  );
};

export default DoubleShift;
