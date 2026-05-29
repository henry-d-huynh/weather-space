import { AuthMiddleware } from "./auth.middleware";
import { EnvironmentService } from "../services/environment.service";
import { mock, when, instance, reset } from "ts-mockito";
import jwt from "jsonwebtoken";

const mockEnvironmentService = mock(EnvironmentService);

const mockJwtSecret = "mock-jwt-secret";
const mockUsername = "johnSmith";
const mockName = "John Smith";

const mockRequest = (authHeader?: string) =>
  ({
    headers: { authorization: authHeader },
  }) as any;

const mockResponse = () => {
  const response: any = {};
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
};

const mockNext = vi.fn();

describe("AuthMiddleware", () => {
  beforeEach(() => {
    reset(mockEnvironmentService);
    mockNext.mockClear();
  });

  describe("authenticate", () => {
    it("should call next with valid token", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(mockJwtSecret);

      const token = jwt.sign(
        { username: mockUsername, name: mockName },
        mockJwtSecret,
      );
      const middleware = new AuthMiddleware(instance(mockEnvironmentService));
      const request = mockRequest(`Bearer ${token}`);
      const response = mockResponse();

      middleware.authenticate(request, response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(request.user).toEqual({ username: mockUsername, name: mockName });
    });

    it("should return 401 when authorization header is missing", () => {
      const middleware = new AuthMiddleware(instance(mockEnvironmentService));
      const request = mockRequest();
      const response = mockResponse();

      middleware.authenticate(request, response, mockNext);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({
        error: "Missing or invalid token",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 401 when authorization header does not start with Bearer", () => {
      const middleware = new AuthMiddleware(instance(mockEnvironmentService));
      const request = mockRequest("Basic some_token");
      const response = mockResponse();

      middleware.authenticate(request, response, mockNext);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({
        error: "Missing or invalid token",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 500 when JWT_SECRET is not configured", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(undefined);

      const middleware = new AuthMiddleware(instance(mockEnvironmentService));
      const request = mockRequest("Bearer some_token");
      const response = mockResponse();

      middleware.authenticate(request, response, mockNext);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({
        error: "JWT_SECRET is not configured",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 401 when token is invalid", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(mockJwtSecret);

      const middleware = new AuthMiddleware(instance(mockEnvironmentService));
      const request = mockRequest("Bearer invalid_token");
      const response = mockResponse();

      middleware.authenticate(request, response, mockNext);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({
        error: "Invalid or expired token",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 401 when token payload is invalid", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(mockJwtSecret);

      const token = jwt.sign({ invalidField: "value" }, mockJwtSecret);
      const middleware = new AuthMiddleware(instance(mockEnvironmentService));
      const request = mockRequest(`Bearer ${token}`);
      const response = mockResponse();

      middleware.authenticate(request, response, mockNext);

      expect(response.status).toHaveBeenCalledWith(401);
      expect(response.json).toHaveBeenCalledWith({
        error: "Invalid token payload",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
