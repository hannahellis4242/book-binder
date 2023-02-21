import Signatures from "../model/Signatures";

export interface Create {
  signatures: Signatures;
}

export interface Find {}

type Message = Create | Find;

export default Message;
