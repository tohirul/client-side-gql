import { gql } from '@urql/next'

export const issuesQuery = gql`
  query IssuesQuery {
    issues {
      id
      name
      content
      status
    }
  }
`
