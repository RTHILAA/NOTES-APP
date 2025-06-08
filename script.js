let addBtn = document.querySelector("#addBtn");
let newNote = document.querySelector(".newNote");
let cancel = document.querySelector("#cancel");
let titleNote = document.querySelector("#titleNote");
let writeNote = document.querySelector("#writeNote");
let save = document.querySelector("#save");
let notes = document.querySelector(".notes");
let search = document.querySelector("#search-input");

addBtn.addEventListener("click", () => {
  newNote.style.display = "flex";
});

cancel.addEventListener("click", () => {
  newNote.style.display = "none";
});

save.addEventListener("click", () => {
  if (titleNote.value.length > 0 && writeNote.value.length > 0) {
    let box = document.createElement("div");
    box.className = "box";
    notes.appendChild(box);

    let h3 = document.createElement("h3");
    h3.style.color = "#2563EB";
    h3.textContent = titleNote.value;
    box.appendChild(h3);

    let p = document.createElement("p");
    p.textContent = writeNote.value;
    box.appendChild(p);

    titleNote.value = "";
    writeNote.value = "";
    newNote.style.display = "none";

    let deleteBtn = document.createElement("i");
    deleteBtn.className = "fa-solid fa-trash-can";
    box.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
      box.remove();
    });
  }
});

writeNote.addEventListener("keydown", (e) => {
  if ( e.key === "Enter" && titleNote.value.length > 0 && writeNote.value.length > 0 ) {
    save.click();
  }
});

search.addEventListener("input", () => {
  let searchV = search.value.toLowerCase();
  let boxes = document.querySelectorAll(".box");
  boxes.forEach((note) => {
    let title = note.textContent.toLowerCase();
    if (title.includes(searchV)) {
      note.style.display = "flex";
    } else {
      note.style.display = "none";
    }
  });
});
