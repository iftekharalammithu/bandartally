"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const Ship_Details = () => {
  // Mother Vessel Name
  const [VesselName, setVesselName] = useState("MV. VTC51662");
  const [isopenVesselName, setisopenVesselName] = useState(false);
  const [inputValueVesselName, setInputValueVesselName] = useState(VesselName);

  const handleVesselNameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVesselName(inputValueVesselName.toUpperCase());
    setisopenVesselName(false);
  };

  // Cargo
  const [Cargo, setCargo] = useState("Rice");
  const [isopenCargo, setisopenCargo] = useState(false);
  const [inputValueCargo, setInputValueCargo] = useState(Cargo);

  const handleCargoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargo(inputValueCargo);
    setisopenCargo(false);
  };

  // Place Of Discharge
  const [PlaceOfDischarge, setPlaceOfDischarge] = useState("SALO/J-S");
  const [isopenPlaceOfDischarge, setisopenPlaceOfDischarge] = useState(false);
  const [inputValuePlaceOfDischarge, setInputValuePlaceOfDischarge] =
    useState(PlaceOfDischarge);

  const handlePlaceOfDischargeSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setPlaceOfDischarge(inputValuePlaceOfDischarge.toUpperCase());
    setisopenPlaceOfDischarge(false);
  };

  // Date and Time
  const [DateTime, setDateTime] = useState(
    new Date().toLocaleString("en-GB", {
      day: "numeric",
      year: "numeric",
      month: "numeric",
    })
  );
  const [isopenDateTime, setisopenDateTime] = useState(false);
  const [inputValueDateTime, setInputValueDateTime] = useState(DateTime);

  const handleDateTimeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDateTime(inputValueDateTime.toUpperCase());
    setisopenDateTime(false);
  };

  return (
    <div className=" relative flex mt-2  w-full">
      <style>
        {`
        @media print {
          .print-hide {
            display: none !important;
          }
        }
      `}
      </style>
      <table className="">
        <tbody>
          <tr>
            <td className=" font-semibold pr-4">MOTHER VESSEL</td>
            <td className=" min-w-7">:</td>
            <td className="text-left">
              {isopenVesselName ? (
                <form
                  onSubmit={handleVesselNameSubmit}
                  className="justify-center items-center flex  gap-2"
                >
                  <Input
                    type="text"
                    placeholder="SHIPPING COMPANY NAME"
                    className="uppercase mx-1"
                    value={inputValueVesselName}
                    onChange={(e) => setInputValueVesselName(e.target.value)}
                    onBlur={() => {
                      setVesselName(inputValueVesselName.toUpperCase());
                      setisopenVesselName(false);
                    }}
                  />
                  <Button variant="destructive" type="submit" className="w-fit">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="flex  gap-2">
                  <h1 className="  ">{VesselName}</h1>
                  <CiEdit
                    className="print-hide"
                    onClick={() => {
                      setisopenVesselName(true);
                      setInputValueVesselName(VesselName);
                    }}
                  />
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className=" font-semibold pr-4">CARGO</td>
            <td className=" min-w-7">:</td>
            <td className="text-left">
              {isopenCargo ? (
                <form
                  onSubmit={handleCargoSubmit}
                  className="justify-center items-center flex  gap-2"
                >
                  <Input
                    type="text"
                    placeholder="SHIPPING COMPANY NAME"
                    className=" mx-1"
                    value={inputValueCargo}
                    onChange={(e) => setInputValueCargo(e.target.value)}
                    onBlur={() => {
                      setCargo(inputValueCargo);
                      setisopenCargo(false);
                    }}
                  />
                  <Button variant="destructive" type="submit" className="w-fit">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="flex  gap-2">
                  <h1 className="  ">{Cargo}</h1>
                  <CiEdit
                    className="print-hide"
                    onClick={() => {
                      setisopenCargo(true);
                      setInputValueCargo(Cargo);
                    }}
                  />
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className=" font-semibold pr-4">Place of Discharge</td>
            <td className=" min-w-7">:</td>
            <td className="text-left">
              {isopenPlaceOfDischarge ? (
                <form
                  onSubmit={handlePlaceOfDischargeSubmit}
                  className="justify-center items-center flex  gap-2"
                >
                  <Input
                    type="text"
                    placeholder="PLACE OF DISCHARGE"
                    className=" mx-1"
                    value={inputValuePlaceOfDischarge}
                    onChange={(e) =>
                      setInputValuePlaceOfDischarge(e.target.value)
                    }
                    onBlur={() => {
                      setPlaceOfDischarge(
                        inputValuePlaceOfDischarge.toUpperCase()
                      );
                      setisopenPlaceOfDischarge(false);
                    }}
                  />
                  <Button variant="destructive" type="submit" className="w-fit">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="flex  gap-2">
                  <h1 className="  ">{PlaceOfDischarge}</h1>
                  <CiEdit
                    className="print-hide"
                    onClick={() => {
                      setisopenPlaceOfDischarge(true);
                      setInputValuePlaceOfDischarge(PlaceOfDischarge);
                    }}
                  />
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td className=" font-semibold pr-4">Time/Date of reporting</td>
            <td className=" min-w-7">:</td>
            <td className="text-left">
              {isopenDateTime ? (
                <form
                  onSubmit={handleDateTimeSubmit}
                  className="justify-center items-center flex  gap-2"
                >
                  <Input
                    type="text"
                    placeholder="SHIPPING COMPANY NAME"
                    className="uppercase mx-1"
                    value={inputValueDateTime}
                    onChange={(e) => setInputValueDateTime(e.target.value)}
                    onBlur={() => {
                      setDateTime(inputValueDateTime.toUpperCase());
                      setisopenDateTime(false);
                    }}
                  />
                  <Button variant="destructive" type="submit" className="w-fit">
                    Submit
                  </Button>
                </form>
              ) : (
                <div className="flex  gap-2">
                  <h1 className="  ">{DateTime}</h1>
                  <CiEdit
                    className="print-hide"
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
