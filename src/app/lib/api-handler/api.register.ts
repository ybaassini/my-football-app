import { ApiCall } from './interfaces';

const tranBase = 'LIB.api-handler.responses.';

const tran = (key) => {
  return tranBase + key;
};

export const apiCalls: ApiCall[] = [
  // EXAMPLE
  // {
  //   slug: 'sessions',
  //   endpoint: '/api/sessions',
  //   exact: true,
  //   requests: [
  //     {
  //       method: 'POST',
  //       responses: [
  //         { code: 401, message: tran('invalid-credentials') },
  //         { code: 404, message: tran('user-not-found') },
  //         { code: 200, message: tran('connection-successfull') }
  //       ]
  //     }
  //   ]
  // }
];
