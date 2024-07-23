import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation insert_users($user: users_insert_input!) {
    insert_users(objects: [$user]) {
      returning {
        name
        uuid
        username
      }
    }
  }
`;

// export const CREATE_USER = gql`
//   mutation addUser($user: addUser) {
//     addUser(userr: $user) {
//       name
//       phone
//     }
//   }
// `;