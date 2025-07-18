"use client";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const TallyPrint = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });
  // Sample table data
  const tableData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
    { id: 4, name: "Alice Williams", email: "alice@example.com", role: "QA" },
  ];

  const printStyle = `
  @media print {
    @page {
      size: A4 landscape;
      margin: 20mm;
    }
    body * {
      visibility: hidden;
    }
    .print-content, .print-content * {
      visibility: visible;
    }
    .print-content {
      position: absolute;
      left: 0;
      top: 0;
      width: 100vw;
    }
  }
`;

  return (
    <div className="p-4 ">
      <style>{printStyle}</style>
      <div ref={contentRef} className="p-4 print-content">
        <h1 className="text-2xl font-bold mb-4">Employee Directory</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                <td className="border p-2">{row.id}</td>
                <td className="border p-2">{row.name}</td>
                <td className="border p-2">{row.email}</td>
                <td className="border p-2">{row.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-gray-600">
          Generated on: {new Date().toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={handlePrint}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Print Table
      </button>
    </div>
  );
};

export default TallyPrint;
