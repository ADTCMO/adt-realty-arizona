// Official HUD Equal Housing Opportunity artwork; preserve its aspect ratio.
// Source: https://www.hud.gov/sites/dfiles/FHEO/images/fheo200.gif
export default function EqualHousingLogo() {
  return <span style={{ display: "inline-block", flex: "0 0 auto", lineHeight: 0, verticalAlign: "middle", margin: "8px" }}><img src="/equal-housing-opportunity-hud.gif" alt="Equal Housing Opportunity" width={44} height={47} style={{ display: "block", width: "44px", height: "auto", maxWidth: "44px", margin: 0, objectFit: "contain", opacity: 1 }} /></span>;
}
