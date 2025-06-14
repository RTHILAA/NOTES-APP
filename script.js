let addBtn = document.querySelector("#addBtn");
let newNote = document.querySelector(".newNote");
let cancel = document.querySelector("#cancel");
let titleNote = document.querySelector("#titleNote");
let writeNote = document.querySelector("#writeNote");
let save = document.querySelector("#save");
let notes = document.querySelector(".notes");
let search = document.querySelector("#search-input");

let update = null;
let notesList = JSON.parse(localStorage.getItem("notes")) || [];

function saveToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(notesList));
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

const bgColors = [
  "#E0F7FA", "#FFF3E0", "#F1F8E9", "#EDE7F6", "#FCE4EC",
  "#FFEBEE", "#E3F2FD", "#FFFDE7", "#E8F5E9", "#F3E5F5"
];

function getRandomColor() {
  return bgColors[Math.floor(Math.random() * bgColors.length)];
}

function createNoteElement(note, index) {
  let box = document.createElement("div");
  box.className = "box";
  box.style.backgroundColor = getRandomColor(); 
  box.style.padding = "15px";
  box.style.borderRadius = "10px";
  box.style.marginBottom = "10px";
  notes.appendChild(box);

  let h3 = document.createElement("h3");
  h3.style.color = "#2563EB";
  h3.textContent = note.title;
  box.appendChild(h3);

  let p = document.createElement("p");
  p.textContent = note.content;
  box.appendChild(p);

  // ⏰ Date & time
  let time = document.createElement("small");
  time.innerHTML = `<i class="fa-regular fa-clock" style="color:#2563EB; font-size:14px; margin-right:5px;"></i>${formatDateTime(note.timestamp)}`;
  time.style.color = "#2563EB";
  time.style.display = "block";
  time.style.marginTop = "8px";
  box.appendChild(time);

  let updateDelete = document.createElement("div");
  updateDelete.className = "update-delete";
  updateDelete.style.marginTop = "10px";
  box.appendChild(updateDelete);

  let updateBtn = document.createElement("i");
  updateBtn.className = "fa-solid fa-pen-to-square";
  updateDelete.appendChild(updateBtn);

  let deleteBtn = document.createElement("i");
  deleteBtn.className = "fa-solid fa-trash-can";
  updateDelete.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    box.remove();
    notesList.splice(index, 1);
    saveToLocalStorage();
    renderNotes();
  });

  updateBtn.addEventListener("click", () => {
    titleNote.value = note.title;
    writeNote.value = note.content;
    newNote.style.display = "flex";
    save.textContent = "Update";
    update = index;
  });
}

function renderNotes() {
  notes.innerHTML = "";
  notesList
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .forEach((note, i) => createNoteElement(note, i));
}

renderNotes();

addBtn.addEventListener("click", () => {
  newNote.style.display = "flex";
});

cancel.addEventListener("click", () => {
  newNote.style.display = "none";
  titleNote.value = "";
  writeNote.value = "";
  save.textContent = "Save";
  update = null;
});

save.addEventListener("click", () => {
  if (titleNote.value.length > 0 && writeNote.value.length > 0) {
    const note = {
      title: titleNote.value,
      content: writeNote.value,
      timestamp: new Date().toISOString(),
    };

    if (update !== null) {
      notesList[update] = note;
      update = null;
      save.textContent = "Save";
    } else {
      notesList.push(note);
    }

    saveToLocalStorage();
    renderNotes();

    titleNote.value = "";
    writeNote.value = "";
    newNote.style.display = "none";
  }
});

writeNote.addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    titleNote.value.length > 0 &&
    writeNote.value.length > 0
  ) {
    e.preventDefault();
    save.click();
  }
});

titleNote.addEventListener("keydown", (e) => {
  if (
    e.key === "Enter" &&
    titleNote.value.length > 0 &&
    writeNote.value.length > 0
  ) {
    e.preventDefault();
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
