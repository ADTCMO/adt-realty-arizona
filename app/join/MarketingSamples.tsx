/** Server-rendered campaign concept previews using the actual listing photos. */
export default function MarketingSamples() {
  return <div className="marketingExamples" aria-label="Marketing campaign examples for 2094 W Peninsula Circle">
    <figure>
      <div className="campaignPhone"><div className="campaignSocial" role="img" aria-label="Coming Soon social post: waterfront living at 2094 W Peninsula Circle, Chandler, Arizona">
        <img src="/join-peninsula-pool.webp" alt="" width="650" height="433" loading="lazy" decoding="async"/>
        <div className="campaignSocialTop"><div className="campaignBrand">ADT REALTY</div><strong>WATERFRONT<br/>LIVING</strong><small>COMING SOON</small></div>
        <div className="campaignSocialAddress">2094 W Peninsula Cir<small>Chandler, Arizona</small></div>
      </div></div>
      <figcaption><strong>Social media</strong><span>Campaign concept</span></figcaption>
    </figure>
    <figure>
      <div className="campaignFlyer" role="img" aria-label="ADT Realty property flyer for 2094 W Peninsula Circle: waterfront living, golf course views, 3 beds, 2.5 baths, 2,071 square feet. Michael Dingman, 480-703-2110.">
        <div className="campaignBrand">ADT REALTY</div>
        <img src="/join-peninsula-exterior.webp" alt="" width="650" height="433" loading="lazy" decoding="async"/>
        <div className="campaignFlyerAddress">2094 W Peninsula Cir<small>Chandler, Arizona</small></div>
        <div className="campaignFlyerTagline">Waterfront living. Golf course views.</div>
        <div className="campaignFlyerStats">3 Beds · 2.5 Baths · 2,071 Sq Ft</div>
        <div className="campaignFlyerPhotos"><img src="/join-peninsula-interior.webp" alt="" width="650" height="433" loading="lazy" decoding="async"/><img src="/join-peninsula-kitchen.webp" alt="" width="650" height="433" loading="lazy" decoding="async"/></div>
        <div className="campaignFlyerAgent">Michael Dingman<small>480-703-2110</small></div>
      </div>
      <figcaption><strong>Property flyer</strong><span>Campaign concept</span></figcaption>
    </figure>
    <figure className="marketingWeb">
      <div className="systemLaptop"><div className="marketingWebScreen"><img src="/join-property-page.jpg" alt="Actual property website for 2094 W Peninsula Circle" loading="lazy" width="550" height="1600"/></div></div>
      <figcaption><a href="/home/2094-w-peninsula-cir">Explore the property website <span aria-hidden="true">↗</span></a><span>Created with ACE Marketing</span></figcaption>
    </figure>
  </div>;
}
