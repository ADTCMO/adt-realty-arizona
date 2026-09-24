// @ts-nocheck
"use client";

import { useEffect, useState } from "react";

function videoEmbed(url) {
  try {
    const parsed = new URL(url);
    if (["player.mux.com", "stream.mux.com"].includes(parsed.hostname)) {
      const playbackId = parsed.pathname.match(/^\/([A-Za-z0-9]+)(?:\.m3u8)?$/)?.[1];
      return playbackId ? `https://player.mux.com/${playbackId}` : null;
    }
    if (["youtube.com", "www.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(parsed.hostname)) {
      const embedId = parsed.pathname.match(/^\/embed\/([A-Za-z0-9_-]+)$/)?.[1];
      if (embedId) return `https://www.youtube-nocookie.com/embed/${embedId}`;
    }
    if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(parsed.hostname)) {
      const id = parsed.searchParams.get("v") || parsed.pathname.match(/^\/shorts\/([^/]+)/)?.[1];
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null;
    }
    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(parsed.pathname.slice(1))}`;
    }
    if (["vimeo.com", "www.vimeo.com"].includes(parsed.hostname)) {
      const id = parsed.pathname.match(/^\/(\d+)/)?.[1];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    if (parsed.hostname === "player.vimeo.com") {
      const id = parsed.pathname.match(/^\/video\/(\d+)$/)?.[1];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {}
  return null;
}

function tourEmbed(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (parsed.hostname === "zillow.com" || parsed.hostname.endsWith(".zillow.com")) {
      return parsed.href;
    }
  } catch {}
  return null;
}

export default function ListingClient({ listing, slug, preview = false }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [inquiryState, setInquiryState] = useState("idle");
  const [inquiryError, setInquiryError] = useState("");
  const [fallbackEmailHref, setFallbackEmailHref] = useState(null);
  const photos = listing.photos || [];
  const featured = photos.slice(0, 3);
  const gallery = photos.slice(3, 23);

  useEffect(() => {
    if (featured.length < 2) return;
    const timer = setInterval(() => setActive((current) => (current + 1) % featured.length), 5500);
    return () => clearInterval(timer);
  }, [featured.length]);

  const address = [listing.address, listing.city, "AZ", listing.zip].filter(Boolean).join(", ");
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const phone = listing.agent?.phone;
  const email = listing.agent?.email;
  const emailSubject = `Showing request: ${address}`;
  const emailHref = email ? `mailto:${email}?subject=${encodeURIComponent(emailSubject)}` : null;
  const video = listing.video_url && videoEmbed(listing.video_url);
  const floorPlan = listing.floor_plan_url;
  const price = listing.price ? `$${Number(listing.price).toLocaleString()}` : "";

  async function submitInquiry(event) {
    event.preventDefault();
    if (preview || !slug) return;
    setInquiryState("sending");
    const form = new FormData(event.currentTarget);
    const body = `Name: ${form.get("name") || ""}\nEmail: ${form.get("email") || ""}\nPhone: ${form.get("phone") || ""}\n\n${form.get("message") || ""}\n\nProperty: ${address}`;
    setFallbackEmailHref(`mailto:mikedingman@adthomes.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(body)}`);
    const response = await fetch("/api/property-inquiry", {
      method: "POST",
      body: form,
    }).catch(() => null);
    if (response?.ok) {
      setInquiryState("sent");
    } else {
      const result = await response?.json().catch(() => null);
      setInquiryError(result?.error || "The request could not be sent.");
      setInquiryState("error");
    }
  }

  return (
    <main className="listing">
      <style>{`
        .listing{font-family:Inter,Arial,sans-serif;color:#001343;background:#fff;min-height:100vh}
        .listing *{box-sizing:border-box}
        .listing header{background:#fff;color:#001343;border-bottom:4px solid #b00101;padding:10px max(5vw,20px);display:flex;align-items:center;gap:16px;font-weight:800;letter-spacing:.08em}
        .listing header img{height:74px;width:auto;object-fit:contain}
        .listing .wrap{max-width:1180px;margin:auto;padding:0 22px}
        .listing .hero{position:relative;display:block;background:#010d2d;height:min(62vw,590px);min-height:300px;overflow:hidden}
        .listing .hero img{width:100%;height:100%;object-fit:cover;display:block}
        .listing .hero:after{content:"";position:absolute;inset:65% 0 0;background:linear-gradient(transparent,rgba(1,13,45,.75));pointer-events:none}
        .listing .arrows{position:absolute;inset:50% 18px auto;display:flex;justify-content:space-between;transform:translateY(-50%);z-index:2}
        .listing button{cursor:pointer}
        .listing .arrows button{border:0;border-radius:50%;background:#fff;color:#001343;width:42px;height:42px;font-size:22px}
        .listing .dots{position:absolute;bottom:18px;left:0;right:0;display:flex;justify-content:center;gap:10px;z-index:2}
        .listing .dots button{width:10px;height:10px;padding:0;border-radius:50%;border:1px solid white;background:transparent}
        .listing .dots button.on{background:white}
        .listing .summary{display:flex;justify-content:space-between;gap:28px;align-items:start;padding:34px 0 28px}
        .listing h1{font-size:clamp(27px,4vw,42px);margin:5px 0 6px}
        .listing .city{color:#526078;margin:0}
        .listing .price{font-size:clamp(28px,4vw,42px);font-weight:800;color:#b00101;white-space:nowrap}
        .listing .status{color:#b00101;font-size:12px;letter-spacing:.09em;font-weight:800;text-transform:uppercase}
        .listing .facts{display:flex;flex-wrap:wrap;gap:26px;border-block:1px solid #e0e5ed;padding:19px 0;font-weight:700}
        .listing section{padding:34px 0}
        .listing h2{font-size:25px;margin:0 0 20px}
        .listing .description{line-height:1.75;white-space:pre-line;max-width:850px}
        .listing .gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
        .listing .gallery button{padding:0;border:0;background:none;aspect-ratio:4/3;overflow:hidden}
        .listing .gallery img{width:100%;height:100%;object-fit:cover;transition:transform .2s}
        .listing .gallery button:hover img{transform:scale(1.04)}
        .listing .gallery button{position:relative}
        .listing .gallery-count{display:none}
        .listing .video-cover{position:relative;border:0;padding:0;background:#010d2d;width:100%;cursor:pointer}
        .listing .video-cover img{width:100%;height:100%;object-fit:cover}
        .listing .video-cover span{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:50%;background:#b00101;color:white;padding:19px 25px;font-size:28px}
        .listing iframe{width:100%;border:0;border-radius:6px}
        .listing .media-frame{height:min(55vw,550px);min-height:260px}
        .listing .map{height:360px}
        .listing .link{display:inline-block;background:#b00101;color:white;text-decoration:none;padding:14px 21px;border-radius:5px;font-weight:750}
        .listing .agent{background:#f4f6fa;padding:30px;display:flex;align-items:center;gap:22px;flex-wrap:wrap}
        .listing .agent img{width:76px;height:76px;object-fit:cover;border-radius:50%}
        .listing .agent strong{font-size:20px}
        .listing .contact{display:flex;gap:12px;flex-wrap:wrap;margin-left:auto}
        .listing .contact>a{background:#b00101;color:#fff;padding:12px 18px;text-decoration:none;border-radius:5px;font-weight:700}.listing .agent-email{width:100%;text-align:right;font-size:14px}.listing .agent-email a{color:#001343;text-decoration:underline}
        .listing .inquiry{max-width:760px;display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .listing .inquiry input,.listing .inquiry textarea{width:100%;padding:13px;border:1px solid #cfd7e3;border-radius:5px;font:inherit}
        .listing .inquiry textarea,.listing .inquiry .wide{grid-column:1/-1}
        .listing .inquiry button{background:#b00101;color:white;border:0;padding:14px 20px;border-radius:5px;font-weight:700;justify-self:start}
        .listing footer{background:#001343;color:white;padding:25px 22px;text-align:center;font-size:13px}
        .listing .overlay{position:fixed;inset:0;background:rgba(1,13,45,.95);z-index:10;display:grid;place-items:center;padding:55px 20px}
        .listing .overlay img{max-width:100%;max-height:100%;object-fit:contain}
        .listing .close{position:absolute;top:15px;right:20px;color:white;background:none;border:0;font-size:34px}
        @media(max-width:700px){.listing .wrap{display:flex;flex-direction:column}.listing .wrap>.summary{order:0}.listing .wrap>.facts{order:1}.listing .wrap>.gallery-section{order:2}.listing .wrap>section{order:3}.listing .summary{display:block}.listing .price{margin-top:15px}.listing .gallery{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:12px;padding-bottom:12px}.listing .gallery button{flex:0 0 88%;scroll-snap-align:center}.listing .gallery-count{display:block;position:absolute;bottom:10px;right:10px;background:rgba(1,13,45,.8);color:#fff;border-radius:15px;padding:5px 10px;font-size:12px}.listing .inquiry{grid-template-columns:repeat(2,1fr)}.listing .agent{padding:24px 20px}.listing .contact{margin-left:0;width:100%}.listing .agent-email{text-align:left}.listing .hero{min-height:270px}.listing .inquiry input{grid-column:1/-1}}
      `}</style>

      <header><img src="https://www.adtrealtyaz.com/adt-realty-arizona-outline.png" alt="ADT Realty Arizona logo" /><span>{listing.headline || "ADT Realty Property"}</span></header>
      {featured.length > 0 && (
        <div className="hero">
          <img src={featured[active]} alt={`${listing.address} featured photo ${active + 1}`} />
          {featured.length > 1 && <>
            <div className="arrows">
              <button aria-label="Previous photo" onClick={() => setActive((active - 1 + featured.length) % featured.length)}>‹</button>
              <button aria-label="Next photo" onClick={() => setActive((active + 1) % featured.length)}>›</button>
            </div>
            <div className="dots">
              {featured.map((_, index) => <button key={index} className={index === active ? "on" : ""} aria-label={`Show featured photo ${index + 1}`} onClick={() => setActive(index)} />)}
            </div>
          </>}
        </div>
      )}
      <div className="wrap">
        <div className="summary">
          <div><span className="status">{listing.status}</span><h1>{listing.address}</h1><p className="city">{listing.city}, AZ {listing.zip}</p></div>
          <div className="price">{price}</div>
        </div>
        <div className="facts">
          {listing.beds != null && <span>{listing.beds} Beds</span>}
          {listing.baths !== null && listing.baths !== undefined && listing.baths !== "" && <span>{listing.baths} Baths</span>}
          {listing.sqft != null && <span>{Number(listing.sqft).toLocaleString()} Sq Ft</span>}
          {listing.garage != null && <span>{listing.garage} Car Garage</span>}
          {listing.property_type && <span>{listing.property_type}</span>}
          {listing.year_built && <span>Built {listing.year_built}</span>}
          {listing.lot_size && <span>Lot {listing.lot_size}</span>}
          {listing.mls_number && <span>MLS #{listing.mls_number}</span>}
        </div>
        {listing.description && <section><h2>About this home</h2><p className="description">{listing.description}</p></section>}
        {listing.amenities && <section><h2>Features and amenities</h2><div className="facts">
          {listing.amenities.split("\n").map((item) => item.trim()).filter(Boolean).map((item, index) => <span key={index}>{item}</span>)}
        </div></section>}
        {listing.open_house_details && <section><h2>Open house</h2><p>{listing.open_house_details}</p></section>}
        {gallery.length > 0 && <section className="gallery-section"><h2>Photo gallery</h2><div className="gallery">
          {gallery.map((url, index) => <button key={index} onClick={() => setLightbox(url)} aria-label={`Enlarge gallery photo ${index + 1}`}><img src={url} loading="lazy" alt={`${listing.address} gallery photo ${index + 1}`} /><span className="gallery-count">{index + 1} / {gallery.length}</span></button>)}
        </div></section>}
        {listing.video_url && <section><h2>Take a Tour of the Home</h2>
          {video && listing.video_poster_url && !videoStarted ? <button className="video-cover media-frame" type="button" aria-label="Play property video" onClick={() => setVideoStarted(true)}><img src={listing.video_poster_url} alt="Property video cover" /><span aria-hidden="true">▶</span></button> : video ? <iframe className="media-frame" src={videoStarted ? `${video}${video.includes("?") ? "&" : "?"}autoplay=any` : video} title="Property video" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen loading="lazy" />
            : /\.(mp4|webm)(?:\?.*)?$/i.test(listing.video_url) ? <video className="media-frame" src={listing.video_url} controls style={{width:"100%"}} />
              : <a className="link" href={listing.video_url} target="_blank" rel="noopener noreferrer">Watch property video</a>}
        </section>}
        {floorPlan && <section><h2>Floor plan</h2>
          {/\.(png|jpe?g|webp)(?:\?.*)?$/i.test(floorPlan)
            ? <a href={floorPlan} target="_blank" rel="noopener noreferrer"><img src={floorPlan} alt="Property floor plan" style={{maxWidth:"100%",maxHeight:650}} /></a>
            : /\.pdf(?:\?.*)?$/i.test(floorPlan) ? <><iframe className="media-frame" src={floorPlan} title="Property floor plan PDF" loading="lazy" /><p><a className="link" href={floorPlan} target="_blank" rel="noopener noreferrer">Open floor plan PDF ↗</a></p></>
            : <a className="link" href={floorPlan} target="_blank" rel="noopener noreferrer">View floor plan</a>}
        </section>}
        {listing.tour_url && <section><h2>3D tour and interactive floor plan</h2>
          {tourEmbed(listing.tour_url) && <iframe className="media-frame" src={tourEmbed(listing.tour_url)} title="3D home tour and interactive floor plan" loading="lazy" allowFullScreen />}
          <p><a href={listing.tour_url} target="_blank" rel="noopener noreferrer" style={{color:"#b00101",fontWeight:700}}>Open the 3D tour in a new tab ↗</a></p>
        </section>}
        <section><h2>Location</h2><iframe className="map" src={mapUrl} title={`Map of ${address}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></section>
        <section className="agent">
          {listing.agent?.photo && <img src={listing.agent.photo} alt={listing.agent.name || "Listing agent"} />}
          <div><strong>{listing.agent?.name || "ADT Realty"}</strong>{listing.agent?.license && <div>License #{listing.agent.license}</div>}</div>
          <div className="contact">
            {phone && <a href={`tel:${phone.replace(/[^+\d]/g,"")}`}>Call Agent</a>}
            {emailHref && <a href={emailHref}>Email Agent</a>}
            {email && <span className="agent-email">Email: <a href={emailHref}>{email}</a></span>}
          </div>
        </section>
        <section id="request-showing">
          <h2>Request a showing</h2>
          {inquiryState === "sent" ? <p>Thank you. We will be in touch.</p> : (
            <form className="inquiry" onSubmit={submitInquiry}>
              <input type="hidden" name="slug" value={slug || ""} />
              <input name="name" aria-label="Your name" placeholder="Your name" required />
              <input name="email" type="email" aria-label="Email" placeholder="Email" required />
              <input name="phone" type="tel" aria-label="Phone" placeholder="Phone (optional)" />
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:"absolute",left:"-9999px"}} />
              <textarea name="message" aria-label="Message" placeholder="When would you like to see the home?" rows={4} className="wide" />
              <button disabled={preview || inquiryState === "sending"}>{preview ? "Available when published" : inquiryState === "sending" ? "Sending..." : "Send Request"}</button>
              {inquiryState === "error" && <p className="wide">{inquiryError} {fallbackEmailHref ? <>You can <a href={fallbackEmailHref}>open an email draft</a> or write to <a href="mailto:mikedingman@adthomes.com">mikedingman@adthomes.com</a>.</> : "Please call the agent."}</p>}
            </form>
          )}
        </section>
      </div>
      <footer>ADT Realty · Equal Housing Opportunity</footer>
      {lightbox && <div className="overlay" role="dialog" aria-modal="true" aria-label="Enlarged property photo" onClick={() => setLightbox(null)}>
        <button className="close" aria-label="Close photo" onClick={() => setLightbox(null)}>×</button><img src={lightbox} alt="Enlarged property view" />
      </div>}
    </main>
  );
}
