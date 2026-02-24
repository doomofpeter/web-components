export const EDIT_USER_MUTATION = `
  mutation EditUser($input: EditUserInput!) {
    editUser(input: $input) {
      id
      name
      email
      avatar
    }
  }
`;

export const GET_USER_QUERY = `
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      avatar
      bio
    }
  }
`;
