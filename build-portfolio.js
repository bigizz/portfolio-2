const fs = require('fs');
const path = require('path');
const { projects } = require('./projects-data');

// Base template: we read axa/index.html to extract the styles, header, footer, modal, and script structures
const baseHtml = fs.readFileSync('axa/index.html', 'utf8');

function buildWorkSectionHtml() {
  const counts = { all: projects.length, branding: 0, motion: 0, '3d': 0, print: 0, editing: 0 };
  projects.forEach(p => {
    const cats = p.category.split(' ');
    cats.forEach(c => {
      if (counts[c] !== undefined) counts[c]++;
    });
  });

  // Table rows
  const rowsHtml = projects.map(p => {
    return `                    <!-- ${p.id}. ${p.title} -->
                    <article data-category="${p.category}" data-image="${p.image}" data-title="${p.title}"
                        data-client="${p.client}" data-year="${p.year}" data-deliverables="${p.deliverables}"
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

  // Grid cards
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
                            class="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-brand-dark flex items-center justify-center text-sm shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white">
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
                        <div class="pt-4 mt-4 border-t border-brand-border flex items-center justify-between text-xs font-mono">
                            <span class="text-brand-dark font-medium">${p.deliverables.split(',')[0]}</span>
                            <a href="${p.url}"
                                class="text-brand-accent font-bold hover:underline inline-flex items-center gap-1">
                                <span>Case Study</span>
                                <span>↗</span>
                            </a>
                        </div>
                    </div>
                </article>`;
  }).join('\n\n');

  return { counts, rowsHtml, cardsHtml };
}

const { counts, rowsHtml, cardsHtml } = buildWorkSectionHtml();

