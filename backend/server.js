// backend/server.js
const express = require('express');
const app = express();
const cors = require('cors'); // Ermöglicht die Kommunikation zwischen Frontend und Backend
const Aufgabe = require('./moduls/models/aufgabe'); // Importiere die Aufgabe-Klasse

app.use(cors()); // CORS aktivieren, um Anfragen von anderen Hosts zu erlauben (z.B. von `localhost:3000` zum `localhost:5500`)
app.use(express.json()); // JSON-Payloads verarbeiten
app.use(express.static('../Frontend'));

// Temporärer Speicher für Aufgaben (in-memory array)
let aufgabenListe = [];

// Route, um eine neue Aufgabe hinzuzufügen
app.post('/api/aufgabe', (req, res) => {
    const { name, beschreibung } = req.body;
    const neueAufgabe = new Aufgabe(name, beschreibung); // Erstelle eine neue Aufgabe-Instanz
    aufgabenListe.push(neueAufgabe); // Füge die neue Aufgabe zur Liste hinzu
    res.status(201).json(neueAufgabe); // Sende die neue Aufgabe als Antwort zurück
});

// Startseite aufrufen
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../Frontend/index.html');
});

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend-Server läuft unter http://localhost:${PORT}`);
});

// Route, um alle Aufgaben abzurufen
/*
app.get('/api/aufgaben', (req, res) => {
    res.json(aufgabenListe); // Gibt die Liste aller Aufgaben zurück
});
*/