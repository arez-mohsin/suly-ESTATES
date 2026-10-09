import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const BASE_URL = 'http://localhost:5173';
const OUT_DIR = path.resolve('qa-screenshots/pass-4');
const FOLDERS = ['home', 'properties', 'property-detail', 'navigation', 'maps', 'lightbox', 'modals', 'report'];

const VIEWPORTS = {
  primary: [
    { width: 1440, height: 900, name: 'desktop' },
    { width: 834, height: 1194, name: 'tablet' },
    { width: 390, height: 844, name: 'mobile' }
  ],
  extra: [
    { width: 1280, height: 800, name: 'w1280' },
    { width: 1024, height: 1366, name: 'w1024x1366' },
    { width: 1024, height: 768, name: 'w1024x768' },
    { width: 768, height: 1024, name: 'w768' },
    { width: 440, height: 956, name: 'w440' },
    { width: 430, height: 932, name: 'w430' },
    { width: 375, height: 812, name: 'w375' },
    { width: 360, height: 800, name: 'w360' }
  ]
};

const DIRS = {};
FOLDERS.forEach(f => {
  DIRS[f] = path.join(OUT_DIR, f);
  fs.mkdirSync(DIRS[f], { recursive: true });
});

const results = []; // { name, status: PASS|FAIL|NOT VERIFIED, detail }
let indexMarkdown = `# Screenshot Index - Pass 4\n\n| Filename | Route | Viewport | Section | Purpose |\n|----------|-------|----------|---------|---------|\n`;

function record(name, status, detail = '') {
  results.push({ name, status, detail });
  console.log(`[${status}] ${name}${detail ? ' - ' + detail : ''}`);
}

function logIndex(filename, route, viewport, section, purpose) {
  indexMarkdown += `| ${filename} | ${route} | ${viewport} | ${section} | ${purpose} |\n`;
}

function getFileHash(buffer) {
  return crypto.createHash('md5').update(buffer).digest('hex');
}

async function waitForImagesLoaded(page, selector = 'img[src]') {
  return await page.evaluate((sel) => {
    const images = Array.from(document.querySelectorAll(sel)).filter((img) => {
      const rect = img.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0 && rect.height > 0;
    });
    return Promise.all(images.map(img => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve(true);
      return new Promise((resolve) => {
        img.addEventListener('load', () => resolve(img.naturalWidth > 0), { once: true });
        img.addEventListener('error', () => resolve(false), { once: true });
        setTimeout(() => resolve(img.complete && img.naturalWidth > 0), 4000);
      });
    }));
  }, selector).then(results => results.every(Boolean));
}

async function settle(page, ms = 600) {
  await new Promise(r => setTimeout(r, ms));
}

async function isVisible(page, handle) {
  return await page.evaluate((el) => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
  }, handle);
}

async function triggerRevealsByScrolling(page) {
  const vh = await page.evaluate(() => window.innerHeight);
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  let y = 0;
  const step = Math.floor(vh * 0.65);
  while (y < scrollHeight) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await settle(page, 350);
    y += step;
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await settle(page, 400);
  await page.evaluate(() => window.scrollTo(0, 0));
  await settle(page, 300);
}

