const interceptors = {
  request: { use: jest.fn(), eject: jest.fn() },
  response: { use: jest.fn(), eject: jest.fn() },
};

const instance = {
  get: jest.fn(),
  post: jest.fn(),
  interceptors,
  defaults: { headers: { common: {} } }
};

const axios = {
  create: () => instance,
  get: jest.fn(),
  post: jest.fn(),
  interceptors,
  defaults: { headers: { common: {} } }
};

export default axios;
