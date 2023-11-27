import Error from 'next/error'

interface GlobalModal {}
interface GlobalError extends Error {}

export declare interface GlobalReducerI {
  modal?: GlobalModal
  loading?: boolean
  help?: boolean
  error?: GlobalError
}
