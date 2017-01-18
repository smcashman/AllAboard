$(document).ready(function() {



            $.getJSON("http://localhost:8080/employees", function(data) {


                        $.each(data, function(index, value) {


                            $(".employeeList").append('<div class="employeeBox"><p class=' + value._id + '><span class="firstName">' + value.first + ' </span><span class="lastName">' + value.last + ' </span><br><span class="employeeEmail">' + value.email + ' </span><br><span class="employeePhone">' + value.phone + ' </span><br><span class="hireddate">' + value.hired + ' </span><br><span class="startdate">' + value.start + ' </span><br><i class="fa fa-envelope-o" aria-hidden="true"></i><i class="fa fa-pencil-square-o editButton" aria-hidden="true" id="editButton"></i><i class="fa fa-trash-o deleteButton" aria-hidden="true" id="' + value._id + '"></i><i class="fa fa-check-square showChecklist" id="'+value._id+'" aria-hidden="true"></i><button class="updateButton">Update</button></p></div>')


                        });


                        $('.employeeList').on('click', 'div p i.showChecklist', function(e) {

                            $.each(data, function(index, value) {


                             $(".traininglist").append('<div class="checklistBox"><p class=' + value._id + '><span class="I9"> I9 Complete?' + value.I9 + ' </span><br><span class="W4"> W4 Complete?' + value.W4 + ' </span><br><span class="International"> Are they an international student? '+value.International+'</span><br><span class="PayOption"> Which pay option did they choose? '+value.PayOption+'</span><br><span class="Register">Have they been register trained?'+value.Register+'</span><br><span class="RegisterDate">Training Date'+value.RegisterDate+'</span><br><span class="Refunds"> Have they been trained on returns?'+value.Refunds+'</span><br><span class="ReturnsDate">Training Date'+value.ReturnsDate+'</span><br><span class="CustServ">Have they been trained on customer service?'+value.CustServ+'</span><br><span class="CSDate">Training Date '+value.CSDate+'</span><br><span class="GM">Have they been trained on general merchandise? '+value.GM+'</span><br><span class="GMDate">Training Date'+value.GMDate+'</span><br><span class="TextDepart"> Have they been trained in textbooks?'+value.TextDepart+'</span><br><span class="TXDate">Training Date'+value.TXDate+'</span></p></div>')

                                            });
                                  });




                        // $('#deleteButton').click(function() {
                        $('.employeeList').on('click', 'div p i.deleteButton', function(e) {
                            console.log('OW')

                            var buttonId = $(this).attr('id');
                            console.log(buttonId)
                            $.ajax({
                                url: "http://localhost:8080/employees/" + buttonId,
                                type: "Delete",
                                success: function() {
                                    console.log($('i#' + buttonId).parent('p').parent('div'));
                                    $('i#' + buttonId).closest('div').remove();

                                    console.log("item deleted");

                                }
                            })

                        });
                        $('.employeeList').on('click', 'div p i#editButton', function(e) {
                                    $(this).parent("p").children('.updateButton').show();

                                    var first = $(this).parent("p").children("span.firstName").text();
                                    $(this).parent("p").children('span.firstName').html("<input id='editName' name='editName' type='text' value='" + first + "'>")
                                    var last = $(this).parent("p").children("span.lastName").text();
                                    $(this).parent("p").children('span.lastName').html("<input id='editLastName' name='editLastName' type='text' value='" + last + "'>")
                                    var email = $(this).parent("p").children("span.employeeEmail").text();
                                    $(this).parent("p").children('span.employeeEmail').html("<input id='editEmail' name='editEmail' type='text' value='" + email + "'>")
                                    var phone = $(this).parent("p").children("span.employeePhone").text();
                                    $(this).parent("p").children('span.employeePhone').html("<input id='editPhone' name='editPhone' type='text' value='" + phone + "'>")
                                    var hired = $(this).parent("p").children("span.hireddate").text();
                                    $(this).parent("p").children('span.hireddate').html("<input id='editHireDate' name='editHireDate' type='text' value='" + hired + "'>")
                                    var start = $(this).parent("p").children("span.startdate").text();
                                    $(this).parent("p").children('span.startdate').html("<input id='editStartDate' name='editStartDate' type='text' value='" + start + "'>")


                                    $('.updateButton').click(function() {

                                        var buttonClassUpdate = $(this).parent('p').attr('class')
                                        var editedFirst = $('p.' + buttonClassUpdate).children('span').children('input#editName').val();
                                        var editedLast = $('p.' + buttonClassUpdate).children('span').children('input#editLastName').val();
                                        var editedEmail = $('p.' + buttonClassUpdate).children('span').children('input#editEmail').val();
                                        var editedPhone = $('p.' + buttonClassUpdate).children('span').children('input#editPhone').val();
                                        var editedHired = $('p.' + buttonClassUpdate).children('span').children('input#editHireDate').val();
                                        var editedStart = $('p.' + buttonClassUpdate).children('span').children('input#editStartDate').val();



                                        var updateObject = new Object();
                                        updateObject._id = buttonClassUpdate;
                                        updateObject.first = editedFirst;
                                        updateObject.last = editedLast;
                                        updateObject.email = editedEmail;
                                        updateObject.phone = editedPhone;
                                        updateObject.hired = editedHired;
                                        updateObject.start = editedStart;
                                        console.log(updateObject);

                                        $.ajax({
                                            url: "http://localhost:8080/employees/" + buttonClassUpdate,
                                            type: "PUT",
                                            data: updateObject,
                                            success: function() {

                                                console.log(buttonClassUpdate);

                                            }


                                        });
                                    });

								});
						
							  

					

                                    $('.formtoggle').click(function() {
                                        $('.formWrapper').toggle();
                                        $('.trainingChecklist').toggle();
                                    });

                                    


                                    // // full calendar

                                    // function makeEventsDraggable() {
                                    //     $(".fc-draggable").draggable({
                                    //         zIndex: 999,
                                    //         revert: true, // will cause the event to go back to its
                                    //         revertDuration: false //  original position after the drag
                                    //     });
                                    // }

                                    //     var dragged = null;

                                    //     /* initialize the external events
                                    //     -----------------------------------------------------------------*/

                                    //     $('#external-events .fc-event').each(function() {

                                    //         // store data so the calendar knows to render an event upon drop
                                    //         $(this).data('event', {
                                    //             title: $.trim($(this).text()), // use the element's text as the event title
                                    //             stick: true // maintain when user navigates (see docs on the renderEvent method)
                                    //         });

                                    //         // make the event draggable using jQuery UI
                                    //         $(this).draggable({
                                    //             zIndex: 999,
                                    //             revert: true, // will cause the event to go back to its
                                    //             revertDuration: 0 //  original position after the drag
                                    //         });

                                    //     });


                                    //     /* initialize the calendar
                                    //     -----------------------------------------------------------------*/

                                    //     var calendar = $('#calendar').fullCalendar({
                                    //         googleCalendarApiKey: 'AIzaSyAuQJYARMDJHguyenuq9Uj03xEKrJIMFHI',
                                    //         events: {
                                    //             googleCalendarId: '8v3ebnkk7iq003gkfdag6g6hmo@group.calendar.google.com'
                                    //         },
                                    //         header: {
                                    //             left: 'prev,next today',
                                    //             center: 'title',
                                    //             right: 'month,agendaWeek,agendaDay'
                                    //         },
                                    //         editable: true,
                                    //         droppable: true, // this allows things to be dropped onto the calendar
                                    //         dragRevertDuration: 0,
                                    //         drop: function() {
                                    //             makeEventsDraggable();
                                    //             // is the "remove after drop" checkbox checked?
                                    //             if ($('#drop-remove').is(':checked')) {
                                    //                 // if so, remove the element from the "Draggable Events" list
                                    //                 $(this).remove();
                                    //             }
                                    //         },
                                    //         eventDragStop: function(event, jsEvent, ui, view) {
                                    //             makeEventsDraggable();
                                    //         },
                                    //         eventResize: function(event, delta, revertFunc, jsEvent, ui, view) {
                                    //             makeEventsDraggable();
                                    //         },
                                    //         viewRender: function() {
                                    //             makeEventsDraggable();
                                    //         },
                                    //         eventDragStart: function(event, jsEvent, ui, view) {
                                    //             dragged = [calendar, event];
                                    //         },
                                    //     });


                                    //     /* Make external-events droppable
                                    //     -----------------------------------------------------------------*/
                                    //     $('#external-events-listing').droppable({
                                    //         drop: function(event, ui) {
                                    //             if (dragged) {
                                    //                 var event = dragged[1];
                                    //                 dragged[0].fullCalendar('removeEvents', event._id);
                                    //                 var el = $("<div class='fc-event'>").appendTo(this).text(event.title);
                                    //                 el.draggable({
                                    //                     zIndex: 999,
                                    //                     revert: true,
                                    //                     revertDuration: 0
                                    //                 });
                                    //                 el.data('event', {
                                    //                     title: event.title,
                                    //                     id: event.id,
                                    //                     stick: true
                                    //                 });
                                    //                 dragged = null;
                                    //                 makeEventsDraggable();
                                    //             }
                                    //         }
                                    //     });

});




  });