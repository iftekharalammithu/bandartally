"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type HatchData = {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
};

type TallyData = {
  manifest: HatchData;
  shiftA: HatchData;
  shiftB: HatchData;
  shiftC: HatchData;
  prevDischarged: HatchData;
};

export default function TripleShiftTable() {
  const [data, setData] = useState<TallyData>({
    manifest: { h1: 0, h2: 0, h3: 0, h4: 0 },
    shiftA: { h1: 0, h2: 0, h3: 0, h4: 0 },
    shiftB: { h1: 0, h2: 0, h3: 0, h4: 0 },
    shiftC: { h1: 0, h2: 0, h3: 0, h4: 0 },
    prevDischarged: { h1: 0, h2: 0, h3: 0, h4: 0 },
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const calculateTotalBags = (row: keyof TallyData) =>
    data[row].h1 + data[row].h2 + data[row].h3 + data[row].h4;

  const calculateTotalMTs = (bags: number): number => (bags * 50) / 1000;

  const last24hrs =
    calculateTotalBags("shiftA") +
    calculateTotalBags("shiftB") +
    calculateTotalBags("shiftC");

  const totalDischarged = last24hrs + calculateTotalBags("prevDischarged");

  const balance = calculateTotalBags("manifest") - totalDischarged;

  const formatNumber = (num: number) => Number(num).toLocaleString("en-IN");

  const handleInputChange = (
    row: keyof TallyData,
    hatch: keyof HatchData,
    value: string
  ) => {
    setData((prev) => ({
      ...prev,
      [row]: { ...prev[row], [hatch]: Number(value) || 0 },
    }));
  };

  const handleFocus = (row: keyof TallyData, hatch: keyof HatchData) => {
    setFocusedField(`${row}-${hatch}`);
  };

  const handleBlur = (row: keyof TallyData, hatch: keyof HatchData) => {
    setFocusedField(null);
    // If the field is empty after blur, set it to 0
    if (!data[row][hatch] && data[row][hatch] !== 0) {
      setData((prev) => ({
        ...prev,
        [row]: { ...prev[row], [hatch]: 0 },
      }));
    }
  };

  const getInputValue = (row: keyof TallyData, hatch: keyof HatchData) => {
    if (focusedField === `${row}-${hatch}` && data[row][hatch] === 0) {
      return "";
    }
    return data[row][hatch];
  };

  return (
    <div className=" w-full  mt-5">
      <Table className="border  border-gray-400">
        <TableHeader>
          <TableRow className="border-b border-gray-400">
            <TableHead
              rowSpan={2}
              className="align-middle  border-r border-gray-400 "
            >
              As per
            </TableHead>
            <TableHead className="border-r  border-gray-400 text-left">
              Hatch no -1
            </TableHead>
            <TableHead className="border-r border-gray-400 text-left">
              Hatch no -2
            </TableHead>
            <TableHead className="border-r border-gray-400 text-left">
              Hatch no -3
            </TableHead>
            <TableHead className="border-r border-gray-400 text-left">
              Hatch no -4
            </TableHead>
            <TableHead
              colSpan={2}
              className="text-left min-w-3xs border-r border-gray-400"
            >
              Total
            </TableHead>
          </TableRow>
          <TableRow className="border-b border-gray-400">
            <TableHead className="border-r border-gray-400 text-left">
              Bags
            </TableHead>
            <TableHead className="border-r border-gray-400 text-left">
              Bags
            </TableHead>
            <TableHead className="border-r border-gray-400 text-left">
              Bags
            </TableHead>
            <TableHead className="border-r border-gray-400 text-left">
              Bags
            </TableHead>
            <TableHead className="border-r border-gray-400 text-left">
              Bags
            </TableHead>
            <TableHead className="text-left">MTs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className=" text-lg">
          <TableRow>
            <TableCell className="border-r border-gray-400">
              Manifest Quantity
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("manifest", "h1")}
                onChange={(e) =>
                  handleInputChange("manifest", "h1", e.target.value)
                }
                onFocus={() => handleFocus("manifest", "h1")}
                onBlur={() => handleBlur("manifest", "h1")}
                className="w-full "
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("manifest", "h2")}
                onChange={(e) =>
                  handleInputChange("manifest", "h2", e.target.value)
                }
                onFocus={() => handleFocus("manifest", "h2")}
                onBlur={() => handleBlur("manifest", "h2")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("manifest", "h3")}
                onChange={(e) =>
                  handleInputChange("manifest", "h3", e.target.value)
                }
                onFocus={() => handleFocus("manifest", "h3")}
                onBlur={() => handleBlur("manifest", "h3")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("manifest", "h4")}
                onChange={(e) =>
                  handleInputChange("manifest", "h4", e.target.value)
                }
                onFocus={() => handleFocus("manifest", "h4")}
                onBlur={() => handleBlur("manifest", "h4")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r  border-gray-400">
              {formatNumber(calculateTotalBags("manifest"))}
            </TableCell>
            <TableCell>
              {formatNumber(calculateTotalMTs(calculateTotalBags("manifest")))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-gray-400">Shift A</TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftA", "h1")}
                onChange={(e) =>
                  handleInputChange("shiftA", "h1", e.target.value)
                }
                onFocus={() => handleFocus("shiftA", "h1")}
                onBlur={() => handleBlur("shiftA", "h1")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftA", "h2")}
                onChange={(e) =>
                  handleInputChange("shiftA", "h2", e.target.value)
                }
                onFocus={() => handleFocus("shiftA", "h2")}
                onBlur={() => handleBlur("shiftA", "h2")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftA", "h3")}
                onChange={(e) =>
                  handleInputChange("shiftA", "h3", e.target.value)
                }
                onFocus={() => handleFocus("shiftA", "h3")}
                onBlur={() => handleBlur("shiftA", "h3")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftA", "h4")}
                onChange={(e) =>
                  handleInputChange("shiftA", "h4", e.target.value)
                }
                onFocus={() => handleFocus("shiftA", "h4")}
                onBlur={() => handleBlur("shiftA", "h4")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(calculateTotalBags("shiftA"))}
            </TableCell>
            <TableCell>
              {formatNumber(calculateTotalMTs(calculateTotalBags("shiftA")))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-gray-400">Shift B</TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftB", "h1")}
                onChange={(e) =>
                  handleInputChange("shiftB", "h1", e.target.value)
                }
                onFocus={() => handleFocus("shiftB", "h1")}
                onBlur={() => handleBlur("shiftB", "h1")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftB", "h2")}
                onChange={(e) =>
                  handleInputChange("shiftB", "h2", e.target.value)
                }
                onFocus={() => handleFocus("shiftB", "h2")}
                onBlur={() => handleBlur("shiftB", "h2")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftB", "h3")}
                onChange={(e) =>
                  handleInputChange("shiftB", "h3", e.target.value)
                }
                onFocus={() => handleFocus("shiftB", "h3")}
                onBlur={() => handleBlur("shiftB", "h3")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftB", "h4")}
                onChange={(e) =>
                  handleInputChange("shiftB", "h4", e.target.value)
                }
                onFocus={() => handleFocus("shiftB", "h4")}
                onBlur={() => handleBlur("shiftB", "h4")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(calculateTotalBags("shiftB"))}
            </TableCell>
            <TableCell>
              {formatNumber(calculateTotalMTs(calculateTotalBags("shiftB")))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-gray-400">Shift C</TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftC", "h1")}
                onChange={(e) =>
                  handleInputChange("shiftC", "h1", e.target.value)
                }
                onFocus={() => handleFocus("shiftC", "h1")}
                onBlur={() => handleBlur("shiftC", "h1")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftC", "h2")}
                onChange={(e) =>
                  handleInputChange("shiftC", "h2", e.target.value)
                }
                onFocus={() => handleFocus("shiftC", "h2")}
                onBlur={() => handleBlur("shiftC", "h2")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftC", "h3")}
                onChange={(e) =>
                  handleInputChange("shiftC", "h3", e.target.value)
                }
                onFocus={() => handleFocus("shiftC", "h3")}
                onBlur={() => handleBlur("shiftC", "h3")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftC", "h4")}
                onChange={(e) =>
                  handleInputChange("shiftC", "h4", e.target.value)
                }
                onFocus={() => handleFocus("shiftC", "h4")}
                onBlur={() => handleBlur("shiftC", "h4")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(calculateTotalBags("shiftC"))}
            </TableCell>
            <TableCell>
              {formatNumber(calculateTotalMTs(calculateTotalBags("shiftC")))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-gray-400">
              Last 24hrs Discharges
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(data.shiftA.h1 + data.shiftB.h1 + data.shiftC.h1)}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(data.shiftA.h2 + data.shiftB.h2 + data.shiftC.h2)}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(data.shiftA.h3 + data.shiftB.h3 + data.shiftC.h3)}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(data.shiftA.h4 + data.shiftB.h4 + data.shiftC.h4)}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(last24hrs)}
            </TableCell>
            <TableCell>{formatNumber(calculateTotalMTs(last24hrs))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-gray-400">
              Previous Discharged
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("prevDischarged", "h1")}
                onChange={(e) =>
                  handleInputChange("prevDischarged", "h1", e.target.value)
                }
                onFocus={() => handleFocus("prevDischarged", "h1")}
                onBlur={() => handleBlur("prevDischarged", "h1")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("prevDischarged", "h2")}
                onChange={(e) =>
                  handleInputChange("prevDischarged", "h2", e.target.value)
                }
                onFocus={() => handleFocus("prevDischarged", "h2")}
                onBlur={() => handleBlur("prevDischarged", "h2")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("prevDischarged", "h3")}
                onChange={(e) =>
                  handleInputChange("prevDischarged", "h3", e.target.value)
                }
                onFocus={() => handleFocus("prevDischarged", "h3")}
                onBlur={() => handleBlur("prevDischarged", "h3")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("prevDischarged", "h4")}
                onChange={(e) =>
                  handleInputChange("prevDischarged", "h4", e.target.value)
                }
                onFocus={() => handleFocus("prevDischarged", "h4")}
                onBlur={() => handleBlur("prevDischarged", "h4")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(calculateTotalBags("prevDischarged"))}
            </TableCell>
            <TableCell>
              {formatNumber(
                calculateTotalMTs(calculateTotalBags("prevDischarged"))
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-gray-400">
              Total discharged Till date
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.shiftA.h1 +
                  data.shiftB.h1 +
                  data.shiftC.h1 +
                  data.prevDischarged.h1
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.shiftA.h2 +
                  data.shiftB.h2 +
                  data.shiftC.h2 +
                  data.prevDischarged.h2
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.shiftA.h3 +
                  data.shiftB.h3 +
                  data.shiftC.h3 +
                  data.prevDischarged.h3
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.shiftA.h4 +
                  data.shiftB.h4 +
                  data.shiftC.h4 +
                  data.prevDischarged.h4
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(totalDischarged)}
            </TableCell>
            <TableCell>
              {formatNumber(calculateTotalMTs(totalDischarged))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-gray-400">
              Balance on board
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.manifest.h1 -
                  (data.shiftA.h1 +
                    data.shiftB.h1 +
                    data.shiftC.h1 +
                    data.prevDischarged.h1)
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.manifest.h2 -
                  (data.shiftA.h2 +
                    data.shiftB.h2 +
                    data.shiftC.h2 +
                    data.prevDischarged.h2)
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.manifest.h3 -
                  (data.shiftA.h3 +
                    data.shiftB.h3 +
                    data.shiftC.h3 +
                    data.prevDischarged.h3)
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.manifest.h4 -
                  (data.shiftA.h4 +
                    data.shiftB.h4 +
                    data.shiftC.h4 +
                    data.prevDischarged.h4)
              )}
            </TableCell>
            <TableCell className="border-r  border-gray-400">
              {formatNumber(balance)}
            </TableCell>
            <TableCell>{formatNumber(calculateTotalMTs(balance))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
