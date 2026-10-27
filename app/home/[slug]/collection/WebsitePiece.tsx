// @ts-nocheck
// Mirrored from ACE app/collection; keep presentation and media contract in sync.
'use client';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { safeMediaUrl, validateMediaEmbed } from './media';
import './website-piece.css';

const text = value => typeof value === 'string' || typeof value === 'number' ? String(value) : '';
export function websitePhotoSource(photo) {
  const source = typeof photo === 'string' ? photo : photo?.url || photo?.src || '';
  if (typeof source !== 'string' || /[\x00-\x1f\x7f\\<>]/.test(source)) return '';
  if (source.startsWith('/') && !source.startsWith('//')) return source;
  return safeMediaUrl(source);
}
export function websiteFeaturedPhotos(model = {}) {
  const candidates = [model.primaryPhoto, ...(model.featuredPhotos || []), ...(model.photos || [])];
  const seen = new Set();
  return candidates.filter(photo => { const src = websitePhotoSource(photo); if (!src || seen.has(src)) return false; seen.add(src); return true; }).slice(0, 3);
}
export function websiteDestinations(model = {}) {
  const address = [text(model.address), text(model.location)].filter(Boolean).join(', ');
  const publicUrl = model.publicUrlVerified === true ? safeMediaUrl(model.publicUrl) : '';
  return {
    map: address && !model.layoutTest ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed` : '',
    directions: address && !model.layoutTest ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}` : '',
    showing: publicUrl && !model.layoutTest ? `${publicUrl.split('#')[0]}#showing` : '',
  };
}
function Photo({ photo, alt, className = '', loading = 'lazy' }) {
  const src = websitePhotoSource(photo), [failed, setFailed] = useState('');
  return src && failed !== src ? <img className={className} src={src} alt={text(photo?.alt || photo?.caption) || alt} loading={loading} decoding="async" onError={() => setFailed(src)} /> : <div className={`pw-photo-missing ${className}`} role="img" aria-label={`${alt} unavailable`} data-export-error={photo ? 'A supplied property image could not be loaded.' : undefined}>Photo unavailable</div>;
}
function ExternalLink({ href, children, className = '' }) { return href ? <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a> : null; }
function MediaFrame({ media, kind, title }) { return validateMediaEmbed(media?.url) ? <iframe className="pw-media-frame" data-collection-media={kind} src={media.url} title={title} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-presentation allow-popups" /> : null; }

const WebsitePiece = forwardRef(function WebsitePiece({ model = {}, exportMode = false, publicMode = false, showingForm = null }, ref) {
  const prefix = `pw-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const showingId = publicMode ? 'showing' : `${prefix}-showing`;
  const photos = model.photos || [], featured = websiteFeaturedPhotos(model), agent = model.agent || {};
  const destinations = websiteDestinations(model);
  const [active, setActive] = useState(0), [paused, setPaused] = useState(false), [hovering, setHovering] = useState(false), [selected, setSelected] = useState(null), [emailMessage, setEmailMessage] = useState('');
  const dialog = useRef(null), trigger = useRef(null), closeButton = useRef(null), emailInput = useRef(null);
  const video = model.video || model.media?.video, tour = model.tour || model.media?.tour, floorPlan = model.floorPlan || model.media?.floorPlan;
  const details = model.details || [];
  const showAgentPhoto = model.showAgentPhoto !== false && !!websitePhotoSource(agent.photo);
  const phoneHref = typeof agent.phoneHref === 'string' && /^tel:[+\d]+$/.test(agent.phoneHref) ? agent.phoneHref : '';
  const emailHref = typeof agent.emailHref === 'string' && /^mailto:[^\s<>]+$/.test(agent.emailHref) ? agent.emailHref : '';
  useEffect(() => { setActive(0); setSelected(null); dialog.current?.close(); setEmailMessage(''); }, [model.id, model.primaryPhoto]);
  useEffect(() => {
    if (featured.length < 2 || paused || hovering || exportMode || typeof window === 'undefined' || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % featured.length), 6500);
    return () => window.clearInterval(timer);
  }, [featured.length, paused, hovering, exportMode]);
  function openPhoto(index, event) { setSelected(index); trigger.current = event.currentTarget; dialog.current?.showModal(); closeButton.current?.focus(); }
  function stepPhoto(delta) { if (photos.length) setSelected(index => ((index ?? 0) + delta + photos.length) % photos.length); }
  async function copyEmail() {
    try { if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(text(agent.email)); setEmailMessage('Email copied.'); }
    catch { emailInput.current?.focus(); emailInput.current?.select(); setEmailMessage('Select and copy the email address below.'); }
  }
  return <article ref={ref} className={`cp-piece cp-website pw-website${exportMode ? ' cp-export' : ''}`} data-collection-format="website" data-format="website" data-collection-font="CollectionInter" data-fit-check>
    {!publicMode && <div className="pw-preview-note" data-export-exclude>PROPERTY WEBSITE PREVIEW · No inquiry is sent from this preview</div>}
    <header className="pw-header"><a href={`#${prefix}-top`} aria-label="Property top"><img src="/collection/adt-arizona-blue.png" className="pw-logo" alt="ADT Realty Arizona" /></a><nav aria-label="Property sections">{model.description && <a href={`#${prefix}-about`}>About</a>}{model.features?.length > 0 && <a href={`#${prefix}-features`}>Features</a>}{photos.length > 0 && <a href={`#${prefix}-photos`}>Photos</a>}<a className="pw-button" href={`#${showingId}`}>Request a showing</a></nav></header>
    <section className="pw-hero" data-pw-carousel data-pw-paused={paused ? 'true' : 'false'} id={`${prefix}-top`} aria-label="Featured property photos" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {featured.length ? featured.map((photo, index) => <div key={websitePhotoSource(photo)} className="pw-hero-slide" data-pw-slide={index} hidden={index !== active % featured.length}><Photo photo={photo} alt={`Featured property photo ${index + 1}`} loading={index === 0 ? 'eager' : 'lazy'} /></div>) : <Photo alt="Property overview" loading="eager" />}
      {featured.length > 1 && <div className="pw-hero-controls"><button type="button" data-pw-prev aria-label="Previous featured photo" onClick={() => { setPaused(true); setActive(index => (index - 1 + featured.length) % featured.length); }}>←</button><div className="pw-hero-pagination">{featured.map((photo, index) => <button key={websitePhotoSource(photo)} type="button" data-pw-index={index} aria-label={`Show featured photo ${index + 1}`} aria-pressed={active === index} onClick={() => { setPaused(true); setActive(index); }}>{index + 1}</button>)}</div><button type="button" data-pw-next aria-label="Next featured photo" onClick={() => { setPaused(true); setActive(index => (index + 1) % featured.length); }}>→</button><button type="button" className="pw-rotation" data-pw-pause aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'Play slideshow' : 'Pause slideshow'}</button></div>}
      {photos.length > 0 && <a href={`#${prefix}-photos`} className="pw-photo-count">View all {photos.length} photos ↗</a>}
    </section>
    <div className="pw-wrap"><section className="pw-summary" aria-label="Property summary"><div><p className="pw-status">{text(model.status)}</p><h1 data-fit-check>{text(model.address) || 'Property address not provided'}</h1><p className="pw-location">{text(model.location)}</p></div><div className="pw-price">{text(model.priceLabel) || 'Price not provided'}</div></section>
      {model.facts?.length > 0 && <dl className="pw-facts">{model.facts.map((fact, index) => <div key={fact.key || index}><dd>{text(fact.value)}</dd><dt>{text(fact.label)}</dt></div>)}</dl>}
      {(model.description || details.length || model.openHouse) && <section className="pw-section pw-about" id={`${prefix}-about`}><div><p className="pw-kicker">ABOUT THIS HOME</p><h2>{text(model.headline) && model.headline !== model.address ? text(model.headline) : 'Discover the property.'}</h2>{model.openHouse && <aside className="pw-open-house"><strong>Open house</strong><p>{text(model.openHouse)}</p></aside>}</div><div>{model.description && <p className="pw-description">{text(model.description)}</p>}{details.length > 0 && <dl className="pw-details">{details.map((detail, index) => <div key={index}><dt>{text(detail.label)}</dt><dd>{text(detail.value)}</dd></div>)}</dl>}</div></section>}
      {model.features?.length > 0 && <section className="pw-section pw-features" id={`${prefix}-features`}><p className="pw-kicker">THE DETAILS THAT MATTER</p><h2>Features & amenities</h2><ul>{model.features.map((feature, index) => <li key={index}><span aria-hidden="true">✓</span>{text(feature)}</li>)}</ul></section>}
      {video && <section className="pw-section pw-media" id={`${prefix}-video`}><div className="pw-section-heading"><h2>Property video</h2><ExternalLink href={safeMediaUrl(video.url)}>Open video ↗</ExternalLink></div>{video.kind === 'embed' ? <MediaFrame media={video} kind="video" title="Property video" /> : video.kind === 'video' ? <video className="pw-native-video" data-collection-media="video" src={safeMediaUrl(video.url)} poster={websitePhotoSource(video.poster || featured[0])} controls playsInline preload="none">Video playback is unavailable. Use the video link above.</video> : <p>Watch the saved property video using the link above.</p>}</section>}
      {photos.length > 0 && <section className="pw-section pw-gallery" id={`${prefix}-photos`}><div className="pw-section-heading"><div><p className="pw-kicker">EXPLORE EVERY ROOM</p><h2>Photo gallery</h2></div><span>{photos.length} photos · Select a photo to enlarge</span></div><div className="pw-gallery-grid cp-gallery-grid">{photos.map((photo, index) => <button type="button" className="cp-gallery-tile pw-gallery-tile" data-gallery-index={index} key={`${websitePhotoSource(photo)}:${index}`} aria-label={`Enlarge property photo ${index + 1} of ${photos.length}`} onClick={event => openPhoto(index, event)}><Photo photo={photo} alt={`Property photo ${index + 1}`} /><span>{String(index + 1).padStart(2, '0')} <span aria-hidden="true">↗</span></span></button>)}</div></section>}
      {tour && <section className="pw-section pw-media" id={`${prefix}-tour`}><div className="pw-section-heading"><h2>Take a virtual tour</h2><ExternalLink href={safeMediaUrl(tour.url)}>Open tour ↗</ExternalLink></div>{tour.kind === 'embed' ? <MediaFrame media={tour} kind="tour" title="Interactive property tour" /> : <p>Explore the saved virtual tour using the link above.</p>}</section>}
      {floorPlan && <section className="pw-section pw-floorplan" id={`${prefix}-floorplan`}><div className="pw-section-heading"><h2>Floor plan</h2><ExternalLink href={safeMediaUrl(floorPlan.url)}>Open floor plan ↗</ExternalLink></div>{floorPlan.kind === 'image' && <Photo photo={floorPlan.url} alt="Property floor plan" />}</section>}
      {destinations.map && <section className="pw-section pw-map"><div className="pw-section-heading"><div><p className="pw-kicker">FIND YOUR WAY HOME</p><h2>Location</h2></div><ExternalLink className="pw-outline-button" href={destinations.directions}>Get directions ↗</ExternalLink></div><p>{text(model.address)}{model.location ? `, ${text(model.location)}` : ''}</p><iframe title="Property location map" className="pw-map-frame" data-collection-media="map" src={destinations.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>}
      <section className="pw-section pw-contact" id={`${prefix}-contact`}><div className="pw-agent-card">{showAgentPhoto && <Photo className="pw-agent-photo" photo={agent.photo} alt={text(agent.name) || 'Listing agent'} />}<div className="pw-agent-details"><p className="pw-kicker">YOUR PROPERTY CONTACT</p><h2>{text(agent.name) || 'Listing agent'}</h2><p>ADT Realty</p><p>Questions about this home? Contact the listing agent for availability and details.</p></div><div className="pw-agent-actions">{phoneHref && <a className="pw-button" href={phoneHref}>Call {text(agent.phone)}</a>}{emailHref && <a className="pw-outline-button" href={emailHref}>Email agent</a>}{agent.email && <button type="button" className="pw-copy-button" data-export-exclude onClick={copyEmail}>Copy email address</button>}</div>{agent.email && <div className="pw-email-line"><a href={emailHref || undefined}>{text(agent.email)}</a><input ref={emailInput} value={text(agent.email)} readOnly aria-label="Agent email address for copying" data-export-exclude tabIndex={-1} /><span role="status" data-export-exclude>{emailMessage}</span></div>}</div></section>
      <section className="pw-section pw-showing" id={showingId}><div><p className="pw-kicker">COME SEE IT IN PERSON</p><h2>Request a showing</h2><p>Tell the listing agent when you would like to see the home. A request is not a confirmed appointment.</p>{!publicMode && destinations.showing && <ExternalLink className="pw-button pw-live-showing" href={destinations.showing}>Request a showing on the property website ↗</ExternalLink>}{!destinations.showing && <p>Contact the agent by phone or email above to arrange a showing.</p>}{!publicMode && <p className="pw-preview-explanation" data-export-exclude>Preview only: this form is disabled and does not send or save your information. {destinations.showing ? 'Use the property website link to send a real request.' : 'Contact the agent directly to arrange a showing.'}</p>}</div>{publicMode && showingForm ? showingForm : <form className="pw-showing-form" data-export-exclude onSubmit={event => event.preventDefault()} aria-label="Showing request preview"><fieldset disabled><label>Name<input type="text" placeholder="Your full name" /></label><label>Email<input type="email" placeholder="you@example.com" /></label><label>Phone<input type="tel" placeholder="Your phone number" /></label><label>Preferred date<input type="date" /></label><label className="pw-form-wide">Message<textarea rows={4} placeholder="Let us know your preferred time or ask a question." /></label><button type="submit" className="pw-button" disabled>Request showing · Preview only</button></fieldset></form>}</section>
    </div>
    <footer className="pw-footer"><div className="pw-footer-inner"><img src="/collection/adt-arizona-white.png" className="pw-logo" alt="ADT Realty Arizona" /><div><strong>ADT Realty</strong><p>Equal Housing Opportunity</p><p>Information supplied by the listing profile. Price, status and availability may change. Buyer to verify all facts.</p></div>{destinations.showing && <ExternalLink href={safeMediaUrl(model.publicUrl)}>View the property website ↗</ExternalLink>}</div></footer>
    <dialog ref={dialog} className="cp-dialog pw-dialog" data-export-exclude aria-label="Property photo viewer" onClose={() => { setSelected(null); trigger.current?.focus(); }} onKeyDown={event => { if (event.key === 'ArrowLeft') { event.preventDefault(); stepPhoto(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); stepPhoto(1); } }}><div className="pw-dialog-toolbar"><span aria-live="polite">{selected === null ? '' : `${selected + 1} / ${photos.length}`}</span><button ref={closeButton} type="button" onClick={() => dialog.current?.close()} aria-label="Close photo viewer">Close ×</button></div>{selected !== null && <Photo photo={photos[selected]} alt={`Property photo ${selected + 1}`} loading="eager" />}<div className="cp-dialog-controls pw-dialog-controls"><button type="button" onClick={() => stepPhoto(-1)}>← Previous photo</button><button type="button" onClick={() => stepPhoto(1)}>Next photo →</button></div></dialog>
  </article>;
});
export default WebsitePiece;