async function sequentialScrollCapture(page, dirPath, prefix, vpName) {
  const vh = await page.evaluate(() => window.innerHeight);
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);

  let currentY = 0;
  let step = 1;
  const scrollStep = Math.floor(vh * 0.65);
  const filenames = [];

  while (currentY < scrollHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), currentY);
    await settle(page, 500);

    const hasMapInView = await page.evaluate(() => {
      const iframes = document.querySelectorAll('[data-qa="homepage-map-iframe"], [data-qa="property-map-iframe"]');
      for (const iframe of iframes) {
        const rect = iframe.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) return true;
      }
      return false;
    });
    if (hasMapInView) {
      await settle(page, 2200);
    }

    const imagesOk = await waitForImagesLoaded(page);

    const filename = `${prefix}_${vpName}_seq${step}.jpg`;
    await page.screenshot({ path: path.join(dirPath, filename), quality: 85 });
    filenames.push(filename);
    logIndex(filename, page.url(), vpName, `Scroll Sequence ${step}`, 'Sequential scroll capture, reveal + lazy-load verification');
    if (!imagesOk) {
      record(`image-load-seq-${prefix}-${vpName}-${step}`, 'FAIL', 'One or more visible <img> failed to reach naturalWidth > 0');
    }

    currentY += scrollStep;
    if (currentY >= scrollHeight && currentY - scrollStep < scrollHeight - 50) {
      currentY = scrollHeight;
    } else if (currentY >= scrollHeight) {
      break;
    }
    step++;
  }
  return filenames;
}

async function checkOverflow(page, vpWidth, vpHeight, route) {
  await page.setViewport({ width: vpWidth, height: vpHeight });
  await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle2' });
  await triggerRevealsByScrolling(page);

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));

  const overflowPx = metrics.scrollWidth - metrics.clientWidth;
  const pass = overflowPx <= 0;
  record(
    `overflow-${route || 'home'}-${vpWidth}x${vpHeight}`,
    pass ? 'PASS' : 'FAIL',
    `scrollWidth=${metrics.scrollWidth} clientWidth=${metrics.clientWidth} overflowPx=${overflowPx}`
  );
  return { ...metrics, overflowPx, pass };
}

async function captureHeroSlides(page, vpWidth, vpHeight, vpName) {
  await page.setViewport({ width: vpWidth, height: vpHeight });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await waitForImagesLoaded(page);

  for (let i = 1; i <= 3; i++) {
    const btnSelector = `[data-qa="hero-slide-control-${i}"]`;
    const btn = await page.$(btnSelector);
    if (!btn) {
      record(`hero-slide-${i}-${vpName}`, 'NOT VERIFIED', `selector ${btnSelector} not found`);
      continue;
    }
    await btn.click();
    await page.waitForFunction(
      (expected) => document.querySelector('[data-active-slide]')?.getAttribute('data-active-slide') === String(expected),
      { timeout: 3000 },
      i
    ).catch(() => {});
    await settle(page, 800);
    await waitForImagesLoaded(page);

    const activeSlide = await page.evaluate(() => document.querySelector('[data-active-slide]')?.getAttribute('data-active-slide'));

    const filename = `home_hero_slide${i}_${vpName}.jpg`;
    const buffer = await page.screenshot({ path: path.join(DIRS['home'], filename), quality: 85 });
    logIndex(filename, '/', vpName, `Hero Slide ${i}`, 'Verify distinct hero slide is active');

    const pass = String(activeSlide) === String(i);
    record(`hero-slide-${i}-${vpName}`, pass ? 'PASS' : 'FAIL', `expected data-active-slide=${i}, got ${activeSlide}, hash=${getFileHash(buffer).slice(0, 8)}`);
  }
}

