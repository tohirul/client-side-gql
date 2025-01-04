import { gql } from '@urql/next'

export const signinMutation = gql`
  mutation Mutation($input: AuthInput!) {
    signin(input: $input) {
      token
      id
      email
    }
  }
`
