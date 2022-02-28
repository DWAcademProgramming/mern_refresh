import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payment';

class Header extends Component {
  
  renderContent(){
    switch (this.props.auth){
      case null: 
        return;
      case false: 
        return(
          <li>
            <a href='/auth/google'>
              Login in with Google
            </a>
          </li>
        );
      default: 
        return [
          <li key="1"> <Payments /> </li>,
          <li key="2"> <a href='/api/logout'> Logout </a> </li>
        ]; 
    }
  }

  render() {
    return (
      <nav>
        <div className='nav-wrapper blue-grey darken-2'>
          <Link 
            to={this.props.auth ? '/surveys' : '/'} 
            className='left brand-logo'
          >
            Emaily
          </Link>
          <ul className='right'>
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}; 

function mapStateToProps({ auth }){
  return { auth }; 
}

export default connect() (Header);
