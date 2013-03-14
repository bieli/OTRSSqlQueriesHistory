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

    function onlyUniqueValues(sql_queries_ls) {
        var set = {};
        var set2 = [];

        for (var i = 0; i < sql_queries_ls.length; i++) {
            set[sql_queries_ls[i].query] = 1;
            set2[i] = sql_queries_ls[i].timestamp;
        }

        var sql_queries = [];

        i = 0;

        for(var key in set) {
            sql_queries.push({ timestamp: set2[i++], query: key });
        }

        return sql_queries;
    }

    function addBlock() {
        $('div.SidebarColumn').append('<div class="WidgetSimple"><div class="Header"><h2>SQL Queries History</h2></div><div class="Content"><p><ul id="sql_queries"></ul></p></div></div>');
    };

    function loadList() {
        var sql_queries_ls = [];
        var query = '';
        var timestamp = '';

        Object.keys(localStorage)
            .forEach(function(key){
                if (/^(otrs::)/.test(key)) {
                   query = localStorage.getItem(key);

                   sql_queries_ls.push({ timestamp: key.substring('otrs::sql_log_'.length, key.length), query: query });
                }
        });

        sql_queries = onlyUniqueValues(sql_queries_ls);

//console.log(sql_queries);

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

    function addSqlLogItem(sql_query) {
        var timestamp = +new Date().getTime();
//console.log('addSqlLogItem: ', timestamp, sql_query);
        localStorage.setItem('otrs::sql_log_' + timestamp, sql_query);
    };

    TargetNS.useLogItem = function (timestamp) {
          var sql_query = localStorage.getItem('otrs::sql_log_' + timestamp);
//console.log('useLogItem: ', sql_query);

          sql_query_arr = sql_query.split(" LIMIT ");
//console.log('useLogItem split: ', sql_query_arr);

          $('#SQL').val(sql_query_arr[0]);
          $('#Max').val(sql_query_arr[1]);
    };

    TargetNS.removeSqlLogItem = function (timestamp, item) {
//console.log('removeSqlLogItem: ', timestamp, item);
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

        addBlock();

        loadList();
    };

    return TargetNS;
}(Core.Agent.Admin.AdminSelectBox || {}));

Core.Agent.Admin.AdminSelectBox.Init();

