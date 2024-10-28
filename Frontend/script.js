document.getElementById("todo-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite beim Absenden des Formulars
    newElement();
});

function newElement() {
    const task = document.getElementById("todo-input").value;
    const description = document.getElementById("todo-desc").value;

    if (task === "") {
        alert("Bitte geben Sie eine Aufgabe ein!");
        return;
    }

    // Neues Listenelement erstellen
    const li = document.createElement("li");
    li.className = "list-group-item";

    // Aufgaben- und Beschreibungs-Elemente hinzufügen
    const taskText = document.createElement("strong");
    taskText.textContent = task;

    const descriptionText = document.createElement("small");
    descriptionText.textContent = description;
    descriptionText.className = "d-block text-muted";

    // Elemente in das Listenelement einfügen
    li.appendChild(taskText);
    li.appendChild(descriptionText);

    // Eintrag zur Liste hinzufügen
    document.getElementById("ToDoListe").appendChild(li);

    // Eingabefelder zurücksetzen
    document.getElementById("todo-input").value = "";
    document.getElementById("todo-desc").value = "";
}
