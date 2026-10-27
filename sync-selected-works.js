const fs = require('fs');
const path = require('path');
const { projects } = require('./projects-data');

// 1. Calculate category counts
const counts = { all: projects.length, branding: 0, motion: 0, '3d': 0, print: 0, editing: 0 };
projects.forEach(p => {
  const cats = p.category.split(' ');
  cats.forEach(c => {
    if (counts[c] !== undefined) counts[c]++;
  });
});

console.log('Category Counts:', counts);

// 2. Generate rows HTML for #project-list-wrapper
const rowsHtml = projects.map(p => {
  return `                    <!-- ${p.id}. ${p.title} -->
                    <article data-category="${p.category}" data-image="${p.image}" data-title="${p.title}"
                        data-client="${p.client}" data-year="${p.year}" data-deliverables="${p.deliverables}"
                        data-badge="${p.shortDesc || p.badgeText}"
                        data-url="${p.url}"
                        class="project-row group border-t border-brand-border transition-colors duration-200">
                        <a href="${p.url}"
                            class="py-5 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-3 focus:outline-none group-hover:bg-brand-surface-alt/60 px-2 sm:px-4 rounded-xl transition-all">
                            <div class="flex items-start sm:items-center gap-4 sm:gap-6 min-w-0">
                                <span class="font-mono text-xs sm:text-sm text-brand-muted group-hover:text-brand-accent transition-colors">${p.id}.</span>
                                <div>
                                    <h3 class="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-brand-dark group-hover:text-brand-accent transition-colors">
                                        ${p.title}
                                    </h3>
                                    <div class="flex flex-wrap items-center gap-2 mt-1 md:hidden">
                                        <span class="px-2 py-0.5 rounded-full bg-brand-surface-alt text-[10px] font-mono text-brand-dark uppercase">${p.badgeText}</span>
                                        <span class="text-xs font-mono text-brand-muted">${p.year}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="hidden md:flex items-center gap-6 text-xs font-mono">
                                <span class="px-3 py-1 rounded-full bg-brand-surface-alt text-brand-dark font-medium border border-brand-border">${p.badgeText}</span>
                                <span class="text-brand-muted">${p.client} // ${p.year}</span>
                                <span class="text-lg text-brand-dark group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true">↗</span>
                            </div>
                        </a>
                    </article>`;
}).join('\n\n');

// 3. Generate cards HTML for #work-grid-view (for index.html & home.html)
const cardsHtml = projects.map(p => {
  return `                <!-- Card ${p.id}: ${p.title} -->
                <article data-category="${p.category}"
                    class="project-grid-item group bg-brand-card rounded-2xl border border-brand-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-dark/40 flex flex-col">
                    <a href="${p.url}"
                        class="block relative aspect-[4/5] bg-brand-surface-alt overflow-hidden focus:outline-none">
                        <img src="${p.image}" alt="${p.title}" loading="lazy"
                            class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700">
                        <span
                            class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-dark/85 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                            ${p.badgeText}
                        </span>
                        <div
                            class="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            ↗
                        </div>
                    </a>
                    <div class="p-5 flex flex-col flex-grow justify-between bg-white border-t border-brand-border">
                        <div>
                            <span class="text-[11px] font-mono text-brand-muted">${p.client} • ${p.year}</span>
                            <h3
                                class="text-xl font-black uppercase tracking-tight mt-1 text-brand-dark group-hover:text-brand-accent transition-colors">
                                ${p.title}
                            </h3>
                            <p class="text-xs text-brand-muted mt-2 line-clamp-2">
                                ${p.description}
                            </p>
                        </div>
                        <a href="${p.url}"
                            class="mt-4 pt-3 border-t border-brand-border flex items-center justify-between text-xs font-mono font-bold uppercase text-brand-dark group-hover:text-brand-accent transition-colors">
                            <span>Explore Project</span>
                            <span>↗</span>
                        </a>
                    </div>
                </article>`;
}).join('\n\n');

