import { ObjectId } from "mongodb";
import Signatures from "../model/Signatures";

export interface Create {
  signatures?: Signatures;
}

export interface Pages {
  equal?: number;
  min?: number;
  max?: number;
}

export interface Find {
  id?: ObjectId;
  signatures?: Signatures;
  pages?: Pages;
}

type Message = Create | Find;

export default Message;
