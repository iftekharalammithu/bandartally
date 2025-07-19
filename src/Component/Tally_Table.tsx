"use client";

import { useState, useMemo, useCallback } from "react";
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

type RowConfig = {
  label: string;
  rowKey: keyof TallyData | null;
  isInput: boolean;
  showTotal: boolean;
  values?: HatchData;
};

export default function Tally_Table() {
  const [data, setData] = useState<TallyData>({
    manifest: { h1: 0, h2: 0, h3: 0, h4: 0 },
    shiftDay: { h1: 0, h2: 0, h3: 0, h4: 0 },
    shiftNight: { h1: 0, h2: 0, h3: 0, h4: 0 },
    prevDischarged: { h1: 0, h2: 0, h3: 0, h4: 0 },
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Memoize calculations
  const { last24hrs, totalDischarged, balance } = useMemo(() => {
    // Utility functions
    const calculateTotalBags = (hatchData: HatchData): number =>
      hatchData.h1 + hatchData.h2 + hatchData.h3 + hatchData.h4;

    const last24hrsBags =
      calculateTotalBags(data.shiftDay) + calculateTotalBags(data.shiftNight);
    const totalDischargedBags =
      last24hrsBags + calculateTotalBags(data.prevDischarged);
    const balanceBags = calculateTotalBags(data.manifest) - totalDischargedBags;

    return {
      last24hrs: last24hrsBags,
      totalDischarged: totalDischargedBags,
      balance: balanceBags,
    };
  }, [data]);

  // Memoize hatch sums for last 24hrs and total discharged
  const hatchSums = useMemo(() => {
    return {
      last24hrs: {
        h1: data.shiftDay.h1 + data.shiftNight.h1,
        h2: data.shiftDay.h2 + data.shiftNight.h2,
        h3: data.shiftDay.h3 + data.shiftNight.h3,
        h4: data.shiftDay.h4 + data.shiftNight.h4,
      },
      totalDischarged: {
        h1: data.shiftDay.h1 + data.shiftNight.h1 + data.prevDischarged.h1,
        h2: data.shiftDay.h2 + data.shiftNight.h2 + data.prevDischarged.h2,
        h3: data.shiftDay.h3 + data.shiftNight.h3 + data.prevDischarged.h3,
        h4: data.shiftDay.h4 + data.shiftNight.h4 + data.prevDischarged.h4,
      },
      balance: {
        h1:
          data.manifest.h1 -
          (data.shiftDay.h1 + data.shiftNight.h1 + data.prevDischarged.h1),
        h2:
          data.manifest.h2 -
          (data.shiftDay.h2 + data.shiftNight.h2 + data.prevDischarged.h2),
        h3:
          data.manifest.h3 -
          (data.shiftDay.h3 + data.shiftNight.h3 + data.prevDischarged.h3),
        h4:
          data.manifest.h4 -
          (data.shiftDay.h4 + data.shiftNight.h4 + data.prevDischarged.h4),
      },
    };
  }, [data]);

  const calculateTotalMTs = useCallback(
    (bags: number): number => (bags * 50) / 1000,
    []
  );
  const formatNumber = useCallback(
    (num: number) => Number(num).toLocaleString("en-IN"),
    []
  );

  // Optimized handler for input changes
  const handleInputChange = useCallback(
    (row: keyof TallyData, hatch: keyof HatchData, value: string) => {
      setData((prev) => ({
        ...prev,
        [row]: { ...prev[row], [hatch]: Number(value) || 0 },
      }));
    },
    []
  );

  // Optimized focus/blur handlers
  const handleFocus = useCallback(
    (row: keyof TallyData, hatch: keyof HatchData) => {
      setFocusedField(`${row}-${hatch}`);
    },
    []
  );

  const handleBlur = useCallback(
    (row: keyof TallyData, hatch: keyof HatchData) => {
      setFocusedField(null);
      // If the field is empty after blur, set it to 0
      if (data[row][hatch] === 0 || isNaN(data[row][hatch])) {
        setData((prev) => ({
          ...prev,
          [row]: { ...prev[row], [hatch]: 0 },
        }));
      }
    },
    [data]
  );

  const getInputValue = useCallback(
    (row: keyof TallyData, hatch: keyof HatchData): number | string => {
      if (focusedField === `${row}-${hatch}` && data[row][hatch] === 0) {
        return "";
      }
      return data[row][hatch];
    },
    [focusedField, data]
  );

  // Table rows configuration
  const rows: RowConfig[] = [
    {
      label: "Manifest Quantity",
      rowKey: "manifest",
      isInput: true,
      showTotal: true,
    },
    {
      label: "Shift Day",
      rowKey: "shiftDay",
      isInput: true,
      showTotal: true,
    },
    {
      label: "Shift Night",
      rowKey: "shiftNight",
      isInput: true,
      showTotal: true,
    },
    {
      label: "Last 24hrs Discharges",
      rowKey: null,
      isInput: false,
      showTotal: true,
      values: hatchSums.last24hrs,
    },
    {
      label: "Previous Discharged",
      rowKey: "prevDischarged",
      isInput: true,
      showTotal: true,
    },
    {
      label: "Total discharged Till date",
      rowKey: null,
      isInput: false,
      showTotal: true,
      values: hatchSums.totalDischarged,
    },
    {
      label: "Balance on board",
      rowKey: null,
      isInput: false,
      showTotal: true,
      values: hatchSums.balance,
    },
  ];

  return (
    <div className="w-full mt-5">
      <Table className="border border-gray-400">
        <TableHeader>
          <TableRow className="border-b border-gray-400">
            <TableHead
              rowSpan={2}
              className="align-middle border-r border-gray-400"
            >
              As per
            </TableHead>
            <TableHead className="border-r border-gray-400 text-left">
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
        <TableBody className="text-lg">
          {rows.map(({ label, rowKey, isInput, showTotal, values }) => (
            <TableRow key={label}>
              <TableCell className="border-r border-gray-400">
                {label}
              </TableCell>
              {(["h1", "h2", "h3", "h4"] as (keyof HatchData)[]).map(
                (hatch) => (
                  <TableCell key={hatch} className="border-r border-gray-400">
                    {isInput && rowKey ? (
                      <input
                        type="number"
                        value={getInputValue(rowKey, hatch)}
                        onChange={(e) =>
                          handleInputChange(rowKey, hatch, e.target.value)
                        }
                        onFocus={() => handleFocus(rowKey, hatch)}
                        onBlur={() => handleBlur(rowKey, hatch)}
                        className="w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    ) : (
                      formatNumber(
                        values
                          ? values[hatch]
                          : rowKey
                          ? data[rowKey][hatch]
                          : 0
                      )
                    )}
                  </TableCell>
                )
              )}
              {showTotal && (
                <>
                  <TableCell className="border-r border-gray-400">
                    {formatNumber(
                      rowKey
                        ? data[rowKey].h1 +
                            data[rowKey].h2 +
                            data[rowKey].h3 +
                            data[rowKey].h4
                        : label === "Last 24hrs Discharges"
                        ? last24hrs
                        : label === "Total discharged Till date"
                        ? totalDischarged
                        : balance
                    )}
                  </TableCell>
                  <TableCell>
                    {formatNumber(
                      calculateTotalMTs(
                        rowKey
                          ? data[rowKey].h1 +
                              data[rowKey].h2 +
                              data[rowKey].h3 +
                              data[rowKey].h4
                          : label === "Last 24hrs Discharges"
                          ? last24hrs
                          : label === "Total discharged Till date"
                          ? totalDischarged
                          : balance
                      )
                    )}
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
