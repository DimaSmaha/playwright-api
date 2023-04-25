import { test, expect } from "@playwright/test";

test.describe("Reqres API test suite", () => {
  test("Should get the list of users", async ({ request }) => {
    const userRequest = await request.get('/api/users?page=2');
    expect(userRequest.status()).toEqual(200);
    // expect(await userRequest.json()).toContain(expect.objectContaining({
    //   "per_page": 6
    // }))
    // wont find anything like this, only if u need an exact mathc i guess

    let body = await userRequest.json();
    expect(await body.page).toEqual(2);
    expect(await body.data[0].id).toEqual(7);
  });
});
