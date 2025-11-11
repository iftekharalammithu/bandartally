"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";

const Ship_Details = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Mother Vessel Name
  const [VesselName, setVesselName] = useState("");
  const [isopenVesselName, setisopenVesselName] = useState(false);
  const [inputValueVesselName, setInputValueVesselName] = useState("");

  // Cargo
  const [Cargo, setCargo] = useState("");
  const [isopenCargo, setisopenCargo] = useState(false);
  const [inputValueCargo, setInputValueCargo] = useState("");

  // Place Of Discharge
  const [PlaceOfDischarge, setPlaceOfDischarge] = useState("");
  const [isopenPlaceOfDischarge, setisopenPlaceOfDischarge] = useState(false);
  const [inputValuePlaceOfDischarge, setInputValuePlaceOfDischarge] =
    useState("");

  // Date and Time
  const [DateTime, setDateTime] = useState("");
  const [isopenDateTime, setisopenDateTime] = useState(false);
  const [inputValueDateTime, setInputValueDateTime] = useState("");

  // Load from localStorage
  useEffect(() => {
    const storedVessel = localStorage.getItem("vesselName") || "MV. VTC51662";
    const storedCargo = localStorage.getItem("cargo") || "Rice";
    const storedDischarge =
      localStorage.getItem("placeOfDischarge") || "SALO/J-S";
    const storedDate =
      localStorage.getItem("dateTime") ||
      new Date().toLocaleString("en-GB", {
        day: "numeric",
        year: "numeric",
        month: "numeric",
      });

    setVesselName(storedVessel);
    setInputValueVesselName(storedVessel);
    setCargo(storedCargo);
    setInputValueCargo(storedCargo);
    setPlaceOfDischarge(storedDischarge);
    setInputValuePlaceOfDischarge(storedDischarge);
    setDateTime(storedDate);
    setInputValueDateTime(storedDate);

    setIsLoading(false);
  }, []);

  const handleVesselNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newValue = inputValueVesselName.toUpperCase();
    setVesselName(newValue);
    localStorage.setItem("vesselName", newValue);
    setisopenVesselName(false);
  };

  const handleCargoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newValue = inputValueCargo;
    setCargo(newValue);
    localStorage.setItem("cargo", newValue);
    setisopenCargo(false);
  };

  const handlePlaceOfDischargeSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const newValue = inputValuePlaceOfDischarge.toUpperCase();
    setPlaceOfDischarge(newValue);
    localStorage.setItem("placeOfDischarge", newValue);
    setisopenPlaceOfDischarge(false);
  };

  const handleDateTimeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newValue = inputValueDateTime.toUpperCase();
    setDateTime(newValue);
    localStorage.setItem("dateTime", newValue);
    setisopenDateTime(false);
  };

  if (isLoading) {
    return;
  }

  return (
    <div className="relative flex mt-2 w-full">
      <style>
        {`
          @media print {
            .print-hide {
              display: none !important;
            }
          }
        `}
      </style>

      <table>
        <tbody>
          {/* Vessel Name */}
          <tr>
            <td className="font-semibold pr-4">MOTHER VESSEL</td>
            <td className="min-w-7">:</td>
            <td className="text-left">
              {isopenVesselName ? (
                <form
                  onSubmit={handleVesselNameSubmit}
                  className="justify-center items-center flex gap-2"
                >
                  <Input
                    type="text"
                    placeholder="MOTHER VESSEL NAME"
                    className="uppercase mx-1"
                    value={inputValueVesselName}
                    onChange={(e) => setInputValueVesselName(e.target.value)}
                  />
                  <Button variant="destructive" type="submit" className="w-fit">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="flex gap-2">
                  <h1>{VesselName}</h1>
                  <CiEdit
                    className="print-hide cursor-pointer"
                    onClick={() => {
                      setisopenVesselName(true);
                      setInputValueVesselName(VesselName);
                    }}
                  />
                </div>
              )}
            </td>
          </tr>

          {/* Cargo */}
          <tr>
            <td className="font-semibold pr-4">CARGO</td>
            <td className="min-w-7">:</td>
            <td className="text-left">
              {isopenCargo ? (
                <form
                  onSubmit={handleCargoSubmit}
                  className="justify-center items-center flex gap-2"
                >
                  <Input
                    type="text"
                    placeholder="CARGO TYPE"
                    className="mx-1"
                    value={inputValueCargo}
                    onChange={(e) => setInputValueCargo(e.target.value)}
                  />
                  <Button variant="destructive" type="submit" className="w-fit">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="flex gap-2">
                  <h1>{Cargo}</h1>
                  <CiEdit
                    className="print-hide cursor-pointer"
                    onClick={() => {
                      setisopenCargo(true);
                      setInputValueCargo(Cargo);
                    }}
                  />
                </div>
              )}
            </td>
          </tr>

          {/* Place of Discharge */}
          <tr>
            <td className="font-semibold pr-4">PLACE OF DISCHARGE</td>
            <td className="min-w-7">:</td>
            <td className="text-left">
              {isopenPlaceOfDischarge ? (
                <form
                  onSubmit={handlePlaceOfDischargeSubmit}
                  className="justify-center items-center flex gap-2"
                >
                  <Input
                    type="text"
                    placeholder="PLACE OF DISCHARGE"
                    className="uppercase mx-1"
                    value={inputValuePlaceOfDischarge}
                    onChange={(e) =>
                      setInputValuePlaceOfDischarge(e.target.value)
                    }
                  />
                  <Button variant="destructive" type="submit" className="w-fit">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="flex gap-2">
                  <h1>{PlaceOfDischarge}</h1>
                  <CiEdit
                    className="print-hide cursor-pointer"
                    onClick={() => {
                      setisopenPlaceOfDischarge(true);
                      setInputValuePlaceOfDischarge(PlaceOfDischarge);
                    }}
                  />
                </div>
              )}
            </td>
          </tr>

          {/* Date/Time */}
          <tr>
            <td className="font-semibold pr-4">TIME/DATE OF REPORTING</td>
            <td className="min-w-7">:</td>
            <td className="text-left">
              {isopenDateTime ? (
                <form
                  onSubmit={handleDateTimeSubmit}
                  className="justify-center items-center flex gap-2"
                >
                  <Input
                    type="text"
                    placeholder="DATE / TIME"
                    className="uppercase mx-1"
                    value={inputValueDateTime}
                    onChange={(e) => setInputValueDateTime(e.target.value)}
                  />
                  <Button variant="destructive" type="submit" className="w-fit">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="flex gap-2">
                  <h1>{DateTime}</h1>
                  <CiEdit
                    className="print-hide cursor-pointer"
                    onClick={() => {
                      setisopenDateTime(true);
                      setInputValueDateTime(DateTime);
                    }}
                  />
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Ship_Details;
