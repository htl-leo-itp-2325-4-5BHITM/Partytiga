const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const csvFilePath = "./data/data.csv";

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.post("/write-csv", (req, res) => {
  const dataToWrite = req;
  console.log(dataToWrite);
  /*const csvData = dataToWrite
    .map(
      (event) =>
        `${event.eventName},${event.organizerName},${event.eventDate},${event.eventLocation}`
    )
    .join("\n");

  fs.writeFile(csvFilePath, csvData, (err) => {
    if (err) {
      console.error("Fehler beim Schreiben der CSV-Datei:", err);
      res.status(500).send("Fehler beim Schreiben der CSV-Datei");
    } else {
      console.log("Daten wurden in die CSV-Datei geschrieben.");
      res.send("Daten wurden erfolgreich in die CSV-Datei geschrieben.");
    }
  });*/
});

// Daten aus der CSV-Datei auslesen
app.get("/read-csv", (req, res) => {
  const dataRead = [];

  dataRead.push(fs.readFileSync(csvFilePath))

  res.send(JSON.stringify(dataRead))
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
