import React, {useEffect, useState} from "react";
import logo from "./logo.svg";
import "./App.scss";
import AceEditor from "react-ace";
import {ImArrowRight} from "react-icons/all";
import {compile} from "super-yaml";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";

const DEFAULT_VALUE = `
@types:
  MyCoolType:
    properties:
      englishName: $name (expect name parameter)
      britishName: $name
      age: $age:25 (default value)
CoolExample1<MyCoolType>:
  name: SuperYaml
CoolExample2<MyCoolType>:
  name: Syml
  age: 27
`

function App() {
  const [yamlValue, setYamlValue] = useState<string>(DEFAULT_VALUE)
  const [compiledYamlValue, setCompiledYamlValue] = useState<string>("Loading..")

  useEffect(() => {
    setCompiledYamlValue(compile(yamlValue))
  }, [yamlValue])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div style={{display: "flex", justifyContent: "space-evenly", width:"100%"}}>
          <AceEditor
            mode="yaml"
            theme="github"
            onChange={setYamlValue}
            name="yamlInput"
            editorProps={{ $blockScrolling: true }}
            value={yamlValue}
          />
          <ImArrowRight/>
          <AceEditor
            readOnly={true}
            mode="yaml"
            theme="github"
            onChange={() => {}}
            name="yamlOutput"
            editorProps={{ $blockScrolling: true }}
            value={compiledYamlValue}
          />
        </div>

      </header>

    </div>
  );
}

export default App;
