import { getPark } from "../../../services/v2_api/v2_core";
import { parkResultSchema } from "../../../services/v2_api/v2_core.zod";

describe("getPark", () => {
  it("should return something", async () => {
    const result = await getPark()
    expect(parkResultSchema.safeParse(result).success).toBe(true)
  });
});
