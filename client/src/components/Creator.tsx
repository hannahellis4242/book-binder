import { MouseEventHandler, useRef, useState } from "react";
import axios from "axios";

const Creator = () => {
  const [signatures, setSignatures] = useState<number[]>([]);
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
      .post(`http://${location.host}/book`, {
        signatures,
      })
      .then((res) => {
        const { signaturesID } = res.data;
        console.log(`id:${signaturesID}`);
        axios
          .get(`/book?id=${signaturesID}`)
          .then((res) => {
            setResult((_) => res.data.sequence.join(","));
            console.log(res);
          })
          .catch((err) => console.log("error getting : ", err));
      })
      .catch((err) => console.log("error : ", err));
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
        {signatures.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <button onClick={calculate}>calculate</button>
      <section>
        <header>result</header>
        <p>{result}</p>
      </section>
    </section>
  );
};
export default Creator;
