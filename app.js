const fileInput = document.getElementById('fileInput');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const trackListEl = document.getElementById('trackList');
const progress = document.getElementById('progress');
const timeEl = document.getElementById('time');

let tracks = [];
let current = -1;

function formatTime(s){
	if(!isFinite(s)) return '00:00';
	const m = Math.floor(s/60).toString().padStart(2,'0');
	const sec = Math.floor(s%60).toString().padStart(2,'0');
	return `${m}:${sec}`;
}

function renderList(){
	trackListEl.innerHTML = '';
	tracks.forEach((t,i)=>{
		const li = document.createElement('li');
		li.className = i===current ? 'playing' : '';
		const title = document.createElement('div');
		title.className = 'track-title';
		title.textContent = t.name;
		const actions = document.createElement('div');
		actions.className = 'track-actions';
		const btn = document.createElement('button');
		btn.textContent = i===current ? '⏸' : '▶';
		btn.addEventListener('click', ()=>{
			if(i===current){
				if(audio.paused) audio.play(); else audio.pause();
			} else {
				playIndex(i);
			}
		});
		actions.appendChild(btn);
		li.appendChild(title);
		li.appendChild(actions);
		li.addEventListener('dblclick', ()=> playIndex(i));
		trackListEl.appendChild(li);
	});
}

function playIndex(i){
	if(i<0 || i>=tracks.length) return;
	current = i;
	const t = tracks[i];
	audio.src = t.url;
	audio.play();
	renderList();
}

fileInput.addEventListener('change', (e)=>{
	const files = Array.from(e.target.files || []);
	const newTracks = files.map(f=>({ name: f.name, file: f, url: URL.createObjectURL(f) }));
	tracks = tracks.concat(newTracks);
	if(current===-1 && tracks.length>0) playIndex(0);
	renderList();
});

playBtn.addEventListener('click', ()=>{
	if(!audio.src) return;
	if(audio.paused) audio.play(); else audio.pause();
});

prevBtn.addEventListener('click', ()=>{
	if(tracks.length===0) return;
	const prev = (current - 1 + tracks.length) % tracks.length;
	playIndex(prev);
});

nextBtn.addEventListener('click', ()=>{
	if(tracks.length===0) return;
	const nxt = (current + 1) % tracks.length;
	playIndex(nxt);
});

audio.addEventListener('play', ()=>{ playBtn.textContent = '⏸'; renderList(); });
audio.addEventListener('pause', ()=>{ playBtn.textContent = '▶️'; renderList(); });
audio.addEventListener('timeupdate', ()=>{
	const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
	progress.value = pct;
	timeEl.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
});
audio.addEventListener('ended', ()=>{ nextBtn.click(); });

progress.addEventListener('input', (e)=>{
	if(!audio.duration) return;
	const pct = Number(e.target.value);
	audio.currentTime = (pct/100) * audio.duration;
});

// small safety: revoke object URLs when unloading
window.addEventListener('unload', ()=>{
	tracks.forEach(t=>{ if(t.url) URL.revokeObjectURL(t.url); });
});

// init UI
renderList();
