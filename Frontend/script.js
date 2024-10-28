document.getElementById("todo-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite beim Absenden des Formulars
    newElement();
});

function newElement() {
    const inputValue = document.getElementById("todo-input").value;
    if (inputValue === "") {
        alert("Bitte geben Sie eine Aufgabe ein!");
        return;
    }

    // Neues Listenelement erstellen
    const li = document.createElement("li");
    li.textContent = inputValue;
    li.className = "list-group-item";

    // Eintrag zur Liste hinzufügen
    document.getElementById("ToDoListe").appendChild(li);

    // Input-Feld zurücksetzen
    document.getElementById("todo-input").value = "";
}
