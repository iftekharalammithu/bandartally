"use client";
import DoubleShift from "@/Component/Double Shift/DoubleShift";
import Ship_Details from "@/Component/Ship_Details";
import Tally_Table from "@/Component/Tally_Table";
import Title from "@/Component/Title";
import TripleShift from "@/Component/Triple Shift/TripleShift";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const PrintComponent = () => {
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Ship Tally Report",
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0;
      }
      
      @media print {
        body {
          font-size: 10px;
          margin: 0;
          padding: 0;
        }
        
        .print-content {
          width: 100vw;
          height: 100vh;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 20px 0 20px;
          
          padding: 0;
        }
        
        .rotated-table {
          transform: rotate(90deg);
          transform-origin: center center;
          width: 11.7in;
          height: 8.3in;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0.1in;
          
        }
        
        .rotated-table > * {
          max-width: 100%;
          flex-shrink: 0;
        }
        
        .rotated-table .title-section {
          margin-bottom: 0.1in;
          font-size: 16px;
        }
        
        .details-section {
          left: 0;
          font-size: 16px;
          width: 100%;
          }
          
          .table-section {
          margin-bottom: 1in; 
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .rotated-table .signature-section {
          margin-top: 0.1in;
          width: 100%;
        }
        
        .rotated-table .signature-section h1 {
          font-size: 10px;
        }
        
        .no-print {
          display: none !important;
        }
        
        /* Remove page breaks to fit on one page */
        * {
          page-break-before: auto;
          page-break-after: auto;
          page-break-inside: auto;
        }
      }
    `,
    onBeforePrint: async () => {
      console.log("Preparing to print...");
    },
    onAfterPrint: () => {
      console.log("Print completed");
    },
  });
  const [active, setactive] = useState("DoubleShift");
  const navbar = [
    { id: "DoubleShift", name: "Double Shift", component: <DoubleShift /> },
    { id: "TripleShift", name: "Triple Shift", component: <TripleShift /> },
  ];
  return (
    <div className="flex w-fit gap-6 items-center m-2 p-10 overflow-auto md:m-6 h-fit flex-col">
      {/* Print button */}
      {/* <button
        onClick={handlePrint}
        className="no-print mb-4  px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Print Document
      </button> */}
      <div className="flex gap-4">
        {navbar.map((item, index) => (
          <button
            key={index}
            className={cn(
              "relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out",
              active === item.id
                ? "bg-blue-500 text-white"
                : "bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-2xl text-black"
            )}
            onClick={() => {
              setactive(item.id);
            }}
          >
            {item.name}
            <span
              className={cn(
                "absolute bottom-1 left-1/2 h-0.5 bg-current transform -translate-x-1/2 transition-all duration-300 ease-in-out",
                active === item.id ? "w-[70%]" : "w-0"
              )}
              style={{ bottom: "4px" }} // Adjust this to position the underline properly
            />
          </button>
        ))}
      </div>
      {/* Content to be printed */}
      <div ref={contentRef} className="print-content">
        {/* Rotated content - landscape orientation */}
        <div className="rotated-table w-fit">
          <div className="title-section">
            <Title />
          </div>
          <div className="details-section">
            <Ship_Details />
          </div>
          <div className="table-section">
            <Tally_Table />
          </div>
          <div className="signature-section">
            <div className="flex justify-between w-full px-4">
              <div className="text-center">
                <div className="border-t border-black w-full"></div>
                <h1>Supervisor</h1>
              </div>
              <div className="text-center">
                <div className="border-t border-black w-full"></div>
                <h1>Captain/Chief</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintComponent;
