import { gql } from '@apollo/client'

export const signinMutation = gql`
  mutation Mutation($input: AuthInput!) {
    signin(input: $input) {
      token
      id
      email
    }
  }
`