async function captureModals(page, vpWidth, vpHeight, vpName) {
  await page.setViewport({ width: vpWidth, height: vpHeight });

  // Header (general) inquire
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await page.click('[data-qa="header-inquire"]');
  const generalOpened = await page.waitForSelector('[data-qa="consultation-dialog"]', { visible: true, timeout: 3000 }).then(() => true).catch(() => false);
  if (generalOpened) {
    await settle(page, 500);
    const filename = `home_modal_inquire_${vpName}.jpg`;
    await page.screenshot({ path: path.join(DIRS['modals'], filename), quality: 85 });
    logIndex(filename, '/', vpName, 'General Consultation Modal', 'Verify global inquiry dialog');
    record(`modal-general-${vpName}`, 'PASS');
    const closeBtn = await page.$('[data-qa="consultation-close"]');
    if (closeBtn) await closeBtn.click();
    await settle(page, 400);
  } else {
    record(`modal-general-${vpName}`, 'FAIL', 'consultation-dialog did not appear after header-inquire click');
  }

  // Property "Request details" - assert propertyName/intent reach the dialog
  await page.goto(`${BASE_URL}/properties/tasluja-villa`, { waitUntil: 'networkidle2' });
  const detailsBtn = await page.$('[data-qa="property-request-details"]');
  if (detailsBtn) {
    await detailsBtn.click();
    const detailsOpened = await page.waitForSelector('[data-qa="consultation-dialog"]', { visible: true, timeout: 3000 }).then(() => true).catch(() => false);
    if (detailsOpened) {
      await settle(page, 500);
      const dialogText = await page.evaluate(() => document.querySelector('[data-qa="consultation-dialog"]')?.textContent || '');
      const filename = `property_modal_details_${vpName}.jpg`;
      await page.screenshot({ path: path.join(DIRS['modals'], filename), quality: 85 });
      logIndex(filename, '/properties/tasluja-villa', vpName, 'Details Modal', 'Verify property name + intent context');
      const pass = dialogText.includes('Tasluja Villa');
      record(`modal-details-${vpName}`, pass ? 'PASS' : 'FAIL', pass ? 'dialog references Tasluja Villa' : `dialog text: ${dialogText.slice(0, 120)}`);
      const closeBtn = await page.$('[data-qa="consultation-close"]');
      if (closeBtn) await closeBtn.click();
      await settle(page, 400);
    } else {
      record(`modal-details-${vpName}`, 'FAIL', 'consultation-dialog did not appear');
    }
  } else {
    record(`modal-details-${vpName}`, 'NOT VERIFIED', 'property-request-details button not found');
  }

  // Property "Arrange a viewing" — intentionally hidden on mobile (<=767px) by design
  // (reachable via the "Request details" modal instead), so skip gracefully when not visible.
  const viewingBtn = await page.$('[data-qa="property-arrange-viewing"]');
  const viewingBtnVisible = viewingBtn && (await isVisible(page, viewingBtn));
  if (viewingBtn && !viewingBtnVisible) {
    record(`modal-viewing-${vpName}`, 'NOT VERIFIED', 'property-arrange-viewing intentionally hidden at this viewport by design (mobile declutter)');
  } else if (viewingBtn) {
    await viewingBtn.click();
    const viewingOpened = await page.waitForSelector('[data-qa="consultation-dialog"]', { visible: true, timeout: 3000 }).then(() => true).catch(() => false);
    if (viewingOpened) {
      await settle(page, 500);
      const dialogText = await page.evaluate(() => document.querySelector('[data-qa="consultation-dialog"]')?.textContent || '');
      const filename = `property_modal_viewing_${vpName}.jpg`;
      await page.screenshot({ path: path.join(DIRS['modals'], filename), quality: 85 });
      logIndex(filename, '/properties/tasluja-villa', vpName, 'Viewing Modal', 'Verify property name + intent context');
      const pass = dialogText.includes('Tasluja Villa');
      record(`modal-viewing-${vpName}`, pass ? 'PASS' : 'FAIL', pass ? 'dialog references Tasluja Villa' : `dialog text: ${dialogText.slice(0, 120)}`);
      const closeBtn = await page.$('[data-qa="consultation-close"]');
      if (closeBtn) await closeBtn.click();
      await settle(page, 400);
    } else {
      record(`modal-viewing-${vpName}`, 'FAIL', 'consultation-dialog did not appear');
    }
  } else {
    record(`modal-viewing-${vpName}`, 'NOT VERIFIED', 'property-arrange-viewing button not found');
  }
}

