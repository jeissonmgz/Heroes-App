import React from "react";
import { mount } from "enzyme";
import { DashboardRoutes } from "./DashboardRoutes";
import { AuthContext } from "../auth/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe("<DashboardRoutes />", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name: "Jase",
      logged: true,
    },
  };

  test("should show navbar", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe(
      contextValue.user.name
    );
  });
});
