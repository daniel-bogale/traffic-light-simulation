// const { SerialPort } = require("serialport");
// const { ReadlineParser } = require("@serialport/parser-readline");
// const portName = "/dev/ttyACM0";
// const myPort = new SerialPort({ path: portName, baudRate: 9600 });
// const parser = myPort.pipe(new ReadlineParser({ delimiter: "\n" }));

// let turn = 0;
// let delay = 0;

// myPort.on("open", () => {
//   console.log("Serial myPort Opened");
// });

// parser.on("data", (data) => {
//   console.log(`Received data from Arduino: ${data}`);
//   // Parse the received data
//   const [receivedTurn, receivedDelay] = data.split(",");
//   turn = parseInt(receivedTurn, 10);
//   delay = parseInt(receivedDelay, 10);
//   console.log(`Parsed turn: ${turn}, delay: ${delay}`);
// });

// async function communicateWithArduino() {
//   return new Promise((resolve, reject) => {
//     myPort.write("readEEPROM\n", (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log("Requesting EEPROM data");
//         // Wait for a short period to ensure data is received
//         setTimeout(() => {
//           resolve({ turn, delay });
//           // Close the serial myPort after resolving the promise
//           myPort.close((err) => {
//             if (err) {
//               console.error("Error closing serial port:", err);
//             } else {
//               console.log("Serial port closed");
//             }
//           });
//         }, 500);
//       }
//     });
//   });
// }

// export default async (req, res) => {
//   try {
//     if (req.method === "GET") {
//       const { turn, delay } = await communicateWithArduino();
//       console.log("Sending response with turn and delay:", turn, delay);
//       res.status(200).json({ turn, delay });
//     } else {
//       res.status(405).json({ message: "Method not allowed" });
//     }
//   } catch (error) {
//     console.error("Error communicating with Arduino:", error);
//     res.status(500).json({ message: "Error communicating with Arduino" });
//   }
// };

// myPort.on("open", onOpen);
// myPort.on("data", onData);

// function onOpen() {
//   console.log("Open connection");
// }
// function onData(data) {
//   console.log("on Data", data);
// }

const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const port = new SerialPort({ path: "/dev/ttyACM0", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
// Read the port data
let turnData = { turn: 0, delay: 0 };
port.on("open", () => {
  console.log("serial port open");
});
parser.on("data", (data) => {
  console.log("***", data);
  if (data.split(",")[0] === "turn") {
    turnData = {
      turn: +data.split(",")[1],
      delay: +data.split(",")[2],
    };
  }
  console.log("got word from arduino:", data);
});

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      // const { turn, delay } = await communicateWithArduino();
      //   console.log("Sending response with turn and delay:", turn, delay);
      res.status(200).json(turnData);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error communicating with Arduino:", error);
    res.status(500).json({ message: "Error communicating with Arduino" });
  }
};