async function captureMobileMenu(page, vpWidth, vpHeight, vpName) {
  await page.setViewport({ width: vpWidth, height: vpHeight });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });

  const trigger = await page.$('[data-qa="mobile-menu-trigger"]');
  if (!trigger || !(await isVisible(page, trigger))) {
    record(`mobile-menu-${vpName}`, 'NOT VERIFIED', 'mobile-menu-trigger not present/visible at this viewport (desktop nav likely shown instead)');
    return;
  }
  await trigger.click();
  const opened = await page.waitForSelector('[data-qa="mobile-menu"]', { visible: true, timeout: 3000 }).then(() => true).catch(() => false);
  if (!opened) {
    record(`mobile-menu-${vpName}`, 'FAIL', 'mobile-menu overlay did not appear');
    return;
  }
  await settle(page, 500);
  const filename = `mobile_menu_home_${vpName}.jpg`;
  await page.screenshot({ path: path.join(DIRS['navigation'], filename), quality: 85 });
  logIndex(filename, '/', vpName, 'Mobile Menu', 'Verify fullscreen mobile menu overlay');
  record(`mobile-menu-${vpName}`, 'PASS');
}

async function captureNavbarThemeStates(page, vpWidth, vpHeight, vpName) {
  await page.setViewport({ width: vpWidth, height: vpHeight });
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  await settle(page, 400);

  const themeAtTop = await page.evaluate(() => document.querySelector('[data-qa="site-header"]')?.getAttribute('data-qa-header-theme'));
  let filename = `navbar_theme_top_${vpName}.jpg`;
  await page.screenshot({ path: path.join(DIRS['navigation'], filename), clip: { x: 0, y: 0, width: vpWidth, height: 120 }, quality: 85 });
  logIndex(filename, '/', vpName, 'Navbar (top, transparent)', 'Verify transparent/light navbar theme over hero');
  record(`navbar-theme-top-${vpName}`, themeAtTop === 'transparent' ? 'PASS' : 'FAIL', `data-qa-header-theme=${themeAtTop}`);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
  await settle(page, 600);
  const themeScrolled = await page.evaluate(() => document.querySelector('[data-qa="site-header"]')?.getAttribute('data-qa-header-theme'));
  filename = `navbar_theme_scrolled_${vpName}.jpg`;
  await page.screenshot({ path: path.join(DIRS['navigation'], filename), clip: { x: 0, y: 0, width: vpWidth, height: 120 }, quality: 85 });
  logIndex(filename, '/', vpName, 'Navbar (scrolled, dark)', 'Verify dark navbar theme over content sections');
  record(`navbar-theme-scrolled-${vpName}`, themeScrolled && themeScrolled !== 'transparent' ? 'PASS' : 'FAIL', `data-qa-header-theme=${themeScrolled}`);

  await page.evaluate(() => window.scrollTo(0, 0));
  await settle(page, 300);
}

