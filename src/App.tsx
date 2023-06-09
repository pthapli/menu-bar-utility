import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { maxHeaderSize } from "http";
import { Column } from "./components/wrappers/column";
import { SingleInput } from "./components/single-input";
import { Row } from "./components/wrappers/row";
import { BashInput } from "./components/bash-command-input";

function App() {
  const [msg, setMsg] = useState("initial bero");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    // setGreetMsg(await invoke("greet"));

    console.log("greet ran");
    try {
      const response = await invoke("greet", { name: "mister B2" });
      console.log({ response });
      setMsg(response as string);
    } catch (error) {
      console.log("error bero");
    }
  }

  async function ungreet() {
    console.log("running ungreet");
    const response = await invoke("ungreet");

    setMsg(response as string);
  }
  async function runTestScript() {
    console.log("running test script");
    const response = await invoke("run_test_script", { name: "my_sql" });

    console.log({ response });
    setMsg(response as string);
  }

  //todo : make this dynamic as well
  async function freePort(port: number) {
    const response = await invoke("script_runner", { name: "free_port", port });
    setMsg(response as string);
  }

  async function startMySqlContainer() {
    const response = await invoke("script_runner", { name: "my_sql" });
    setMsg(response as string);
  }

  async function testFullCommand(port: number) {
    const response = await invoke("script_runner", {
      name: "full_script",
      port,
    });
    setMsg(response as string);
  }

  async function runBashCommand(command: string) {
    const response = await invoke("run_bash_command", {
      bashCommand: command,
    });
    setMsg(response as string);
  }

  return (
    <div className="menu-container row">
      <Column>
        {msg}
        {/* <button onClick={greet}>bero press me</button>
          <button onClick={ungreet}>bero press ungreet</button>
          <button onClick={runTestScript}>mysql bero</button> */}
        {/* <button onClick={freePort}>Free Port</button> */}
        <SingleInput
          buttonName="free"
          inputName="port"
          handleClick={freePort}
        />
        <SingleInput
          buttonName="bero"
          inputName="test-one"
          handleClick={startMySqlContainer}
        />

        <SingleInput
          buttonName="just_a_button"
          inputName="test-two"
          handleClick={testFullCommand}
        />

        <BashInput
          buttonName="Run bash command"
          inputName="test-bash-command"
          handleClick={runBashCommand}
        />
      </Column>
    </div>
  );
}

export default App;
