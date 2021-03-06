/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */

var env = require("../../../config/environment");

module.exports = function ( UserHandle ) {
  var controller = {};

  controller.create = function ( req, res ) {
    var userInfo = req.body;

    userInfo._id = userInfo.email;

    var user = new UserHandle( userInfo );

    // Delegates all validation to mongoose during this step
    user.save( function( err, thisUser ) {
      if ( err ) {
        res.json( 404, { error: err, user: null } );
        return;
      }

      res.json( { error: null, user: thisUser } );
    });
  };

  controller.get = function ( req, res ) {
    var id = req.params.id;

    UserHandle.findById( id, function ( err, user ) {
      if ( err || !user ) {
        res.json( 404, { error: err || "User not found for ID: " + id, user: null } );
        return;
      }

      res.json( { error: null, user: user } );
    });
  };

  controller.update = function ( req, res ) {
    var userInfo = req.body,
        id = req.params.id;

    UserHandle.findByIdAndUpdate( id, userInfo, function ( err, user ) {
      if ( err || !user ) {
        res.json( 404, { error: err || "User not found for ID: " + id, user: null } );
        return;
      } 

      res.json( { error: null, user: user } );
    }); 
  };

  controller.del = function ( req, res ) {
    var id = req.params.id;

    UserHandle.findByIdAndRemove( id , function ( err, user ) {
      if ( err || !user ) {
        res.json( 404, { error: err || "User not found for ID: " + id, user: null } );
        return;
      }

      res.json( { error: null, user: user } );
    });
  };

  controller.userForm = function( req, res ) {
    res.render( "ajax/forms/new_user", {
      ssoAudience: env.get('AUDIENCE')
    } );
  };

  /**
  * Access this route from your browser to clear the database of accounts with the emails listed below.
  * e.g. "http://localhost:3000/dev/delete"
  *
  * Obviously this should never go anywhere near production.
  * See bug: https://bugzilla.mozilla.org/show_bug.cgi?id=863781
  */
  controller.devDelete = function( req, res ) {
    var email = [
      'ross@mozillafoundation.org',
      'ross@ross-eats.co.uk',
      'rossbruniges10@yahoo.co.uk',
      'rossbruniges@gmail.com',
      'kieran.sedgwick@gmail.com'
    ],
    User = require('../../models/user');

    email.forEach(function(m) {
      User.find({ email:m }).remove();
    });

    res.send("DELETED!!!");
  };

  return controller;
}; // END Exports function

