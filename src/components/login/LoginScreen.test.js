import React from "react";
import { mount } from "enzyme";
import { LoginScreen } from "./LoginScreen";
import { AuthContext } from "../../auth/AuthContext";

describe("<LoginScreen />", () => {
  const historyMock = {
    replace: jest.fn(),
  };

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false,
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValue}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );
  test("should show component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should login and dispatch", () => {
    const handleClick = wrapper.find(".btn-primary").prop("onClick");
    handleClick();
    expect(contextValue.dispatch).toHaveBeenCalledTimes(1);
    expect(historyMock.replace).toHaveBeenCalledWith("/");
  });

  test("should login redirect path", () => {
    const handleClick = wrapper.find(".btn-primary").prop("onClick");
    localStorage.setItem("lastPath", "/dc");
    handleClick();
    expect(historyMock.replace).toHaveBeenCalledWith("/dc");
  });
});
