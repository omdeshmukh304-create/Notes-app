let notes=[];
let editingNoteId=null;
let noteToArchive=null;
let changeCategory='other';
let activeCategory='all'
let searchQuery='';
let activeview='home';
let lastArchiveNoteId=null;
let undoTimer=null;
let toastTimer=null;

let searchtimer=null;
let selectedNoteIndex=-1;
const sun=`<svg id="sun" width="22" height="22" viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="5" fill="white"/>
  <g stroke="white" stroke-width="2" stroke-linecap="round">
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </g>
</svg>
` ;
const moon=`<svg id="moon" width="22" height="22" viewBox="0 0 24 24" fill="none"
     xmlns="http://www.w3.org/2000/svg">
  <path
    d="M21 12.79A9 9 0 1111.21 3
       a7 7 0 009.79 9.79z"
    fill="black"/>
</svg>
`;
const pin=`
<svg id="pin" fill="#ffffff" width="20px" height="12px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier">

<path d="M 14.2539 35.9688 L 25.9492 35.9688 L 25.9492 48.0156 C 25.9492 51.5781 27.4258 54.5781 28.0117 54.5781 C 28.5976 54.5781 30.0742 51.5781 30.0742 48.0156 L 30.0742 35.9688 L 41.7461 35.9688 C 43.3633 35.9688 44.5351 34.9375 44.5351 33.3672 C 44.5351 32.3828 44.2305 31.6797 43.5508 30.9532 L 36.3789 23.1719 C 35.8867 22.6563 35.5820 22.2813 35.6992 21.3203 L 36.8945 12.7657 C 36.9649 12.2735 37.0117 11.9922 37.4336 11.6875 L 43.1992 7.5157 C 44.4883 6.5781 45.0508 5.4297 45.0508 4.3750 C 45.0508 2.8047 43.7851 1.4219 41.9805 1.4219 L 14.0195 1.4219 C 12.2149 1.4219 10.9492 2.8047 10.9492 4.3750 C 10.9492 5.4297 11.5117 6.5781 12.7773 7.5157 L 18.5429 11.6875 C 18.9883 11.9922 19.0351 12.2735 19.1054 12.7657 L 20.3008 21.3203 C 20.4180 22.2813 20.1133 22.6563 19.6211 23.1719 L 12.4492 30.9532 C 11.7695 31.6797 11.4649 32.3828 11.4649 33.3672 C 11.4649 34.9375 12.6367 35.9688 14.2539 35.9688 Z"/>

</g>

</svg>`;

const unpin=`
<svg id="unpin" fill="#ffffff" width="20px" height="12px" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier">

<path d="M 47.2561 44.3576 C 47.9779 45.0794 49.1191 45.0794 49.7943 44.3576 C 50.4924 43.6591 50.5158 42.5414 49.7943 41.8196 L 8.6498 .6985 C 7.9512 0 6.7870 0 6.0885 .6985 C 5.4132 1.3738 5.4132 2.5613 6.0885 3.2366 Z M 35.9629 24.2162 L 37.3134 14.4599 C 37.3600 13.9476 37.4531 13.6449 37.9188 13.3422 L 43.5770 9.2441 C 44.8577 8.3127 45.3932 7.1717 45.3932 6.1239 C 45.3932 4.5638 44.1591 3.1900 42.3429 3.1900 L 14.9367 3.1900 Z M 13.1670 37.5119 L 25.6011 37.5119 L 25.6011 49.4803 C 25.6011 53.0195 27.0914 56 27.6502 56 C 28.2323 56 29.7226 53.0195 29.7226 49.4803 L 29.7226 37.5119 L 36.2656 37.5119 L 18.7554 20.0016 L 19.1512 22.9588 C 19.2910 23.9135 18.9650 24.2861 18.4993 24.7983 L 11.3741 32.5289 C 10.6988 33.2507 10.3962 33.9493 10.3962 34.9273 C 10.3962 36.4873 11.5371 37.5119 13.1670 37.5119 Z"/>

</g>

</svg>`;










