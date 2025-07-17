"use client";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toTitleCase } from "@/lib/utils";

const Title = () => {
  const [title, settitle] = useState("ABC SHIPPING LINES LTD");
  const [isopenTitle, setisopenTitle] = useState(false);
  const [inputValueTitle, setInputValueTitle] = useState(title);

  const [address, setaddress] = useState(
    "185/188 Hakim mini super market 4th Floor, Stand Road Fakirhat Bandar,Chittagong"
  );
  const [isopenAddress, setisopenAddress] = useState(false);
  const [inputValueAddress, setInputValueAddress] = useState(address);

  const handleTitleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    settitle(inputValueTitle.toUpperCase());
    setisopenTitle(false);
  };

  const handleAddressSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setaddress(toTitleCase(inputValueAddress));
    setisopenAddress(false);
  };

  return (
    <div className="text-center items-center flex flex-col">
      <div className="w-11/12">
        {isopenTitle ? (
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
            <Button variant="outline" type="submit" className="w-fit">
              Submit
            </Button>
          </form>
        ) : (
          <div className="flex justify-center gap-2">
            <h1 className="font-lora text-2xl font-semibold">{title}</h1>
            <CiEdit
              onClick={() => {
                setisopenTitle(true);
                setInputValueTitle(title);
              }}
            />
          </div>
        )}
      </div>
      <div className="w-11/12 mt-2">
        {isopenAddress ? (
          <form
            onSubmit={handleAddressSubmit}
            className="justify-center items-center flex flex-col gap-2"
          >
            <Input
              type="text"
              placeholder="COMPANY ADDRESS"
              className="mx-1  "
              value={inputValueAddress}
              onChange={(e) => setInputValueAddress(e.target.value)}
            />
            <Button variant="outline" type="submit" className="w-fit">
              Submit
            </Button>
          </form>
        ) : (
          <div className="flex justify-center ">
            <p className="font-lora ">Address:- {address}</p>
            <CiEdit
              onClick={() => {
                setisopenAddress(true);
                setInputValueAddress(address);
              }}
            />
          </div>
        )}
      </div>
      <h2 className="font-lora font-bold underline mt-2">
        DAILY DISCHARGING REPORT
      </h2>
    </div>
  );
};

export default Title;
