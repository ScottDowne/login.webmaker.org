/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

var env = require('../../../config/environment');

/**
 * GET home page.
 */
exports.index = function(req, res){
  res.render('site/index');
};
/**
 * GET sign-in link.
 */
exports.signin = function(req, res){
  res.render('site/signin', {
    allowed_domains: env.get('ALLOWED_DOMAINS'),
    user: req.session.email,
    layout: null
  });
};

/**
 * GET sign-in link.
 */
exports.sso = function(req,res) {
	res.set('Content-Type', 'application/javascript');
	res.render('js/sso', {
        ssoAudience: env.get('AUDIENCE')
    });
};

/**
 * GET health check for app
 */
exports.healthcheck = function(req, res){
  res.json({ http: 'okay' });
};
