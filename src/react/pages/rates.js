import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Rates = () => (
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
      console.log(arguments[0]);
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.rates.map(({ id, name }) => (
        <div key={id}>
          <p>{`${id}: ${name}`}</p>
        </div>
      ));
    }}
  </Query>
);

export default Rates
