let promisefunc = () => {
  return new Promise((resolve, reject) => {
    resolve("im a promise");
  });
};
Describe("async Js", () => {
  test("test your promise", () => {
    promise()
      .then((data) => {
        expec(data).toBe("i m a promise");
      })
      .catch((err) => {
        expect(err).toBe("i was rejected");
      });
  });
  test("test your async/await", async () => {
    try {
      let output = await promisefunc();
      expect(output).toBe("i m a promise");
    } catch (err) {
      expect(err).toBe("i m a promise");
    }
  });
});
