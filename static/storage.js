function saveNotes() {
  localStorage.setItem('quickNotes', JSON.stringify(notes))
}


async function initNotes() {
  setLoading(true);
  const notesContainer = document.getElementById('notesContainer');
  notesContainer.innerHTML = "";
  try {
    notes = await loadNotes();

    if (notes.length === 0) {
      showEmptyspace();
    } else {
      filteringNotes(notes);
    }
  } catch (err) {
    setErrorUI(err.message);
  } finally {
    setLoading(false);
  }
}

function setLoading(isloading) {
  const loading = document.getElementById("loading");
  if (isloading) {
    loading.style.display = 'block';
  } else {
    loading.style.display = "none";
  }
}

function setErrorUI(err) {
  const notesContainer = document.getElementById('notesContainer');
  
  
  
  notesContainer.innerHTML = ` <div id="error" class="error-container">
      <h3>Something went wrong</h3>
      <p>${err}</p>
      <button onclick="initNotes()">Retry</button>
    </div>
    `
}

function showEmptyspace(){
  const notesContainer = document.getElementById('notesContainer');
  notesContainer.innerHTML=`<div class="empty-container">
      <h3>No notes yet</h3>
      <p>Create your first note</p>
    </div>`
}

async function loadNotes() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
         if (Math.random() < 0.2) {
          throw new Error('Failed To Get The Notes')
        }

        const savedNotes = localStorage.getItem('quickNotes');
        const notes=savedNotes ? JSON.parse(savedNotes) : [];

        resolve(notes);
      } catch (err) {
        reject(err);
      }
    }, 800);

  })
}



