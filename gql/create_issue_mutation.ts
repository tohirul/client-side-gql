import { gql } from '@urql/next'

export const createIssueMutation = gql`
  mutation CreateIssueMutation($input: CreateIssueInput!) {
    createIssue(input: $input) {
      id
      name
      status
    }
  }
`
