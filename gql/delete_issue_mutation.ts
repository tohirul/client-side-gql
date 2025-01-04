import { gql } from 'urql'

export const deleteIssueMutation = gql`
  mutation DeleteIssueMutation($deleteIssueId: ID!) {
    deleteIssue(id: $deleteIssueId)
  }
`
