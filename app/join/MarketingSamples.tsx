/** Static previews adapted from ACE Marketing's Signature social and flyer layouts.
 * Source: ADTCMO/ace-marketing, app/social-media/signature/order/page.js and
 * app/flyers/property/signature/details/page.js. Uses public listing photography.
 * Keep these server-rendered: no editor, export library, or account data is needed.
 */
export default function MarketingSamples() {
  return <div className="marketingExamples" aria-label="ACE Signature campaign for 2094 W Peninsula Circle">
    <figure>
      <div className="aceSample aceSampleSocial" role="img" aria-label="ACE Signature Coming Soon social post for 2094 W Peninsula Circle, featuring the waterfront pool and Michael Dingman">
        <img className="samplePhoto" src="/join-peninsula-pool.webp" alt="" width="1000" height="667" loading="lazy"/>
        <img className="sampleTemplate" src="/join-signature-social.webp" alt="" width="1000" height="1000" loading="lazy"/>
        <span className="sampleStatus">COMING SOON</span>
        <div className="sampleAddress">2094 W Peninsula Cir<small>CHANDLER, AZ 85248</small></div>
        <span className="samplePrice">$895,000</span>
        <div className="sampleStats"><span>3 <small>BEDROOMS</small></span><span>2.5 <small>BATHROOMS</small></span><span>2 <small>CAR GARAGE</small></span></div>
        <img className="sampleHeadshot" src="/join-mike-portrait.webp" alt="" width="753" height="1100" loading="lazy"/>
        <span className="sampleName">Michael Dingman</span><span className="samplePhone">480-703-2110</span>
      </div>
      <figcaption><strong>Social media</strong><span>ACE Signature</span></figcaption>
    </figure>
    <figure>
      <div className="aceSample aceSampleFlyer" role="img" aria-label="ACE Signature property flyer featuring the exterior and three interior and outdoor photographs of 2094 W Peninsula Circle">
        <img className="samplePhoto sampleMainPhoto" src="/join-peninsula-exterior.webp" alt="" width="1000" height="666" loading="lazy"/>
        <div className="sampleSecondary">{["interior","kitchen","pool"].map(photo=><img key={photo} src={`/join-peninsula-${photo}.webp`} alt="" width="1000" height="666" loading="lazy"/>)}</div>
        <img className="sampleTemplate" src="/join-signature-flyer.webp" alt="" width="850" height="1101" loading="lazy"/>
        <span className="sampleStatus">COMING SOON</span>
        <div className="sampleFlyerInfo">2094 W<br/>Peninsula Cir<small>CHANDLER, AZ 85248</small><b>$895,000</b><small>2,071 SQ FT</small></div>
        <div className="sampleDescription">Waterfront living with golf course views in Chandler’s Ocotillo community. A private pool, boat dock and inviting outdoor spaces create a place to relax and entertain. Inside, modern finishes complement an updated kitchen and a flexible three-bedroom layout.</div>
        <div className="sampleFlyerStats"><span>3<small>BEDROOMS</small></span><span>2.5<small>BATHROOMS</small></span><span>2<small>GARAGE</small></span></div>
        <img className="sampleFooter" src="/join-signature-footer.webp" alt="" width="1000" height="179" loading="lazy"/>
        <img className="sampleHeadshot" src="/join-mike-portrait.webp" alt="" width="753" height="1100" loading="lazy"/>
        <span className="sampleName">Michael Dingman</span><span className="samplePhone">480-703-2110</span>
      </div>
      <figcaption><strong>Property flyer</strong><span>ACE Signature</span></figcaption>
    </figure>
    <figure className="marketingWeb">
      <div className="systemLaptop"><div className="marketingWebScreen"><img src="/join-property-page.jpg" alt="Actual property website for 2094 W Peninsula Circle" loading="lazy" width="550" height="1600"/></div></div>
      <figcaption><a href="/home/2094-w-peninsula-cir">Explore the property website <span aria-hidden="true">↗</span></a><span>Created with ACE Marketing</span></figcaption>
    </figure>
  </div>;
}
