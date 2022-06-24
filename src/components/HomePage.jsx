import React, { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import Editor from "@monaco-editor/react";
import axios from "axios";
const HomePage = () => {
  const [code, setCode] = useState(
    '#include<iostream>\nusing namespace std;\nint main(){\n  cout << "Hello World";\n  return 0;\n}'
  );
  const [output, setOutput] = useState("");

  //run code
  const runCode = async () => {
    try {
      await axios
        .post(process.env.REACT_APP_BACKEND_URL + "run", {
          code,
        })
        .then((res) => {
          console.log(res.data);
          setOutput(res.data.output);
        });
    } catch (err) {
      console.log(JSON.stringify(err));
      if (err.response) {
        console.log(err.response.data.err.stderr);
        setOutput(err.response.data.err.stderr);
      } else {
        console.log(err);
      }
    }
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
        <Editor
          height="100%"
          width="65%"
          language="cpp"
          value={code}
          theme="vs-dark"
          defaultLanguage="cpp"
          onChange={(value) => setCode(value)}
        />

        {/* output box */}
        <div className="flex flex-col w-[35%] bg-[#202020]">
          <textarea
            className="bg-inherit text-white resize-none w-[100%] h-[50%] pl-[0.5px] border-b-white border-b-2 "
            placeholder="input"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
          />
          <div className="bg-inherit w-[100%] text-white resize-none h-[50%] pl-[0.5px] outline-none text-[12px]">
            {output}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
