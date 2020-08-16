import React from "react";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "./SearchScreen";

describe("<SearchScreen />", () => {
  test("should load with empty results", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
  });
  test("should show Batman and input with queryString", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("input").prop("value")).toBe("batman");
  });

  test("should show error if not found", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman_not_found"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".alert-danger").exists()).toBe(true);
  });

  test("should call history", () => {
    const history = {
      push: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman_not_found"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find("input").simulate("change", {
      target: {
        name: "searchText",
        value: "batman",
      },
    });
    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
    expect(history.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
