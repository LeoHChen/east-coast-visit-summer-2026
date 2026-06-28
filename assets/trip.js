/*
  trip.js  -  Single source of truth for the Chen family Northeast Circuit.
  Plain global (no build step). Read by render.js for every page.

  Conventions:
    wiki : Wikipedia article slug -> https://en.wikipedia.org/wiki/<wiki>
    q    : Google Maps query     -> https://www.google.com/maps/search/?api=1&query=<q>
  Facts come from the confirmed bookings in CLAUDE.md. Do not invent times,
  hotels, prices, or confirmation numbers. No em-dashes anywhere (house style).
*/
window.TRIP = {
  meta: {
    title: "The Northeast Circuit",
    sub: "Six colleges, one revolution, 1776 to 2026",
    blurb: "Nine days up the old colonial corridor, from the harbor that sparked a revolution to the hall where independence was signed. Timed to land in Philadelphia for the 250th Fourth of July, then deliver Alrisha to her summer program at Penn. Part college tour, part founding-era pilgrimage, with the country's birthday unfolding in real time around us.",
    dates: "Jun 28 to Jul 6, 2026",
    route: "BOS to PHL",
    driveTotal: "approx 375 mi",
    driveTime: "approx 7.5 hr",
    travelers: "4 out, 3 home",
    family: ["Hao", "Alrisha", "Altair"],
    acc: { l:'#b31942', li:'#a3173b', d:'#ff5366', di:'#ff8597' }, motif: 'stars',
    seal: "...one people, dissolving the bands, and assuming among the powers of the earth.",
    flights: [
      {
        dir: "Outbound", when: "Sun Jun 28", from: "SFO", to: "BOS",
        rows: [
          ["Flight", "UA 2356 . 737 MAX 9"],
          ["Depart", "10:05 AM PT"],
          ["Arrive", "6:59 PM ET"],
          ["Duration", "5h 54m"],
          ["Seats", "8C . 8B . 15C . 15B"]
        ]
      },
      {
        dir: "Return", when: "Mon Jul 6", from: "PHL", to: "SFO",
        rows: [
          ["Flight", "UA 2661 . 737 MAX 9"],
          ["Depart", "6:00 AM ET"],
          ["Arrive", "8:58 AM PT"],
          ["Duration", "5h 58m"],
          ["Seats", "12D . 12E . 14D"]
        ]
      }
    ],
    car: "Avis Standard SUV, confirmation 13843363US2. Pick up at BOS on Jun 28 (about 7:30 PM after landing), return to PHL the evening of Jul 5.",
    notes: [
      { t: "The Jul 6 flight is 6:00 AM.", d: "That means leaving for PHL around 4:15 AM. Either book a PHL airport hotel for the last night, or set two alarms and pre-arrange a 4 AM rideshare. Return the rental car the evening of Jul 5 so you are not dealing with it pre-dawn." },
      { t: "Independence Hall is free over the holiday, no reservation needed.", d: "From July 1 to 4, 2026 no timed ticket is required, so you can just walk up. Go early in the day to get ahead of the crowds and the security screening around Independence Mall. If you end up visiting on July 5, timed tickets resume, so reserve one on recreation.gov." },
      { t: "Expect road closures in Philadelphia on the 4th.", d: "Old City and the Ben Franklin Parkway close for the parade, ceremony, and fireworks. Driving in from Princeton, leave early and be ready to park once and walk." },
      { t: "Most campus tours run weekdays only.", d: "The schedule already lands Harvard, MIT, Brown, RISD, Yale and Princeton on Mon to Fri, but confirm and reserve each official tour in advance, as summer slots fill." },
      { t: "Two nights will run above the $50 per person dinner target.", d: "Newport (resort town) and Jul 4 in Philadelphia are the splurge nights. The alternates listed for those stops keep things closer to budget." },
      { t: "Confirm trip-cancellation coverage on the card that paid the flights.", d: "Pay hotels on the same card so the protection extends to them, and keep every confirmation in one folder." },
      { t: "Heat and crowds.", d: "Early July on the East Coast is hot and humid. Pack water, comfortable shoes for cobblestones and the Cliff Walk, and a light layer for over-air-conditioned museums." }
    ]
  },

  days: [
    {
      n: 1, date: "Jun 28", dateLong: "Sunday, June 28", dow: "Sun", art: "boston",
      acc: { l:'#fb4d42', li:'#c2362c', d:'#ff6b5e', di:'#ff8c82' }, motif: 'ship',
      city: "Boston", title: "Land in Boston", tagline: "Arrive and settle in Cambridge",
      pin: 1, coords: [42.3770, -71.1167],
      hotel: { name: "Sheraton Commander", addr: "16 Garden St, Cambridge, MA 02138", parking: "Valet $45/day", nights: "2 nights", q: "Sheraton Commander, 16 Garden St, Cambridge, MA 02138" },
      plan: [
        ["Arrive", "BOS at 6:59 PM, collect the Avis SUV, drive to Cambridge (about 20 min)."],
        ["Hotel", "Sheraton Commander, Harvard Square. Two nights."],
        ["Parking", "Valet $45/day."],
        ["Evening", "Light dinner near Harvard Square. You will arrive tired, so save the big meal for tomorrow."]
      ],
      sights: [
        { name: "Harvard Square", wiki: "Harvard_Square", q: "Harvard Square, Cambridge, MA", blurb: "The crossroads of Cambridge since the 1630s, ringed by bookstores, cafes, and street musicians. A gentle first walk to shake off the flight." }
      ],
      food: [],
      timed: []
    },

    {
      n: 2, date: "Jun 29", dateLong: "Monday, June 29", dow: "Mon", art: "boston",
      acc: { l:'#a51c30', li:'#9c1a2d', d:'#f0586e', di:'#f58a9a' }, motif: 'shield',
      tours: [
        { school: "Harvard", url: "https://apply.college.harvard.edu/portal/explore_harvard?tab=campus-visit", note: "Info session plus a student-led tour. Groups are capped at 3, so book two registrations for four people. Tour slots release weekly on Fridays." },
        { school: "MIT", url: "https://apply.mitadmissions.org/portal/visitmit", note: "Reserve ahead, no walk-ins. Runs Monday to Friday; if your date is not listed yet it opens about a month out." }
      ],
      city: "Cambridge", title: "Harvard and MIT", tagline: "Two campuses, ten minutes apart",
      pin: null, coords: [42.3736, -71.1097],
      hotel: { name: "Sheraton Commander", addr: "16 Garden St, Cambridge, MA 02138", parking: "Valet $45/day", nights: "night 2 of 2", q: "Sheraton Commander, 16 Garden St, Cambridge, MA 02138" },
      plan: [
        ["Morning", "Harvard Yard plus the official student-led tour from the Smith Center."],
        ["Afternoon", "MIT: the Infinite Corridor, the Great Dome, and the MIT Museum."],
        ["History", "The Freedom Trail is a short hop. Boston is the revolution's birthplace, and 2026 marks the 250th of Bunker Hill and Revere's ride."],
        ["Hotel", "Sheraton Commander, Cambridge."]
      ],
      sights: [
        { name: "Harvard Yard and the campus tour", wiki: "Harvard_Yard", q: "Harvard Yard, Cambridge, MA", blurb: "The oldest college in the country (1636). The student-led tour from the Smith Center is the best read on student life, and the Yard itself is open to wander." },
        { name: "MIT: Infinite Corridor and the MIT Museum", wiki: "MIT_Museum", q: "MIT Museum, 314 Main St, Cambridge, MA", blurb: "A completely different flavor of ambition ten minutes away. The museum's robotics and AI galleries will land for a tinkerer." },
        { name: "The Freedom Trail", wiki: "Freedom_Trail", q: "Freedom Trail, Boston, MA", blurb: "A 2.5-mile red line through 16 revolutionary sites: Old North Church, Paul Revere's house, the site of the Boston Massacre. Boston is the city that ignited a revolution." }
      ],
      food: [
        { name: "Wusong Road", kind: "asia", tag: "Asian", blurb: "A wildly popular Cantonese-tiki spot off Harvard Square: Dan Dan ragu, maple-pork dumplings, crab rangoon. Big shareable menu, fun room. Call ahead for the waitlist.", meta: "4.8 stars . $$ . 112 Mt Auburn St", q: "Wusong Road, 112 Mt Auburn St, Cambridge, MA" },
        { name: "Alden & Harlow", kind: "amer", tag: "American", blurb: "Inventive New England small plates in a dim, lively basement on Brattle St. Order several and share.", meta: "4.4 stars . $$$ . 40 Brattle St", q: "Alden and Harlow, 40 Brattle St, Cambridge, MA" }
      ],
      timed: []
    },

    {
      n: 3, date: "Jun 30", dateLong: "Tuesday, June 30", dow: "Tue", art: "providence",
      acc: { l:'#4e3629', li:'#4e3629', d:'#c49a6c', di:'#d7b48c' }, motif: 'book',
      tours: [
        { school: "Brown", url: "https://apply.college.brown.edu/portal/campus-visit", note: "Pre-register; groups are capped at 3, so book two registrations for four. Check in at the Henderson Welcome Center, 21 Prospect St." },
        { school: "RISD", url: "https://admissions.risd.edu/portal/undergrad-events", note: "Register through the Undergraduate Events portal. The admissions house is next door to Brown, easy to pair on the same day." }
      ],
      city: "Providence", title: "Providence", tagline: "Brown and RISD on College Hill",
      pin: 2, coords: [41.8268, -71.4025],
      drive: { from: "Cambridge", to: "Providence", miles: "50 mi", time: "about 1 hr" },
      hotel: { name: "Renaissance Providence Downtown", addr: "5 Avenue of the Arts, Providence, RI 02903", parking: "Valet $45/day", nights: "1 night", q: "Renaissance Providence Downtown Hotel, 5 Avenue of the Arts, Providence, RI 02903" },
      plan: [
        ["Drive", "Cambridge to Providence, about 1 hr, 50 mi."],
        ["Visit", "Brown's Main Green and Thayer Street, the RISD Museum, and Benefit Street."],
        ["Hotel", "Renaissance Providence Downtown, 5 Avenue of the Arts. One night."],
        ["Parking", "Valet $45/day."]
      ],
      sights: [
        { name: "Brown University", wiki: "Brown_University", q: "Brown University, Providence, RI", blurb: "Open curriculum, Ivy League, and one of the prettiest urban campuses in New England. Walk the Main Green and down Thayer Street." },
        { name: "RISD Museum", wiki: "Rhode_Island_School_of_Design_Museum", q: "RISD Museum, 20 N Main St, Providence, RI", blurb: "A genuinely great art museum attached to the country's premier design school. Strong across periods and rarely crowded." },
        { name: "Benefit Street, the Mile of History", wiki: "Benefit_Street", q: "Benefit Street, Providence, RI", blurb: "One of the densest stretches of preserved colonial and Federal architecture in America, right below the campuses." }
      ],
      food: [
        { name: "The Patio on Broadway", kind: "amer", tag: "American", blurb: "Beloved local kitchen: crispy duck meatballs, seasonal New England plates, great cocktails. Reserve.", meta: "4.7 stars . $$ . 166 Broadway", q: "The Patio on Broadway, 166 Broadway, Providence, RI" },
        { name: "The Slow Rhode", kind: "amer", tag: "American", blurb: "Cozy late-night neighborhood spot with ribs, duck poutine and a strong bar. Easy family dinner.", meta: "4.7 stars . $$ . 425 W Fountain St", q: "The Slow Rhode, 425 W Fountain St, Providence, RI" }
      ],
      timed: []
    },

    {
      n: 4, date: "Jul 1", dateLong: "Wednesday, July 1", dow: "Wed", art: "newport",
      acc: { l:'#0e7c86', li:'#0a626a', d:'#46c5cf', di:'#74d3db' }, motif: 'wave',
      city: "Newport", title: "Newport", tagline: "A coastal day among the Gilded Age",
      pin: 3, coords: [41.4901, -71.3128],
      drive: { from: "Providence", to: "Newport", miles: "35 mi", time: "about 45 min" },
      hotel: { name: "Newport Harbor Island Resort", addr: "1 Goat Island, Newport, RI 02840", parking: "On-site", nights: "1 night", q: "Newport Harbor Island Resort, 1 Goat Island, Newport, RI 02840" },
      plan: [
        ["Drive", "Providence to Newport, about 45 min, 35 mi."],
        ["Do", "The Cliff Walk, a timed Breakers mansion tour, and Bowen's Wharf."],
        ["Hotel", "Newport Harbor Island Resort, 1 Goat Island. One night."],
        ["Note", "The resort sits on Goat Island: harbor views and on-site parking."]
      ],
      sights: [
        { name: "The Cliff Walk", wiki: "Newport_Cliff_Walk", q: "Cliff Walk, Newport, RI", blurb: "A 3.5-mile public path with the Atlantic on one side and Gilded Age mansions on the other. The single most scenic break of the trip." },
        { name: "The Breakers", wiki: "The_Breakers", q: "The Breakers, 44 Ochre Point Ave, Newport, RI", star: "buy the timed tour", blurb: "The Vanderbilt summer cottage, grandest of the Newport mansions. Buy the timed tour ahead in peak season." },
        { name: "Colonial Newport and the Touro Synagogue", wiki: "Touro_Synagogue", q: "Touro Synagogue, 85 Touro St, Newport, RI", blurb: "Predating the mansions by a century: the 1763 Touro Synagogue (oldest in the U.S.) and the Brick Market speak to the town's revolutionary-era merchant wealth." }
      ],
      food: [
        { name: "The Mooring", kind: "amer", tag: "Seafood", blurb: "Harborfront Newport institution: oysters, clam chowder, lobster, and the famous bag of doughnuts lobster fritters. Packed with locals, so reserve ahead.", meta: "4.6 stars . $$$ . 1 Sayers Wharf", q: "The Mooring Seafood Kitchen and Bar, 1 Sayers Wharf, Newport, RI" },
        { name: "The Red Parrot", kind: "amer", tag: "American", blurb: "Lively downtown three-story spot with a huge menu: lobster nachos, tacos, something for every kid.", meta: "4.4 stars . $$ . 348 Thames St", q: "The Red Parrot Restaurant, 348 Thames St, Newport, RI" }
      ],
      timed: []
    },

    {
      n: 5, date: "Jul 2", dateLong: "Thursday, July 2", dow: "Thu", art: "newhaven",
      acc: { l:'#00356b', li:'#00356b', d:'#6ba6e0', di:'#8ebce8' }, motif: 'tower',
      tours: [
        { school: "Yale", url: "https://apps.admissions.yale.edu/portal/visit", note: "Register for the campus tour or info session. This is the day before the holiday, so confirm the slot; a no-registration self-guided audio tour is a good backup." }
      ],
      city: "New Haven", title: "New Haven", tagline: "Yale, and the pizza capital of America",
      pin: 4, coords: [41.3163, -72.9223],
      drive: { from: "Newport", to: "New Haven", miles: "125 mi", time: "about 2 hr 15 min" },
      hotel: { name: "Courtyard by Marriott New Haven at Yale", addr: "30 Whalley Ave, New Haven, CT 06511", parking: "On-site $25/day", nights: "1 night", q: "Courtyard by Marriott New Haven at Yale, 30 Whalley Ave, New Haven, CT 06511" },
      plan: [
        ["Drive", "Newport to New Haven, about 2 hr 15 min, 125 mi."],
        ["Visit", "Old Campus, Sterling Memorial Library, and the Yale University Art Gallery (free)."],
        ["Hotel", "Courtyard by Marriott New Haven at Yale, 30 Whalley Ave. One night."],
        ["Parking", "On-site $25/day."]
      ],
      sights: [
        { name: "Yale Old Campus and Sterling Memorial Library", wiki: "Sterling_Memorial_Library", q: "Sterling Memorial Library, 120 High St, New Haven, CT", blurb: "Sterling is a cathedral built for books, worth the detour on its own. Old Campus is where freshmen live." },
        { name: "Yale University Art Gallery", wiki: "Yale_University_Art_Gallery", q: "Yale University Art Gallery, 1111 Chapel St, New Haven, CT", blurb: "The oldest university art museum in the western hemisphere, and free. A quiet highlight." },
        { name: "Wooster Street apizza", wiki: "New_Haven-style_pizza", q: "Wooster Street, New Haven, CT", blurb: "New Haven is, by wide agreement, the best pizza city in America. A sightseeing item in its own right (see the table below)." }
      ],
      food: [
        { name: "Frank Pepe Pizzeria", kind: "amer", tag: "Apizza", blurb: "The 1925 original. The coal-fired white clam pie is the order, the dish New Haven is famous for. Expect a line, the takeaway window next door is faster.", meta: "4.5 stars . $$ . 157 Wooster St", q: "Frank Pepe Pizzeria Napoletana, 157 Wooster St, New Haven, CT" },
        { name: "Zeneli Pizzeria", kind: "amer", tag: "Neapolitan", blurb: "If the Pepe line is brutal, this Wooster St neighbor is the highest-rated pizza in town: true Neapolitan, fresh pastas.", meta: "4.8 stars . $$ . 138 Wooster St", q: "Zeneli Pizzeria e Cucina Napoletana, 138 Wooster St, New Haven, CT" }
      ],
      timed: []
    },

    {
      n: 6, date: "Jul 3", dateLong: "Friday, July 3", dow: "Fri", art: "princeton",
      acc: { l:'#e77500', li:'#9c4d00', d:'#ff9e3d', di:'#ffb468' }, motif: 'tiger',
      tours: [
        { school: "Princeton", url: "https://apply.princeton.edu/portal/orange_key_tour", note: "Register for the Orange Key tour. July 3 may fall on the observed holiday closure, so confirm a slot exists; the campus grounds and Nassau Hall are walkable regardless." }
      ],
      city: "Princeton", title: "Princeton", tagline: "Nassau Hall and the orange bubble",
      pin: 5, coords: [40.3487, -74.6593],
      drive: { from: "New Haven", to: "Princeton", miles: "120 mi", time: "about 2 hr 15 min" },
      hotel: { name: "The Westin Princeton at Forrestal Village", addr: "201 Village Blvd, Princeton, NJ 08540", parking: "On-site", nights: "1 night", q: "The Westin Princeton at Forrestal Village, 201 Village Blvd, Princeton, NJ 08540" },
      plan: [
        ["Drive", "New Haven to Princeton, about 2 hr 15 min, 120 mi."],
        ["Visit", "Nassau Hall, the University Chapel, and the Princeton University Art Museum."],
        ["History", "Nassau Hall briefly held the U.S. capital in 1783, when the Continental Congress met here."],
        ["Hotel", "The Westin Princeton at Forrestal Village, 201 Village Blvd. One night."]
      ],
      sights: [
        { name: "Nassau Hall", wiki: "Nassau_Hall", q: "Nassau Hall, Princeton University, Princeton, NJ", blurb: "When it was built in 1756 it was the largest stone building in the colonies. It served as the U.S. Capitol for four months in 1783, when the Continental Congress met here." },
        { name: "Princeton University Chapel and Art Museum", wiki: "Princeton_University_Chapel", q: "Princeton University Chapel, Princeton, NJ", blurb: "The chapel is one of the largest collegiate churches in the world, and the newly rebuilt art museum reopened in 2025." },
        { name: "Princeton Battlefield", wiki: "Princeton_Battlefield", q: "Princeton Battlefield State Park, Princeton, NJ", blurb: "Washington's January 1777 victory turned the Revolution's momentum. The field is a short drive from campus." }
      ],
      food: [
        { name: "Agricola Eatery", kind: "amer", tag: "Farm to table", blurb: "Princeton's signature farm-to-table room on Witherspoon St: seasonal, fresh, reliably good. Reserve for a Friday.", meta: "4.5 stars . $$$ . 11 Witherspoon St", q: "Agricola Eatery, 11 Witherspoon St, Princeton, NJ" },
        { name: "The Meeting House", kind: "amer", tag: "American", blurb: "Relaxed New American with the best patio in town, half a mile from campus. Easy parking.", meta: "4.3 stars . $$ . 277 Witherspoon St", q: "The Meeting House, 277 Witherspoon St, Princeton, NJ" }
      ],
      timed: []
    },

    {
      n: 7, date: "Jul 4", dateLong: "Saturday, July 4", dow: "Sat", art: "philly",
      acc: { l:'#b31942', li:'#a3173b', d:'#ff5366', di:'#ff8597' }, motif: 'stars',
      city: "Philadelphia", title: "Philadelphia, Independence Day", tagline: "The birthplace, on the 250th Fourth",
      pin: 6, coords: [39.9489, -75.1500], feature: true,
      drive: { from: "Princeton", to: "Philadelphia", miles: "45 mi", time: "about 1 hr" },
      hotel: { name: "Sheraton Philadelphia University City", addr: "3549 Chestnut St, Philadelphia, PA 19104", parking: "On-site", nights: "2 nights", q: "Sheraton Philadelphia University City Hotel, 3549 Chestnut St, Philadelphia, PA 19104" },
      plan: [
        ["Drive", "Princeton to Philadelphia, about 1 hr, 45 mi. Leave early, road closures."],
        ["Do", "Independence Hall, the Liberty Bell, and the Party on the Parkway concert and fireworks."],
        ["Hotel", "Sheraton Philadelphia University City, 3549 Chestnut St. Two nights."],
        ["Note", "Steps from Penn, an ideal base for the program drop-off."]
      ],
      sights: [
        { name: "Independence Hall", wiki: "Independence_Hall", q: "Independence Hall, 520 Chestnut St, Philadelphia, PA", star: "free, no ticket Jul 1 to 4", blurb: "The room where both the Declaration (1776) and the Constitution (1787) were signed. Free, and over the holiday (July 1 to 4, 2026) no timed ticket is needed, so you can just walk up. Go early to get ahead of the crowds and security lines." },
        { name: "The Liberty Bell", wiki: "Liberty_Bell", q: "Liberty Bell Center, 526 Market St, Philadelphia, PA", blurb: "Across the street, free, no ticket. Go early to beat the holiday crowds." },
        { name: "First Bank of the United States", wiki: "First_Bank_of_the_United_States", q: "First Bank of the United States, 116 S 3rd St, Philadelphia, PA", star: "new for 2026", blurb: "Reopening to the public for the first time in about 50 years on July 1, 2026, with new exhibits on Hamilton and the nation's first financial system." },
        { name: "Museum of the American Revolution", wiki: "Museum_of_the_American_Revolution", q: "Museum of the American Revolution, 101 S 3rd St, Philadelphia, PA", blurb: "The best single museum for the full story. Washington's actual field tent is the centerpiece." }
      ],
      food: [
        { name: "White Dog Cafe", kind: "amer", tag: "American", blurb: "A University City classic right by Penn: farm-to-table, quirky multi-room space, great for a celebratory family dinner. Walkable from the Sheraton.", meta: "4.4 stars . $$$ . 3420 Sansom St", q: "White Dog Cafe, 3420 Sansom St, Philadelphia, PA" },
        { name: "Reading Terminal Market", kind: "asia", tag: "Lunch", blurb: "Not dinner, but do not miss it: a historic market hall with Pennsylvania Dutch stalls, Chinatown-adjacent counters, and a Philly cheesesteak in one place. A great cheap lunch.", meta: "12th & Arch . open daytime", q: "Reading Terminal Market, 1136 Arch St, Philadelphia, PA" }
      ],
      timed: [
        { when: "Jul 4 evening", title: "Party on the Parkway", text: "Wawa Welcome America closes with a major free concert and fireworks over the Philadelphia Museum of Art (the Rocky steps). This is the place to be in the country on July 4, 2026. No ticket required, but the Parkway fills early, so stake out a spot in the afternoon.", wiki: "Wawa_Welcome_America", q: "Benjamin Franklin Parkway, Philadelphia, PA" },
        { when: "Jul 4 daytime", title: "National time capsule", text: "A national time capsule is to be buried on Independence Mall as part of the federal ceremony. Expect heavy security and street closures across Old City and the Parkway, so build extra time into every plan that day.", q: "Independence Mall, Philadelphia, PA" }
      ]
    },

    {
      n: 8, date: "Jul 5", dateLong: "Sunday, July 5", dow: "Sun", art: "penn",
      acc: { l:'#990000', li:'#8f0000', d:'#ec5a6e', di:'#f2899a' }, motif: 'crest',
      tours: [
        { school: "Penn", url: "https://key.admissions.upenn.edu/portal/campus-visit", note: "July 5 is a Sunday with no guided tour, so use the year-round self-guided campus tour for drop-off, or book a separate weekday guided slot." }
      ],
      city: "Philadelphia", title: "Penn Drop-Off", tagline: "Alrisha begins, program starts Jul 5",
      pin: null, coords: [39.9522, -75.1932],
      hotel: { name: "Sheraton Philadelphia University City", addr: "3549 Chestnut St, Philadelphia, PA 19104", parking: "On-site", nights: "night 2 of 2", q: "Sheraton Philadelphia University City Hotel, 3549 Chestnut St, Philadelphia, PA 19104" },
      plan: [
        ["Morning", "Settle Alrisha into the Penn summer program."],
        ["Afternoon", "Explore the Penn campus, Locust Walk, and the Penn Museum."],
        ["Car", "Return the Avis SUV to PHL this evening, to avoid a 4 AM rental return."],
        ["Lodging", "Last Sheraton University City night, or relocate to a PHL airport hotel (see notes)."]
      ],
      sights: [
        { name: "University of Pennsylvania and Wharton", wiki: "University_of_Pennsylvania", q: "University of Pennsylvania, Philadelphia, PA", blurb: "Locust Walk runs through the heart of campus. This is Alrisha's summer home for the weeks ahead." },
        { name: "Penn Museum", wiki: "University_of_Pennsylvania_Museum_of_Archaeology_and_Anthropology", q: "Penn Museum, 3260 South St, Philadelphia, PA", blurb: "The Penn Museum's antiquities collection is world-class: a Sphinx of Ramesses II, royal tombs of Ur, and galleries spanning the ancient world." }
      ],
      food: [
        { name: "Louie Louie", kind: "amer", tag: "Brasserie", blurb: "Polished French-American brasserie on Walnut St, steps from campus. A lighter, livelier option for the second night.", meta: "4.2 stars . $$ . 3611 Walnut St", q: "Louie Louie, 3611 Walnut St, Philadelphia, PA" }
      ],
      timed: []
    },

    {
      n: 9, date: "Jul 6", dateLong: "Monday, July 6", dow: "Mon", art: "home",
      acc: { l:'#2b6cb0', li:'#1e5a96', d:'#74b0e8', di:'#97c6ef' }, motif: 'plane',
      city: "Home", title: "Fly Home", tagline: "PHL to SFO, party of three",
      pin: null, coords: [39.8729, -75.2437],
      hotel: null,
      plan: [
        ["Pre-dawn", "Leave for PHL by 4:15 AM, for security and boarding."],
        ["Flight", "UA 2661, depart 6:00 AM ET, arrive 8:58 AM PT."],
        ["Home", "Back in the Bay Area before noon."]
      ],
      sights: [],
      food: [],
      timed: []
    }
  ]
};
