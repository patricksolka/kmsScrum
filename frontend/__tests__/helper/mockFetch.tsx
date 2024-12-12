//Simulate Fetch as it is not available in jest/nodejs

export function mockFetch(data: unknown, ok: boolean = true) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(data)
    })
  );
}
