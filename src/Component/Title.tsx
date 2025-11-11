"use client";
import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toTitleCase } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Title = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Title
  const [title, setTitle] = useState("");
  const [isOpenTitle, setIsOpenTitle] = useState(false);
  const [inputValueTitle, setInputValueTitle] = useState("");

  // Address
  const [address, setAddress] = useState("");
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [inputValueAddress, setInputValueAddress] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const storedTitle =
      localStorage.getItem("shippingCompanyName") || "ABC SHIPPING LINES LTD";
    const storedAddress =
      localStorage.getItem("companyAddress") ||
      "185/188 Hakim mini super market 4th Floor, Stand Road Fakirhat Bandar, Chittagong";

    setTitle(storedTitle);
    setAddress(storedAddress);
    setInputValueTitle(storedTitle);
    setInputValueAddress(storedAddress);
    setIsLoading(false);
  }, []);

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTitle = inputValueTitle.trim().toUpperCase();
    setTitle(newTitle);
    localStorage.setItem("shippingCompanyName", newTitle);
    setIsOpenTitle(false);
  };

  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAddress = toTitleCase(inputValueAddress.trim());
    setAddress(newAddress);
    localStorage.setItem("companyAddress", newAddress);
    setIsOpenAddress(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 flex gap-2 animate-pulse">
          <Loader2 className=" animate-spin"></Loader2>
          Loading company info...
        </p>
      </div>
    );
  }

  return (
    <div className="text-center items-center flex flex-col">
      <style>
        {`
          @media print {
            .print-hide {
              display: none !important;
            }
          }
        `}
      </style>

      {/* SHIPPING COMPANY NAME */}
      <div className="w-11/12">
        {isOpenTitle ? (
          <form
            onSubmit={handleTitleSubmit}
            className="justify-center items-center flex flex-col gap-2"
          >
            <Input
              type="text"
              placeholder="SHIPPING COMPANY NAME"
              className="uppercase mx-1"
              value={inputValueTitle}
              onChange={(e) => setInputValueTitle(e.target.value)}
            />
            <Button variant="destructive" type="submit" className="w-fit">
              Submit
            </Button>
          </form>
        ) : (
          <div className="flex justify-center gap-2">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <CiEdit
              className="print-hide cursor-pointer"
              onClick={() => {
                setIsOpenTitle(true);
                setInputValueTitle(title);
              }}
            />
          </div>
        )}
      </div>

      {/* COMPANY ADDRESS */}
      <div className="w-fit mt-2">
        {isOpenAddress ? (
          <form
            onSubmit={handleAddressSubmit}
            className="justify-center min-w-2xl items-center flex flex-col gap-2"
          >
            <Input
              type="text"
              placeholder="COMPANY ADDRESS"
              className="mx-1"
              value={inputValueAddress}
              onChange={(e) => setInputValueAddress(e.target.value)}
            />
            <Button variant="destructive" type="submit" className="w-fit">
              Submit
            </Button>
          </form>
        ) : (
          <div className="flex justify-center gap-2">
            <p>Address: {address}</p>
            <CiEdit
              className="w-4 h-4 print-hide cursor-pointer"
              onClick={() => {
                setIsOpenAddress(true);
                setInputValueAddress(address);
              }}
            />
          </div>
        )}
      </div>

      <h2 className="font-bold underline underline-offset-4 mt-2">
        DAILY DISCHARGING REPORT
      </h2>
    </div>
  );
};

export default Title;
