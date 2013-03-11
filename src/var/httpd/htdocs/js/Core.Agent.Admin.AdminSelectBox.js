// --
// Core.Agent.Admin.AdminSelectBox.js - provides the special module functions for the AdminSelectBox
// Copyright (C) 2001-2013 bieli, http://bieli.net/
// --
// $Id: Core.Agent.Admin.AdminSelectBox.js,v 1.0.0.0 2012/09/20 16:15:34 bieli Exp $
// --
// This software comes with ABSOLUTELY NO WARRANTY. For details, see
// the enclosed file COPYING for license information (AGPL). If you
// did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
// --

"use strict";

var Core = Core || {};
Core.Agent = Core.Agent || {};
Core.Agent.Admin = Core.Agent.Admin || {};

/**
 * @namespace   AdminSelectBox
 * @exports     TargetNS as Core.Agent.Admin.AdminSelectBox
 * @description 
 *      This namespace contains the special module functions for the AdminSelectBox module.
 */
Core.Agent.Admin.AdminSelectBox = (function (TargetNS) {

    function addBlock() {
        $('div.SidebarColumn').append('<div class="WidgetSimple"><div class="Header"><h2>SQL Queries History</h2></div><div class="Content"><p><ul id="sql_queries"></ul></p></div></div>');
    };

    function loadList() {
        var sql_queries = $.jStorage.get('otrs_sql_queries_history');    
            if (sql_queries) {
                var last = "";
                var item = 1;

                sql_queries.forEach( function(k, v) { 

                if ( last != k.query ) {
                  $('ul#sql_queries').append(
                      $('<li>')
                          .text(k.query.slice(0, 30) + ' [..] ')
                          .attr('title', k.query)
                          .append(
                              $('<button>')
                                  .attr('id', 'sqh_btn_' + item)
                                  .attr('class', 'sqh_btn')
                                  .attr('style', 'height: 22px; width: 22px; font-size: 14px;')
                                  .attr('name', 'sqh_btn_' + item)
                                  .attr('data-timestamp', k.timestamp)
                                  .attr('data-query', k.query)
                                  .text("⇒")
                          )
                          .append(
                              $('<button>')
                                  .attr('id', 'sqh_btn_delete_' + item)
                                  .attr('class', 'sqh_btn')
                                  .attr('style', 'height: 22px; width: 22px; font-size: 14px;')
                                  .attr('name', 'sqh_btn_delete_' + item)
                                  .attr('data-timestamp', k.timestamp)
                                  .text("x")
                  ));

                  last = k.query;
                  item++;
                }
            });
        }
    };

    function updateList(sql_query) {
        var sql_queries = $.jStorage.get('otrs_sql_queries_history');    
        var milliseconds = +new Date().getTime();
        var result = true;

        if (sql_queries) {
            result = false;

            sql_queries.forEach( function(k, v) { 
                if ( sql_query.trim() == k.query.trim() ) {
                    result = true;
                }
            });

        } else {
            result = false;
            sql_queries = [];
        }
        
        if ( result == false ) {
            sql_queries.push({ 'timestamp' : milliseconds, 'query' : sql_query.trim() });

            $.jStorage.set('otrs_sql_queries_history', sql_queries);
        }
    };

    /**
     * @function
     * @return nothing
     *      This function initializes the special module functions
     */
    TargetNS.Init = function () {
        $('#Run').unbind('click').click( function (){
            var milliseconds = +new Date().getTime();

            var sql_query = $('#SQL').val().trim() + " LIMIT " + $('#Max').val().trim();

            updateList(sql_query);

            loadList();
        });
            
        $('ul#sql_queries li button[id^="sqh_btn_"]').unbind('click').click( function (){
            var sql_query = $(this).data("query");

            $('#SQL').val(sql_query);

            loadList();
        });

        $('ul#sql_queries li button[id^="sqh_btn_delete_"]').unbind('click').click( function (){
            $(this).parent().remove();
        });

        addBlock();

        loadList();
    };

    return TargetNS;
}(Core.Agent.Admin.AdminSelectBox || {}));

Core.Agent.Admin.AdminSelectBox.Init();

