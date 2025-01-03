import { gql } from '@urql/next'

export const signupMutation = gql`
  mutation Mutation($input: AuthInput!) {
    createUser(input: $input) {
      id
      email
      token
    }
  }
`
