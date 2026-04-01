 function togglePin(ID){
   if(!ID) return;//guard

   let note=notes.find(n=>n.id==ID)
   if(!note) return;//guard

   note.pinned=!note.pinned

   saveNotes();
   filteringNotes();
 }
 function permanentlyDelete(id){
   if(!id)return

   notes=notes.filter(n=>n.id !== id)

   saveNotes();
   filteringNotes();
 }



function restoreNote(ID){
  if(!ID) return;

  let n=notes.find(note=>{
    return note.id===ID
  })
  if(!n) return;

  n.archived=false;

  saveNotes();
  filteringNotes();
}


function archiveNote(noteId){
  if(!noteId) return;//guard


  let archive=notes.find(n=>n.id===noteId);
  if(!archive||archive.archived===true){return}
  else{
    archive.archived=true;
  }

  if(undoTimer){
    clearTimeout(undoTimer);
  }

  lastArchiveNoteId=noteId;

  undoTimer=setTimeout(()=>{
    undoTimer=null;
    lastArchiveNoteId=null;
    hideToast();
  },5000)

  saveNotes();
  filteringNotes();
  showUndoToast();
}


function filteringNotes(){
  let filterNotes=[]; 
  
  if(activeview==='home'){
    filterNotes=notes.filter(note=>!note.archived)
  }else{
    filterNotes=notes.filter(note=>note.archived)
  }
  
  
  if(activeCategory!=='all'){
    filterNotes=filterNotes.filter(note=>note.category===activeCategory);
  }

  
  if(!searchQuery.trim()){
    renderNotes(filterNotes);
    return;
  }else{
    filterNotes=filterNotes.filter(note =>note.title.toLowerCase().includes(searchQuery)||note.content.toLowerCase().includes(searchQuery));
    
  }
   if(filterNotes.length===0){
    showToast('No matching notes found');
    document.querySelector('#pinnedSection').style.display='none';
    document.querySelector('#notesContainer').innerHTML=`<div class='no-notes'>No Notes Found</div>`
    return;
   }else{
    renderNotes(filterNotes);
   }
}

function undoNotes(){
  if(!lastArchiveNoteId)return;

  let note=notes.find(n=>n.id===lastArchiveNoteId);
  if(!note) return;

  note.archived=false;

  clearTimeout(undoTimer)
  undoTimer=null;
  lastArchiveNoteId=null;

  if(toastTimer){
    clearTimeout(toastTimer);
    toastTimer=null;
  }

  saveNotes();
  filteringNotes();
}


function saveNote(event){
  event.preventDefault()

  const Title=document.getElementById('noteTitle').value.trim();
  const Content=document.getElementById('noteContent').value.trim();

  if(!Title || !Content){
  showToast("Title & content cannot be empty");
  return;
  }

  if(editingNoteId !== null){
    const noteIndex = notes.findIndex(note =>note.id === editingNoteId)
    if(noteIndex===-1){
      showToast('Note No longer Exist');
      editingNoteId=null;
      closeNoteDialog();
      return
    }
    
      notes[noteIndex]={
      ...notes[noteIndex],
      title: Title,
      content: Content,
      category:changeCategory,
      }
      editingNoteId=null;
  

  }else{
      notes.unshift({
        id: generateId(),
        title: Title,
        content: Content,
        pinned: false,
        createdAt:Date.now(),
        category:changeCategory,
        archived:false
      })
  }



  
  closeNoteDialog();
  saveNotes();
  filteringNotes();
}

