const { mount } = require("enzyme");
import React from "react";
import { PrivateRoute } from "./PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe("<PrivateRoute />", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };
  test("should show component if auth, save localstorage", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Listo!</span>}
          pathname=""
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find("span").exists()).toBe(true);
  });
});
