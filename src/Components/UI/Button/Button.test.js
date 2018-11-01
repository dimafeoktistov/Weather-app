import React from "react";
import Button from "./Button";

import { shallow } from "enzyme";

describe("<Button />", () => {
  const wrapper = shallow(<Button btnType="testClass" />);

  it("рендерится в DOM", () => {
    const button = wrapper.find(".Button");
    expect(button.length).toEqual(1);
  });

  it("получает класс как props", () => {
    const button = wrapper.find(".testClass");
    expect(button.length).toEqual(1);
  });
});