// 4. Marquee string (ordered as requested)
const marqueeContent = `                    <span class="mx-4">[ PUBLICIS-WBC ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ GIORGIO ARMANI ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ AXA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ NESTLÉ ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ AFCON 2025 ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ TAOUS ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ L'ORÉAL GROUP ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ ALX AFRICA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ MAHINDRA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ YAMED ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ ICE ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ WAFA IMA ASSISTANCE ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ CLARRE VEGAN ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ SPEEDY ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ MOROCCAN OLIVE OIL ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ PERSONAL WORKS ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ BRANDING / MOTION / 3D / PRINT / EDITING ]</span>
                    <span class="text-brand-accent">★</span>
                    <!-- Loop repeat for smooth seamless marquee -->
                    <span class="mx-4">[ PUBLICIS-WBC ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ GIORGIO ARMANI ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ AXA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ NESTLÉ ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ AFCON 2025 ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ TAOUS ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ L'ORÉAL GROUP ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ ALX AFRICA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ MAHINDRA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ YAMED ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ ICE ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ WAFA IMA ASSISTANCE ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ CLARRE VEGAN ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ SPEEDY ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ MOROCCAN OLIVE OIL ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ PERSONAL WORKS ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ BRANDING / MOTION / 3D / PRINT / EDITING ]</span>
                    <span class="text-brand-accent">★</span>`;

const thumbnailsArrayStr = `const PROJECT_THUMBNAILS = [\n` +
  projects.map(p => `            '${p.image}'`).join(',\n') +
  `\n        ];`;

// Helper: update tab counts in HTML
function updateTabCounts(html) {
  html = html.replace(/(<button[^>]*id="tab-all"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.all}$2`);
  html = html.replace(/(<button[^>]*id="tab-branding"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.branding}$2`);
  html = html.replace(/(<button[^>]*id="tab-motion"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.motion}$2`);
  html = html.replace(/(<button[^>]*id="tab-3d"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts['3d']}$2`);
  html = html.replace(/(<button[^>]*id="tab-print"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.print}$2`);
  html = html.replace(/(<button[^>]*id="tab-editing"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.editing}$2`);
  return html;
}

// Helper: replace #project-list-wrapper
function updateListWrapper(html) {
  const startTag = '<div class="flex flex-col border-b border-brand-border" id="project-list-wrapper">';
  const startIndex = html.indexOf(startTag);
  if (startIndex === -1) {
    console.warn('Could not find startTag for #project-list-wrapper');
    return html;
  }

  // Look for end before desktop-live-preview
  const previewIndex = html.indexOf('id="desktop-live-preview"', startIndex);
  if (previewIndex === -1) {
    console.warn('Could not find desktop-live-preview');
    return html;
  }

  // Find the last </div> before previewIndex
  const closingDivIndex = html.lastIndexOf('</div>', previewIndex);
  if (closingDivIndex === -1) {
    console.warn('Could not find closing </div> for #project-list-wrapper');
    return html;
  }

  const before = html.substring(0, startIndex + startTag.length);
  const after = html.substring(closingDivIndex);

  return `${before}\n\n${rowsHtml}\n\n                ${after}`;
}

// Helper: update #work-grid-view in index.html & home.html
function updateGridView(html) {
  const startTag = '<div id="work-grid-view" class="hidden mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">';
  const startIndex = html.indexOf(startTag);
  if (startIndex === -1) {
    console.warn('Could not find #work-grid-view');
    return html;
  }

  // Find the closing </div> of #work-grid-view
  const aboutIndex = html.indexOf('id="about"', startIndex);
  if (aboutIndex === -1) {
    console.warn('Could not find #about section after #work-grid-view');
    return html;
  }

  // Find the closing tag before #about
  const sectionCloseIndex = html.lastIndexOf('</section>', aboutIndex);
  const gridCloseIndex = html.lastIndexOf('</div>', sectionCloseIndex);

  const before = html.substring(0, startIndex + startTag.length);
  const after = html.substring(gridCloseIndex);

  return `${before}\n\n${cardsHtml}\n\n            ${after}`;
}

