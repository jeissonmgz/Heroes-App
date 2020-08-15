import React from "react";
import { Navbar } from "./Navbar";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { MemoryRouter, Router } from "react-router-dom";
import { types } from "../../types/types";
import "@testing-library/jest-dom";

describe("<Navbar />", () => {
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name: "Jase",
      logged: true,
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should load Navbar", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe(
      contextValue.user.name
    );
  });

  test("should logout and use history", () => {
    wrapper.find("button").prop("onClick")();
    expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout });
    expect(historyMock.replace).toHaveBeenCalledWith("/login");
  });
});
