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

console.log(JSON.stringify({ "start up info": { incoming, outgoing } }));

const healthCheck = async () => {
  const url = `${incoming.url()}/status`;
  console.log(`checking connection to ${url}`);
  return axios
    .get(url)
    .then(() => true)
    .catch(() => false);
};

const start = async () => {
  const check = await healthCheck();
  if (!check) {
    console.log("could not connect to input queue");
    process.exit(1);
  }
  for (;;) {
    await axios
      .get(incoming.url())
      .then(({ data }) => data)
      .then(handleMessage(outgoing))
      .catch(() => {});
  }
};

start();
