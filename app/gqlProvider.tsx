'use client'
import {
  createClient,
  fetchExchange,
  ssrExchange,
  UrqlProvider,
} from '@urql/next'
import { useMemo } from 'react'
import { cacheExchange } from '@urql/exchange-graphcache'
import { url } from '@/utils/url'
import { getToken } from '@/utils/token'

export default function GQLProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window != 'undefined',
    })
    const client = createClient({
      url,
      exchanges: [cacheExchange({}), ssr, fetchExchange],
      fetchOptions: () => {
        const token = getToken()

        return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      },
    })
    return [client, ssr]
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}
