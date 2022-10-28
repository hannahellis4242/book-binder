import { MouseEventHandler, useRef, useState } from "react";
import axios from "axios";

const Creator = () => {
  const [signitures, setSignatures] = useState<number[]>([]);
  const [result, setResult] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const addSignature: MouseEventHandler = (e) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input) {
      setSignatures((cur) => cur.concat(parseInt(input.value)));
    }
  };
  const calculate: MouseEventHandler = async (e) => {
    e.preventDefault();
    axios
      .post("http::/localhost:3000/book", {
        signitures: signitures.join(","),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  };
  return (
    <section>
      <label htmlFor="sheets">sheets in signiture</label>
      <input
        ref={inputRef}
        id="sheets"
        type="number"
        min={1}
        defaultValue={4}
      ></input>
      <button onClick={addSignature}>add</button>
      <ul>
        {signitures.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <button onClick={calculate}>calculate</button>
    </section>
  );
};
export default Creator;
