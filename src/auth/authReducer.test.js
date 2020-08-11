const { authReducer } = require("./authReducer");
const { types } = require("../types/types");

describe("authReducer", () => {
  test("should return default", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });
  test("should auth", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Yessi",
      },
    };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({ logged: true, name: "Yessi" });
  });
  test("should logout", () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer({ logged: true, name: "Yessi" }, action);
    expect(state).toEqual({ logged: false });
  });
});
