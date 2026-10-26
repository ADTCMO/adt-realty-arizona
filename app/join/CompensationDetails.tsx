"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const plans = [
  {
    id: "self-generated",
    label: "Self-Generated",
    metrics: [
      ["80/20", "Commission split"],
      ["$15,000", "Annual cap"],
      ["100%", "Commission after cap"],
      ["$495", "Transaction fee*"],
    ],
  },
  {
    id: "company-provided",
    label: "Company-Provided Leads",
    metrics: [
      ["75/25", "Commission split"],
      ["Not Counted", "Toward your cap"],
      ["$0", "Upfront lead cost"],
      ["$495", "Transaction fee*"],
    ],
  },
] as const;

export default function CompensationDetails() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % plans.length;
        break;
      case "ArrowLeft":
        nextIndex = (index - 1 + plans.length) % plans.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = plans.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    setSelectedPlan(nextIndex);
    tabs.current[nextIndex]?.focus();
  }

  return (
    <section className="joinCompensation" id="splits-fees" aria-labelledby="splits-fees-heading">
      <div className="joinCompIntro">
        <p className="eyebrow">Splits &amp; fees</p>
        <h2 id="splits-fees-heading">Simple splits.<br /><em>Transparent fees.</em><br />No surprises.</h2>
        <p>Know what you pay, what you keep and how your business grows. Compare self-generated business with company-provided leads.</p>
        <a className="joinCompLink" href="#conversation">Start the conversation <span aria-hidden="true">→</span></a>
      </div>

      <div className="joinCompDetails">
        <div className="joinCompTabs" role="tablist" aria-label="Compare commission splits by lead source">
          {plans.map((plan, index) => (
            <button
              key={plan.id}
              ref={(element) => { tabs.current[index] = element; }}
              id={`split-tab-${plan.id}`}
              type="button"
              role="tab"
              aria-selected={selectedPlan === index}
              aria-controls={`split-panel-${plan.id}`}
              tabIndex={selectedPlan === index ? 0 : -1}
              onClick={() => setSelectedPlan(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              {plan.label}
            </button>
          ))}
        </div>

        {plans.map((plan, index) => (
          <div
            key={plan.id}
            className="joinCompPanel"
            id={`split-panel-${plan.id}`}
            role="tabpanel"
            aria-labelledby={`split-tab-${plan.id}`}
            aria-describedby="split-transaction-note"
            hidden={selectedPlan !== index}
            tabIndex={0}
          >
            <dl className="joinCompMetrics">
              {plan.metrics.map(([value, label]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}

        <p className="joinCompNote" id="split-transaction-note">*Transaction fee may be paid by the client or agent.</p>
        <div className="joinCompCosts">
          <p className="eyebrow">Getting started</p>
          <dl>
            <div><dt>One-time joining fee</dt><dd>$100</dd></div>
            <div><dt>Monthly technology fee</dt><dd>$85<span>/month</span></dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
