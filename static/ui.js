function showUndoToast(){
  let toast=document.getElementById('toast');
  let msg=document.getElementById('toastMsg');
  let undoBtn=document.getElementById('undoBtn');

  if(toastTimer) clearTimeout(toastTimer);

  msg.textContent='Note Archived';
  undoBtn.style.display='inline-block';

  toast.classList.add('show');

  undoBtn.onclick=function(){
    undoNotes();
    hideToast();
  }

}

function hideToast(){
   let toast=document.getElementById('toast');
   let undoBtn=document.getElementById('undoBtn');

   if(toastTimer){
    clearTimeout(toastTimer)
    toastTimer=null
   }

   toast.classList.remove('show');
   undoBtn.style.display='none';
}


function removeCategory(){
  document.getElementById('noteDialog').classList.remove('work','study','personal','idea','other')
}


function viewStyle(){if(activeview==='archive'){
    document.getElementById('homeFooter').classList.remove('active')
    document.getElementById('archivedFooter').classList.add('active')
  }else{
    document.getElementById('archivedFooter').classList.remove('active')
    document.getElementById('homeFooter').classList.add('active')
  }}

function generateId(){
  return Date.now().toString()
}






function openConfirm(id){
  let message=document.getElementById('confirmDialog');
  if(activeview==='home'){
    message.innerHTML=` <div class="confirm-card">
        <p>Are you sure you want to delete this note? this note will be archived</p>
        <div id="confirmButtons">
        <button id="cancelBtn" onclick="cancleDelete()">Cancel</button>
        <button id="deleteConfirm">Delete</button></div>
    </div>`
    
  }else{
    message.innerHTML=`
      <div class="confirm-card">
        <p>Are you sure you want to permanently Delete the note</p>
        <div id="confirmButtons">
        <button onclick="cancleDelete()" id="cancelBtn">Cancel</button>
        <button id="deleteConfirm">permanently Delete</button></div>
      </div>
    `
  }
    noteToArchive=id;
    message.showModal()
    document.getElementById('deleteConfirm').onclick=function(){

    if(activeview==='home'){
      archiveNote(noteToArchive);
    }else if(activeview==='archive'){
      permanentlyDelete(noteToArchive)
    }
    noteToArchive=null;
    document.getElementById('confirmDialog').close();
  }
}

function cancleDelete(){
  document.getElementById('confirmDialog').close();
}


 function openNoteDialog(noteId = null){
   const dialog=document.getElementById('noteDialog');
   const titleInput=document.getElementById('noteTitle');
   const contentInput=document.getElementById('noteContent');
   let dynamicButton=document.querySelector('.cancel-btn');
     if(noteId){
     
     const noteToEdit =notes.find(note => note.id == noteId)
     editingNoteId=noteId
     document.getElementById('dialogTitle').textContent ='Edit Note'
     dynamicButton.textContent='Discard';
     changeCategory=noteToEdit.category
     removeSelectCategory()
     const dialog = document.getElementById('noteDialog');

     dialog.querySelector(`[data-category="${changeCategory}"]`)?.classList.add('selected');
     titleInput.value =noteToEdit.title
     contentInput.value=noteToEdit.content
     dialog.classList.add('edit')
   }else{
     removeSelectCategory();
     dialog.classList.remove('edit')
     editingNoteId=null
     document.getElementById('dialogTitle').textContent='Add New Note'
     titleInput.value=''
     contentInput.value=''
     changeCategory='other'
   }
   dialog.showModal();
   titleInput.focus();
 }




function closeNoteDialog(){
  document.getElementById('noteDialog').close();
}

function toggleTheme(){
 const isDark= document.body.classList.toggle('dark-theme');
 localStorage.setItem('theme',isDark ? 'dark' : 'light');
 document.getElementById('themeToggleBtn').innerHTML= isDark ? sun: moon;
}

function applyStoredTheme(){
  let savedTheme=localStorage.getItem('theme');
  let themeBtn=document.getElementById('themeToggleBtn');

  if(savedTheme==='dark'){
    document.body.classList.add('dark-theme');
    themeBtn.innerHTML=sun
  }else{
    themeBtn.innerHTML=moon
  }
}
function removeActive(){
  let sortingTags=document.querySelectorAll('.sorting-tags');
  sortingTags.forEach(tag=>tag.classList.remove('active'))
}
function removeSelectCategory(){
  const dialog = document.getElementById('noteDialog');

  dialog.querySelectorAll('.category').forEach(tag =>
    tag.classList.remove('selected')
  );
}

function showToast(message){
  if(lastArchiveNoteId)return;

  const toast = document.getElementById('toast');
  let msg=document.getElementById('toastMsg');
  let undoBtn=document.getElementById('undoBtn');

  if(toastTimer) clearTimeout(toastTimer);

  undoBtn.style.display='none';
  msg.textContent=message;
  toast.classList.add('show');
  
  toastTimer=setTimeout(() => {
    hideToast();
  }, 1500); 
}

function updateFocus(visibleNotes){
  document.querySelectorAll('.note-card').forEach(note=>{
    note.classList.remove('focused-note');
  })

  const selected=visibleNotes[selectedNoteIndex];
  if(!selected)return;

  selected.classList.add('focused-note');
  selected.scrollIntoView({
    behavior:"smooth",
    block:"center"
  })
}

function updateTitle(){
  const title = document.getElementById('homeTitle');
  title.textContent = activeview === 'home' ? 'Notes' : 'Archived Notes';
}