const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const csvFilePath = "./data/data.csv";

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
      res.send("Daten wurden erfolgreich in die CSV-Datei geschrieben.");
    }
  });
});

// Daten aus der CSV-Datei auslesen
app.get("/read-csv", (req, res) => {
  let isError = false;
  const dataRead = fs.readFileSync(csvFilePath, (err, data) => {
    if (err) {
      console.error("Fehler beim Lesen der CSV-Datei:", err);
      res.status(500).send("Fehler beim Lesen der CSV-Datei");
      isError = true;
    } else {
      console.log("Daten wurden von der CSV-Datei gelesen.");
      return data
    }
  });

  console.log(dataRead);
  if (!isError) res.send(JSON.stringify(dataRead));
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
