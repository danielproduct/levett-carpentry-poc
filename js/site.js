(() => {
  'use strict';
  const cfg = window.LEVETT || {};
  const services = window.LEVETT_SERVICES || [];
  const projects = window.LEVETT_PROJECTS || [];
  const $ = selector => document.querySelector(selector);

  const html = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  function imageOrPlaceholder(src, label, context) {
    // Only images in this project's local photos folder may be displayed.
    const allowed = typeof src === 'string' && /^assets\/photos\/[a-zA-Z0-9_.-]+\.(jpe?g|png|webp|avif)$/i.test(src);
    if (allowed) {
      return `<img src="${html(src)}" alt="${html(context)} - ${html(label.toLowerCase())}" loading="lazy">`;
    }
    return `<div class="image-placeholder" role="img" aria-label="${html(context)}: ${html(label)} photograph not added yet"><span>${html(label)}</span><small>Approved project photo to add</small></div>`;
  }

  function projectCard(project, compact = false) {
    const demo = project.demo !== false;
    const title = html(project.title);
    const id = html(project.id);
    return `<article class="project-card ${compact ? 'compact' : ''}">
      <div class="project-heading"><h3>${title}</h3><span class="state-tag ${demo ? 'demo' : 'real'}">${demo ? 'Illustrative concept' : 'Completed project'}</span></div>
      <div class="pair">
        <figure>${imageOrPlaceholder(project.before, 'Before', project.title)}<figcaption>Before</figcaption></figure>
        <figure>${imageOrPlaceholder(project.after, 'After', project.title)}<figcaption>After</figcaption></figure>
      </div>
      ${!compact ? `<p class="project-note">${html(project.challenge)}</p><p class="project-note">${html(project.outcome)}</p>` : ''}
      <button type="button" class="link-action" data-open-enquiry data-inspiration="${title}" aria-label="Ask about a project like ${title}">Have something similar in mind? &rarr;</button>
    </article>`;
  }

  function fillProjectBlocks() {
    const home = $('#home-projects');
    const all = $('#all-projects');
    const target = home || all;
    if (!target) return;
    if (!projects.length) {
      target.innerHTML = '<p class="quiet-note">Portfolio photographs will be added once approved.</p>';
      return;
    }
    target.innerHTML = (home ? projects.slice(0, 2) : projects).map(p => projectCard(p, !!home)).join('');
  }

  function fillServices() {
    const home = $('#home-services');
    const all = $('#all-services');
    if (home) {
      home.innerHTML = services.slice(0, 4).map(s => `<a class="service-card" href="clever-spaces.html#${html(s.id)}"><strong>${html(s.title)}</strong><span>${html(s.need)}</span><em>Explore this space &rarr;</em></a>`).join('');
    }
    if (all) {
      all.innerHTML = services.map(s => `<article class="service-detail" id="${html(s.id)}"><h2>${html(s.title)}</h2><p>${html(s.need)}</p><button class="button secondary small" data-open-enquiry data-inspiration="${html(s.title)}" type="button">Show us your space &rarr;</button></article>`).join('');
    }
  }

  function configuredFormId() {
    // Avoid allowing arbitrary URLs inside the iframe.
    return /^[A-Za-z0-9]{4,20}$/.test(String(cfg.tallyFormId || '').trim()) ? cfg.tallyFormId.trim() : '';
  }

  function tallyURL(formId, inspiration = '') {
    const url = new URL(`https://tally.so/embed/${encodeURIComponent(formId)}`);
    url.searchParams.set('hideTitle', '1');
    url.searchParams.set('alignLeft', '1');
    url.searchParams.set('transparentBackground', '1');
    if (inspiration) url.searchParams.set('inspiration', inspiration);
    return url.href;
  }

  function formContent(inspiration = '') {
    const formId = configuredFormId();
    if (!formId || cfg.prototype) {
      return `<form class="demo-enquiry-form">
        <p class="demo-warning"><strong>Prototype form:</strong> Please use test details only. No information or photos will be sent or saved.</p>
        <input type="hidden" name="inspiration" value="${html(inspiration)}">
        <div class="demo-two-col">
          <label class="demo-field">Your name <input name="name" type="text" autocomplete="name" placeholder="e.g. Alex" maxlength="80" required></label>
          <label class="demo-field">Contact email <input name="email" type="email" autocomplete="email" placeholder="e.g. alex@example.com" maxlength="120" required></label>
        </div>
        <div class="demo-two-col">
          <label class="demo-field">Project postcode <input name="postcode" type="text" autocomplete="postal-code" placeholder="e.g. CM23" maxlength="16" required></label>
          <label class="demo-field">Type of project
            <select name="project" required>
              <option value="">Select an option</option>
              ${services.map(s => `<option value="${html(s.title)}">${html(s.title)}</option>`).join('')}
              <option value="Other residential work">Other residential work</option>
            </select>
          </label>
        </div>
        <label class="demo-field">Tell us about your space
          <textarea name="details" rows="4" maxlength="1000" placeholder="What would you like to change or create?" required></textarea>
        </label>
        <label class="demo-field">Select up to three photos (optional)
          <input name="photos" type="file" accept="image/png,image/jpeg,image/webp" multiple>
        </label>
        <p class="file-note muted small-text" aria-live="polite">Photo selections are kept in this browser only.</p>
        <button class="button" type="submit">Preview enquiry &rarr;</button>
        <p class="footnote">This button tests the journey only. It does not contact Levett Carpentry.</p>
      </form>`;
    }
    const src = tallyURL(formId, inspiration);
    const fallback = `https://tally.so/r/${encodeURIComponent(formId)}${inspiration ? '?inspiration=' + encodeURIComponent(inspiration) : ''}`;
    return `<iframe class="tally-frame" title="Show us your space enquiry form" src="${html(src)}" loading="lazy" allow="clipboard-write"></iframe><p class="muted small-text">Trouble opening the form? <a href="${html(fallback)}" target="_blank" rel="noopener noreferrer">Open it in a new tab</a>.</p>`;
  }

  function setupDemoForm() {
    document.addEventListener('change', event => {
      if (!event.target.matches('.demo-enquiry-form input[type="file"]')) return;
      const input = event.target;
      const note = input.closest('.demo-enquiry-form')?.querySelector('.file-note');
      if (!note) return;
      const files = Array.from(input.files || []);
      if (files.length > 3) { note.textContent = 'Choose no more than 3 photos.'; return; }
      if (files.some(file => file.size > 10 * 1024 * 1024)) { note.textContent = 'Each photo must be 10 MB or smaller.'; return; }
      if (files.some(file => !['image/jpeg','image/png','image/webp'].includes(file.type))) { note.textContent = 'Please select JPG, PNG or WebP photos.'; return; }
      note.textContent = files.length ? `${files.length} photo${files.length === 1 ? '' : 's'} selected for this local preview.` : 'No photos selected.';
    });
    document.addEventListener('submit', event => {
      const form = event.target;
      if (!form.matches('.demo-enquiry-form')) return;
      event.preventDefault();
      if (!form.reportValidity()) return;
      const files = Array.from(form.querySelector('input[name="photos"]').files || []);
      const note = form.querySelector('.file-note');
      if (files.length > 3 || files.some(file => file.size > 10 * 1024 * 1024) || files.some(file => !['image/jpeg','image/png','image/webp'].includes(file.type))) {
        note.textContent = 'Please select up to 3 JPG, PNG or WebP photos, each under 10 MB.';
        return;
      }
      const selectedProject = form.querySelector('[name="project"]').value;
      const inspiration = form.querySelector('[name="inspiration"]').value;
      const holder = form.parentElement;
      holder.innerHTML = `<div class="demo-success" role="status" aria-live="polite">
        <h3>Enquiry journey completed</h3>
        <p><strong>Nothing was sent or stored.</strong> This confirms that the test visitor could complete the steps.</p>
        <p>Project type: <strong>${html(selectedProject)}</strong></p>
        ${inspiration ? `<p>Inspired by: <strong>${html(inspiration)}</strong></p>` : ''}
        <p>Photos selected: <strong>${files.length}</strong></p>
        <button type="button" class="button secondary" data-open-enquiry>Try again</button>
      </div>`;
      const heading = holder.querySelector('.demo-success h3');
      heading?.setAttribute('tabindex','-1');
      heading?.focus();
    });
  }

  function setupEnquiries() {
    const modal = $('#enquiry-dialog');
    const container = $('#modal-form-content');
    const sourceLabel = $('#modal-source');
    if (modal && container) {
      document.addEventListener('click', event => {
        const trigger = event.target.closest('[data-open-enquiry]');
        if (!trigger) return;
        event.preventDefault();
        const inspiration = trigger.getAttribute('data-inspiration') || '';
        if (sourceLabel) sourceLabel.textContent = inspiration ? `Inspired by: ${inspiration}` : 'Tell us a little about your project';
        container.innerHTML = formContent(inspiration);
        if (typeof modal.showModal === 'function') modal.showModal();
      });
      modal.querySelector('[data-close-modal]')?.addEventListener('click', () => modal.close());
      modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
      modal.addEventListener('close', () => { container.innerHTML = ''; });
    }
    const inline = $('#inline-form');
    if (inline) {
      const qs = new URLSearchParams(location.search);
      inline.innerHTML = formContent(qs.get('inspiration') || '');
    }
  }

  function siteDetails() {
    document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
    document.querySelectorAll('[data-facebook-url]').forEach(el => {
      if (cfg.facebookUrl && /^https:\/\/www\.facebook\.com\//.test(cfg.facebookUrl)) el.href = cfg.facebookUrl;
      else { el.removeAttribute('href'); el.textContent = 'Facebook link pending'; }
    });
    const maker = $('#maker-bio');
    if (maker && cfg.makerBio) maker.textContent = cfg.makerBio;
    const makerName = $('#maker-name');
    if (makerName && cfg.makerName) makerName.textContent = cfg.makerName;
    const notice = $('#prototype-banner');
    if (notice) notice.hidden = !cfg.prototype;
  }

  fillProjectBlocks();
  fillServices();
  siteDetails();
  setupEnquiries();
  setupDemoForm();
})();
