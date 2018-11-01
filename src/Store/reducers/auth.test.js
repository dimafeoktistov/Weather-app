import reducer from "./auth";
import * as actions from "../actions/actiontypes";

describe("редьюсер входа/регистрации", () => {
  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("должен принимать токен и id юзера при успешном входе", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actions.AUTH_SUCCESS,
          idToken: "токен",
          userId: "id юзера"
        }
      )
    ).toEqual({
      token: "токен",
      userId: "id юзера",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
