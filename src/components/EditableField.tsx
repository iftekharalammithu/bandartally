import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CiEdit } from "react-icons/ci";

interface EditableFieldProps {
  initialValue: string;
  label?: string;
  placeholder: string;
  formatter?: (value: string) => string;
  displayAs?: "heading" | "paragraph";
  className?: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  initialValue,
  label,
  placeholder,
  formatter = (value) => value,
  displayAs = "paragraph",
  className = "",
}) => {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue(formatter(inputValue));
    setIsEditing(false);
  };

  const DisplayComponent = displayAs === "heading" ? "h1" : "p";

  return (
    <div className={`w-11/12 ${className}`}>
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="justify-center items-center flex flex-col gap-2"
        >
          {label && <label className="text-sm  text-gray-500">{label}</label>}
          <Input
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button variant="outline" type="submit" className="w-fit">
            Submit
          </Button>
        </form>
      ) : (
        <div
          className={`flex justify-center gap-2 items-center ${
            displayAs === "heading" ? "text-2xl font-semibold" : ""
          }`}
        >
          {label ? (
            <span className=" flex ">
              {label}:-
              <DisplayComponent className=" p-0 bdr text-left">
                {value}
              </DisplayComponent>
            </span>
          ) : (
            <DisplayComponent>{value}</DisplayComponent>
          )}

          <CiEdit
            onClick={() => {
              setIsEditing(true);
              setInputValue(value);
            }}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default EditableField;
