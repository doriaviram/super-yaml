import React, { useEffect, useState } from "react";
import "./App.scss";
import AceEditor from "react-ace";
import { ImArrowRight } from "react-icons/all";
import { compile } from "super-yaml";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-makefile";
import "ace-builds/src-noconflict/theme-chrome";

const DEFAULT_VALUE = `
_types:
  MyCoolType:
    properties:
        names:
            englishName: $name
            britishName: $name
        age: $age:25 # default value
CoolExample1<MyCoolType>:
  name: SuperYaml
CoolExample2<MyCoolType>:
  name: Syml
  age: 27

`;

function App() {
  const [yamlValue, setYamlValue] = useState<string>(DEFAULT_VALUE);
  const [compiledYamlValue, setCompiledYamlValue] = useState<string>(
    "Loading.."
  );

  useEffect(() => {
    try {
      setCompiledYamlValue(compile(yamlValue));
    } catch (e) {
      setCompiledYamlValue(e.message);
    }
  }, [yamlValue]);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Super-YAML
          <p>
            super-yaml is a tool that helps you write enhanced yaml's and
            compile them to regular yaml `.yml` files.
          </p>
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
          }}
        >
          <div>
            Input
            <AceEditor
              mode="yaml"
              theme="chrome"
              onChange={setYamlValue}
              name="yamlInput"
              editorProps={{ $blockScrolling: true }}
              value={yamlValue}
            />
          </div>
          <div>
            <ImArrowRight />
          </div>
          <div>
            Output
            <AceEditor
              readOnly={true}
              mode="yaml"
              theme="chrome"
              onChange={() => {}}
              name="yamlOutput"
              editorProps={{ $blockScrolling: true }}
              value={compiledYamlValue}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
