import React from 'react';
import { Link } from 'react-router-dom'



class Root extends React.PureComponent {
  render() {
    return <div><Link to="/rates">Rates</Link></div>;
  }
}

export default Root
