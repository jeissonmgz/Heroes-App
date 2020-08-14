import React from "react";
import { AppRouter } from "./AppRouter";
import { AuthContext } from "../auth/AuthContext";
import { mount } from "enzyme";

describe("<AppRouter />", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  test("should show login no auth", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("should show marvel if is auth", () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        name: "Jase",
        logged: false,
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    expect(wrapper.find(".navbar")).exists().toBe(true);
  });
});