// Helper: update specific project stage metadata in project subpages
function updateProjectStageMetadata(html, p) {
  // 1. Title tag
  html = html.replace(/<title>.*?<\/title>/, `<title>${p.title} — Anass Biyguise</title>`);

  // 2. Breadcrumb title
  html = html.replace(/(<span class="text-brand-dark font-bold uppercase">)[^<]*(<\/span>)/g, `$1${p.title}$2`);

  // 3. Discipline badge in stage
  html = html.replace(/(<!-- Discipline Badge -->[\s\S]*?<span class="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" aria-hidden="true"><\/span>\s*<span>)[^<]*(<\/span>)/, `$1${p.badgeText}$2`);

  // 4. Project title in stage (h1)
  html = html.replace(/(<!-- Project Title -->[\s\S]*?<h1 class="text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight text-brand-dark mb-6">)[\s\S]*?(<\/h1>)/, `$1\n                            ${p.title}\n                        $2`);

  // 5. Metadata Table: Client
  html = html.replace(/(<span class="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted">Client<\/span>\s*<span class="text-xs font-mono font-bold text-brand-dark group-hover:text-brand-accent transition-colors">)[^<]*(<\/span>)/, `$1${p.client}$2`);

  // 6. Metadata Table: Year
  html = html.replace(/(<span class="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted">Year<\/span>\s*<span class="text-xs font-mono font-bold text-brand-dark group-hover:text-brand-accent transition-colors">)[^<]*(<\/span>)/, `$1${p.year}$2`);

  // 7. Metadata Table: Deliverables
  html = html.replace(/(<span class="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted">Deliverables<\/span>\s*<span class="text-xs font-mono font-bold text-brand-dark group-hover:text-brand-accent transition-colors text-right">)[^<]*(<\/span>)/, `$1${p.deliverables}$2`);

  // 8. Main image alt text
  html = html.replace(/(<img id="main-image" alt=")[^"]*(")/, `$1${p.title} visual preview$2`);

  return html;
}

// 5. Update index.html and home.html
['index.html', 'home.html'].forEach(filepath => {
  if (!fs.existsSync(filepath)) return;
  let html = fs.readFileSync(filepath, 'utf8');

  // Hero counter
  html = html.replace(/<strong class="text-brand-accent font-bold">\d+<\/strong> Projects Curated/g,
    `<strong class="text-brand-accent font-bold">${counts.all}</strong> Projects Curated`);

  // Marquee
  const tickerRegex = /<div class="animate-ticker text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">[\s\S]*?<\/div>/;
  if (tickerRegex.test(html)) {
    html = html.replace(tickerRegex, `<div class="animate-ticker text-xs sm:text-sm font-mono font-bold uppercase tracking-wider">\n${marqueeContent}\n                </div>`);
  }

  // Preload
  const preloadRegex = /const PROJECT_THUMBNAILS = \[[\s\S]*?\];/;
  html = html.replace(preloadRegex, thumbnailsArrayStr);

  html = updateTabCounts(html);
  html = updateListWrapper(html);
  html = updateGridView(html);

  fs.writeFileSync(filepath, html, 'utf8');
  console.log(`Updated homepage: ${filepath}`);
});

// 6. Update all project HTML files (strictly single index.html per project)
const projectFileMappings = [
  { file: 'armani/index.html', slug: 'armani' },
  { file: 'axa/index.html', slug: 'axa' },
  { file: 'nestle/index.html', slug: 'nestle' },
  { file: 'caf/index.html', slug: 'caf' },
  { file: 'taous/index.html', slug: 'taous' },
  { file: 'loreal/index.html', slug: 'loreal' },
  { file: 'alx/index.html', slug: 'alx' },
  { file: 'mahindra/index.html', slug: 'mahindra' },
  { file: 'yamed/index.html', slug: 'yamed' },
  { file: 'ice/index.html', slug: 'ice' },
  { file: 'wafa-ima/index.html', slug: 'wafa-ima' },
  { file: 'clarre/index.html', slug: 'clarre' },
  { file: 'speedy/index.html', slug: 'speedy' },
  { file: 'moroccan-olive-oil/index.html', slug: 'moroccan-olive-oil' },
  { file: 'personal/index.html', slug: 'personal' }
];

projectFileMappings.forEach(({ file, slug }) => {
  if (!fs.existsSync(file)) {
    console.warn(`File does not exist: ${file}`);
    return;
  }
  let html = fs.readFileSync(file, 'utf8');

  // Update tab counts
  html = updateTabCounts(html);

  // Update #project-list-wrapper
  html = updateListWrapper(html);

  // Update stage metadata for this specific project
  const projectObj = projects.find(p => p.slug === slug);
  if (projectObj) {
    html = updateProjectStageMetadata(html, projectObj);
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log(`Updated project file: ${file}`);
});

console.log('Successfully synchronized Selected Works across all pages!');
