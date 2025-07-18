import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const Tally_Table = () => {
  return (
    <div className=" bdr w-full mt-6">
      <Table className="w-full  ">
        <TableHeader>
          <TableRow className="border-b border-gray-600">
            <TableHead
              rowSpan={2}
              className="align-middle border-r border-gray-600  p-4"
            >
              As per
            </TableHead>
            <TableHead className="border-r border-gray-600  text-left">
              Hatch no-1
            </TableHead>
            <TableHead className="border-r border-gray-600  text-left">
              Hatch no-2
            </TableHead>
            <TableHead className="border-r border-gray-600  text-left">
              Hatch no-3
            </TableHead>
            <TableHead className="border-r border-gray-600  text-left">
              Hatch no-4
            </TableHead>
            <TableHead colSpan={2} className=" text-left">
              Total
            </TableHead>
          </TableRow>
          <TableRow className="border-b border-gray-600">
            <TableHead className="border-r border-gray-600  text-left">
              Bags
            </TableHead>
            <TableHead className="border-r border-gray-600  text-left">
              Bags
            </TableHead>
            <TableHead className="border-r border-gray-600  text-left">
              Bags
            </TableHead>
            <TableHead className="border-r border-gray-600  text-left">
              Bags
            </TableHead>
            <TableHead className="border-r border-gray-600  text-left">
              Bags
            </TableHead>
            <TableHead className=" text-left">MTs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium border-r border-gray-600">
              sdg
            </TableCell>
            <TableCell className="border-r border-gray-600">Paid</TableCell>
            <TableCell className="border-r border-gray-600">Paid1</TableCell>
            <TableCell className="border-r border-gray-600">
              Credit Card
            </TableCell>
            <TableCell className="border-r border-gray-600">
              Credit Card2
            </TableCell>
            <TableCell className="border-r border-gray-600">
              Credit Card3
            </TableCell>
            <TableCell className="border-r border-gray-600">
              Credit Card4
            </TableCell>
            <TableCell className="text-left">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium border-r border-gray-600">
              sdg
            </TableCell>
            <TableCell className="border-r border-gray-600">Paid</TableCell>
            <TableCell className="border-r border-gray-600">Paid1</TableCell>
            <TableCell className="border-r border-gray-600">
              Credit Card
            </TableCell>
            <TableCell className="border-r border-gray-600">
              Credit Card2
            </TableCell>
            <TableCell className="border-r border-gray-600">
              Credit Card3
            </TableCell>
            <TableCell className="border-r border-gray-600">
              Credit Card4
            </TableCell>
            <TableCell className="text-left">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Tally_Table;
