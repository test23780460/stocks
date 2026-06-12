"use client";

import { useState } from "react";
import { DISCLAIMER } from "@/lib/market-data";

export function SignalExplainer({ explanation }: { explanation: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className="btn" type="button" onClick={() => setOpen((value) => !value)}>
        Why this signal?
      </button>
      {open ? (
        <div className="card card-pad" style={{ marginTop: "0.9rem" }}>
          <h3>Why this signal?</h3>
          <p className="muted">{explanation}</p>
          <ul className="muted">
            <li>Price trend: reviewed against recent direction.</li>
            <li>Momentum: compared with short-term relative strength.</li>
            <li>Volume: checked against normal participation.</li>
            <li>Volatility: translated into risk level.</li>
            <li>News sentiment: included as supporting or conflicting evidence.</li>
            <li>Market mood: compared with stock and crypto conditions.</li>
            <li>Historical movement: reviewed through the mini chart.</li>
            <li>Recent performance: daily, weekly, and monthly changes are considered.</li>
          </ul>
          <small className="muted">{DISCLAIMER}</small>
        </div>
      ) : null}
    </div>
  );
}
