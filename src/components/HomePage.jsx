import React, { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import axios from "axios";

const HomePage = () => {
  const [code, setCode] = useState("ads");
  const [linesCount, setLinesCount] = useState(1);

  const runCode = async () => {
    try {
      await axios
        .post(process.env.REACT_APP_BACKEND_URL + "run", {
          code,
        })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      if (err.response) console.log(err.response.data.err);
    }
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    const lines = (code + "").split("\n");
    const count = lines.length;
    setLinesCount(count);
  };
  return (
    <div className="bg-[#202020] h-[100vh] w-[100vw] text-white">
      {/* Nav Bar} */}
      <div className="flex h-[50px]  items-center px-4 items  border-b-white border-b-[1px]">
        <button
          className="flex items-center text-lg py-1 bg-red-600 px-4 rounded-2xl hover:text-black"
          onClick={runCode}
        >
          <BsFillPlayFill />
          Run
        </button>
      </div>
      {/* Editor part */}
      <div className="h-[calc(100%-50px)] overflow-hidden flex">
        {/* side numbering panel */}
        <SideNumberingPanel n={linesCount} />
        {/*coding box */}
        <textarea
          className="bg-[#2e2e2e] text-white h-[100%] resize-none w-[70%] pl-[0.5px] outline-none text-[16px]"
          value={code}
          onChange={(e) => handleCodeChange(e)}
        />

        <div className="w-[5px] bg-white h-[100%]"></div>

        {/* output box */}
        <textarea className="bg-[#2e2e2e] w-[calc(30%-5px)] text-white h-[100%] resize-none" />
      </div>
    </div>
  );
};
const SideNumberingPanel = ({ n }) => {
  let numbers = [];
  for (let i = 0; i < n; i++) {
    numbers.push(i + 1);
  }
  return (
    <div className="w-[26px] h-[100%] bg-[#202020] text-[16px] items-center">
      {numbers.map((i) => (
        <div key={i} className="h-[24px]">
          {i}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
