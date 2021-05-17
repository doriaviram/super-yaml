import React, { useEffect, useState } from "react";
import "./App.scss";
import AceEditor from "react-ace";
import { ImArrowRight } from "react-icons/all";
import { compile } from "super-yaml";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-makefile";
import "ace-builds/src-noconflict/theme-chrome";

const DEFAULT_VALUE = `
_import:
 - ../common-types.syml

_types:
  MyCoolType:
    properties:
      englishName: $.name
      geoData:
        city: Jerusalem
        country: $.country:Israel
      welcomeMessage: Welcome $.{name}, Hello

CoolExample1<MyCoolType>:
  name: SuperYaml
CoolExample2<MyCoolType>:
  name: Syml
  country: Tel-Aviv


`;

function App() {
  const [yamlValue, setYamlValue] = useState<string>(DEFAULT_VALUE);
  const [compiledYamlValue, setCompiledYamlValue] =
    useState<string>("Loading..");

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
              width="650px"
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
              width="650px"
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