function renderProjectPage(p) {
  // Build thumbnail buttons
  const thumbBtns = p.media.map((m, idx) => {
    const isFirst = idx === 0;
    const borderClass = isFirst ? 'border-brand-dark' : 'border-transparent opacity-60';
    const grayClass = isFirst ? '' : 'grayscale';
    const playOverlay = m.type === 'vimeo' ? `
                        <div class="absolute inset-0 flex items-center justify-center bg-black/30 m-1 rounded-lg">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </div>` : '';

    return `                    <!-- ${String(idx + 1).padStart(2, '0')}. ${m.alt} -->
                    <button onclick="changeMainMedia('${m.type}', '${m.src}', this)"
                        class="thumb-btn group relative w-16 lg:w-full aspect-square bg-white border-2 ${borderClass} p-1 rounded-xl hover:border-brand-accent transition-all flex-shrink-0 focus:outline-none shadow-sm"
                        aria-label="${m.alt}">
                        <img src="${m.thumb}" alt="${m.alt}" loading="lazy" class="w-full h-full object-cover rounded-lg ${grayClass} group-hover:grayscale-0">
                        ${playOverlay}
                    </button>`;
  }).join('\n\n');

  // Initial media display
  const firstMedia = p.media[0];
  const initialImgDisplay = firstMedia.type === 'image' ? `src="${firstMedia.src}" class="max-w-full max-h-full object-contain rounded-2xl drop-shadow-2xl transition-transform duration-700 hover:scale-[1.01] border border-brand-border"` : `src="" class="hidden max-w-full max-h-full object-contain rounded-2xl drop-shadow-2xl transition-transform duration-700 hover:scale-[1.01] border border-brand-border"`;
  const initialVideoWrapper = firstMedia.type === 'vimeo' ? `class="w-full max-w-full aspect-video relative rounded-2xl overflow-hidden shadow-2xl border border-brand-border bg-black"` : `class="hidden w-full max-w-full aspect-video relative rounded-2xl overflow-hidden shadow-2xl border border-brand-border bg-black"`;
  const initialVideoSrc = firstMedia.type === 'vimeo' ? firstMedia.src : '';

  // Arrows visibility: if only 1 media item, arrows and pill are hidden
  const hideControls = p.media.length <= 1 ? 'style="display: none;"' : '';

  // Extract head, header, footer, modals, and interaction logic from baseHtml
  let html = baseHtml;

  // 1. Update Title and Meta
  html = html.replace(/<title>.*?<\/title>/, `<title>${p.title} — Anass Biyguise</title>`);
  html = html.replace(/<span class="text-brand-dark font-bold uppercase">AXA Global<\/span>/g, `<span class="text-brand-dark font-bold uppercase">${p.title}</span>`);

  // 2. Update Discipline Badge in Stage
  html = html.replace(/<span>Motion & Branding<\/span>/, `<span>${p.badgeText}</span>`);

  // 3. Update Project Title in Stage
  html = html.replace(/<h1 class="text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight text-brand-dark mb-6">\s*AXA Global\s*<\/h1>/,
    `<h1 class="text-4xl sm:text-5xl xl:text-6xl font-black uppercase tracking-tight text-brand-dark mb-6">\n                            ${p.title}\n                        </h1>`);

  // 4. Update Project Description in Stage
  html = html.replace(/<p class="text-brand-muted font-normal text-sm sm:text-base leading-relaxed mb-8">\s*My ongoing work with AXA[\s\S]*?<\/p>/,
    `<p class="text-brand-muted font-normal text-sm sm:text-base leading-relaxed mb-8">\n                            ${p.description}\n                        </p>`);

  // 5. Update Metadata Table
  const metaTablePattern = /<!-- Metadata Table -->[\s\S]*?<!-- Action Trigger:/;
  const newMetaTable = `<!-- Metadata Table -->
                    <div class="w-full border-t border-brand-border mb-8 text-left">
                        <div class="py-4 border-b border-brand-border flex justify-between items-center group cursor-default transition-all">
                            <span class="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted">Client</span>
                            <span class="text-xs font-mono font-bold text-brand-dark group-hover:text-brand-accent transition-colors">${p.client}</span>
                        </div>
                        
                        <div class="py-4 border-b border-brand-border flex justify-between items-center group cursor-default transition-all">
                            <span class="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted">Year</span>
                            <span class="text-xs font-mono font-bold text-brand-dark group-hover:text-brand-accent transition-colors">${p.year}</span>
                        </div>

                        <div class="py-4 border-b border-brand-border flex justify-between items-center group cursor-default transition-all">
                            <span class="text-xs font-mono font-bold uppercase tracking-widest text-brand-muted">Deliverables</span>
                            <span class="text-xs font-mono font-bold text-brand-dark group-hover:text-brand-accent transition-colors text-right">${p.deliverables}</span>
                        </div>
                    </div>

                    <!-- Action Trigger:`;
  html = html.replace(metaTablePattern, newMetaTable);

  // 6. Update Thumbnails Switcher & Media Stage Row
  const stageSectionPattern = /<!-- Thumbnails Switcher -->[\s\S]*?<!-- Right: Editorial Project Info & Metadata -->/;
  const newStageSection = `<!-- Thumbnails Switcher -->
                <div class="flex flex-row lg:flex-col gap-3 w-full lg:w-20 flex-shrink-0 overflow-x-auto lg:overflow-y-auto no-scrollbar pb-2 lg:pb-0 z-10">
${thumbBtns}
                </div>

                <!-- Main Active Media Stage with Prev/Next Navigation in Empty Sides -->
                <div class="flex-1 flex flex-col items-center justify-center relative w-full h-[50vh] lg:h-full pb-4 lg:pb-0 min-w-0">
                    
                    <!-- Media Stage Row: Left Arrow | Centered Media | Right Arrow -->
                    <div class="w-full flex-1 flex items-center justify-between gap-2 sm:gap-4 relative min-w-0 min-h-0">
                        
                        <!-- Prev Media Arrow (Left empty side) -->
                        <button type="button" onclick="navigateMedia(-1)" ${hideControls}
                            class="media-nav-btn flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-brand-accent text-brand-dark hover:text-white backdrop-blur-md border border-brand-border shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none group cursor-pointer z-20"
                            aria-label="Previous project media">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-x-0.5">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                        </button>

                        <!-- Centered Media Viewer (Constrained between the arrows) -->
                        <div class="flex-1 h-full max-h-[calc(100svh-12rem)] flex items-center justify-center relative min-w-0 min-h-0 overflow-hidden">
                            <img id="main-image" alt="${p.title} visual preview" ${initialImgDisplay}>
                            <div id="main-video-wrapper" ${initialVideoWrapper}>
                                <iframe id="main-video" src="${initialVideoSrc}" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full bg-black"></iframe>
                            </div>
                        </div>

                        <!-- Next Media Arrow (Right empty side, invites scrolling) -->
                        <button type="button" onclick="navigateMedia(1)" ${hideControls}
                            class="media-nav-btn invite-pulse flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-brand-accent text-brand-dark hover:text-white backdrop-blur-md border border-brand-border shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none group cursor-pointer z-20"
                            aria-label="Next project media">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-0.5">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </button>
                    </div>

                    <!-- Media Counter Pill (Positioned cleanly below media, no overlay) -->
                    <div id="media-counter-pill" ${hideControls} class="mt-3 flex-shrink-0 flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-brand-border shadow-sm text-xs font-mono font-bold text-brand-dark select-none transition-all">
                        <span class="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" aria-hidden="true"></span>
                        <span id="media-counter-current" class="text-brand-dark font-black">01</span>
                        <span class="text-brand-muted">/</span>
                        <span id="media-counter-total" class="text-brand-muted">${String(p.media.length).padStart(2, '0')}</span>
                        <span class="text-[10px] text-brand-muted font-normal uppercase tracking-wider hidden sm:inline ml-0.5">Media</span>
                    </div>
                </div>
            </div>

            <!-- Right: Editorial Project Info & Metadata -->`;
  html = html.replace(stageSectionPattern, newStageSection);

  // 7. Update Filter tab counts
  html = html.replace(/<span class="tab-count text-\[10px\] px-1\.5 py-0\.2 rounded-full bg-brand-border text-brand-dark font-normal">11<\/span>/g,
    `<span class="tab-count text-[10px] px-1.5 py-0.2 rounded-full bg-brand-border text-brand-dark font-normal">${counts.all}</span>`);

  // 8. Replace Selected Work list and grid
  const listWrapperPattern = /<div class="flex flex-col border-b border-brand-border" id="project-list-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<!-- Grid View/;
  html = html.replace(listWrapperPattern, `<div class="flex flex-col border-b border-brand-border" id="project-list-wrapper">\n\n${rowsHtml}\n\n                </div>\n            </div>\n\n            <!-- Grid View`);

  const gridWrapperPattern = /<div id="project-grid-wrapper"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
  html = html.replace(gridWrapperPattern, `<div id="project-grid-wrapper"\n                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">\n\n${cardsHtml}\n\n            </div>\n        </div>\n    </section>`);

  return html;
}

// Generate files for all 14 projects
projects.forEach(p => {
  const content = renderProjectPage(p);
  const targetDir = path.resolve(p.folder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // 1. index.html in project folder
  const indexFile = path.join(targetDir, 'index.html');
  fs.writeFileSync(indexFile, content, 'utf8');

  // 2. <slug>.html in project folder (e.g. loreal.html, mahindra.html, etc.)
  const slugFile = path.join(targetDir, `${p.slug}.html`);
  fs.writeFileSync(slugFile, content, 'utf8');

  console.log(`Generated: ${indexFile} and ${slugFile}`);
});

console.log('All 14 project pages successfully generated and synchronized!');
