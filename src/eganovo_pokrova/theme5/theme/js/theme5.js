/* eslint-env amd, browser, jquery */
require([
  'jquery'
], function($){
  'use strict';
  // initialize only if we are in top frame
  if (window.parent === window) {
    $(document).ready(function() {
      $('body').addClass('theme5-main');
    });
  }
});
