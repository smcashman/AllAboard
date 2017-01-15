$(document).ready(function() {
   


    $.getJSON("http://localhost:8080/employees", function(data) {


        $.each(data, function(index, value) {


            $(".employeeList").append('<div class="employeeBox"><p><span class="firstName">' + value.first + ' </span><span class="lastName">' + value.last + ' </span><br><span class="employeeEmail">' + value.email + ' </span><br><span class="employeePhone">' + value.phone + ' </span><br><span class="hireddate">' + value.hired + ' </span><span class="startdate">' + value.start + ' </span><br><i class="fa fa-pencil-square-o" aria-hidden="true"></i><i class="fa fa-trash-o" aria-hidden="true"></i></p></div>')


        });

    });

    // full calendar

    // function makeEventsDraggable() { 
    //     $( ".fc-draggable" ).draggable({
    //         zIndex: 999,
    //         revert: true,      // will cause the event to go back to its
    //         revertDuration: false  //  original position after the drag
    //     });
    // }
   var calender = $('#calendar').fullCalendar({
        header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            dragRevertDuration: 0,
            defaultView: 'agendaWeek',
            selectable: true,
				selectHelper: true,
				/*
					when user select timeslot this option code will execute.
					It has three arguments. Start,end and allDay.
					Start means starting time of event.
					End means ending time of event.
					allDay means if events is for entire day or not.
				*/
				select: function(start, end, allDay)
				{
					/*
						after selection user will be promted for enter title for event.
					*/
					var title = prompt('Event Title:');
					/*
						if title is enterd calendar will add title and event into fullCalendar.
					*/
					if (title)
					{
						calendar.fullCalendar('renderEvent',
							{
								title: title,
								start: start,
								end: end,
								allDay: allDay
							},
							true // make the event "stick"
							
						);
						$(this).draggable({
                			zIndex: 999,
                			revert: true,      // will cause the event to go back to its
                			revertDuration: 0  //  original position after the drag
            });
					}
				}
            // drop: function() {
            //     makeEventsDraggable();
            //     // is the "remove after drop" checkbox checked?
            //     if ($('#drop-remove').is(':checked')) {
            //         // if so, remove the element from the "Draggable Events" list
            //         $(this).remove();
            //     }
            // },
            // eventDragStop: function( event, jsEvent, ui, view ) {
            //     makeEventsDraggable();
            // },
            // eventResize: function( event, delta, revertFunc, jsEvent, ui, view ) {
            //     makeEventsDraggable();
            // },
            // viewRender: function() {
            //     makeEventsDraggable();
            // },
            // eventDragStart:function( event, jsEvent, ui, view ) {
            //     dragged = [ calendar, event ];
            // },
        });
  
});