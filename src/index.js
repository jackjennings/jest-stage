const QUEUE = [];

function stage(setup) {
  if (setup) {
    beforeAll(() => {
      QUEUE.push(setup);
    });

    afterAll(() => {
      QUEUE.pop();
    });
  } else {
    return QUEUE.reduce(
      (chain, setup) =>
        chain.then(context =>
          setup(Object.freeze(context)).then(result => ({
            ...context,
            ...result
          }))
        ),
      Promise.resolve({})
    );
  }
}

module.exports = stage;
