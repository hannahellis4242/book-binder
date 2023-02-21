import axios from "axios";
import handleMessage from "./message/handleMessage";
import Service, { getServiceFromEnv } from "./Service";

//queue service info
const incoming =
  getServiceFromEnv("IN_QUEUE_HOST", "IN_QUEUE_PORT") ||
  new Service("localhost", 6000);

const outgoing =
  getServiceFromEnv("OUT_QUEUE_HOST", "OUT_QUEUE_PORT") ||
  new Service("localhost", 6001);

const start = async () => {
  let count = 1000;
  for (;;) {
    if (count === 0) {
      count = 1000;
      console.log("polling", incoming.url(), "...");
    }
    count--;
    await axios
      .get(incoming.url())
      .then((message) => {
        console.log(message);
        return message;
      })
      .then(handleMessage(outgoing))
      .catch(() => {});
  }
};

start();
