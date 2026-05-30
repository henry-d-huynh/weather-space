import { AuthHandler } from "./auth.handler";
import { AuthService } from "../services/auth.service";
import { mock, when, instance, reset, anything } from "ts-mockito";

const mockAuthService = mock(AuthService);

const mockUsername = "johnSmith";
const mockPassword = "password123";
const mockToken = "mock-token";
const mockName = "John Smith";

const mockRequest = (body: unknown) => ({ body }) as any;
const mockResponse = () => {
  const response: any = {};
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
};

describe("AuthHandler", () => {
  beforeEach(() => {
    reset(mockAuthService);
  });

  describe("login", () => {
    it("should return 200 with token and name on valid credentials", () => {
      when(mockAuthService.login(anything())).thenReturn({
        success: true,
        data: { token: mockToken, name: mockName },
      });

      const handler = new AuthHandler(instance(mockAuthService));
      const request = mockRequest({
        username: mockUsername,
        password: mockPassword,
      });
      const response = mockResponse();

      handler.login(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        token: mockToken,
        name: mockName,
      });
    });

    it("should return 400 when username is missing", () => {
      const handler = new AuthHandler(instance(mockAuthService));
      const request = mockRequest({ password: mockPassword });
      const response = mockResponse();

      handler.login(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 when password is missing", () => {
      const handler = new AuthHandler(instance(mockAuthService));
      const request = mockRequest({ username: mockUsername });
      const response = mockResponse();

      handler.login(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 400 when body is empty", () => {
      const handler = new AuthHandler(instance(mockAuthService));
      const request = mockRequest({});
      const response = mockResponse();

      handler.login(request, response);

      expect(response.status).toHaveBeenCalledWith(400);
    });

    it("should return 401 when credentials are invalid", () => {
      when(mockAuthService.login(anything())).thenReturn({
        success: false,
        errorMessage: "Invalid credentials",
        code: "AuthService.login",
      });

      const handler = new AuthHandler(instance(mockAuthService));
      const request = mockRequest({
        username: mockUsername,
        password: mockPassword,
      });
      const response = mockResponse();

      handler.login(request, response);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({
        error: "Invalid credentials",
      });
    });
  });
});
