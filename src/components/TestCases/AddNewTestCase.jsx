import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddNewTestCase() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const handleSelectChange = (value) => {
    setValue("select_option", value); // Set the selected value in react-hook-form
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="text-black space-y-2">
        <div>
          <Input
            {...register("test_case_Id", {
              required: "Test Case ID is required",
              minLength: { value: 5, message: "Minimum 5 characters required" },
            })}
            placeholder="Enter Test Case ID"
            type="text"
          />
          {errors.test_case_Id && (
            <p className="text-red-500">{errors.test_case_Id.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("test_title", {
              required: "Test Title is required",
              minLength: { value: 3, message: "Minimum 3 characters required" },
            })}
            placeholder="Enter Test Title"
            type="text"
          />
          {errors.test_title && (
            <p className="text-red-500">{errors.test_title.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("test_Description", {
              required: "Test Description is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters required",
              },
              maxLength: {
                value: 20,
                message: "Max char only 20",
              },
            })}
            placeholder="Enter Test Description"
            type="text"
          />
          {errors.test_Description && (
            <p className="text-red-500">{errors.test_Description.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("expected_result", {
              required: "Expected Result is required",
            })}
            placeholder="Expected Result"
            type="text"
          />
          {errors.expected_result && (
            <p className="text-red-500">{errors.expected_result.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("actual_result", {
              required: "Actual Result is required",
            })}
            placeholder="Actual Result"
            type="text"
          />
          {errors.actual_result && (
            <p className="text-red-500">{errors.actual_result.message}</p>
          )}
        </div>

        <div>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="XPS">XPS</SelectItem>
              <SelectItem value="Options">Options</SelectItem>
            </SelectContent>
          </Select>
          <input
            type="hidden"
            {...register("select_option", {
              required: "Selection is required",
            })}
          />
          {errors.select_option && (
            <p className="text-red-500">{errors.select_option.message}</p>
          )}
        </div>

        <div className="form-btn">
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
        </div>
      </form>
    </div>
  );
}

export default AddNewTestCase;
