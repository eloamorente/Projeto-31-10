// Playlist-only site: removed player controls

/* -------------------- Dados falsos e renderização -------------------- */
// Copilot: 'musicas' é um array de objetos que simula um pequeno banco de dados local.
const playlists = {
	'Churrasco de Domingo': [
		{ titulo: 'Oi Deus', artista: 'Hugo & Guilherme', capaUrl: 'https://picsum.photos/seed/11/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/1dzF8qI9VkDnO0dkMfR529' },
		{ titulo: 'Notificação Preferida', artista: 'Zé Neto e Cristiano', capaUrl: 'https://picsum.photos/seed/12/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/3tA0vALUwrzkTgHcm9j6oJ' },
		{ titulo: 'Não Precisa', artista: 'Paula Fernandes', capaUrl: 'https://picsum.photos/seed/13/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/179go5s1ouLR7DRtMhbxnA' },
		{ titulo: 'Cortando as BR', artista: 'Fiduma & Jeca', capaUrl: 'https://picsum.photos/seed/14/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/0bor3AJ8QV6RRbyV64ZsOO' },
		{ titulo: 'Tubaroes', artista: 'Diego & Vitor Hugo', capaUrl: 'https://picsum.photos/seed/15/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/6Emsu0BaMpG0ilZCRT8KHZ' },
	],
	'Sextou': [
		{ titulo: 'Hoje Tá Maior Lazer', artista: 'https://open.spotify.com/intl-pt/artist/2Sf2ErwTx3Syvz5PQusX6J?si=89053fd95de14052', capaUrl: 'https://picsum.photos/seed/21/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/6AQay8erVYwPOwHNCFJP8t' },
		{ titulo: 'Sacode Automotivo', artista: 'https://open.spotify.com/intl-pt/artist/5FnCbiF8jgiBZ0TPzNfbNy?si=3715338b29d24bff', capaUrl: 'https://picsum.photos/seed/22/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/09L86iWuxm6WJy2gXWNsQt' },
		{ titulo: 'ME POSTOU NO DAILY - FESTA DO BIG G', artista: 'https://open.spotify.com/intl-pt/artist/5s27i7oqhNWIcE4HeoVdq0?si=e30e2f3ad9604bab', capaUrl: 'https://picsum.photos/seed/24/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/4ATO632UaFTJltxCbfBpHI' },
	],
	'Sad': [
		{ titulo: 'Party Girl', artista: 'https://open.spotify.com/intl-pt/artist/1XLWox9w1Yvbodui0SRhUQ?si=2bfabeede0ae46f7', capaUrl: 'https://picsum.photos/seed/31/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/5RqR4ZCCKJDcBLIn4sih9l' },
		{ titulo: 'Deixe-me ir', artista: 'https://open.spotify.com/intl-pt/artist/6E2st8OqIaS7PU5gj95FSE?si=e69fb50b59e1423a', capaUrl: 'https://picsum.photos/seed/34/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/6JKkP9ABQzYZUFSKSVDKIc' },
	]
};

/* Copilot: Função que lê o array 'musicas' e insere HTML na div #lista-de-musicas */
function renderMusicas(){
	const container = document.getElementById('lista-de-musicas');
	if(!container) return;
	container.innerHTML = '';
	Object.keys(playlists).forEach(sectionName=>{
		const section = document.createElement('div'); section.className = 'playlist-section';
		const h = document.createElement('h3'); h.textContent = sectionName; section.appendChild(h);
		const list = document.createElement('div'); list.className = 'playlist-grid';
		playlists[sectionName].forEach(m=>{
			const wrap = document.createElement('div'); wrap.className = 'card-wrap';
			const card = document.createElement('div');
			card.className = 'musica-card';
			const img = document.createElement('img'); img.src = m.capaUrl; img.alt = m.titulo;
			const info = document.createElement('div'); info.className = 'musica-info';
			const t = document.createElement('div'); t.className = 'musica-titulo'; t.textContent = m.titulo;
			const a = document.createElement('div'); a.className = 'musica-artista'; a.textContent = m.artista;
			info.appendChild(t); info.appendChild(a);
					const btnOpen = document.createElement('a');
					btnOpen.className = 'spotify-btn';
					btnOpen.href = m.spotifyUrl || '#';
					btnOpen.target = '_blank';
					btnOpen.rel = 'noopener noreferrer';
					btnOpen.textContent = 'Abrir no Spotify';

					const overlay = document.createElement('div');
					overlay.className = 'overlay-play';
					overlay.innerHTML = '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3v18l15-9L5 3z" fill="white"/></svg>';

					card.appendChild(img); card.appendChild(info); card.appendChild(btnOpen);
					wrap.appendChild(card); wrap.appendChild(overlay);
					// clicar em qualquer parte do card abre o Spotify
					wrap.addEventListener('click', (e)=>{
						// evita que o clique no próprio link dispare duas vezes
						if(e.target && e.target.closest('a')) return;
						if(m.spotifyUrl) window.open(m.spotifyUrl, '_blank', 'noopener');
					});
					list.appendChild(wrap);
		});
		section.appendChild(list);
		container.appendChild(section);
	});
}

renderMusicas();
