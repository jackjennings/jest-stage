stage(async () => ({ foo: 1 }));

test('staged foo should be 1', async () => {
  const { foo } = await stage();
  expect(foo).toEqual(1);
});

describe('with nested stage', () => {
  stage(async () => ({ foo: 2 }));

  test('staged foo should be 2', async () => {
    const { foo } = await stage();
    expect(foo).toEqual(2);
  });
});

test('staged foo should be 1 again', async () => {
  const { foo } = await stage();
  expect(foo).toEqual(1);
});
