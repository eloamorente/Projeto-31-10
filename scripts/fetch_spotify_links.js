import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

// Usage: set environment variables SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET
// then run: npm run fetch-spotify

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if(!CLIENT_ID || !CLIENT_SECRET){
  console.error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET environment variables.');
  process.exit(1);
}

async function getToken(){
  const resp = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' + Buffer.from(CLIENT_ID+':'+CLIENT_SECRET).toString('base64') },
    body: 'grant_type=client_credentials'
  });
  const j = await resp.json();
  if(j.error) throw new Error(JSON.stringify(j));
  return j.access_token;
}

// Map of titles to search queries matching the project's playlists
const queries = [
  { key: 'Churrasco de Domingo', title: 'Oi Deus' },
  { key: 'Churrasco de Domingo', title: 'Notificação Preferida' },
  { key: 'Churrasco de Domingo', title: 'Não Precisa' },
  { key: 'Churrasco de Domingo', title: 'Cortando as BR' },
  { key: 'Churrasco de Domingo', title: 'Tubaroes' },
  { key: 'Churrasco de Domingo', title: 'Desocupa' },

  { key: 'Sextou', title: 'Hoje Tá Maior Lazer' },
  { key: 'Sextou', title: 'Sacode Automotivo' },
  { key: 'Sextou', title: 'GPS' },
  { key: 'Sextou', title: 'ME POSTOU NO DAILY - FESTA DO BIG G' },
  { key: 'Sextou', title: 'Meia Noite' },

  { key: 'Gring', title: 'Party Girl' },
  { key: 'Gring', title: 'See You Again' },
  { key: 'Gring', title: 'Suicidal' },
  { key: 'Gring', title: 'Often' },
  { key: 'Gring', title: "God's Plan" },
  { key: 'Gring', title: 'The Hills' },
  { key: 'Gring', title: 'Reminder' },
];

async function searchTrack(token, q){
  const url = 'https://api.spotify.com/v1/search?q=' + encodeURIComponent(q) + '&type=track&limit=1';
  const r = await fetch(url, { headers: { 'Authorization': 'Bearer ' + token } });
  if(!r.ok) { console.error('Spotify search failed', r.status, await r.text()); return null }
  const j = await r.json();
  if(j.tracks && j.tracks.items && j.tracks.items.length>0){
    const item = j.tracks.items[0];
    return { url: item.external_urls.spotify, image: (item.album && item.album.images && item.album.images[0]) ? item.album.images[0].url : null };
  }
  return null;
}

(async()=>{
  try{
    const token = await getToken();
    console.log('Got token');
    const results = {};
    for(const q of queries){
      const key = q.key;
      results[key] = results[key] || [];
      // search by title -- could append artist to improve accuracy
      const info = await searchTrack(token, q.title);
      const url = info ? info.url : null;
      const image = info ? info.image : null;
      console.log(q.key, q.title, '->', url, image ? '(image)' : '(no-image)');
      results[key].push({ title: q.title, url, image });
      // small delay to avoid rate limits
      await new Promise(r=>setTimeout(r, 250));
    }

    // Read app.js and replace spotifyUrl placeholders for matching titles
    const appPath = path.resolve('..','app.js');
    const appFull = path.resolve('scripts','..','app.js');
    const content = fs.readFileSync(appFull,'utf8');
    let out = content;

    for(const section of Object.keys(results)){
      for(const item of results[section]){
        if(!item.url && !item.image) continue;
        // create a regex to find the title and replace the spotifyUrl and/or capaUrl value
        const escaped = item.title.replace(/[-/\\^$*+?.()|[\]{}]/g,'\\$&');
        if(item.url){
          const re = new RegExp("(\\{\\s*titulo:\\s*'"+escaped+"'[\s\S]*?spotifyUrl:\s*')https?://open.spotify.com/[^']+(')",'i');
          if(re.test(out)){
            out = out.replace(re, `$1${item.url}$2`);
          } else {
            const re2 = new RegExp("(titulo:\s*'"+escaped+"'[\s\S]*?spotifyUrl:\s*')([^']+)'?","i");
            out = out.replace(re2, `$1${item.url}'`);
          }
        }
        if(item.image){
          const imgRe = new RegExp("(capaUrl:\s*')https?://[^']+(')\s*,?","i");
          out = out.replace(imgRe, `$1${item.image}$2`);
        }
      }
    }

    fs.writeFileSync(appFull, out, 'utf8');
    console.log('app.js updated with search results.');

  }catch(err){
    console.error('Error', err);
    process.exit(1);
  }
})();
