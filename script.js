const galleryItems = [
  {title:"A memory I never want to forget", image:"assets/photos/memory1.jpg", message:"Write what you feel about this memory here."},
  {title:"Day when you proposed me ", image:"assets/photos/memory2.jpg", message:"Write your own message for this picture."},
  {title:"First Birthday Together", image:"assets/photos/memory3.jpg", message:"Write your own message for this picture."},
  {title:"Celebrating First Anniversary together", image:"assets/photos/memory4.jpg", message:"Write your own message for this picture."},
  {title:"Celebrating 2nd birthday ", image:"assets/photos/memory5.jpg", message:"Write your own message for this picture."},
  {title:"Another reason I smile......", image:"assets/photos/memory6.jpg", message:"Write your own message for this picture."}
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function safeImage(src, fallbackText){
  return `onerror="this.style.display='none';this.parentElement.classList.add('image-missing');this.parentElement.dataset.fallback='${fallbackText.replace(/'/g,"&#39;")}'"`;
}

function renderGallery(){
  const el = $("#gallery");
  el.innerHTML = galleryItems.map((item,i)=>`
    <article class="photo-card" data-gallery="${i}">
      <img src="${item.image}" alt="${item.title}" ${safeImage(item.image,item.title)}>
      <div class="photo-overlay"><b>${item.title}</b></div>
    </article>
  `).join("");
  $$(".photo-card").forEach(card=>card.addEventListener("click",()=>{
    const item=galleryItems[Number(card.dataset.gallery)];
    openModal("MEMORY",item.title,item.message,item.image);
  }));
}

function openModal(label,title,message,image){
  $("#modalDay").textContent=label;
  $("#modalTitle").textContent=title;
  $("#modalMessage").textContent=message;
  $("#modalImage").src=image || "";
  $("#modalImage").alt=title;
  $("#messageModal").classList.add("open");
  $("#messageModal").setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeModal(){
  $("#messageModal").classList.remove("open");
  $("#messageModal").setAttribute("aria-hidden","true");
  document.body.style.overflow="";
}
$$('[data-close]').forEach(x=>x.addEventListener('click',closeModal));

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    closeModal();
    closeLetter();
    closeFinaleLetter();
  }
});

function openLetter(){
  $("#letterOverlay").classList.add("open");
  $("#letterOverlay").setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeLetter(){
  const overlay=$("#letterOverlay");
  if(!overlay.classList.contains('open')) return;
  overlay.classList.add('closing');
  setTimeout(()=>{
    overlay.classList.remove('open','closing');
    overlay.setAttribute("aria-hidden","true");
    document.body.style.overflow="";
    document.querySelector('#home').scrollIntoView({behavior:'smooth',block:'start'});
  },420);
}

$("#surpriseBtn").addEventListener("click",openLetter);
$("#letterFolder").addEventListener("click",openLetter);
$("#letterClose").addEventListener("click",closeLetter);
$("#letterOverlay .letter-backdrop").addEventListener("click",closeLetter);

function createFloatingDecor(){
  const box=$("#floatingDecor");
  const pieces=['♡','♥','🎈','🎀','✦','❤','🌸'];
  for(let i=0;i<24;i++){
    const p=document.createElement('span');
    p.className='float-piece';
    p.textContent=pieces[Math.floor(Math.random()*pieces.length)];
    p.style.left=Math.random()*100+'%';
    p.style.animationDuration=(9+Math.random()*12)+'s';
    p.style.animationDelay=(-Math.random()*18)+'s';
    p.style.fontSize=(18+Math.random()*28)+'px';
    p.style.setProperty('--drift',(Math.random()*160-80)+'px');
    box.appendChild(p);
  }
}

const music=$("#bgMusic"), musicBtn=$("#musicBtn");
musicBtn.addEventListener("click",async()=>{
  if(music.paused){
    try{await music.play();musicBtn.textContent="❚❚"}
    catch(e){alert("Put your song at assets/music/song.mp3 first.")}
  } else {music.pause();musicBtn.textContent="♫";}
});

function blowCandles(){
  if($(".wish").classList.contains('blown')) return;
  $(".wish").classList.add("blown");
  $("#wishText").textContent="The candles are out... now make your wish. ♡";
  $("#wishBtn").textContent="✨ WISH MADE ✨";
  launchPartyPopper();
  launchConfetti(180);
}
$("#wishBtn").addEventListener("click",blowCandles);

function launchPartyPopper(){
  const box=$("#confetti");
  for(let side of ['left','right']){
    for(let i=0;i<22;i++){
      const c=document.createElement('span');
      c.className='pop-piece';
      c.textContent=['🎉','✨','♥','✦'][Math.floor(Math.random()*4)];
      c.style.left=side==='left'?'8%':'92%';
      c.style.top='58%';
      c.style.setProperty('--x',(side==='left'?1:-1)*(80+Math.random()*260)+'px');
      c.style.setProperty('--y',(-100-Math.random()*280)+'px');
      c.style.animationDelay=(Math.random()*.25)+'s';
      box.appendChild(c);
    }
  }
  setTimeout(()=>$$('.pop-piece').forEach(x=>x.remove()),4000);
}

function launchConfetti(count){
  const box=$("#confetti");
  for(let i=0;i<count;i++){
    const c=document.createElement("span"); c.className="conf";
    c.style.left=Math.random()*100+"%";
    c.style.background=["#ef4f83","#f4b64c","#f08db1","#a96fd1","#f7d35b"][Math.floor(Math.random()*5)];
    c.style.animationDuration=(2.5+Math.random()*3)+"s";
    c.style.animationDelay=(Math.random()*1.5)+"s";
    c.style.transform=`rotate(${Math.random()*360}deg)`;
    box.appendChild(c);
  }
  setTimeout(()=>box.innerHTML="",7000);
}

function openFinaleLetter(){
  const overlay=$("#finaleLetterOverlay");
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  launchHeartBurst();
}
function closeFinaleLetter(){
  const overlay=$("#finaleLetterOverlay");
  if(!overlay.classList.contains('open')) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
$("#finaleBtn").addEventListener('click',openFinaleLetter);
$("#finaleClose").addEventListener('click',closeFinaleLetter);
$("#finaleLetterOverlay .finale-letter-backdrop").addEventListener('click',closeFinaleLetter);

function launchHeartBurst(){
  const box=$("#hearts");
  box.innerHTML='';
  for(let i=0;i<70;i++){
    const h=document.createElement('span');
    h.className='burst-heart';
    h.textContent=['♥','♡','❤','💗'][Math.floor(Math.random()*4)];
    h.style.left='50%';
    h.style.top='55%';
    h.style.setProperty('--x',(Math.random()*900-450)+'px');
    h.style.setProperty('--y',(Math.random()*700-500)+'px');
    h.style.animationDelay=(Math.random()*.45)+'s';
    h.style.fontSize=(14+Math.random()*28)+'px';
    box.appendChild(h);
  }
  setTimeout(()=>box.innerHTML='',5000);
}

renderGallery();
createFloatingDecor();
