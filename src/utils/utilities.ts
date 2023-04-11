import { Readable } from "stream";

// Function to convert buffer to readable stream
export function bufferToStream(buffer: Buffer) {
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    return readableStream;
  }