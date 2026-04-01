function renderNotes(filteredNotes) {
  const notesContainer = document.getElementById('notesContainer');
  const pinnedNotesContainer = document.getElementById('pinnedNotesContainer');
  const hidePinned = document.getElementById('pinnedSection');
  const data = filteredNotes || notes;
  if (data.length === 0) {
    notesContainer.innerHTML = `<p class='no-notes'>No notes found</p>`;
    pinnedNotesContainer.innerHTML = '';
    hidePinned.style.display = 'none';
    return;
  }


  if (activeview === 'home') {
    const pinnedNotes =[];
    const unpinnedNotes = [];

    data.forEach(note=> {
      if(note.pinned)pinnedNotes.push(note);
      else unpinnedNotes.push(note);
    });

    hidePinned.style.display = pinnedNotes.length ? "block" : "none";
    pinnedNotesContainer.innerHTML = pinnedNotes.map((note, index) => createNoteCard(note, index)).join('')


    notesContainer.innerHTML = unpinnedNotes.map(createNoteCard).join('')
  } else {
    hidePinned.style.display = 'none';
    pinnedNotesContainer.innerHTML='';
    notesContainer.innerHTML = data.map((note, index) => createNoteCard(note, index)).join('')
  }

}



function createNoteCard(note, index = 0) {
  let actionHTML = "";
  if (activeview === "home") {
    actionHTML = `<button class="pin-btn" data-id="${note.id}">
        ${note.pinned ? unpin : pin}
       </button> 
    
      <button class="delete-btn" data-id="${note.id}" title="Delete Note">
  
            <svg fill="#ffffff" width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

            <g id="SVGRepo_iconCarrier">

            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/>

            </g>

            </svg>
      </button>`
  } else {
    actionHTML = `<button class="restore-btn" data-id="${note.id}" >
  
<svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="15px" height="15px" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16c-2.05 0-3.81-1.24-4.58-3h1.71c.63.9 1.68 1.5 2.87 1.5 1.93 0 3.5-1.57 3.5-3.5S13.93 9.5 12 9.5c-1.35 0-2.52.78-3.1 1.9l1.6 1.6h-4V9l1.3 1.3C8.69 8.92 10.23 8 12 8c2.76 0 5 2.24 5 5s-2.24 5-5 5z"/></svg>
  </button>


      <button class="delete-btn" data-id="${note.id}" title="Delete Note">
        
            <svg fill="#ffffff" width="15px" height="15px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

            <g id="SVGRepo_iconCarrier">

            <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/>

            </g>

            </svg>
      </button>`
  }


  return `
    <div class="note-card ${note.category}" data-id="${note.id}"style="animation-delay: ${index * 50}ms" data-category="${note.category}">
    <div class="note-inner">
      <div class="noteHead">
        <h3 class="note-title">${highlightText(note.title, searchQuery)}</h3>
        <div class="note-action">${actionHTML}</div>
      </div>
      <div class="note-content">${highlightText(note.content, searchQuery)}</div>
    </div>
    </div>
  `;
}



function highlightText(text, query) {
  if (!query||!query.trim()) {
    return text;
  }
  const safeQueryText = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(safeQueryText, "gi");
  const updatedText = text.replace(pattern, match => `<mark>${match}</mark>`);
  return updatedText;
}



