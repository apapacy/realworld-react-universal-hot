import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class Rates extends React.PureComponent {
  render() {
    return (
      <Query
        query={gql`
          query{
           allUsers {
             id
             name
           }
         }
        `}
      >
        {({ loading, error, data }) => {
          for (let key in arguments[0])
          console.log(key, arguments[0][key]);
          console.log('data', data)
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;

          return data.allUsers.map(({ id, name }) => (
            <div key={id}>
              <p>{`${id}: ${name}`}</p>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default Rates
