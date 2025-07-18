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
  shiftDay: HatchData;
  shiftNight: HatchData;
  prevDischarged: HatchData;
};

export default function Tally_Table() {
  const [data, setData] = useState<TallyData>({
    manifest: { h1: 0, h2: 0, h3: 0, h4: 0 },
    shiftDay: { h1: 0, h2: 0, h3: 0, h4: 0 },
    shiftNight: { h1: 0, h2: 0, h3: 0, h4: 0 },
    prevDischarged: { h1: 0, h2: 0, h3: 0, h4: 0 },
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const calculateTotalBags = (row: keyof TallyData) =>
    data[row].h1 + data[row].h2 + data[row].h3 + data[row].h4;
  const calculateTotalMTs = (bags: number): number => (bags * 50) / 1000;
  const last24hrs =
    calculateTotalBags("shiftDay") + calculateTotalBags("shiftNight");
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
            <TableCell className="border-r border-gray-400">
              Shift Day
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftDay", "h1")}
                onChange={(e) =>
                  handleInputChange("shiftDay", "h1", e.target.value)
                }
                onFocus={() => handleFocus("shiftDay", "h1")}
                onBlur={() => handleBlur("shiftDay", "h1")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftDay", "h2")}
                onChange={(e) =>
                  handleInputChange("shiftDay", "h2", e.target.value)
                }
                onFocus={() => handleFocus("shiftDay", "h2")}
                onBlur={() => handleBlur("shiftDay", "h2")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftDay", "h3")}
                onChange={(e) =>
                  handleInputChange("shiftDay", "h3", e.target.value)
                }
                onFocus={() => handleFocus("shiftDay", "h3")}
                onBlur={() => handleBlur("shiftDay", "h3")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftDay", "h4")}
                onChange={(e) =>
                  handleInputChange("shiftDay", "h4", e.target.value)
                }
                onFocus={() => handleFocus("shiftDay", "h4")}
                onBlur={() => handleBlur("shiftDay", "h4")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(calculateTotalBags("shiftDay"))}
            </TableCell>
            <TableCell>
              {formatNumber(calculateTotalMTs(calculateTotalBags("shiftDay")))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-gray-400">
              Shift Night
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftNight", "h1")}
                onChange={(e) =>
                  handleInputChange("shiftNight", "h1", e.target.value)
                }
                onFocus={() => handleFocus("shiftNight", "h1")}
                onBlur={() => handleBlur("shiftNight", "h1")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftNight", "h2")}
                onChange={(e) =>
                  handleInputChange("shiftNight", "h2", e.target.value)
                }
                onFocus={() => handleFocus("shiftNight", "h2")}
                onBlur={() => handleBlur("shiftNight", "h2")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftNight", "h3")}
                onChange={(e) =>
                  handleInputChange("shiftNight", "h3", e.target.value)
                }
                onFocus={() => handleFocus("shiftNight", "h3")}
                onBlur={() => handleBlur("shiftNight", "h3")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              <input
                type="number"
                value={getInputValue("shiftNight", "h4")}
                onChange={(e) =>
                  handleInputChange("shiftNight", "h4", e.target.value)
                }
                onFocus={() => handleFocus("shiftNight", "h4")}
                onBlur={() => handleBlur("shiftNight", "h4")}
                className="w-full"
              />
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(calculateTotalBags("shiftNight"))}
            </TableCell>
            <TableCell>
              {formatNumber(
                calculateTotalMTs(calculateTotalBags("shiftNight"))
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="border-r border-gray-400">
              Last 24hrs Discharges
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(data.shiftDay.h1 + data.shiftNight.h1)}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(data.shiftDay.h2 + data.shiftNight.h2)}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(data.shiftDay.h3 + data.shiftNight.h3)}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(data.shiftDay.h4 + data.shiftNight.h4)}
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
                data.shiftDay.h1 + data.shiftNight.h1 + data.prevDischarged.h1
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.shiftDay.h2 + data.shiftNight.h2 + data.prevDischarged.h2
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.shiftDay.h3 + data.shiftNight.h3 + data.prevDischarged.h3
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.shiftDay.h4 + data.shiftNight.h4 + data.prevDischarged.h4
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
                  (data.shiftDay.h1 +
                    data.shiftNight.h1 +
                    data.prevDischarged.h1)
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.manifest.h2 -
                  (data.shiftDay.h2 +
                    data.shiftNight.h2 +
                    data.prevDischarged.h2)
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.manifest.h3 -
                  (data.shiftDay.h3 +
                    data.shiftNight.h3 +
                    data.prevDischarged.h3)
              )}
            </TableCell>
            <TableCell className="border-r border-gray-400">
              {formatNumber(
                data.manifest.h4 -
                  (data.shiftDay.h4 +
                    data.shiftNight.h4 +
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
