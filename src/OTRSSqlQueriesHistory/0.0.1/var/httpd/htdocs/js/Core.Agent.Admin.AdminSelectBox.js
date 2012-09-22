	// --
// Core.Agent.Admin.AdminSelectBox.js - provides the special module functions for the AdminSelectBox
// Copyright (C) 2001-2012 bieli, http://bieli.net/
// --
// $Id: Core.Agent.Admin.AdminSelectBox.js,v 1.1.0.0 2012/09/20 16:15:34 mp Exp $
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
 * @namespace
 * @exports TargetNS as Core.Agent.Admin.AdminSelectBox
 * @description
 *      This namespace contains the special module functions for the AdminSelectBox module.
 */
Core.Agent.Admin.AdminSelectBox = (function (TargetNS) {

    function addBlock() {
        $('div.SidebarColumn').append('<div class="WidgetSimple"><div class="Header"><h2>SQL Queries History</h2></div><div class="Content"><p><ul id="sql_queries"></ul></p></div></div>');
    };

    function loadList() {
        var sql_queries = $.jStorage.get('sql_queries_history');	
            if (sql_queries) {
                sql_queries.forEach( function(k, v) { 
                $('ul#sql_queries').append(
                    $('<li>')
                        .text(k.query.slice(0, 30) + '[..] ')
                        .attr('title', k.query)
                        .append(
                            $('<button>')
                                .attr('id', 'sqh_btn_' + k.timestamp)
                                .attr('class', 'sqh_btn')
                                .attr('name', 'sqh_btn_' + k.timestamp)
                                .text("->")
                ));  
//            	console.log(k.timestamp, k.query);
            });
        }
    };


    /**
     * @function
     * @return nothing
     *      This function initializes the special module functions
     */
    TargetNS.Init = function () {
        $('#Run').click( function (){
	        var sqh = [];
	        var milliseconds = +new Date().getTime();

	        var sql_query = $('#SQL').text().trim();

	        sqh = $.jStorage.get('sql_queries_history');
	        if (!sqh) {
		        sqh = [];
	        }

	        sqh.push({ 'timestamp':milliseconds, 'query':sql_query });

	        $.jStorage.set('sql_queries_history', sqh);	

            loadList();

//        	console.log(sqh);
        });


        $('ul#sql_queries li button[id^="sqh_btn_"]').click( function (){

            var tsId = $(this).attr('id');
            var timestamp = tsId.substring("sqh_btn_".length);

//        	console.log(timestamp);

            var sql_query = $('button[id="sqh_btn_' + timestamp + '"]').parent().attr('title');

            $('#SQL').val(sql_query);

//        	console.log(sql_query);
        });

        addBlock();

        loadList();
    };

    return TargetNS;
}(Core.Agent.Admin.AdminSelectBox || {}));

Core.Agent.Admin.AdminSelectBox.Init();

