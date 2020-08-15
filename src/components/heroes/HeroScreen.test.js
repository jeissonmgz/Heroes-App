import React from "react";
import { mount } from "enzyme";
import { HeroScreen } from "./HeroScreen";
import { MemoryRouter } from "react-router-dom";

describe("<HeroScreen />", () => {
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  const wrapper = mount(
    <MemoryRouter initialEntries={["/hero"]}>
      <HeroScreen history={historyMock} />
    </MemoryRouter>
  );

  test("should redirect if no args in url", () => {
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });
});