//main Event listner
document.addEventListener('DOMContentLoaded', function(){
  applyStoredTheme();
  initNotes();


  const defaultBtn=document.querySelector('[data-category="all"]');
  if(defaultBtn)defaultBtn.classList.add('active');
  filteringNotes()
  viewStyle();

  document.getElementById('searchInput').addEventListener('input', function(event){
    selectedNoteIndex=-1;
   searchQuery= event.target.value.toLowerCase(); 
   clearTimeout(searchtimer)
   searchtimer=setTimeout(() => {
    filteringNotes();
   }, 300);
   
  })

  document.getElementById('themeToggleBtn').addEventListener('click',toggleTheme)

  document.getElementById('noteForm').addEventListener('submit',saveNote)

  document.getElementById('noteDialog').addEventListener('click', function(event){
   
      if(event.target === this) {
        closeNoteDialog()
      }
  })

  document.querySelector('.dialog-content').addEventListener('click', function (event) {
    event.stopPropagation();
  });

  document.querySelector('.close-btn').addEventListener('click',()=>{
    closeNoteDialog();
  })
  

  document.querySelector('.category-selector').addEventListener('click',(e)=>{
    const btn=e.target.closest('.sorting-tags');
    if(!btn)return;

    const category=btn.dataset.category;
    if(activeCategory===category)return;

    removeActive();
    btn.classList.add('active');
    activeCategory=category;
    filteringNotes();

  })


  document.getElementById('categoryContainer').addEventListener('click',(e)=>{
    const btn=e.target.closest('.category');
    if(!btn)return;

    removeSelectCategory();
    btn.classList.add('selected');
    changeCategory=btn.dataset.category;
  });

  document.getElementById('archivedFooter').addEventListener('click',function(event){
    activeview='archive';
    activeCategory='all';
    searchQuery='';
    viewStyle();
    updateTitle();
    filteringNotes();
    
  })

  document.getElementById('homeFooter').addEventListener('click',function(event){
    
    activeview='home';
    activeCategory='all';
    searchQuery='';
    viewStyle();
    updateTitle();
    filteringNotes();
    
  })

  document.getElementById('searchBtn').addEventListener('click',function(){
    document.getElementById('searchBar').classList.add('active');
    document.getElementById('searchInput').focus();
  })

  document.getElementById('closeSearch').addEventListener('click',function(){
    searchQuery="";
    selectedNoteIndex=-1;
    document.getElementById('searchBar').classList.remove('active');
    document.getElementById('searchInput').value="";
    filteringNotes();
  })

  document.getElementById('addBtn').addEventListener('click',function(){
    dialogMode='add';
    openNoteDialog()
  })

  document.querySelector('.cancel-btn').addEventListener('click',()=>{
    closeNoteDialog()}
  );

  document.querySelector('.notes-grid').addEventListener('click',function(event){


    const pinBtn=event.target.closest('.pin-btn');
    if(pinBtn){
      const id=pinBtn.dataset.id;
      togglePin(id);
      return
    }
    
    const delBtn=event.target.closest('.delete-btn');
    if(delBtn){
      const id=delBtn.dataset.id;
      openConfirm(id);
      return;
    }

    const restoreBtn=event.target.closest('.restore-btn');
    if(restoreBtn){
      const id=restoreBtn.dataset.id;
      restoreNote(id);
      return;
    }

    
    const noteCard=event.target.closest('.note-card');
    if(!noteCard) return;

    document.querySelectorAll('.note-card').forEach(card => {
      card.classList.remove('focused-note');
    });

    noteCard.classList.add('focused-note');
    console.log(noteCard);
    noteCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
    

    const noteId=noteCard.dataset.id;
    const noteCategory=noteCard.dataset.category;


    removeCategory();
    document.getElementById('noteDialog').classList.add(noteCategory)
    editingNoteId=noteId;
    setTimeout(() => {
      openNoteDialog(noteId);
    }, 200);
    
  })


  document.addEventListener('keydown',function(event){
    if(!searchQuery)return;

    const visibleNotes=document.querySelectorAll('.note-card');
    if(visibleNotes.length === 0)return;

    if(event.key==='ArrowDown'){
      selectedNoteIndex++;
      if(selectedNoteIndex >= visibleNotes.length){
        selectedNoteIndex=0;
      }
        updateFocus(visibleNotes);
      }
    if(event.key === 'ArrowUp'){
      selectedNoteIndex--;
      if(selectedNoteIndex<0){
        selectedNoteIndex=visibleNotes.length-1;
      }
      updateFocus(visibleNotes);
    }
    if(event.key === 'Enter'){
      if(selectedNoteIndex >= 0){
        visibleNotes[selectedNoteIndex].click();
      }
    }
  })

})









