import React from "react";

const Ship_Details = () => {
  return (
    <div className=" relative flex mt-2 text-left  w-full">
      <table className="">
        <tbody>
          <tr>
            <td className=" font-semibold pr-4">MOTHER VESSEL</td>
            <td className=" min-w-7">:</td>
            <td className="text-left">MV. VTC51662</td>
          </tr>
          <tr>
            <td className=" font-semibold pr-4">CARGO</td>
            <td className=" min-w-7">:</td>
            <td className="text-left">Rice</td>
          </tr>
          <tr>
            <td className=" font-semibold pr-4">Time/Date of reporting</td>
            <td className=" min-w-7">:</td>
            <td className="text-left">
              {new Date().toLocaleString("en-GB", {
                day: "numeric",
                year: "numeric",
                month: "numeric",
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Ship_Details;
