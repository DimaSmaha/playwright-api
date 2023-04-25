import { test, expect } from "@playwright/test";

const users = "api/users";
const register = "api/register";

let user7 = {
  id: 7,
  email: "michael.lawson@reqres.in",
  first_name: "Michael",
  last_name: "Lawson",
  avatar: "https://reqres.in/img/faces/7-image.jpg",
};

const user = { name: "Dima", job: "QA" };
const userUpdate = { name: "Geralt", job: "Witcher" };

test.describe("Reqres API test suite", () => {
  test("Should get the list of users", async ({ request }) => {
    const userRequest = await request.get(`${users}?page=2`);
    expect(userRequest.status()).toEqual(200);
    // expect(await userRequest.json()).toContain(expect.objectContaining({
    //   "per_page": 6
    // }))
    // wont find anything like this, only if u need an exact mathc i guess

    let body = await userRequest.json();
    expect(await body.page).toEqual(2);
    expect(await body.data[0].id).toEqual(7);
    expect(await body.data[0]).toEqual(user7);
  });

  test("Create a user", async ({ request }) => {
    const userRequest = await request.post(`${users}`, { data: user });
    expect(userRequest.status()).toEqual(201);
    let body = await userRequest.json();
    expect(await body.name).toEqual(user.name);
    expect(await body.createdAt).toContain("2023");
  });

  test("update a user", async ({ request }) => {
    const userRequest = await request.put(`${users}/2`, { data: userUpdate });
    expect(userRequest.status()).toEqual(200);
    let body = await userRequest.json();
    expect(await body.name).toEqual(userUpdate.name);
    expect(await body).toHaveProperty("updatedAt");
  });
});
