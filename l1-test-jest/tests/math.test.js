const {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  add,
} = require("./math");

test("should calculate total with tip", () => {
  const total = calculateTip(10, 0.3);

  //your test assert - expect output to be 13. else fails
  expect(total).toBe(13);
});
test("should calculate total with default tip", () => {
  const total = calculateTip(10);

  //your test assert - expect output to be 13 when no 2 arg is input. else fails
  expect(total).toBe(13);
});
test("Should convert 32 F to 0 C", () => {
  const degree = fahrenheitToCelsius(32);

  //your test assert - expect output to be 0. else fails
  expect(degree).toBe(0);
});
test("Should convert 0 C to 32 F", () => {
  const fahrenheit = celsiusToFahrenheit(0);

  //your test assert - expect output to be 32. else fails
  expect(fahrenheit).toBe(32);
});

// simulate async by using set timeout. with done(), jest will wait for async process to respond back
test("Async test demo", (done) => {
  setTimeout(() => {
    expect(2).toBe(2);
    done();
  }, 1000);
});

//testing method that returns promise - method 1
test("async - add 2 numbers", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

//testing method that returns promise - method 2
test("async - add 2 numbers -await", async () => {
  const sum = await add(2, 3);
  expect(sum).toBe(5);
});
