import { whereEq } from 'ramda';

import { routes } from './routes';



const createInstance = ({ hooks }: { hooks: any }) => {
  const ky = (url: any, options: any) => ({
    async json() {
      let checker = async (input: any) => input;
      if (hooks?.afterResponse) {
        checker = async (input: any) => {
          const hookArr = hooks.afterResponse;
          const optionHooks = options?.hooks?.afterResponse ?? [];
          for (const hook of [...hookArr,...optionHooks]) {
            await hook({url,options}, null, { json() { return Promise.resolve(input) } })
          }
          return input;
        }
      }
      let result = null;
      if (options.searchParams) {
        result = routes.find(([path, params]) => {
          const matcher = whereEq(params)
          return url === path && matcher(options.searchParams)
        })
      } else if (options.body && options.body instanceof FormData) {
        // modify if we need to support something other than coretech/verifyPic
        result = routes.find(([path, certificate_number]) => url === path && options.body.get('certificate_number') === certificate_number)
      }
      if (result)
        return await checker(result[2]);
    }
  })

  return ky;
}

createInstance.create = (input: any) => { return createInstance(input) };

export default createInstance;
