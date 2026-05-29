import { EnvironmentService } from "./environment.service";

describe("EnvironmentService", () => {
  describe("getJwtSecret", () => {
    it("should return the JWT_SECRET env var", () => {
      vi.stubEnv("JWT_SECRET", "test-secret");
      const environmentService = new EnvironmentService();

      expect(environmentService.getJwtSecret()).toBe("test-secret");

      vi.unstubAllEnvs();
    });

    it("should return undefined when JWT_SECRET is not set", () => {
      vi.unstubAllEnvs();
      const environmentService = new EnvironmentService();

      expect(environmentService.getJwtSecret()).toBeUndefined();
    });
  });

  describe("getPort", () => {
    it("should return the PORT env var", () => {
      vi.stubEnv("PORT", "4000");
      const environmentService = new EnvironmentService();

      expect(environmentService.getPort()).toBe("4000");

      vi.unstubAllEnvs();
    });

    it("should return 3000 when PORT is not set", () => {
      vi.unstubAllEnvs();
      const environmentService = new EnvironmentService();

      expect(environmentService.getPort()).toBe("3000");
    });
  });
});
