const fs = require('fs');
const { projects } = require('./projects-data');

function generateWorkSection() {
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

const { counts, rowsHtml, cardsHtml } = generateWorkSection();

const marqueeContent = `                    <span class="mx-4">[ PUBLICIS-WBC ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ AFCON 2025 • CAF ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ GIORGIO ARMANI ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ L'ORÉAL GROUP ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ AXA GLOBAL ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ SPEEDY AUTO ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ MAHINDRA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ YAMED PROMOTION ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ WAFA IMA ASSISTANCE ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ NESTLÉ NAN & NIDO ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ MOROCCAN OLIVE OIL ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ ALX AFRICA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ BRANDING / MOTION / 3D / PRINT / EDITING ]</span>
                    <span class="text-brand-accent">★</span>
                    <!-- Loop repeat for smooth seamless marquee -->
                    <span class="mx-4">[ PUBLICIS-WBC ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ AFCON 2025 • CAF ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ GIORGIO ARMANI ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ L'ORÉAL GROUP ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ AXA GLOBAL ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ SPEEDY AUTO ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ MAHINDRA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ YAMED PROMOTION ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ WAFA IMA ASSISTANCE ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ NESTLÉ NAN & NIDO ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ MOROCCAN OLIVE OIL ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ ALX AFRICA ]</span>
                    <span class="text-brand-accent">★</span>
                    <span class="mx-4">[ BRANDING / MOTION / 3D / PRINT / EDITING ]</span>
                    <span class="text-brand-accent">★</span>`;

const thumbnailsArrayStr = `const PROJECT_THUMBNAILS = [\n` +
  projects.map(p => `            '${p.image}'`).join(',\n') +
  `\n        ];`;

['index.html', 'home.html'].forEach(filename => {
  let content = fs.readFileSync(filename, 'utf8');

  // 1. Marquee
  const marqueeRegex = /<!-- Seamless Animated Client & Capabilities Marquee -->[\s\S]*?<div class="marquee-content flex items-center whitespace-nowrap text-xs font-mono font-bold tracking-widest text-brand-dark py-3">([\s\S]*?)<\/div>\s*<\/aside>/;
  content = content.replace(marqueeRegex, (match) => {
    return `<!-- Seamless Animated Client & Capabilities Marquee -->
            <aside aria-label="Selected client portfolio and core capabilities ticker"
                class="overflow-hidden border-t border-b border-brand-border bg-brand-surface-alt/80">
                <div
                    class="marquee-content flex items-center whitespace-nowrap text-xs font-mono font-bold tracking-widest text-brand-dark py-3">
${marqueeContent}
                </div>
            </aside>`;
  });

  // 2. Tab counts
  content = content.replace(/(<button[^>]*id="tab-all"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.all}$2`);
  content = content.replace(/(<button[^>]*id="tab-branding"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.branding}$2`);
  content = content.replace(/(<button[^>]*id="tab-motion"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.motion}$2`);
  content = content.replace(/(<button[^>]*id="tab-3d"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts['3d']}$2`);
  content = content.replace(/(<button[^>]*id="tab-print"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.print}$2`);
  content = content.replace(/(<button[^>]*id="tab-editing"[^>]*>[\s\S]*?<span[^>]*class="tab-count[^>]*>)\d+(<\/span>)/, `$1${counts.editing}$2`);

  // 3. List View
  const listRegex = /<div class="flex flex-col border-b border-brand-border" id="project-list-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<!-- ================================================================= -->\s*<!-- VIEW MODE 2: VISUAL CARD GRID/;
  content = content.replace(listRegex, `<div class="flex flex-col border-b border-brand-border" id="project-list-wrapper">\n\n${rowsHtml}\n\n                </div>\n            </div>\n\n            <!-- ================================================================= -->\n            <!-- VIEW MODE 2: VISUAL CARD GRID`);

  // 4. Grid View
  const gridRegex = /<div id="project-grid-wrapper"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;
  content = content.replace(gridRegex, `<div id="project-grid-wrapper"\n                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">\n\n${cardsHtml}\n\n            </div>\n        </div>\n    </section>`);

  // 5. Preload array
  const preloadRegex = /const PROJECT_THUMBNAILS = \[[\s\S]*?\];/;
  content = content.replace(preloadRegex, thumbnailsArrayStr);

  fs.writeFileSync(filename, content, 'utf8');
  console.log(`Updated ${filename} with all 14 projects!`);
});
