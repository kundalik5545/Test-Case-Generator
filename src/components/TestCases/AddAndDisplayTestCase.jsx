import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import * as XLSX from "xlsx";

function AddAndDisplayTestCase() {
  const [testCases, setTestCases] = useState([]);
  const [currentTestCase, setCurrentTestCase] = useState({
    tc_name: "",
    tc_description: "",
    tc_expected_result: "",
    tc_actual_result: "",
    tc_Client: "",
    tc_Status: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Load data from local storage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("testCases");
    if (storedData) {
      setTestCases(JSON.parse(storedData));
    }
  }, []);

  // Save data to local storage whenever testCases changes
  useEffect(() => {
    localStorage.setItem("testCases", JSON.stringify(testCases));
  }, [testCases]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCurrentTestCase((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectClient = (value) => {
    setCurrentTestCase((prevData) => ({ ...prevData, tc_Client: value }));
  };

  const handleSelectStatus = (value) => {
    setCurrentTestCase((prevData) => ({ ...prevData, tc_Status: value }));
  };

  const handleAddTestCase = () => {
    if (
      currentTestCase.tc_name &&
      currentTestCase.tc_description &&
      currentTestCase.tc_expected_result &&
      currentTestCase.tc_actual_result &&
      currentTestCase.tc_Client &&
      currentTestCase.tc_Status
    ) {
      if (editIndex !== null) {
        const updatedTestCases = [...testCases];
        updatedTestCases[editIndex] = currentTestCase;
        setTestCases(updatedTestCases);
        setEditIndex(null);
      } else {
        setTestCases((prevData) => [...prevData, currentTestCase]);
      }

      setCurrentTestCase({
        tc_name: "",
        tc_description: "",
        tc_expected_result: "",
        tc_actual_result: "",
        tc_Client: "",
        tc_Status: "",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleReset = () => {
    setCurrentTestCase({
      tc_name: "",
      tc_description: "",
      tc_expected_result: "",
      tc_actual_result: "",
      tc_Client: "",
      tc_Status: "",
    });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };

  const handleEdit = (index) => {
    setCurrentTestCase(testCases[index]);
    setEditIndex(index);
  };
  const exportToExcel = () => {
    if (testCases.length === 0) {
      alert("No test cases to export!");
      return;
    }

    // Create a worksheet and a workbook
    const worksheet = XLSX.utils.json_to_sheet(testCases);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TestCases");

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "TestCases.xlsx");
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Ensure the JSON data matches the required format
        const formattedData = jsonData.map((row) => ({
          tc_name: row.tc_name || "",
          tc_description: row.tc_description || "",
          tc_expected_result: row.tc_expected_result || "",
          tc_actual_result: row.tc_actual_result || "",
          tc_Client: row.tc_Client || "",
          tc_Status: row.tc_Status || "",
        }));
        setTestCases((prevData) => [...prevData, ...formattedData]);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <div className="main-sec space-y-3 mt-3 shadow-lg p-3 w-[700px]">
        <div className="test_inputs w-[600px] space-y-3">
          <Input
            name="tc_name"
            value={currentTestCase.tc_name}
            onChange={handleOnChange}
            placeholder="Enter Test Case Name"
          />
          <Input
            name="tc_description"
            value={currentTestCase.tc_description}
            onChange={handleOnChange}
            placeholder="Enter Test Case Description"
          />
          <Input
            name="tc_expected_result"
            value={currentTestCase.tc_expected_result}
            onChange={handleOnChange}
            placeholder="Enter Expected Result"
          />
          <Input
            name="tc_actual_result"
            value={currentTestCase.tc_actual_result}
            onChange={handleOnChange}
            placeholder="Enter Actual Result"
          />
        </div>

        <div className="client flex items-center space-x-2">
          <Label>Select Client:</Label>
          <Select
            value={currentTestCase.tc_Client}
            onValueChange={handleSelectClient}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="XPS">XPS</SelectItem>
              <SelectItem value="Options">Options</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="test_status flex items-center space-x-2">
          <Label>Select Status:</Label>
          <Select
            value={currentTestCase.tc_Status}
            onValueChange={handleSelectStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pass">Pass</SelectItem>
              <SelectItem value="Fail">Fail</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="main-sec-btn space-x-2">
          <Button onClick={handleAddTestCase}>
            {editIndex !== null ? "Update" : "Add"}
          </Button>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
      <div className="excel flex space-x-2 shadow-sm p-3 pt-5">
        <Input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleExcelUpload}
          className="w-80"
        />
        <Button onClick={exportToExcel}>Export to Excel</Button>
      </div>
      <div className="result_table mt-5">
        <table className="table-auto border-collapse border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">TC Name</th>
              <th className="border border-gray-300 px-4 py-2">
                TC Description
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Expected Result
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Actual Result
              </th>
              <th className="border border-gray-300 px-4 py-2">Client</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testCases.length > 0 ? (
              testCases.map((test, index) => (
                <tr key={index}>
                  <td className=" w-2/12 border border-gray-300 px-4 py-2">
                    {test.tc_name}
                  </td>
                  <td className=" w-2/12 border border-gray-300 px-4 py-2">
                    {test.tc_description}
                  </td>
                  <td className=" w-2/12 border border-gray-300 px-4 py-2">
                    {test.tc_expected_result}
                  </td>
                  <td className=" w-2/12 border border-gray-300 px-4 py-2">
                    {test.tc_actual_result}
                  </td>
                  <td className=" w-1/12 border border-gray-300 px-4 py-2">
                    {test.tc_Client}
                  </td>
                  <td className=" w-1/12 border border-gray-300 px-4 py-2">
                    {test.tc_Status}
                  </td>
                  <td className="w-1/12 border border-gray-300 px-4 py-2 space-y-2">
                    <Button onClick={() => handleEdit(index)}>Edit</Button>
                    <Button
                      onClick={() => handleDelete(index)}
                      className="ml-2"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-2">
                  No test cases added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddAndDisplayTestCase;
