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
        var sql_queries = [];
        var query = '';
        var timestamp = '';

        Object.keys(localStorage)
            .forEach(function(key){
                if (/^(otrs::)/.test(key)) {
                   query = localStorage.getItem(key);

                   sql_queries.push({ 'timestamp' : key.substring('otrs::sql_log_'.length, key.length), 'query' : query });
                }
        });

        if (sql_queries) {
            var last = "";
            var item = 1;

            sql_queries.forEach( function(k, v) { 
                if ( last != k.query ) {
                  $('ul#sql_queries').append(
                      $('<li>')
                          .append(
                              $('<button>')
                                  .attr('id', 'sqh_btn_delete_' + item)
                                  .attr('class', 'sqh_btn')
                                  .attr('style', 'height: 20px; width: 20px; font-size: 12px; color: red;')
                                  .attr('name', 'sqh_btn_delete_' + item)
                                  .attr('data-timestamp', k.timestamp)
                                  .attr('onClick', 'Core.Agent.Admin.AdminSelectBox.removeSqlLogItem(' + k.timestamp + ', ' + item + ')')
                                  .text("x")
                          )
                          .append(
                              $('<button>')
                                  .attr('id', 'sqh_btn_' + item)
                                  .attr('class', 'sqh_btn')
                                  .attr('style', 'height: 20px; width: 20px; font-size: 12px; color: green;')
                                  .attr('name', 'sqh_btn_' + item)
                                  .attr('data-timestamp', k.timestamp)
                                  .attr('onClick', "Core.Agent.Admin.AdminSelectBox.useLogItem('" + k.timestamp + "')")
                                  .text("⇒")
                          )
                          .append(
                              $('<span>')
                                  .text(' ' + k.query.slice(0, 30) + ' [..]')
                                  .attr('title', k.query)
                          )
                  );

                  last = k.query;
                  item++;
              }
        });
        }
    };

/*
  Object.keys(localStorage)
      .forEach(function(key){
           if (/^(otrs::)/.test(key)) {
               localStorage.removeItem(key);
           }
       });



    Object.keys(localStorage) 
        .forEach(function(key){ 
            if (key.substring(0,myLength) == startsWith) {
                localStorage.removeItem(key); 
            } 
        }); 
*/

    function addSqlLogItem(sql_query) {
        var timestamp = +new Date().getTime();
console.log('addSqlLogItem: ', timestamp, sql_query);
        localStorage.setItem('otrs::sql_log_' + timestamp, sql_query);
    };

    TargetNS.useLogItem = function (timestamp) {
          var sql_query = localStorage.getItem('otrs::sql_log_' + timestamp);
console.log('useLogItem: ', sql_query);

          sql_query_arr = sql_query.split(" LIMIT ");
console.log('useLogItem split: ', sql_query_arr);

          $('#SQL').val(sql_query_arr[0]);
          $('#Max').val(sql_query_arr[1]);
    };

    TargetNS.removeSqlLogItem = function (timestamp, item) {
console.log('removeSqlLogItem: ', timestamp, item);
        var sql_query = localStorage.removeItem('otrs::sql_log_' + timestamp, sql_query);
        $("#sqh_btn_delete_" + item).parent().remove(); 
    };

    /**
     * @function
     * @return nothing
     *      This function initializes the special module functions
     */
    TargetNS.Init = function () {
        $('#Run').unbind('click').click( function (){
            var sql_query = $('#SQL').val().trim() + " LIMIT " + $('#Max').val().trim();
            
            if ( sql_query.length > 0 ) {
                addSqlLogItem(sql_query);
            }
        });
/*

if(result==false){var milliseconds=+new Date().getTime();sql_queries.push({'timestamp':milliseconds,'query':sql_query.trim()});$.jStorage.set('otrs_sql_queries_history',sql_queries);}};function deleteQueryLog(sql_query_timestamp){console.log('- a',sql_query_timestamp);var sql_queries_new=[];var sql_queries=$.jStorage.get('otrs_sql_queries_history');if(sql_queries){car item=0;sql_queries.forEach(function(k,v){if(sql_query_timestamp.toString()==k.timestamp.toString()){delete sql_queries[item];}

        $('ul#sql_queries li button[id^="sqh_btn_"]').click( function (){
            var timestamp = $(this).data("timestamp");

            var sql_query = localStorage.getItem('otrs::sql_log_' + timestamp, sql_query),

            $('#SQL').val(sql_query);
        });

        $('ul#sql_queries li button[id^="sqh_btn_delete_"]').click( function (){
            var timestamp = $(this).data("timestamp");

            var sql_query = localStorage.removeItem('otrs::sql_log_' + timestamp, sql_query),

            $(this).parent().remove();
        });
*/
        addBlock();

        loadList();
    };

    return TargetNS;
}(Core.Agent.Admin.AdminSelectBox || {}));

Core.Agent.Admin.AdminSelectBox.Init();

//$.jStorage.flush();

