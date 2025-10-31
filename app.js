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

		// novas faixas solicitadas~l
		{ titulo: 'Quarto 67', artista: 'Guilherme & Benuto', capaUrl: 'https://picsum.photos/seed/churrasco_quarto67/200/200', spotifyUrl: 'https://open.spotify.com/search/quarto%2067' },
		{ titulo: 'Coisas Que Eu Sei', artista: '', capaUrl: 'https://picsum.photos/seed/churrasco_coisas/200/200', spotifyUrl: 'https://open.spotify.com/search/Coisas%20Que%20Eu%20Sei' },
		{ titulo: 'Última Noite', artista: '', capaUrl: 'https://picsum.photos/seed/churrasco_ultimanoite/200/200', spotifyUrl: 'https://open.spotify.com/search/Ultima%20Noite' },
		{ titulo: 'Arruma um Bão', artista: 'Israel & Rodolfo', capaUrl: 'https://picsum.photos/seed/churrasco_arruma/200/200', spotifyUrl: 'https://open.spotify.com/search/Arruma%20um%20Bao' },
		{ titulo: 'Sujeito Homem', artista: '', capaUrl: 'https://picsum.photos/seed/churrasco_sujeito/200/200', spotifyUrl: 'https://open.spotify.com/search/Sujeito%20Homem' },
		{ titulo: 'Equivicada', artista: '', capaUrl: 'https://picsum.photos/seed/churrasco_equivicada/200/200', spotifyUrl: 'https://open.spotify.com/search/Equivicada' },
		{ titulo: 'Última Saudade', artista: 'Henrique & Juliano', capaUrl: 'https://picsum.photos/seed/churrasco_ultimasaudade/200/200', spotifyUrl: 'https://open.spotify.com/search/Ultima%20Saudade' },
		{ titulo: 'Vazou na Braquiara', artista: 'Guilherme & Benuto', capaUrl: 'https://picsum.photos/seed/churrasco_vazou/200/200', spotifyUrl: 'https://open.spotify.com/search/Vazou%20na%20Braquiara' },
		{ titulo: 'Caso Indefinido', artista: 'Cristiano Araujo', capaUrl: 'https://picsum.photos/seed/churrasco_caso/200/200', spotifyUrl: 'https://open.spotify.com/search/Caso%20Indefinido' },
		{ titulo: 'Na Hora da Raiva', artista: 'Henrique & Juliano', capaUrl: 'https://picsum.photos/seed/churrasco_hora/200/200', spotifyUrl: 'https://open.spotify.com/search/Na%20Hora%20da%20Raiva' },
		{ titulo: 'Meu Chapéu Sumiu', artista: 'Luan Pereira', capaUrl: 'https://picsum.photos/seed/churrasco_chapeu/200/200', spotifyUrl: 'https://open.spotify.com/search/Meu%20Chapeu%20Sumiu' },
		{ titulo: 'Na Linha do Tempo', artista: 'Vitor & Leo', capaUrl: 'https://picsum.photos/seed/churrasco_linha/200/200', spotifyUrl: 'https://open.spotify.com/search/Na%20Linha%20do%20Tempo' },
		{ titulo: 'Paredões', artista: 'Henrique & Juliano, Grelo', capaUrl: 'https://picsum.photos/seed/churrasco_paredoes/200/200', spotifyUrl: 'https://open.spotify.com/search/Paredoes' },
		{ titulo: 'A Última Volta', artista: '', capaUrl: 'https://picsum.photos/seed/churrasco_ultimavolta/200/200', spotifyUrl: 'https://open.spotify.com/search/A%20Ultima%20Volta' }
	],
	'Sextou': [
		{ titulo: 'Pantera', artista: 'MC Jota Vila', capaUrl: 'https://picsum.photos/seed/sextou1/200/200', spotifyUrl: 'https://open.spotify.com/search/Pantera' },
		{ titulo: 'Valentino', artista: 'MC Willian', capaUrl: 'https://picsum.photos/seed/sextou2/200/200', spotifyUrl: 'https://open.spotify.com/search/Valenti' },
		{ titulo: 'Marmita de Blogueira', artista: 'Caio Passos', capaUrl: 'https://picsum.photos/seed/sextou3/200/200', spotifyUrl: 'https://open.spotify.com/search/Marmita%20de%20Blogueira' },
		{ titulo: 'Posso Até Não Te Dar Flores', artista: '', capaUrl: 'https://picsum.photos/seed/sextou4/200/200', spotifyUrl: 'https://open.spotify.com/search/Posso%20Ate%20Nao%20Te%20Dar%20Flores' },
		{ titulo: 'Mano Pepa', artista: 'DJ Emige', capaUrl: 'https://picsum.photos/seed/sextou5/200/200', spotifyUrl: 'https://open.spotify.com/search/Mano%20Pepa' },
		{ titulo: 'Peito PP', artista: 'MC Rodrigo do CN', capaUrl: 'https://picsum.photos/seed/sextou6/200/200', spotifyUrl: 'https://open.spotify.com/search/Peito%20PP' }
	],
	'Para chorar': [
		{ titulo: 'Party Girl', artista: 'Unknown', capaUrl: 'https://picsum.photos/seed/31/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/5RqR4ZCCKJDcBLIn4sih9l' },
		{ titulo: 'Deixe-me ir', artista: '1Kilo', capaUrl: 'https://picsum.photos/seed/34/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/6JKkP9ABQzYZUFSKSVDKIc' }
	],
	'Para amar': [
		{ titulo: 'A Nossa Praia', artista: 'Matheus & Kauan', capaUrl: 'https://picsum.photos/seed/paraamar1/200/200', spotifyUrl: 'https://open.spotify.com/track/7F0JCdobSgSgMLnEKAeBMa' },
		{ titulo: 'Marília Mendonça', artista: 'BIN, Mainstreet, Mãolee', capaUrl: 'https://picsum.photos/seed/paraamar3/200/200', spotifyUrl: 'https://open.spotify.com/track/1CBjYXLotHrkiykMbI7EaU' },
		{ titulo: 'Vou Voando', artista: 'Jorge & Mateus', capaUrl: 'https://picsum.photos/seed/paraamar4/200/200', spotifyUrl: 'https://open.spotify.com/track/1WCn5QBp0Kl9uHrR0J02GS' }
	],
	'Deus é Deus': [
		{ titulo: 'É Tudo Sobre Você', artista: 'Morada', capaUrl: 'https://picsum.photos/seed/deuse1/200/200', spotifyUrl: 'https://open.spotify.com/search/%C3%89%20Tudo%20Sobre%20Voc%C3%AA' },
		{ titulo: 'Só Tu És Santo', artista: 'Morada', capaUrl: 'https://picsum.photos/seed/deuse2/200/200', spotifyUrl: 'https://open.spotify.com/search/S%C3%B3%20Tu%20%C3%89s%20Santo' },
		{ titulo: 'Lugar Secreto', artista: 'Gabriela Rocha', capaUrl: 'https://picsum.photos/seed/deuse3/200/200', spotifyUrl: 'https://open.spotify.com/search/Lugar%20Secreto' },
		{ titulo: 'Ousado Amor', artista: 'Isaias Saad', capaUrl: 'https://picsum.photos/seed/deuse4/200/200', spotifyUrl: 'https://open.spotify.com/search/Ousado%20Amor' },
		{ titulo: 'Diz', artista: 'Gabriela Rocha', capaUrl: 'https://picsum.photos/seed/deuse5/200/200', spotifyUrl: 'https://open.spotify.com/search/Diz' },
		{ titulo: 'Pai Presente', artista: 'Aline Barros', capaUrl: 'https://picsum.photos/seed/deuse6/200/200', spotifyUrl: 'https://open.spotify.com/search/Pai%20Presente' },
		{ titulo: 'Rendido Estou', artista: 'Aline Barros', capaUrl: 'https://picsum.photos/seed/deuse7/200/200', spotifyUrl: 'https://open.spotify.com/search/Rendido%20Estou' }
	],
	'trap': [
		{ titulo: 'Rainha da Finesse', artista: 'WIU', capaUrl: 'https://picsum.photos/seed/trap1/200/200', spotifyUrl: 'https://open.spotify.com/search/Rainha%20da%20Finesse' },
		{ titulo: 'Anos Luz', artista: 'Matue', capaUrl: 'https://picsum.photos/seed/trap2/200/200', spotifyUrl: 'https://open.spotify.com/search/Anos%20Luz' },
		{ titulo: 'Vidigal', artista: 'WIU', capaUrl: 'https://picsum.photos/seed/trap3/200/200', spotifyUrl: 'https://open.spotify.com/search/Vidigal' },
		{ titulo: 'A Última Dança', artista: 'Matue', capaUrl: 'https://picsum.photos/seed/trap4/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/6ifISefylcgPQksE0gmcVY' },
		{ titulo: 'Crack com Mussilon', artista: 'Matue', capaUrl: 'https://picsum.photos/seed/trap5/200/200', spotifyUrl: 'https://open.spotify.com/search/Crack%20com%20Mussilon' },
		{ titulo: 'Tá Tarde', artista: 'Vulgo FK', capaUrl: 'https://picsum.photos/seed/trap6/200/200', spotifyUrl: 'https://open.spotify.com/intl-pt/track/7DWAerOfnQXuvH84B4kx53' },
		{ titulo: 'Plug da Nova', artista: 'Veigh', capaUrl: 'https://picsum.photos/seed/trap7/200/200', spotifyUrl: 'https://open.spotify.com/search/Plug%20da%20Nova' },
		{ titulo: 'Artista Genérico', artista: 'Veigh', capaUrl: 'https://picsum.photos/seed/trap8/200/200', spotifyUrl: 'https://open.spotify.com/search/Artista%20Generico' },
		{ titulo: 'Eu Fiz o Jogo Virar', artista: 'MC Poze do Rodo', capaUrl: 'https://picsum.photos/seed/trap9/200/200', spotifyUrl: 'https://open.spotify.com/search/Eu%20Fiz%20o%20Jogo%20Virar' }
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
			const img = document.createElement('img');
			img.alt = m.titulo;
			// inicialmente usa a capa fornecida no objeto (ou placeholder)
			img.src = m.capaUrl || 'https://picsum.photos/200/200';
			// se houver link do Spotify, tenta obter a capa oficial via oEmbed (thumbnail_url)
			if(m.spotifyUrl){
				fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent(m.spotifyUrl))
					.then(resp => { if(!resp.ok) throw new Error('oEmbed fetch failed'); return resp.json(); })
					.then(data => {
						if(data && data.thumbnail_url) img.src = data.thumbnail_url;
					})
					.catch(()=>{
						// falha ao obter capa oficial: mantém a capa existente
					});
			}
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
