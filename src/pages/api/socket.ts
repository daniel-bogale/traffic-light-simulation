const { Server } = require("socket.io");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const port = new SerialPort({ path: "/dev/ttyACM1", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
// Read the port data

let currentData = { turn: 0, delay: 0, cars: [] };
port.on("open", () => {
  console.log("serial port open");
});
// parser.on("data", (data: any) => {
//   if (data.split(",")[0] === "turn") {
//     currentData = {
//       ...currentData,
//       turn: +data.split(",")[1],
//       delay: +data.split(",")[2],
//     };
//   }
//   if (data.split(",")[0] === "cars") {
//     const [car, ...rest] = data.split(",");
//     currentData = {
//       ...currentData,
//       cars: rest.map((v: string) => +v),
//     };
//   }
//   console.log("got word from arduino:", data);
// });

export default async (req: any, res: any) => {
  try {
    if (res.socket.server.io) {
      console.log("Socket is already running");
    } else {
      console.log("Socket is initializing");
      const io = new Server(res.socket.server);
      res.socket.server.io = io;
      io.on("connection", (socket: any) => {
        console.log("client (connected)");
        parser.on("data", (data: any) => {
          if (data.split(",")[0] === "turn") {
            currentData = {
              ...currentData,
              turn: +data.split(",")[1],
              delay: +data.split(",")[2],
            };
          }
          if (data.split(",")[0] === "cars") {
            const [car, ...rest] = data.split(",");
            currentData = {
              ...currentData,
              cars: rest.map((v: string) => +v),
            };
          }
          socket.emit("updateData", currentData);
          console.log("got word from arduino:", data);
        });
      });
    }
    res.end();

    // res.status(200).json(currentData);
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ message: "Error communicating with Arduino" });
  }
};
