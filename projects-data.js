const fs = require('fs');
const path = require('path');

// 14 master portfolio projects definition
const projects = [
  {
    id: '01',
    slug: 'armani',
    folder: 'armani',
    url: '/armani',
    title: 'Giorgio Armani',
    client: 'Giorgio Armani',
    year: '2024',
    category: '3d editing',
    badgeText: '3D / CGI',
    deliverables: 'CGI Luxury Packshot, Lighting',
    image: '/armani/armani.jpg',
    description: 'A photorealistic 3D product visualization for Giorgio Armani beauty packaging. Designed with precision physics simulations, microscopic surface texturing, and studio-grade cinematic lighting.',
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1025241625?fl=pl&fe=sh', thumb: '/armani/armani-img1.jpg', alt: 'Armani CGI Packshot' }
    ]
  },
  {
    id: '02',
    slug: 'caf',
    folder: 'caf',
    url: '/caf',
    title: 'AFCON 2025 (CAF)',
    client: 'TotalEnergies CAF',
    year: '2026',
    category: 'print editing',
    badgeText: 'Print Collateral',
    deliverables: 'Official Print Identity, Stadium Collateral',
    image: '/caf/caf.jpg',
    description: 'Comprehensive stadium collateral and official print design system for the Africa Cup of Nations Morocco 2025, celebrating pan-African athletic excellence through dynamic typography and vibrant cultural patterns.',
    media: [
      { type: 'image', src: '/caf/caf-img2.jpg', thumb: '/caf/caf-img2.jpg', alt: 'AFCON 2025 Stadium Print' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1180949504?fl=pl&fe=sh', thumb: '/caf/caf-img1.jpg', alt: 'AFCON 2025 Motion Identity' }
    ]
  },
  {
    id: '03',
    slug: 'ice',
    folder: 'ice',
    url: '/ice',
    title: 'ICE',
    client: 'Personal Studio',
    year: '2026',
    category: 'branding 3d',
    badgeText: 'Branding & 3D',
    deliverables: 'Branding, 3D Typography, Spatial Art',
    image: '/ice/ice.jpg',
    description: 'An experimental brand identity exploration combining organic frosted geometry, parametric typography, and spatial lighting mechanics to evoke sensory temperature contrast.',
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1184048530?fl=pl&fe=sh', thumb: '/ice/ice-img1.jpg', alt: 'ICE 3D Motion Identity' }
    ]
  },
  {
    id: '04',
    slug: 'axa',
    folder: 'axa',
    url: '/axa',
    title: 'AXA Global',
    client: 'AXA Global',
    year: 'Ongoing',
    category: 'branding motion',
    badgeText: 'Motion & Branding',
    deliverables: 'Motion Design, Vehicle Wraps, Social Campaign',
    image: '/axa/axa.jpg',
    description: 'Comprehensive brand and motion design across national auto insurance campaigns, tramway vehicle wraps, UI motion for the MyAXA app, and multi-format digital social campaigns.',
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237583080?fl=pl&fe=sh', thumb: '/axa/video-2025-thumb.jpg', alt: 'AXA CampagneAuto 2025' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237582541?fl=pl&fe=sh', thumb: '/axa/video-2024-thumb.jpg', alt: 'AXA CampagneAuto 2024' },
      { type: 'image', src: '/axa/tram.jpg', thumb: '/axa/tram.jpg', alt: 'AXA Tramway Campaign Visuals' },
      { type: 'image', src: '/axa/social.jpg', thumb: '/axa/social.jpg', alt: 'AXA Social Media Grid' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1097831551?fl=pl&fe=sh', thumb: '/axa/video-myaxa-thumb.jpg', alt: 'MyAXA Motion Branding' }
    ]
  },
  {
    id: '05',
    slug: 'loreal',
    folder: 'loreal',
    url: '/loreal',
    title: "L'Oréal Group",
    client: "L'Oréal (LRP, Vichy, CeraVe)",
    year: '2024 - 2026',
    category: '3d motion branding',
    badgeText: '3D Packshots & Motion',
    deliverables: 'CGI Product Packshots, Commercial Motion, Social Grids',
    image: '/loreal/loreal.jpg',
    description: "Multidisciplinary art direction and 3D visual production for L'Oréal active cosmetics divisions, including La Roche-Posay (Effaclar, Anthelios UVMune 400), Vichy Dercos 2-in-1 Reveal, and CeraVe campaign activations.",
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237658736?fl=pl&fe=sh', thumb: '/loreal/video-effaclar-thumb.jpg', alt: 'La Roche-Posay Effaclar Campaign' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237660002?fl=pl&fe=sh', thumb: '/loreal/video-vichy-dercos-thumb.jpg', alt: 'Vichy Dercos Commercial' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237662484?fl=pl&fe=sh', thumb: '/loreal/video-anthelios-thumb.jpg', alt: 'ANTHELIOS UVMUNE 400 CGI' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237662781?fl=pl&fe=sh', thumb: '/loreal/video-corpo-thumb.jpg', alt: "L'Oréal Corporate Brand Film" },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1101152674?fl=pl&fe=sh', thumb: '/loreal/video-dercos-2en1-thumb.jpg', alt: 'Vichy Dercos 2En 1 REVEAL' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/997369361?fl=pl&fe=sh', thumb: '/loreal/video-larocheposay-cgi-thumb.jpg', alt: 'La Roche-Posay Fluid CGI' },
      { type: 'image', src: '/loreal/lrp-social.jpg', thumb: '/loreal/lrp-social.jpg', alt: 'La Roche-Posay Social Assets' },
      { type: 'image', src: '/loreal/vichy-social.jpg', thumb: '/loreal/vichy-social.jpg', alt: 'Vichy Social Campaign' },
      { type: 'image', src: '/loreal/cerave-social.jpg', thumb: '/loreal/cerave-social.jpg', alt: 'CeraVe Social Design' },
      { type: 'image', src: '/loreal/lrp-img1.jpg', thumb: '/loreal/lrp-img1.jpg', alt: 'LRP Out-of-Home Campaign' }
    ]
  },
  {
    id: '06',
    slug: 'clarre',
    folder: 'clarre',
    url: '/clarre',
    title: 'Clarre Vegan',
    client: 'Clarre Vegan',
    year: '2024',
    category: '3d motion',
    badgeText: '3D Motion & Packaging',
    deliverables: '3D Packaging, Kinetic Typography, Product Reveal',
    image: '/clarre/clarre.jpg',
    description: 'High-end cosmetic CGI sequence spotlighting clean, organic beauty formulation through plant-derived fluid physics, ultra-tactile glass refraction, and rhythmic kinetic reveals.',
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1083914194?fl=pl&fe=sh', thumb: '/clarre/clarre-img1.jpg', alt: 'Clarre Vegan Product Reveal' },
      { type: 'image', src: '/clarre/clarre-img2.jpg', thumb: '/clarre/clarre-img2.jpg', alt: 'Clarre Glass Refraction Packshot' },
      { type: 'image', src: '/clarre/clarre-img3.jpg', thumb: '/clarre/clarre-img3.jpg', alt: 'Clarre Botanical Packaging' }
    ]
  },
  {
    id: '07',
    slug: 'mahindra',
    folder: 'mahindra',
    url: '/mahindra',
    title: 'Mahindra Auto',
    client: 'Mahindra Morocco',
    year: '2024 - 2026',
    category: 'branding print motion',
    badgeText: 'Automotive Motion & Print',
    deliverables: 'XUV 3XO Motion Film, Print Posters, Social Campaigns',
    image: '/mahindra/mahindra.jpg',
    description: 'Comprehensive automotive advertising direction for Mahindra Morocco, featuring cinematic launch motion for the XUV 3XO SUV, national print billboard campaign collateral, and seasonal digital activations.',
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237668658?fl=pl&fe=sh', thumb: '/mahindra/video-xuv3xo-thumb.jpg', alt: 'Mahindra XUV 3XO Motion Film' },
      { type: 'image', src: '/mahindra/XUV300 Post .png', thumb: '/mahindra/XUV300 Post .png', alt: 'Mahindra XUV 300 Visual' },
      { type: 'image', src: '/mahindra/Affiche page offre.png', thumb: '/mahindra/Affiche page offre.png', alt: 'Mahindra National Campaign Poster' },
      { type: 'image', src: '/mahindra/post 4.png', thumb: '/mahindra/post 4.png', alt: 'Mahindra Digital Promotion Grid' },
      { type: 'image', src: '/mahindra/mahindra-img1.jpg', thumb: '/mahindra/mahindra-img1.jpg', alt: 'Mahindra Dealership Print Catalog' },
      { type: 'image', src: '/mahindra/mahindra-img5.jpg', thumb: '/mahindra/mahindra-img5.jpg', alt: 'Mahindra Brand Visual Guidelines' }
    ]
  },
  {
    id: '08',
    slug: 'personal',
    folder: 'personal',
    url: '/personal',
    title: 'Personal CGI & Motion',
    client: 'Self-Initiated Works',
    year: '2024 - 2026',
    category: '3d motion editing',
    badgeText: 'Surreal CGI & Direction',
    deliverables: 'Experimental 3D Simulations, Surreal Saga, Cultural CGI',
    image: '/personal/personal.jpg',
    description: 'An evolving anthology of personal artistic research in surrealist 3D motion, computational sculpture, Moroccan cultural tributes (Taxi Inzegan, Wa Hia Sinia, WRDA), and advanced kinetic choreography.',
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1201537330?fl=pl&fe=sh', thumb: '/personal/video-rainbow-room-thumb.jpg', alt: 'Rainbow Room' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/917192343?fl=pl&fe=sh', thumb: '/personal/video-revelation-thumb.jpg', alt: 'Revelation' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/920540915?fl=pl&fe=sh', thumb: '/personal/video-staunch-thumb.jpg', alt: 'Staunch Sculptures Process' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1073133814?fl=pl&fe=sh', thumb: '/personal/video-wa-hia-sinia-thumb.jpg', alt: 'Wa Hia Sinia' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1068690847?fl=pl&fe=sh', thumb: '/personal/video-taxi-inzegan-thumb.jpg', alt: 'Taxi Inzegan' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1068691553?fl=pl&fe=sh', thumb: '/personal/video-eau-de-vert-thumb.jpg', alt: 'Eau De Vert' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1073126297?fl=pl&fe=sh', thumb: '/personal/video-bioty-darling-thumb.jpg', alt: 'Bioty Darling' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237692930?fl=pl&fe=sh', thumb: '/personal/video-wrda-thumb.jpg', alt: 'WRDA' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/912024046?fl=pl&fe=sh', thumb: '/personal/video-surreal-saga-thumb.jpg', alt: 'Surreal Saga Trailer' }
    ]
  },
  {
    id: '09',
    slug: 'alx',
    folder: 'alx',
    url: '/alx',
    title: 'ALX Africa',
    client: 'ALX Global',
    year: '2024 - 2026',
    category: 'branding motion editing print',
    badgeText: 'Brand Identity & Motion',
    deliverables: 'AI for Creatives Commercial, Editorial Design, Social Campaigns',
    image: '/alx/alx.jpg',
    description: 'Dynamic brand campaigns and educational tech motion design for ALX Africa, including the flagship "AI for Creatives" motion sequence, social media design frameworks, and print publications.',
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237690955?fl=pl&fe=sh', thumb: '/alx/video-ai-2024-thumb.jpg', alt: 'ALX - AI for Creatives 2024' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1025241946?fl=pl&fe=sh', thumb: '/alx/alx-img1.jpg', alt: 'ALX Creative Motion Identity' },
      { type: 'image', src: '/alx/alx-img2.jpg', thumb: '/alx/alx-img2.jpg', alt: 'ALX Editorial System' },
      { type: 'image', src: '/alx/alx-img3.jpg', thumb: '/alx/alx-img3.jpg', alt: 'ALX Visual Communication' }
    ]
  },
  {
    id: '10',
    slug: 'speedy',
    folder: 'speedy',
    url: '/speedy',
    title: 'Speedy Auto',
    client: 'Speedy Morocco',
    year: '2025',
    category: '3d motion print',
    badgeText: '3D CGI & Summer Campaign',
    deliverables: '3D CGI Commercial, Campaign Posters, Social Assets',
    image: '/speedy/speedy.png',
    description: 'A playful surreal 3D CGI campaign for Speedy auto centers featuring a pool sculpted in the silhouette of a mechanical wrench, highlighting summertime vehicle diagnostics and service specials.',
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237687389?fl=pl&fe=sh', thumb: '/speedy/video-speedy-thumb.jpg', alt: 'Speedy Commercial Motion' },
      { type: 'image', src: '/speedy/check-up.png', thumb: '/speedy/check-up.png', alt: 'Speedy Check-Up 3D Poster' },
      { type: 'image', src: '/speedy/vidange.png', thumb: '/speedy/vidange.png', alt: 'Speedy Vidange Campaign' },
      { type: 'image', src: '/speedy/vitres.png', thumb: '/speedy/vitres.png', alt: 'Speedy Traitement Vitres' },
      { type: 'image', src: '/speedy/Screenshot 2026-10-19 210523.png', thumb: '/speedy/Screenshot 2026-10-19 210523.png', alt: 'Speedy Seasonal Promotion' }
    ]
  },
  {
    id: '11',
    slug: 'yamed',
    folder: 'yamed',
    url: '/yamed',
    title: 'Yamed Promotion',
    client: 'Yamed Group',
    year: '2025 - 2026',
    category: 'branding motion print',
    badgeText: 'Luxury Real Estate',
    deliverables: 'Architectural Video Tours, Luxury Editorial, Social Media',
    image: '/yamed/yamed.png',
    description: 'Premium branding and architectural cinematic motion for Yamed Promotion luxury residential developments, showcasing "Résidence Les Sources", "VILLA 28", and "Terre Océane" residences with refined editorial typography.',
    media: [
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237688326?fl=pl&fe=sh', thumb: '/yamed/video-sources-thumb.jpg', alt: 'Résidence Les Sources Tour' },
      { type: 'vimeo', src: 'https://player.vimeo.com/video/1237688920?fl=pl&fe=sh', thumb: '/yamed/video-villa28-thumb.jpg', alt: 'VILLA 28 Motion Showcase' },
      { type: 'image', src: '/yamed/post2.png', thumb: '/yamed/post2.png', alt: 'Terre Océane Editorial Visual' },
      { type: 'image', src: '/yamed/post7.png', thumb: '/yamed/post7.png', alt: 'Yamed Architecture Showcase' },
      { type: 'image', src: '/yamed/c2698 Post 03_.png', thumb: '/yamed/c2698 Post 03_.png', alt: 'Yamed Prestige Living' },
      { type: 'image', src: '/yamed/post10.png', thumb: '/yamed/post10.png', alt: 'Yamed Digital Campaign' }
    ]
  },
  {
    id: '12',
    slug: 'moroccan-olive-oil',
    folder: 'Moroccan Olive Oil',
    url: '/moroccan-olive-oil',
    title: 'Moroccan Olive Oil (MOO)',
    client: 'Morocco Kingdom of Taste',
    year: '2025',
    category: 'branding 3d print',
    badgeText: 'Luxury Packaging & 3D',
    deliverables: 'Label Design, Marble & Botanical CGI Packshot, Brand Identity',
    image: '/Moroccan Olive Oil/moo.png',
    description: 'Art direction and packaging design for Moroccan Olive Oil (MOO) under the "Morocco Kingdom of Taste" collective mark. Styled with Italian Carrara marble pedestals, fresh olive branches, and geometric heritage backdrops.',
    media: [
      { type: 'image', src: '/Moroccan Olive Oil/1.png', thumb: '/Moroccan Olive Oil/1.png', alt: 'MOO Extra Virgin Olive Oil Bottle Packshot' },
      { type: 'image', src: '/Moroccan Olive Oil/2.png', thumb: '/Moroccan Olive Oil/2.png', alt: 'MOO Heritage Packaging Front View' },
      { type: 'image', src: '/Moroccan Olive Oil/3.png', thumb: '/Moroccan Olive Oil/3.png', alt: 'MOO Premium Label Gold Foil Detail' },
      { type: 'image', src: '/Moroccan Olive Oil/4.png', thumb: '/Moroccan Olive Oil/4.png', alt: 'MOO Editorial Brand Campaign' }
    ]
  },
  {
    id: '13',
    slug: 'nan-nido',
    folder: 'NAN - NIDO',
    url: '/nan-nido',
    title: 'Nestlé (NAN & NIDO)',
    client: 'Nestlé Nutrition',
    year: '2025',
    category: '3d branding',
    badgeText: '3D Retail & POS Design',
    deliverables: 'Supermarket POS Display Architecture, Packshots, Digital Toolkits',
    image: '/NAN - NIDO/nan-nido.png',
    description: 'Retail spatial architecture, POS display stands, and nutritional packaging 3D packshots for Nestlé NAN OPTIPRO and NIDO infant nutrition ranges across Middle East and North Africa retail outlets.',
    media: [
      { type: 'image', src: '/NAN - NIDO/1.png', thumb: '/NAN - NIDO/1.png', alt: 'Nestlé NAN 3 OPTIPRO Retail POS Display Stand' },
      { type: 'image', src: '/NAN - NIDO/2.png', thumb: '/NAN - NIDO/2.png', alt: 'Nestlé POS Display Angle View' },
      { type: 'image', src: '/NAN - NIDO/3.png', thumb: '/NAN - NIDO/3.png', alt: 'Nestlé Retail Merchandising Detail' },
      { type: 'image', src: '/NAN - NIDO/1x1display vf 1.png', thumb: '/NAN - NIDO/1x1display vf 1.png', alt: 'NAN Display Square Campaign Format' },
      { type: 'image', src: '/NAN - NIDO/toolkit vf 1.png', thumb: '/NAN - NIDO/toolkit vf 1.png', alt: 'Nestlé Digital Campaign Toolkit 1' },
      { type: 'image', src: '/NAN - NIDO/toolkit vf 3.png', thumb: '/NAN - NIDO/toolkit vf 3.png', alt: 'Nestlé Digital Campaign Toolkit 3' }
    ]
  },
  {
    id: '14',
    slug: 'wafa-ima',
    folder: 'Wafa IMA Assistance',
    url: '/wafa-ima',
    title: 'Wafa IMA Assistance',
    client: 'Wafa IMA Assistance',
    year: '2025 - 2026',
    category: 'branding print',
    badgeText: 'National Campaign & Ads',
    deliverables: 'Outdoor Advertising, National Holiday Posters, Auto Premium Campaign',
    image: '/Wafa IMA Assistance/wafa.png',
    description: 'National print advertising and creative direction for Wafa IMA Assistance, spanning Wafa Auto Premium roadside assistance campaigns, international student coverage, and commemorative national holiday posters.',
    media: [
      { type: 'image', src: '/Wafa IMA Assistance/wafa auto premium.png', thumb: '/Wafa IMA Assistance/wafa auto premium.png', alt: 'Wafa Auto Premium Roadside Campaign' },
      { type: 'image', src: '/Wafa IMA Assistance/wafa étudiant expartié.png', thumb: '/Wafa IMA Assistance/wafa étudiant expartié.png', alt: 'Wafa Étudiant Expatrié Assistance' },
      { type: 'image', src: '/Wafa IMA Assistance/marche verte.png', thumb: '/Wafa IMA Assistance/marche verte.png', alt: 'Wafa Marche Verte Commemorative Poster' },
      { type: 'image', src: '/Wafa IMA Assistance/victoire.png', thumb: '/Wafa IMA Assistance/victoire.png', alt: 'Wafa Victoire Sports Campaign' }
    ]
  }
];

module.exports = { projects };
