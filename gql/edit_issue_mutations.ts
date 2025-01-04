import { gql } from '@urql/next'

export const editIssueMutation = gql`
  mutation EditIssueMutation($input: EditIssueInput!) {
    editIssue(input: $input) {
      id
      name
      content
      status
    }
  }
`
