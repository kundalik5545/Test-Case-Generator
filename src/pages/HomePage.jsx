import AddAndDisplayTestCase from "@/components/TestCases/AddAndDisplayTestCase";
import AddNewTestCase from "@/components/TestCases/AddNewTestCase";
import React from "react";

function HomePage() {
  return (
    <div>
      <div className="main-Sec p-3 ">
        {/* <AddNewTestCase /> */}
        <AddAndDisplayTestCase />
      </div>
    </div>
  );
}

export default HomePage;
