/*
  app.js  -  behaviors (loaded deferred). Runs after render.js has built the DOM.
  Theme toggle, scroll reveal, page-turn direction, Leaflet route map, Giscus.
*/
(function(){
  var T = window.TRIP;

  /* ============ GISCUS CONFIG ============
     Paste the values from https://giscus.app after enabling Discussions and
     installing the giscus app on the repo. These IDs are public, safe to commit.
     Until repoId / categoryId are filled, a friendly setup note shows instead. */
  var GISCUS = {
    repo:       'LeoHChen/east-coast-visit-summer-2026',
    repoId:     'R_kgDOTHIccw',
    category:   'General',
    categoryId: 'DIC_kwDOTHIcc84DABxK',
    mapping:    'pathname'
  };
  function giscusReady(){ return GISCUS.repoId.indexOf('PASTE')<0 && GISCUS.categoryId.indexOf('PASTE')<0; }

  /* ---------- theme ---------- */
  var ICON = {
    moon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>',
    sun:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19"/></svg>'
  };
  function resolved(){
    var a = document.documentElement.getAttribute('data-theme');
    if(a) return a;
    return (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  function applyToggleIcon(){
    var b = document.getElementById('themeToggle'); if(!b) return;
    b.innerHTML = resolved()==='dark' ? ICON.sun : ICON.moon;
  }
  function setTheme(mode){
    document.documentElement.setAttribute('data-theme', mode);
    try{ localStorage.setItem('theme', mode); }catch(e){}
    if(window.applyDayAccent) window.applyDayAccent();
    applyToggleIcon();
    setGiscusTheme(mode);
    swapMapTiles(mode);
  }
  (function initTheme(){
    var saved = null; try{ saved = localStorage.getItem('theme'); }catch(e){}
    if(saved) document.documentElement.setAttribute('data-theme', saved);
  })();
  function wireToggle(){
    var b = document.getElementById('themeToggle'); if(!b) return;
    applyToggleIcon();
    b.addEventListener('click', function(){ setTheme(resolved()==='dark' ? 'light' : 'dark'); });
  }

  /* ---------- page-turn direction (cross-document View Transitions) ---------- */
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[data-turn]'); if(!a) return;
    var cur = parseInt(document.body.dataset.day || '0', 10);
    var m = (a.getAttribute('href')||'').match(/day-(\d+)\.html/);
    var tgt = m ? parseInt(m[1],10) : (/index\.html/.test(a.getAttribute('href')||'') ? 0 : 99);
    try{ sessionStorage.setItem('vtDir', tgt < cur ? 'back' : 'fwd'); }catch(err){}
  });

  /* ---------- scroll reveal ---------- */
  function wireReveal(){
    var els = document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){ els.forEach(function(el){ el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function(ents){
      ents.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold:.12, rootMargin:'0px 0px -40px 0px' });
    els.forEach(function(el){ io.observe(el); });
  }

  /* ---------- giscus ---------- */
  function setGiscusTheme(mode){
    var f = document.querySelector('iframe.giscus-frame');
    if(f && f.contentWindow) f.contentWindow.postMessage({ giscus:{ setConfig:{ theme: mode } } }, 'https://giscus.app');
  }
  function loadGiscus(){
    var box = document.querySelector('.giscus'); if(!box) return;
    if(!giscusReady()){
      box.innerHTML = '<div class="giscus-note" style="margin:0">Photos and journals turn on once the trip owner finishes a one-time GitHub setup (enable Discussions, install the giscus app, paste two public IDs into <b>assets/app.js</b>). See the README.</div>';
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.setAttribute('data-repo', GISCUS.repo);
    s.setAttribute('data-repo-id', GISCUS.repoId);
    s.setAttribute('data-category', GISCUS.category);
    s.setAttribute('data-category-id', GISCUS.categoryId);
    s.setAttribute('data-mapping', GISCUS.mapping);
    s.setAttribute('data-strict', '0');
    s.setAttribute('data-reactions-enabled', '1');
    s.setAttribute('data-emit-metadata', '0');
    s.setAttribute('data-input-position', 'bottom');
    s.setAttribute('data-theme', resolved());
    s.setAttribute('data-lang', 'en');
    s.setAttribute('crossorigin', 'anonymous');
    s.async = true;
    box.appendChild(s);
  }

  /* ---------- Leaflet route map (home only) ---------- */
  var _map = null, _tiles = null;
  function tileURL(mode){
    return mode==='dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  }
  function swapMapTiles(mode){
    if(_map && _tiles){ _map.removeLayer(_tiles); _tiles = L.tileLayer(tileURL(mode), { maxZoom:18, attribution:'&copy; OpenStreetMap contributors &copy; CARTO' }).addTo(_map); }
  }
  function buildLegs(){
    var box = document.getElementById('legs'); if(!box) return;
    var rows = '', i = 0;
    T.days.forEach(function(d){
      if(d.drive){ i++; rows += '<div class="leg"><span class="lgn">'+i+'</span>'+
        '<span class="lgr">'+d.drive.from+' to '+d.drive.to+'</span>'+
        '<span class="lgm">'+d.drive.miles+'</span><span class="lgt">'+d.drive.time+'</span></div>'; }
    });
    rows += '<div class="leg total"><span class="lgn">&#931;</span><span class="lgr">Total driving</span>'+
      '<span class="lgm">'+T.meta.driveTotal+'</span><span class="lgt">'+T.meta.driveTime+'</span></div>';
    box.innerHTML = rows;
  }
  function loadCSS(href, cb){ var l=document.createElement('link'); l.rel='stylesheet'; l.href=href; l.onload=cb; document.head.appendChild(l); }
  function loadJS(src, cb){ var s=document.createElement('script'); s.src=src; s.onload=cb; document.head.appendChild(s); }
  function initMap(){
    var el = document.getElementById('map'); if(!el) return;
    buildLegs();
    loadCSS('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', function(){
      loadJS('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', function(){
        var stops = T.days.filter(function(d){ return d.pin; }).sort(function(a,b){ return a.pin-b.pin; });
        var mode = resolved();
        _map = L.map(el, { scrollWheelZoom:false, attributionControl:true });
        _tiles = L.tileLayer(tileURL(mode), { maxZoom:18, attribution:'&copy; OpenStreetMap contributors &copy; CARTO' }).addTo(_map);
        var pts = stops.map(function(s){ return s.coords; });
        L.polyline(pts, { color:getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#e0452a', weight:3, opacity:.85, dashArray:'2 8', lineCap:'round' }).addTo(_map);
        stops.forEach(function(s){
          var icon = L.divIcon({ className:'', html:'<div class="leaflet-pin"><span>'+s.pin+'</span></div>', iconSize:[30,30], iconAnchor:[15,28], popupAnchor:[0,-28] });
          L.marker(s.coords, { icon:icon, title:s.city }).addTo(_map)
            .bindPopup('<b>'+s.pin+'. '+s.city+'</b><br>'+s.dateLong);
        });
        _map.fitBounds(L.latLngBounds(pts).pad(0.18));
      });
    });
  }

  /* ---------- photo gallery ---------- */
  function galleryRoot(){ return (document.body.dataset.root || ''); }
  function currentDayKey(){
    var n = document.body.dataset.day;
    return (n && n !== '0') ? 'day-' + n : null;
  }

  function loadGallery(){
    var box = document.getElementById('day-gallery');
    var key = currentDayKey();
    if(!box || !key) return;
    fetch(galleryRoot() + 'assets/photos.json?ts=' + Date.now(), { cache: 'no-store' })
      .then(function(r){ return r.ok ? r.json() : { days: {} }; })
      .catch(function(){ return { days: {} }; })
      .then(function(data){
        var day = (data && data.days && data.days[key]) || null;
        var cta = document.getElementById('addPhotos');
        if(cta && day && day.discussionUrl) cta.href = day.discussionUrl;
        renderGallery(box, (day && day.photos) || []);
      });
  }

  // Build the grid with DOM methods (never innerHTML): url/alt/author come from
  // public discussion comments and must not be treated as HTML.
  function renderGallery(box, photos){
    box.textContent = '';
    if(!photos.length){
      box.className = 'gallery is-empty';
      var msg = document.createElement('p');
      msg.className = 'gallery-empty';
      msg.textContent = 'No photos yet for this day. Be the first — tap “Add your photos”.';
      box.appendChild(msg);
      return;
    }
    box.className = 'gallery';
    photos.forEach(function(p, i){
      var who = p.author ? ' by ' + p.author : '';
      var btn = document.createElement('button');
      btn.className = 'shot'; btn.type = 'button';
      btn.dataset.i = i;
      btn.setAttribute('aria-label', 'Open photo' + who);
      var img = document.createElement('img');
      img.loading = 'lazy';
      img.src = p.url;                 // property assignment — not HTML-parsed
      img.alt = p.alt || ('Trip photo' + who);
      btn.appendChild(img);
      if(p.author){
        var by = document.createElement('span');
        by.className = 'shot-by';
        by.textContent = p.author;
        btn.appendChild(by);
      }
      box.appendChild(btn);
    });
    wireLightbox(box, photos);
  }

  function wireLightbox(box, photos){
    var idx = 0, lb = null;
    function build(){
      lb = document.createElement('div');
      lb.className = 'lightbox'; lb.hidden = true;
      lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true'); lb.setAttribute('aria-label','Photo viewer');
      lb.innerHTML =
        '<button class="lb-close" type="button" aria-label="Close">&#215;</button>'+
        '<button class="lb-nav lb-prev" type="button" aria-label="Previous photo">&#8249;</button>'+
        '<figure class="lb-fig"><img alt=""><figcaption></figcaption></figure>'+
        '<button class="lb-nav lb-next" type="button" aria-label="Next photo">&#8250;</button>';
      document.body.appendChild(lb);
      lb.querySelector('.lb-close').addEventListener('click', close);
      lb.querySelector('.lb-prev').addEventListener('click', function(){ show(idx-1); });
      lb.querySelector('.lb-next').addEventListener('click', function(){ show(idx+1); });
      lb.addEventListener('click', function(e){ if(e.target === lb) close(); });
    }
    function show(i){
      if(!lb) build();
      idx = (i + photos.length) % photos.length;
      var p = photos[idx];
      var img = lb.querySelector('img'); img.src = p.url; img.alt = p.alt || 'Trip photo';
      lb.querySelector('figcaption').textContent = p.author ? 'Posted by ' + p.author : '';
      lb.hidden = false; document.documentElement.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    }
    function close(){ if(lb){ lb.hidden = true; document.documentElement.style.overflow = ''; } }
    document.addEventListener('keydown', function(e){
      if(!lb || lb.hidden) return;
      if(e.key === 'Escape') close();
      else if(e.key === 'ArrowLeft') show(idx-1);
      else if(e.key === 'ArrowRight') show(idx+1);
      else if(e.key === 'Tab'){ e.preventDefault(); lb.querySelector('.lb-close').focus(); }
    });
    box.querySelectorAll('.shot').forEach(function(btn){
      btn.addEventListener('click', function(){ show(Number(btn.dataset.i)); });
    });
  }

  /* ---------- boot ---------- */
  function boot(){ window.__appReady = true; wireToggle(); wireReveal(); loadGiscus(); initMap(); loadGallery(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
