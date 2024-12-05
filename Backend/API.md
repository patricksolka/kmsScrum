
```markdown
# API-Dokumentation: Verwendung des Spring Boot Backends

## **1. Voraussetzungen**

Um das Backend zu starten, müssen folgende Anforderungen erfüllt sein:

- **Java 21**: Installieren und konfigurieren.
- **Maven**: Installieren und sicherstellen, dass es korrekt eingerichtet ist.

---

## **2. Backend starten**

1. Öffne die Konsole und navigiere in das Verzeichnis `Backend/`, in dem sich die Datei `pom.xml` befindet.
2. Führe folgenden Befehl aus, um den Server zu starten:

   ```bash
   mvn spring-boot:run

```

Nach dem Start ist das Backend standardmäßig unter `http://localhost:8080` verfügbar.

----------

## **3. Endpoints**

### **3.1 Registrierung**

**Methode:** `POST`  
**URL:** `http://localhost:8080/auth/register`  
**Request-Body (JSON):**

```json
{
    "firstName": "Valentin",
    "lastName": "Schwab",
    "email": "fasdasd@gmx.de",
    "password": "s"
}

```

----------

### **3.2 Anmeldung**

**Methode:** `POST`  
**URL:** `http://localhost:8080/auth/login`  
**Request-Body (JSON):**

```json
{
    "email": "fasdasd@gmx.de",
    "password": "s"
}

```

----------

## **4. Authentifizierung**

Nach erfolgreicher Anmeldung erhältst du ein JWT (JSON Web Token).  
Dieses Token wird benötigt, um auf alle geschützten Endpoints zuzugreifen.  
Das Token wird als **Bearer Token** in der HTTP-Header-Zeile `Authorization` übergeben:

**Header-Beispiel:**

```
Authorization: Bearer <JWT-Token>

```

----------

### **Hinweise:**

-   Ersetze `<JWT-Token>` durch das erhaltene Token aus der Anmeldung.
-   Falls das Token abläuft, ist eine erneute Anmeldung erforderlich, um ein neues Token zu generieren!

----------

## **5. Task-Endpoints**

### **5.1 Get Tasks by User**

**Methode:** `GET`  
**URL:** `http://localhost:8080/tasks`  
**Beschreibung:** Gibt alle vom angemeldeten Benutzer erstellten Tasks in Form eines JSON zurück.

----------

### **5.2 Create Task**

**Methode:** `POST`  
**URL:** `http://localhost:8080/tasks`  
**Request-Body (JSON):**

```json
{
  "title": "Neue Task",
  "description": "Neue Task.",
  "completed": false,
  "order": 1
}

```

**Beschreibung:**  
Erstellt eine neue To-Do-Task. Das Feld `order` muss vom Frontend angegeben werden und gibt die Reihenfolge der Tasks an.

----------

### **5.3 Update Task**

**Methode:** `PUT`  
**URL:** `http://localhost:8080/tasks/{id}`  
**Request-Body (JSON):**

```json
{
  "title": "Bearbeitete Task",
  "description": "Bearbeitete Task.",
  "completed": true
}

```

**Beschreibung:**  
Ändert die Felder `title`, `description` und `completed` einer bestehenden Task.

----------

### **5.4 Update Task Order**

**Methode:** `PUT`  
**URL:** `http://localhost:8080/tasks/reorder`  
**Request-Body (JSON):**

```json
[
  { "id": 1, "order": 5 },
  { "id": 2, "order": 2 }
]

```

**Beschreibung:**  
Ändert die Reihenfolge (`order`) von einer oder mehreren Tasks gleichzeitig.

----------

### **5.5 Delete Task**

**Methode:** `DELETE`  
**URL:** `http://localhost:8080/tasks/{id}`  
**Beschreibung:**  
Löscht die Task mit der angegebenen `id`.

----------

```
