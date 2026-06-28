/*
  render.js  -  builds page DOM from window.TRIP (loaded synchronously, before paint).
  Each page calls one of: renderHome(), renderDay(n), renderJournal().
  Behaviors (reveal, map, giscus, theme) live in app.js, loaded deferred.
*/
(function(){
  var T = window.TRIP;
  var days = T.days;
  function root(){ return document.body.dataset.root || ''; }
  function gmap(q){ return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }
  function wiki(slug){ return 'https://en.wikipedia.org/wiki/' + slug; }
  function dayHref(n){ return root() + 'days/day-' + n + '.html'; }
  function homeHref(h){ return root() + 'index.html' + (h||''); }
  function journalHref(h){ return root() + 'journal.html' + (h||''); }

  /* per-page accent (city / university color), theme-aware. Set before paint and
     re-applied on theme toggle by app.js via window.applyDayAccent. */
  function resolvedThemeR(){
    var a = document.documentElement.getAttribute('data-theme');
    if(!a){ try{ a = localStorage.getItem('theme'); }catch(e){} }
    if(a) return a;
    return (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  function applyAccent(acc){
    acc = acc || T.meta.acc;
    window.__acc = acc;
    var dark = resolvedThemeR()==='dark';
    var s = document.documentElement.style;
    s.setProperty('--accent', dark ? acc.d : acc.l);
    s.setProperty('--accent-ink', dark ? acc.di : acc.li);
  }
  window.applyDayAccent = function(){ applyAccent(window.__acc || T.meta.acc); };
  function watermark(motif){ return '<div class="watermark" aria-hidden="true">' + (WATERMARK[motif] || WATERMARK.stars) + '</div>'; }

  /* ---------- small utility icons (functional glyphs) ---------- */
  var IC = {
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2V4Z"/><path d="M18 18H7a2 2 0 0 0-2 2"/></svg>',
    cam:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2l1.4-2h7.2L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><circle cx="12" cy="13" r="3.4"/></svg>'
  };
  function mapChip(q){ return '<a class="maplink" target="_blank" rel="noopener" href="'+gmap(q)+'">'+IC.pin+'Map</a>'; }
  function wikiChip(slug){ return slug ? '<a class="wikilink" target="_blank" rel="noopener" href="'+wiki(slug)+'">'+IC.book+'Wikipedia</a>' : ''; }

  /* ---------- shared chrome ---------- */
  function nav(page, label){
    function lk(href, txt, on){ return '<a href="'+href+'"'+(on?' aria-current="page"':'')+'><span class="lbl">'+txt+'</span></a>'; }
    return ''+
      '<nav class="nav"><div class="nav-in">'+
        '<a class="brand" href="'+homeHref()+'">The Northeast <b>Circuit</b></a>'+
        '<span class="nav-spacer"></span>'+
        '<div class="nav-links">'+
          lk(homeHref('#days'),'Itinerary', page==='home')+
          lk(homeHref('#map'),'Map', false)+
          lk(journalHref(),'Journal', page==='journal')+
        '</div>'+
        '<button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle light or dark theme" title="Toggle theme"></button>'+
      '</div></nav>';
  }

  function footer(){
    var dayLinks = days.map(function(d){
      return '<li><a href="'+dayHref(d.n)+'">Day '+d.n+'. '+d.city+'</a></li>';
    }).join('');
    return ''+
      '<footer class="foot"><div class="wrap">'+
        '<p class="seal">"'+T.meta.seal+'"</p>'+
        '<div class="sitemap">'+
          '<div class="col-main"><h4>Sitemap</h4><ul>'+
            '<li><a href="'+homeHref()+'">Trip overview</a></li>'+
            '<li><a href="'+homeHref('#flights')+'">Flights</a></li>'+
            '<li><a href="'+homeHref('#map')+'">Route map and distances</a></li>'+
            '<li><a href="'+homeHref('#days')+'">Day index</a></li>'+
            '<li><a href="'+homeHref('#notes')+'">Before you go</a></li>'+
            '<li><a href="'+journalHref()+'">Journal and photos</a></li>'+
          '</ul></div>'+
          '<div class="col-days"><h4>Every day</h4><ul>'+dayLinks+'</ul></div>'+
          '<div class="col-fam"><h4>This album</h4><ul>'+
            '<li>A family keepsake for</li>'+
            '<li>'+T.meta.family.join(', ')+'</li>'+
            '<li><a href="'+journalHref()+'">Add a photo or journal</a></li>'+
          '</ul></div>'+
        '</div>'+
        '<div class="fine">Chen Family . Northeast Circuit . '+T.meta.dates+'</div>'+
      '</div></footer>';
  }

  function mount(page){
    var nv = document.getElementById('topnav'); if(nv) nv.outerHTML = nav(page);
    var ft = document.getElementById('sitemap'); if(ft) ft.outerHTML = footer();
  }

  /* safety net: if app.js never initializes (failed load, no IntersectionObserver),
     reveal everything so content is never stuck invisible. */
  function revealFallback(){
    setTimeout(function(){
      if(window.__appReady) return;
      document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
    }, 2500);
  }

  /* ---------- day sub-blocks ---------- */
  function planBlock(d){
    var rows = d.plan.map(function(r){
      return '<div class="prow"><div class="lab">'+r[0]+'</div><div class="val">'+r[1]+'</div></div>';
    }).join('');
    var hotel = '';
    if(d.hotel){
      hotel = '<div class="hotelcard reveal">'+
        '<div><div class="hn">'+d.hotel.name+'</div><div class="ha">'+d.hotel.addr+'</div></div>'+
        '<span class="nav-spacer"></span>'+
        '<div class="hx">'+d.hotel.parking+' . '+d.hotel.nights+'</div>'+
        mapChip(d.hotel.q)+'</div>';
    }
    var drive = d.drive ? '<p class="lede" style="margin-bottom:18px">Drive '+d.drive.from+' to '+d.drive.to+', '+d.drive.time+' ('+d.drive.miles+').</p>' : '';
    return '<section class="section" id="plan"><div class="wrap narrow">'+
      '<div class="sec-head reveal"><h2>The plan</h2></div>'+drive+
      '<div class="plan reveal">'+rows+'</div>'+hotel+
      '</div></section>';
  }

  function sightsBlock(d){
    if(!d.sights || !d.sights.length) return '';
    var items = d.sights.map(function(s){
      var star = s.star ? ' <span class="star">'+s.star+'</span>' : '';
      return '<div class="sight reveal"><div class="sn">'+s.name+star+'</div>'+
        '<div class="sd">'+s.blurb+'</div>'+
        '<div class="linkrow">'+wikiChip(s.wiki)+mapChip(s.q)+'</div></div>';
    }).join('');
    return '<section class="section lg"><div class="wrap narrow">'+
      '<div class="sec-head reveal"><h2>What is worth seeing</h2>'+
      '<p class="lede">Each stop earns its place twice over, as a campus to weigh and as a chapter in the founding story. Tap a place to map it or read more.</p></div>'+
      '<div class="sights">'+items+'</div></div></section>';
  }

  function toursBlock(d){
    if(!d.tours || !d.tours.length) return '';
    var items = d.tours.map(function(t){
      return '<div class="book reveal"><div class="bk-school">'+t.school+
        '<a class="btn btn-ghost bk-go" target="_blank" rel="noopener" href="'+t.url+'">Register</a></div>'+
        '<div class="bk-note">'+t.note+'</div></div>';
    }).join('');
    return '<section class="section"><div class="wrap narrow">'+
      '<div class="sec-head reveal"><h2>Reserve a campus tour</h2>'+
      '<p class="lede">Official tours are free but need advance registration, and summer slots fill. Book these now.</p></div>'+
      items+'</div></section>';
  }

  function timedBlock(d){
    if(!d.timed || !d.timed.length) return '';
    var items = d.timed.map(function(t){
      return '<div class="timed reveal"><div class="tw">'+t.when+'</div>'+
        '<div class="tt">'+t.title+'</div><div class="td">'+t.text+'</div>'+
        '<div class="linkrow">'+wikiChip(t.wiki)+mapChip(t.q)+'</div></div>';
    }).join('');
    return '<section class="section"><div class="wrap narrow">'+
      '<div class="sec-head reveal"><h2>Time-locked, on the spot</h2>'+
      '<p class="lede">A few things on the 250th Fourth happen once, at a fixed time and place. Be there early.</p></div>'+
      items+'</div></section>';
  }

  function foodBlock(d){
    if(!d.food || !d.food.length) return '';
    var meals = d.food.map(function(m){
      return '<div class="meal reveal"><div class="mn">'+m.name+'<span class="mtag '+m.kind+'">'+m.tag+'</span></div>'+
        '<div class="md">'+m.blurb+'</div><div class="mmeta">'+m.meta+'</div>'+
        '<div class="linkrow">'+mapChip(m.q)+'</div></div>';
    }).join('');
    return '<section class="section"><div class="wrap narrow">'+
      '<div class="sec-head reveal"><h2>Where to eat</h2>'+
      '<p class="lede">A local-authentic lead with an alternate, aiming near $50 per person before drinks.</p></div>'+
      '<div class="food">'+meals+'</div></div></section>';
  }

  function albumBlock(d){
    var slots = '';
    for(var i=0;i<3;i++){ slots += '<div class="slot">'+IC.cam+'<span>Drop a photo here</span></div>'; }
    return '<section class="section lg" id="album"><div class="wrap narrow">'+
      '<div class="sec-head reveal"><h2>Photos and journal</h2>'+
      '<p class="lede">This is where the real trip lands. '+T.meta.family.join(', ')+' can sign in with GitHub and add photos and notes for this day.</p></div>'+
      '<div class="slots reveal">'+slots+'</div>'+
      '<div class="giscus-wrap reveal">'+
        '<div class="giscus-note">Sign in with GitHub to post a journal entry or drop photos for <b>Day '+d.n+', '+d.city+'</b>. Everything is saved to this trip on GitHub.</div>'+
        '<div class="giscus"></div>'+
      '</div></div></section>';
  }

  function turnNav(d){
    var prev, next;
    if(d.n === 1){ prev = {href:homeHref(), dir:'Back to', label:'Trip overview'}; }
    else { var p = days[d.n-2]; prev = {href:dayHref(p.n), dir:'Day '+p.n, label:p.city}; }
    if(d.n === days.length){ next = {href:journalHref(), dir:'Onward to', label:'The journal'}; }
    else { var nx = days[d.n]; next = {href:dayHref(nx.n), dir:'Day '+nx.n, label:nx.city}; }
    return '<div class="wrap narrow"><nav class="turnnav">'+
      '<a class="prev" data-turn href="'+prev.href+'"><span class="tdir">'+prev.dir+'</span><span class="tlabel">&#8249; '+prev.label+'</span></a>'+
      '<a class="toindex" href="'+homeHref('#days')+'">All days</a>'+
      '<a class="next" data-turn href="'+next.href+'"><span class="tdir">'+next.dir+'</span><span class="tlabel">'+next.label+' &#8250;</span></a>'+
      '</nav></div>';
  }

  /* ---------- page: DAY ---------- */
  window.renderDay = function(n){
    var d = days[n-1];
    applyAccent(d.acc);
    mount('day');
    document.title = 'Day '+n+'. '+d.title+' . The Northeast Circuit';
    var cover = '<header class="cover">'+watermark(d.motif)+'<div class="wrap"><div class="daycover enter">'+
      '<div>'+
        '<div class="stamp"><div class="dno">'+d.n+'</div>'+
        '<div class="dmeta">'+d.dateLong+'<br>'+d.city+'</div></div>'+
        '<h1>'+d.title+'</h1>'+
        '<p class="tagline">'+d.tagline+'</p>'+
      '</div>'+
      '<div class="cover-art">'+art(d.art)+'</div>'+
      '</div></div></header>';
    var main = document.getElementById('day');
    main.innerHTML = cover + planBlock(d) + sightsBlock(d) + toursBlock(d) + timedBlock(d) + foodBlock(d) + albumBlock(d) + turnNav(d);
    revealFallback();
  };

  /* ---------- page: HOME ---------- */
  window.renderHome = function(){
    applyAccent(T.meta.acc);
    mount('home');
    var m = T.meta;
    var metaCells = [['Dates',m.dates.replace(', 2026','')],['Route',m.route],['Driving',m.driveTotal],['Travelers',m.travelers]]
      .map(function(c){ return '<div><div class="dmeta">'+c[0]+'</div><div class="hn" style="font-family:var(--serif)">'+c[1]+'</div></div>'; }).join('');

    var hero = '<header class="cover">'+watermark(m.motif)+'<div class="wrap">'+
      '<div class="enter">'+
        '<p class="kicker">Chen Family Expedition . America\'s Semiquincentennial</p>'+
        '<h1 style="font-size:clamp(2.6rem,7vw,5rem);margin:14px 0 6px">'+m.title+'</h1>'+
        '<p class="tagline" style="font-style:italic;color:var(--accent-ink);font-size:clamp(1.2rem,2.6vw,1.7rem);margin-bottom:18px">'+m.sub+'</p>'+
        '<div class="cover-art">'+art('hero')+'</div>'+
        '<p class="lede" style="margin-top:24px">'+m.blurb+'</p>'+
        '<div style="display:flex;flex-wrap:wrap;gap:30px 44px;margin-top:24px;align-items:baseline">'+metaCells+'</div>'+
      '</div></div></header>';

    var idx = days.map(function(d){
      return '<a class="ix'+(d.feature?' feature':'')+'" href="'+dayHref(d.n)+'" data-turn>'+
        '<div><div class="ixn">'+d.n+'</div><div class="ixd">'+d.date+'</div></div>'+
        '<div><div class="ixt">'+d.title+'</div><div class="ixtag">'+d.tagline+'</div></div>'+
        '<div class="ixgo">&#8250;</div></a>';
    }).join('');
    var indexSec = '<section class="section lg" id="days"><div class="wrap">'+
      '<div class="sec-head reveal"><h2>Nine days, day by day</h2>'+
      '<p class="lede">Each day has its own page: the plan, what is worth seeing with links to read more, where to eat, and a place for photos and journals.</p></div>'+
      '<div class="index-list reveal">'+idx+'</div></div></section>';

    var flights = m.flights.map(function(f){
      var rows = f.rows.map(function(r){ return '<div class="frow"><span class="l">'+r[0]+'</span><span class="r">'+r[1]+'</span></div>'; }).join('');
      return '<div class="flight reveal"><div class="fdir">'+f.dir+' . '+f.when+'</div>'+
        '<div class="froute"><span class="ap">'+f.from+'</span><span class="farrow"></span><span class="ap">'+f.to+'</span></div>'+rows+'</div>';
    }).join('');
    var flightSec = '<section class="section" id="flights"><div class="wrap">'+
      '<div class="sec-head reveal"><h2>By air</h2><p class="lede">United, both directions. The return is a dawn departure, so plan the last night around it.</p></div>'+
      '<div class="flights">'+flights+'</div>'+
      '<p class="lede" style="margin-top:18px;font-size:1rem">'+m.car+'</p></div></section>';

    var mapSec = '<section class="section lg" id="map-sec"><div class="wrap">'+
      '<div class="sec-head reveal"><h2>The route, mapped</h2>'+
      '<p class="lede">Six stops down the colonial corridor. Numbered pins follow the day order. Drive times are off-peak estimates.</p></div>'+
      '<div id="map" class="reveal" role="img" aria-label="Map of the route from Boston to Philadelphia"></div>'+
      '<div class="legs reveal" id="legs"></div></div></section>';

    var notes = m.notes.map(function(no){
      return '<div class="note reveal"><div class="ni"></div><div class="nt"><strong>'+no.t+'</strong> '+no.d+'</div></div>';
    }).join('');
    var notesSec = '<section class="section" id="notes"><div class="wrap narrow">'+
      '<div class="sec-head reveal"><h2>Before you go</h2><p class="lede">The things most likely to trip up a holiday-weekend trip. Read once, fix now.</p></div>'+
      '<div class="notes">'+notes+'</div></div></section>';

    document.getElementById('home').innerHTML = hero + indexSec + flightSec + mapSec + notesSec;
    revealFallback();
  };

  /* ---------- page: JOURNAL ---------- */
  window.renderJournal = function(){
    applyAccent(T.meta.acc);
    mount('journal');
    var feed = days.map(function(d){
      return '<a class="feeditem" href="'+dayHref(d.n)+'#album" data-turn>'+
        '<div class="fd">'+d.date+'</div>'+
        '<div><div class="ft">Day '+d.n+'. '+d.title+'</div></div>'+
        '<div class="fc">'+d.city+'</div></a>';
    }).join('');
    var hero = '<header class="cover">'+watermark(T.meta.motif)+'<div class="wrap narrow enter">'+
      '<p class="kicker">The trip blog</p>'+
      '<h1 style="font-size:clamp(2.4rem,6vw,4rem);margin:14px 0 10px">Journal &amp; Photos</h1>'+
      '<p class="lede">As the family adds photos and notes, every day fills in here. Pick a day to read its journal, or open a day page to post your own. '+
      'Sign in with GitHub to add an entry; everything is saved to this trip on GitHub.</p>'+
      '</div></header>';
    var feedSec = '<section class="section lg"><div class="wrap narrow">'+
      '<div class="sec-head reveal"><h2>Every day&apos;s journal</h2></div>'+
      '<div class="feed reveal">'+feed+'</div></div></section>';
    document.getElementById('journal').innerHTML = hero + feedSec;
    revealFallback();
  };

  /* ============================================================
     ORIGINAL SVG ART  (decorative, per brief: custom art now, photos later)
     classes: ink / soft / ac / sky / pap / ln / acln  -> themed in styles.css
     ============================================================ */
  function frame(inner){ return '<svg viewBox="0 0 820 380" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect class="sky" width="820" height="380"/>'+inner+'</svg>'; }
  var ART = {
    hero: frame(
      '<circle class="ac" cx="690" cy="86" r="34"/>'+
      '<path class="ln acln" d="M70 250 C 220 150, 360 300, 500 210 S 760 150, 770 200"/>'+
      '<g class="ink">'+
        '<rect x="80" y="196" width="34" height="84"/><polygon points="80,196 97,168 114,196"/>'+
        '<rect x="150" y="176" width="22" height="104"/><circle cx="161" cy="166" r="12"/>'+
        '<rect x="250" y="206" width="60" height="74"/><polygon points="250,206 280,176 310,206"/>'+
        '<rect x="380" y="150" width="26" height="130"/><rect x="372" y="150" width="42" height="14"/>'+
        '<rect x="470" y="196" width="48" height="84"/><polygon points="470,196 494,168 518,196"/>'+
        '<rect x="600" y="170" width="30" height="110"/><polygon points="600,170 615,150 630,170"/>'+
      '</g>'+
      '<rect class="ink" x="0" y="280" width="820" height="6"/>'+
      '<g class="ac"><circle cx="690" cy="60" r="2.5"/><circle cx="720" cy="92" r="2.5"/><circle cx="664" cy="104" r="2.5"/></g>'
    ),
    boston: frame(
      '<g class="ink">'+
        '<rect x="120" y="150" width="120" height="130"/><polygon points="120,150 180,108 240,150"/>'+
        '<rect x="170" y="92" width="20" height="40"/><circle cx="180" cy="86" r="10" class="ac"/>'+
        '<rect x="430" y="120" width="120" height="160"/><path class="pap" d="M430 120 a60 56 0 0 1 120 0Z"/>'+
        '<path class="ac" d="M490 64 a48 56 0 0 1 0 56 a48 56 0 0 1 0 -56Z"/>'+
        '<rect x="486" y="44" width="8" height="22"/>'+
      '</g>'+
      '<g class="soft"><rect x="300" y="200" width="60" height="80"/><rect x="600" y="190" width="70" height="90"/></g>'+
      '<rect class="ink" x="0" y="280" width="820" height="6"/>'+
      '<g class="ac"><circle cx="700" cy="80" r="26"/></g>'
    ),
    providence: frame(
      '<path class="soft" d="M0 280 L0 220 Q 200 120 410 180 T 820 150 L820 280Z"/>'+
      '<g class="ink">'+
        '<rect x="360" y="120" width="90" height="160"/><path class="pap" d="M360 120 a45 50 0 0 1 90 0Z"/>'+
        '<path class="ac" d="M405 70 a40 50 0 0 1 0 50 a40 50 0 0 1 0 -50Z"/><rect x="401" y="52" width="8" height="20"/>'+
        '<rect x="180" y="190" width="60" height="90"/><rect x="540" y="178" width="66" height="102"/>'+
      '</g>'+
      '<rect class="ink" x="0" y="280" width="820" height="6"/>'+
      '<circle class="ac" cx="690" cy="92" r="30"/>'
    ),
    newport: frame(
      '<circle class="ac" cx="130" cy="92" r="30"/>'+
      '<path class="soft" d="M0 250 Q 120 230 240 250 T 480 250 T 820 250 L820 380 L0 380Z"/>'+
      '<path class="ln acln" d="M0 268 Q 120 252 240 268 T 480 268 T 820 268"/>'+
      '<g class="ink">'+
        '<rect x="520" y="150" width="150" height="100"/><polygon points="520,150 595,112 670,150"/>'+
        '<rect x="556" y="178" width="22" height="72"/><rect x="612" y="178" width="22" height="72"/>'+
        '<polygon points="300,250 300,150 380,210"/><rect x="296" y="150" width="6" height="100"/>'+
      '</g>'
    ),
    newhaven: frame(
      '<g class="ink">'+
        '<rect x="360" y="70" width="70" height="210"/>'+
        '<rect x="352" y="60" width="14" height="24"/><rect x="424" y="60" width="14" height="24"/><rect x="388" y="48" width="14" height="30"/>'+
        '<rect x="372" y="110" width="46" height="40" class="pap"/>'+
      '</g>'+
      '<g class="soft"><rect x="200" y="200" width="80" height="80"/><rect x="540" y="190" width="90" height="90"/></g>'+
      '<rect class="ink" x="0" y="280" width="820" height="6"/>'+
      '<g><circle class="ac" cx="660" cy="110" r="46"/><path class="pap" d="M660 110 L700 96 A46 46 0 0 0 660 64Z"/><circle class="ink" cx="648" cy="100" r="4"/><circle class="ink" cx="672" cy="118" r="4"/><circle class="ink" cx="650" cy="128" r="4"/></g>'
    ),
    princeton: frame(
      '<g class="ink">'+
        '<rect x="170" y="160" width="480" height="120"/>'+
        '<rect x="392" y="120" width="36" height="44"/><path class="pap" d="M392 120 a18 22 0 0 1 36 0Z"/>'+
        '<path class="ac" d="M410 92 a16 22 0 0 1 0 28 a16 22 0 0 1 0 -28Z"/>'+
        '<g class="pap"><rect x="210" y="196" width="26" height="84"/><rect x="280" y="196" width="26" height="84"/><rect x="514" y="196" width="26" height="84"/><rect x="584" y="196" width="26" height="84"/></g>'+
        '<rect x="396" y="208" width="28" height="72" class="pap"/>'+
      '</g>'+
      '<rect class="ink" x="0" y="280" width="820" height="6"/>'+
      '<circle class="ac" cx="700" cy="96" r="26"/>'
    ),
    philly: frame(
      '<g class="ac">'+
        '<circle cx="150" cy="80" r="3"/><circle cx="690" cy="70" r="3"/><circle cx="420" cy="56" r="3"/>'+
        '<path d="M150 80 L150 40 M150 80 L120 56 M150 80 L180 56" stroke="var(--accent)" stroke-width="2.5" fill="none"/>'+
        '<path d="M690 70 L690 34 M690 70 L662 50 M690 70 L718 50" stroke="var(--accent)" stroke-width="2.5" fill="none"/>'+
      '</g>'+
      '<g class="ink">'+
        '<rect x="350" y="120" width="120" height="160"/><rect x="392" y="70" width="36" height="54"/>'+
        '<polygon points="386,70 410,44 434,70"/><rect x="406" y="30" width="8" height="16"/>'+
        '<rect x="378" y="150" width="64" height="50" class="pap"/>'+
      '</g>'+
      '<g><path class="ac" d="M560 150 a52 52 0 0 1 104 0 l8 96 a8 8 0 0 1 -8 8 l-104 0 a8 8 0 0 1 -8 -8Z"/>'+
        '<rect class="sky" x="600" y="220" width="24" height="42"/><rect class="ink" x="556" y="252" width="112" height="12"/></g>'+
      '<rect class="ink" x="0" y="280" width="820" height="6"/>'
    ),
    penn: frame(
      '<path class="soft" d="M120 280 q 280 -70 580 0Z"/>'+
      '<path class="ln acln" d="M120 280 q 280 -70 580 0" stroke-width="3"/>'+
      '<g class="ink">'+
        '<rect x="300" y="120" width="220" height="160"/>'+
        '<g class="pap"><rect x="330" y="150" width="30" height="50"/><rect x="395" y="150" width="30" height="50"/><rect x="460" y="150" width="30" height="50"/></g>'+
        '<rect x="392" y="220" width="36" height="60" class="pap"/>'+
      '</g>'+
      '<rect class="ac" x="560" y="96" width="90" height="56"/><polygon class="ac" points="560,152 605,176 650,152"/>'+
      '<rect class="ink" x="0" y="280" width="820" height="6"/><circle class="ac" cx="160" cy="92" r="24"/>'
    ),
    home: frame(
      '<circle class="ac" cx="660" cy="100" r="34"/>'+
      '<g class="pap"><ellipse cx="200" cy="120" rx="70" ry="26"/><ellipse cx="520" cy="180" rx="90" ry="30"/></g>'+
      '<g class="ink"><path d="M300 220 L470 196 L520 150 L540 152 L516 200 L600 196 L632 174 L648 178 L620 214 L300 244 Z"/>'+
        '<path d="M360 244 L350 286 L372 286 L398 246 Z"/></g>'+
      '<path class="ln acln" d="M120 300 q 300 30 580 0" stroke-dasharray="4 10"/>'
    )
  };
  function art(key){ return ART[key] || ART.hero; }

  /* watermark motifs: simple original silhouettes hinting at each place.
     fill = currentColor (the page accent); shown large and faint behind the cover. */
  var STAR = 'M0,-1 L0.2245,-0.309 L0.951,-0.309 L0.363,0.118 L0.588,0.809 L0,0.382 L-0.588,0.809 L-0.363,0.118 L-0.951,-0.309 L-0.2245,-0.309 Z';
  function wm(inner){ return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">'+inner+'</svg>'; }
  var WATERMARK = {
    stars: wm('<path d="'+STAR+'" transform="translate(56,40) scale(33)"/><path d="'+STAR+'" transform="translate(22,66) scale(16)"/><path d="'+STAR+'" transform="translate(83,72) scale(12)"/>'),
    shield: wm('<path d="M50,6 L90,18 V50 C90,76 72,90 50,97 C28,90 10,76 10,50 V18 Z"/>'),
    crest: wm('<path d="M50,6 L90,18 V50 C90,76 72,90 50,97 C28,90 10,76 10,50 V18 Z"/><rect x="10" y="41" width="80" height="12" fill="var(--bg)"/>'),
    book: wm('<path d="M50,28 C40,21 22,21 10,25 V80 C22,76 40,76 50,82 C60,76 78,76 90,80 V25 C78,21 60,21 50,28 Z"/><rect x="48" y="28" width="4" height="54" fill="var(--bg)"/>'),
    wave: wm('<g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"><path d="M4,34 q16,-15 32,0 t32,0 t32,0"/><path d="M4,56 q16,-15 32,0 t32,0 t32,0"/><path d="M4,78 q16,-15 32,0 t32,0 t32,0"/></g>'),
    tower: wm('<path d="M40,94 V34 H38 V28 H42 V24 H46 V20 H50 L54,20 V24 H58 V28 H62 V34 H60 V94 Z"/>'),
    tiger: wm('<g transform="rotate(18 50 50)"><rect x="20" y="6" width="9" height="88" rx="4"/><rect x="38" y="2" width="11" height="96" rx="5"/><rect x="58" y="6" width="9" height="88" rx="4"/><rect x="74" y="10" width="7" height="80" rx="3"/></g>'),
    plane: wm('<path d="M6,54 L94,14 L54,92 L46,60 Z"/><path d="M46,60 L94,14" fill="none" stroke="var(--bg)" stroke-width="3"/>'),
    ship: wm('<path d="M48,14 L48,62 L18,62 Z"/><path d="M54,26 L54,62 L82,62 Z"/><path d="M18,66 H84 L74,82 H28 Z"/>')
  };
})();
