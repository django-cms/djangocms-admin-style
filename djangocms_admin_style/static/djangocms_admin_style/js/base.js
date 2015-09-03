/*!
 * @author:    Divio AG
 * @copyright:    http://www.divio.ch
 */

//######################################################################################################################
// #NAMESPACES#
var MBP = window.MBP || {};
var Cl = window.Cl || {};

jQuery(document).ready(function($){
//######################################################################################################################
// #JQUERY EXTENSION#
Cl.Base = {
    init: function () {

        //init toolbar navigation
        this.toolbarNavigation();

    },

    toolbarNavigation: function () {

        var listItem = $('.toolbar-item-navigation > li');

        listItem.each(function () {
           $(this).find('> a').on('click', function (e) {
                e.preventDefault();
                $(this).parent().toggleClass('toolbar-item-navigation-hover');
            });
        });

        $('html').on('click', function (e) {
            if (!$(e.target).is('.toolbar-item-navigation > li> a')) {
                listItem.removeClass('toolbar-item-navigation-hover');
            }
        });

    }

};


//##################################################
// #AUTOINITS#
Cl.Base.init();

// end of jquery
});