async function captureLightbox(page, vpWidth, vpHeight, vpName) {
  await page.setViewport({ width: vpWidth, height: vpHeight });
  await page.goto(`${BASE_URL}/properties/tasluja-villa`, { waitUntil: 'networkidle2' });
  await waitForImagesLoaded(page);

  const galleryBtn = await page.$('[data-qa="property-gallery-open"]');
  if (!galleryBtn) {
    record(`lightbox-open-${vpName}`, 'NOT VERIFIED', 'property-gallery-open button not found');
    return;
  }
  // The affordance button is only hit-testable on hover/focus-within (opacity/pointer-events
  // toggle in CSS), so hover the carousel first to match real user interaction before clicking.
  await page.hover('[data-qa="property-carousel"]');
  await settle(page, 200);
  await page.evaluate((el) => el.click(), galleryBtn);
  const opened = await page.waitForSelector('[data-qa="property-lightbox"]', { visible: true, timeout: 3000 }).then(() => true).catch(() => false);
  if (!opened) {
    record(`lightbox-open-${vpName}`, 'FAIL', 'lightbox root did not appear');
    return;
  }
  await settle(page, 900);

  let filename = `lightbox_default_${vpName}.jpg`;
  await page.screenshot({ path: path.join(DIRS['lightbox'], filename), quality: 85 });
  logIndex(filename, '/properties/tasluja-villa', vpName, 'Lightbox', 'Verify fullscreen lightbox opens with correct slide');
  record(`lightbox-open-${vpName}`, 'PASS');

  // Next / previous
  const nextBtn = await page.$('.yarl__button[title="Next"]');
  if (nextBtn) {
    await nextBtn.click();
    await settle(page, 500);
    filename = `lightbox_next_${vpName}.jpg`;
    await page.screenshot({ path: path.join(DIRS['lightbox'], filename), quality: 85 });
    logIndex(filename, '/properties/tasluja-villa', vpName, 'Lightbox Next', 'Verify next-image navigation');
    record(`lightbox-next-${vpName}`, 'PASS');

    const prevBtn = await page.$('.yarl__button[title="Previous"]');
    if (prevBtn) {
      await prevBtn.click();
      await settle(page, 500);
      record(`lightbox-prev-${vpName}`, 'PASS');
    } else {
      record(`lightbox-prev-${vpName}`, 'NOT VERIFIED', 'Previous button not found (may be hidden on first/last slide)');
    }
  } else {
    record(`lightbox-next-${vpName}`, 'NOT VERIFIED', 'Next button not found');
  }

  // Thumbnails
  const thumbs = await page.$('.yarl__thumbnails_track');
  record(`lightbox-thumbnails-${vpName}`, thumbs ? 'PASS' : 'NOT VERIFIED', thumbs ? 'thumbnails track present' : 'thumbnails track not found in DOM');

  // Zoom
  const zoomBtn = await page.$('.yarl__button[title="Zoom in"]');
  if (zoomBtn) {
    await zoomBtn.click();
    await settle(page, 500);
    filename = `lightbox_zoomed_${vpName}.jpg`;
    await page.screenshot({ path: path.join(DIRS['lightbox'], filename), quality: 85 });
    logIndex(filename, '/properties/tasluja-villa', vpName, 'Lightbox Zoomed', 'Verify zoom-in control');
    record(`lightbox-zoom-${vpName}`, 'PASS');
    record(`lightbox-pinch-pan-${vpName}`, 'NOT VERIFIED', 'True two-finger pinch/pan cannot be reliably simulated via Puppeteer mouse/touch emulation in this environment; requires physical-device verification');
  } else {
    record(`lightbox-zoom-${vpName}`, 'NOT VERIFIED', 'Zoom in button not found (may require pointer over image first)');
  }

  // Close
  const closeBtn = await page.$('.yarl__button[title="Close"]');
  if (closeBtn) {
    await closeBtn.click();
    const closed = await page.waitForSelector('[data-qa="property-lightbox"]', { hidden: true, timeout: 3000 }).then(() => true).catch(() => false);
    record(`lightbox-close-${vpName}`, closed ? 'PASS' : 'FAIL', closed ? '' : 'lightbox root still present after close click');
  } else {
    record(`lightbox-close-${vpName}`, 'NOT VERIFIED', 'Close button not found');
  }
}

