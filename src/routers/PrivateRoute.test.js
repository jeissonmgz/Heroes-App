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

  Storage.prototype.setItem = jest.fn();

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
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/marvel"
    );
  });

  test("shouldn´t show component if isn´t auth", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Listo!</span>}
          pathname=""
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find("span").exists()).toBe(false);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      "lastPath",
      "/marvel"
    );
  });
});
