import { AuthService } from "./auth.service";
import { anything, instance, mock, reset, when } from "ts-mockito";
import { UserService } from "./user.service";
import { EnvironmentService } from "./environment.service";
import { User } from "../types/user.type";
import {
  assertFailureResult,
  assertSuccessResult,
} from "../utility/test-helper.utility";

const mockJwtSecret = "mock-jwt-secret";
const mockUserName = "johnSmith";
const mockUser: User = {
  name: "John Smith",
  password: "password123",
};

const mockUserService = mock<UserService>();
const mockEnvironmentService = mock<EnvironmentService>();

describe("AuthService", () => {
  beforeEach(() => {
    reset(mockUserService);
    reset(mockEnvironmentService);
  });

  describe("login", () => {
    it("should return a token and name on valid credentials", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(mockJwtSecret);
      when(mockUserService.findByUsername(anything())).thenReturn(mockUser);

      const authService = new AuthService(
        instance(mockEnvironmentService),
        instance(mockUserService),
      );

      const result = authService.login(mockUserName, mockUser.password);

      assertSuccessResult(result);
      expect(result.data.token).toBeDefined();
      expect(result.data.name).toBe(mockUser.name);
    });

    it("should return failure when the jwt secret is undefined", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn();

      const authService = new AuthService(
        instance(mockEnvironmentService),
        instance(mockUserService),
      );

      const result = authService.login(mockUserName, mockUser.password);

      assertFailureResult(result);
      expect(result.error).toBe("JWT_SECRET is not configured");
      expect(result.code).toBe("AuthService.login");
    });

    it("should return a failure on invalid password", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(mockJwtSecret);

      const authService = new AuthService(
        instance(mockEnvironmentService),
        instance(mockUserService),
      );

      const result = authService.login("admin", "wrongpassword");

      assertFailureResult(result);
      expect(result.error).toBe("Invalid credentials");
      expect(result.code).toBe("AuthService.login");
    });

    it("should return a failure on unknown username", () => {
      when(mockEnvironmentService.getJwtSecret()).thenReturn(mockJwtSecret);

      const authService = new AuthService(
        instance(mockEnvironmentService),
        instance(mockUserService),
      );

      const result = authService.login("unknown", "password123");

      assertFailureResult(result);
      expect(result.error).toBe("Invalid credentials");
      expect(result.code).toBe("AuthService.login");
    });
  });
});
