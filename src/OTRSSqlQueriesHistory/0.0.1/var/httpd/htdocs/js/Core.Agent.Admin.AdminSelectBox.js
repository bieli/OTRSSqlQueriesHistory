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
    /**
     * @function
     * @return nothing
     *      This function initializes the special module functions
     */
    TargetNS.Init = function () {
/*
        var addBlock = function() {
            $('div.SidebarColumn').append(
                $('div')
                    .attr('class', 'WidgetSimple')
                    .append(
                        $('div')
                            .attr('class', 'Header')
                            .append(
                                $('h2').text('SQL Queries History')
                        )
                    )
                    .append(
                        $('div')
                            .attr('class', 'Content')
                            .append(
                                $('p').append(
                                    $('ul').attr('id', 'sql_queries')
                                )
                        )
                    )
            );  
        };
*/
        var addBlock = function() {
            $('div.SidebarColumn').append('
                <div class="WidgetSimple">
                    <div class="Header">
                        <h2>SQL Queries History</h2>
                    </div>
                    <div class="Content">
                        <p>
                            <ul id="sql_queries">
                            </ul>
		                </p>
                    </div>
                </div>');  
        };

        var loadList = function() {
            var sql_queries = $.jStorage.get('sql_queries_history');	

                sql_queries.forEach( function(k, v) { 
                $('ul#sql_queries').append(
                    $('<li>')
                        .text(k.query.slice(0, 40) + '[..] ')
                        .attr('title', k.query)
                        .append(
                            $('<button>')
                                .attr('id', 'sqh_btn_' + k.timestamp)
                                .attr('class', 'sqh_btn')
                                .attr('name', 'sqh_btn_' + k.timestamp)
                                .text("->")
                ));  

            //	console.log(k.timestamp, k.query);
            });
        };


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
        //	console.log(sqh);
        });


        $('button[id^="sqh_btn_"]').click( function (){

            var timestamp = '' + slice("sqh_btn_".length, this.attr('id').length);
            var sql_query = $('button[id="sqh_btn_' + timestamp + '"]').parent().attr('title');

            $('#SQL').val(sql_query);

        //	console.log(sql_query);
        });

        addBlock();

        loadList();
    };

    return TargetNS;
}(Core.Agent.Admin.AdminSelectBox || {}));

