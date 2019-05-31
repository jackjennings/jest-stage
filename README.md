# jest-stage

## Usage

The `stage` function helps to set up a shared context that can be used
between different test cases. There are two ways that stage is called.

Calling `stage` with an async function records the function as a setup
script for the current test suite context. Each setup script should
return an object containing any number of key/value pairs.

```js
stage(async () => {
    return { user: await User.first() };
});
```

This allows stage to be called inside of a test case to retrieve the
value set in the setup script.

```js
it('should have a user', async () => {
    const { user } = await stage();
    expect(user).not.toEqual(undefined);
});
```

Calling stage in nested contexts allows for modifying or adding to the
context set up by previous setup scripts. Nested setup scripts recieve
the previous context as an immutable object. The object returned from
the nested setup script will be merged into the previously returned context.

```js
stage(async () => {
    return { user: await User.first() };
});

describe('with nested stage', () => {
    stage(async ({ user }) => {
        const account = await Account.first();
        user.account = account
        return { account };
    });

    test('should have user with account', async () => {
        const { user, account } = await stage();
        expect(user.account).toEqual(account);
    });
});
```

## Installation

```shell
npm install --save-dev jest-stage
```

If you want to install `stage` as a global, you can modify the jest configuration of your `package.json` file to include `jest-stage/setup` in the `setupFiles` list:

```json
"jest": {
  "setupFiles": [
    "jest-stage/setup"
  ]
}
```