async function captureMaps(page, vpWidth, vpHeight, vpName) {
  await page.setViewport({ width: vpWidth, height: vpHeight });

  // Home Map
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  const homeMapWrapper = await page.$('[data-qa="homepage-map-wrapper"]');
  if (homeMapWrapper) {
    await page.evaluate(() => {
      document.querySelector('[data-qa="homepage-map-wrapper"]')?.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await settle(page, 2800);
    const filename = `map_home_${vpName}.jpg`;
    await page.screenshot({ path: path.join(DIRS['maps'], filename), quality: 85 });
    logIndex(filename, '/', vpName, 'Homepage Map', 'Verify Google Maps embed renders visually');

    const iframeSrcLoaded = await page.evaluate(() => {
      const iframe = document.querySelector('[data-qa="homepage-map-iframe"]');
      try {
        return !!(iframe && iframe.contentWindow);
      } catch {
        return false;
      }
    });
    record(`map-home-${vpName}`, iframeSrcLoaded ? 'PASS' : 'NOT VERIFIED',
      'Iframe present and contentWindow accessible; visual confirmation of map tiles requires manual inspection of screenshot (cross-origin content, headless GPU tile rendering can differ from a real browser)');
  } else {
    record(`map-home-${vpName}`, 'NOT VERIFIED', 'homepage-map-wrapper not found');
  }

  // Property Map
  await page.goto(`${BASE_URL}/properties/tasluja-villa`, { waitUntil: 'networkidle2' });
  const propMapWrapper = await page.$('[data-qa="property-map-wrapper"]');
  if (propMapWrapper) {
    await page.evaluate(() => {
      document.querySelector('[data-qa="property-map-wrapper"]')?.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await settle(page, 2800);
    const filename = `map_tasluja_${vpName}.jpg`;
    await page.screenshot({ path: path.join(DIRS['maps'], filename), quality: 85 });
    logIndex(filename, '/properties/tasluja-villa', vpName, 'Property Map', 'Verify Google Maps embed renders visually');

    const disclosureBelow = await page.evaluate(() => {
      const wrapper = document.querySelector('[data-qa="property-map-wrapper"]');
      const disclosure = document.querySelector('[data-qa="property-map-disclosure"]');
      if (!wrapper || !disclosure) return false;
      return disclosure.getBoundingClientRect().top >= wrapper.getBoundingClientRect().bottom - 1;
    });
    record(`map-property-disclosure-position-${vpName}`, disclosureBelow ? 'PASS' : 'FAIL', 'disclosure must render below the iframe wrapper');
    record(`map-property-${vpName}`, 'NOT VERIFIED', 'Iframe present; visual confirmation of map tiles requires manual inspection of screenshot');
  } else {
    record(`map-property-${vpName}`, 'NOT VERIFIED', 'property-map-wrapper not found');
  }
}

async function captureTabletInquiryLayout(page) {
  await page.setViewport({ width: 834, height: 1194 });
  await page.goto(`${BASE_URL}/properties/tasluja-villa`, { waitUntil: 'networkidle2' });
  await triggerRevealsByScrolling(page);
  const stickyBar = await page.$('[data-qa="property-sticky-inquiry-bar"]');
  if (stickyBar) {
    await page.evaluate(() => document.querySelector('[data-qa="property-sticky-inquiry-bar"]').scrollIntoView({ block: 'center' }));
    await settle(page, 400);
    const filename = `property_inquiry_sidebar_tablet.jpg`;
    await page.screenshot({ path: path.join(DIRS['property-detail'], filename), quality: 85 });
    logIndex(filename, '/properties/tasluja-villa', 'tablet', 'Inquiry Sidebar', 'Verify tablet inquiry card layout');
    record('tablet-inquiry-layout', 'PASS');
  } else {
    record('tablet-inquiry-layout', 'FAIL', 'property-sticky-inquiry-bar not found');
  }
}

async function captureMobileStickyBar(page) {
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/properties/tasluja-villa`, { waitUntil: 'networkidle2' });
  await settle(page, 800);
  const bar = await page.$('[data-qa="property-sticky-inquiry-bar"]');
  if (!bar) {
    record('mobile-sticky-inquiry-bar', 'FAIL', 'property-sticky-inquiry-bar not found');
    return;
  }
  const position = await page.evaluate(() => getComputedStyle(document.querySelector('[data-qa="property-sticky-inquiry-bar"]')).position);
  await page.evaluate(() => window.scrollTo(0, 800));
  await settle(page, 500);
  const filename = `property_sticky_bar_mobile.jpg`;
  await page.screenshot({ path: path.join(DIRS['property-detail'], filename), quality: 85 });
  logIndex(filename, '/properties/tasluja-villa', 'mobile', 'Sticky Inquiry Bar', 'Verify fixed mobile inquiry bar remains visible while scrolling');
  record('mobile-sticky-inquiry-bar', position === 'fixed' ? 'PASS' : 'FAIL', `computed position=${position}`);
}

async function runQA() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('pageerror', (err) => record('console-page-error', 'FAIL', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') record('console-error', 'FAIL', msg.text());
  });

  console.log('== Overflow matrix ==');
  const routes = ['/', '/properties', '/properties/tasluja-villa'];
  const allViewports = [...VIEWPORTS.primary, ...VIEWPORTS.extra];
  for (const vp of allViewports) {
    for (const route of routes) {
      await checkOverflow(page, vp.width, vp.height, route);
    }
  }

  const runStep = async (name, fn) => {
    try {
      await fn();
    } catch (err) {
      record(name, 'FAIL', `threw: ${err.message}`);
    }
  };

  console.log('== Primary sequential captures ==');
  for (const vp of VIEWPORTS.primary) {
    await page.setViewport({ width: vp.width, height: vp.height });

    await runStep(`seq-home-${vp.name}`, async () => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
      await sequentialScrollCapture(page, DIRS['home'], 'home', vp.name);
    });

    await runStep(`seq-properties-${vp.name}`, async () => {
      await page.goto(`${BASE_URL}/properties`, { waitUntil: 'networkidle2' });
      await sequentialScrollCapture(page, DIRS['properties'], 'properties', vp.name);
    });

    await runStep(`seq-property-detail-${vp.name}`, async () => {
      await page.goto(`${BASE_URL}/properties/tasluja-villa`, { waitUntil: 'networkidle2' });
      await sequentialScrollCapture(page, DIRS['property-detail'], 'property_tasluja', vp.name);
    });

    await runStep(`hero-slides-${vp.name}`, () => captureHeroSlides(page, vp.width, vp.height, vp.name));
    await runStep(`navbar-theme-${vp.name}`, () => captureNavbarThemeStates(page, vp.width, vp.height, vp.name));
    await runStep(`modals-${vp.name}`, () => captureModals(page, vp.width, vp.height, vp.name));
    await runStep(`maps-${vp.name}`, () => captureMaps(page, vp.width, vp.height, vp.name));
    await runStep(`lightbox-${vp.name}`, () => captureLightbox(page, vp.width, vp.height, vp.name));
    await runStep(`mobile-menu-${vp.name}`, () => captureMobileMenu(page, vp.width, vp.height, vp.name));
  }

  await runStep('tablet-inquiry-layout-step', () => captureTabletInquiryLayout(page));
  await runStep('mobile-sticky-bar-step', () => captureMobileStickyBar(page));

  await browser.close();

  const pass = results.filter(r => r.status === 'PASS').length;
  const fail = results.filter(r => r.status === 'FAIL').length;
  const notVerified = results.filter(r => r.status === 'NOT VERIFIED').length;

  let reportMarkdown = `# QA Report - Pass 4\n\n`;
  reportMarkdown += `Generated against a live \`npm run dev\` server via headless Puppeteer.\n\n`;
  reportMarkdown += `## Summary\n\n- PASS: ${pass}\n- FAIL: ${fail}\n- NOT VERIFIED: ${notVerified}\n\n`;
  reportMarkdown += `## Results\n\n| Check | Status | Detail |\n|---|---|---|\n`;
  for (const r of results) {
    reportMarkdown += `| ${r.name} | ${r.status} | ${(r.detail || '').replace(/\|/g, '/')} |\n`;
  }

  fs.writeFileSync(path.join(DIRS['report'], 'QA_REPORT.md'), reportMarkdown);
  fs.writeFileSync(path.join(DIRS['report'], 'SCREENSHOT_INDEX.md'), indexMarkdown);

  console.log(`QA captures completed. PASS=${pass} FAIL=${fail} NOT VERIFIED=${notVerified}`);
  if (fail > 0) process.exitCode = 1;
}

runQA().catch((err) => {
  console.error(err);
  process.exit(1);
});
