"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const Creator = () => {
    const [signatures, setSignatures] = (0, react_1.useState)([]);
    const [result, setResult] = (0, react_1.useState)("");
    const inputRef = (0, react_1.useRef)(null);
    const addSignature = (e) => {
        e.preventDefault();
        const input = inputRef.current;
        if (input) {
            setSignatures((cur) => cur.concat(parseInt(input.value)));
        }
    };
    const calculate = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        axios_1.default
            .post(`http://${location.host}/book`, {
            signatures,
        })
            .then((res) => {
            const { signaturesID } = res.data;
            axios_1.default
                .get(`/book?id=${signaturesID}`)
                .then((res) => {
                setResult((_) => res.data.sequence.join(","));
            })
                .catch((err) => console.log("error getting : ", err));
        })
            .catch((err) => console.log("error : ", err));
    });
    return (<section>
      <label htmlFor="sheets">sheets in signiture</label>
      <input ref={inputRef} id="sheets" type="number" min={1} defaultValue={4}></input>
      <button onClick={addSignature}>add</button>
      <ul>
        {signatures.map((s, i) => (<li key={i}>{s}</li>))}
      </ul>
      <button onClick={calculate}>calculate</button>
      <section>
        <header>result</header>
        <p>{result}</p>
      </section>
    </section>);
};
exports.default = Creator;
