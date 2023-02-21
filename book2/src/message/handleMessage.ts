import axios from "axios";
import { ObjectId } from "mongodb";
import {
  addBook,
  findBookByID,
  findBookByPages,
  findBookBySignatures,
} from "../database/books";
import Book from "../model/Book";
import Signatures from "../model/Signatures";
import Service from "../Service";
import { Create, Find, Pages } from "./Message";

const handleCreate = (queue: Service) => async (message: Create) => {
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
      created: false,
      id: existing._id,
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

const handleFindById = async (queue: Service, id: ObjectId) => {
  const result = await findBookByID(new ObjectId(id));
  if (result) {
    await axios.post(queue.url(), {
      result,
    });
  } else {
    await axios.post(queue.url(), {
      id,
    });
  }
};

const handleFindBySignatures = async (
  queue: Service,
  signatures: Signatures
) => {
  const result = await findBookBySignatures(signatures);
  if (result) {
    await axios.post(queue.url(), {
      result,
    });
  } else {
    await axios.post(queue.url(), {
      signatures,
    });
  }
};

const handleFindByPages = async (queue: Service, pages: Pages) => {
  const { equal, min, max } = pages;
  const result = equal
    ? await findBookByPages(equal, equal)
    : await findBookByPages(min, max);
  await axios.post(queue.url(), {
    pages,
    found: result.length,
    result,
  });
};

const handleFind = (queue: Service) => async (find: Find) => {
  const { id, signatures, pages } = find;
  if (id) {
    await handleFindById(queue, id);
    return;
  }
  if (signatures) {
    await handleFindBySignatures(queue, signatures);
    return;
  }
  if (pages) {
    await handleFindByPages(queue, pages);
    return;
  }
};

const handleMessage = (queue: Service) => async (message: any) => {
  const handleCreateFn = handleCreate(queue);
  const handleFindFn = handleFind(queue);
  const { create } = message;
  if (create) {
    await handleCreateFn(create);
    return;
  }
  const { find } = message;
  if (find) {
    await handleFindFn(find);
    return;
  }
};

export default handleMessage;
