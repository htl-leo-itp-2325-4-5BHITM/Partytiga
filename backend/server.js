const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const csvFilePath = "./data/data.csv";

const { parse } = require("csv-parse");

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post("/write-csv", (req, res) => {
  const dataToWrite = req.body;
  console.log(dataToWrite);

  const csvData = `${dataToWrite.eventName},${dataToWrite.organizerName},${dataToWrite.eventDate},${dataToWrite.eventLocation}\n`;

  console.log(csvData);

  fs.appendFile(csvFilePath, csvData, (err) => {
    if (err) {
      console.error("Fehler beim Schreiben der CSV-Datei:", err);
      res.status(500).send("Fehler beim Schreiben der CSV-Datei");
    } else {
      console.log("Daten wurden in die CSV-Datei geschrieben.");
      res
        .status(200)
        .send("Daten wurden erfolgreich in die CSV-Datei geschrieben.");
    }
  });
});

// Daten aus der CSV-Datei auslesen
app.get("/read-csv", (req, res) => {
  try {
    const fileData = fs.readFileSync(csvFilePath, "utf8");
    const data = [];

    csv({
      mapHeaders: ({ header, index }) => header.trim(),
    })
      .on("data", (row) => {
        data.push(row);
      })
      .write(fileData);
    console.log(data);
    res.send({ data: data });
  } catch (error) {
    console.error("Fehler beim Lesen der CSV-Datei:", error);
    return null;
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
