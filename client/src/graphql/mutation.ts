import gql from 'graphql-tag';

export const FETCH_ACCOUNT_EMAILS = gql`
  query fetchAccountEmails($accountId: String!) {
    linked_accounts(where: { account_id: { _eq: $accountId } }) {
      account_email
      mails {
        body
        subject
        from_name
        to_name
      }
    }
  }
`;

