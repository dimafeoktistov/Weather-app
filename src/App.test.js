import React from "react";
import App from "./App";

import { shallow } from "enzyme";

describe("<App />", () => {
  it("рендерится в DOM", () => {
    const app = shallow(<App />);
    expect(app.length).toBeGreaterThan(0);
  });
});
