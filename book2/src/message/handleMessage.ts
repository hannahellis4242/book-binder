import axios from "axios";
import { addBook, findBookBySignatures } from "../database/books";
import Book from "../model/Book";
import Service from "../Service";

const handleCreate = (queue: Service) => async (message: any) => {
  const { signatures } = message;
  if (!signatures) {
    await axios.post(queue.url(), {
      message,
      created: false,
      reason: "no signatures given",
    });
    return;
  }
  const keyCount = signatures
    ? Object.keys(signatures)
        .map((_) => 1)
        .reduce((x, y) => x + y, 0)
    : 0;
  if (keyCount === 0) {
    await axios.post(queue.url(), {
      message,
      created: false,
      reason: "invalid signatures",
    });
    return;
  }
  const existing = await findBookBySignatures(signatures);
  console.log("existing :", existing);
  if (existing) {
    await axios.post(queue.url(), {
      message,
      created: false,
      reason: "already exists",
    });
    return;
  }
  const book = new Book(signatures);
  const bookId = await addBook(book);
  if (!bookId) {
    await axios.post(queue.url(), {
      message,
      created: false,
      reason: "server error",
    });
    return;
  }
  await axios.post(queue.url(), {
    created: true,
    id: bookId,
  });
};
const handleMessage = (queue: Service) => async (message: any) => {
  const handleCreateFn = handleCreate(queue);
  const { command } = message;
  if (!command) {
    axios.post(queue.url(), { message, error: "no command given" });
    return;
  }
  if (command === "create") {
    await handleCreateFn(message);
  }
};

export default handleMessage;
