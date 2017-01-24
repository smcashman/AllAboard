$(document).ready(function() {



            $.getJSON("https://localhost:8080/employees", function(data) {


                    $.each(data, function(index, value) {

                    	
                        $(".employeeList").append('<div class="employeeBox"><p class=' + value._id + '><i class="fa fa-pencil-square-o editButton" aria-hidden="true"></i><i class="fa fa-trash-o deleteButton" aria-hidden="true" id="' + value._id + '"></i><br><span class="firstName">' + value.first + ' </span><span class="lastName">' + value.last + ' </span><br><span class="employeeEmail">' + value.email + ' <i class="fa fa-envelope-o sendMail" aria-hidden="true"></i></span><br><span class="employeePhone">' + value.phone + ' <i class="fa fa-phone" aria-hidden="true"></i></span><br><span class="startdate">' + value.start + ' </span><br><button class="showChecklist" id="' + value._id + '">Training Checklist</button><button class="updateButton">Submit</button></p></div>')

                        $(".traininglist").append('<div class="checklistBox form-style-5"><p class=' + value._id + ' style="display:none"><button class="updateChecklistButton">Update</button><br><span class="I9"> I9 Complete?<br> ' + value.I9 + ' </span><br><span class="W4"> W4 Complete?<br> ' + value.W4 + ' </span><br><span class="International"> Are they an international student?<br> ' + value.International + '</span><br><span class="PayOption"> Which pay option did they choose?<br> ' + value.PayOption + '</span><br><span class="Register">Have they been register trained?<br> ' + value.Register + '</span><br><span class="RegisterDate">' + value.RegisterDate + '</span><br><span class="Refunds"> Have they been trained on returns?<br> ' + value.Refunds + '</span><br><span class="ReturnsDate">' + value.ReturnsDate + '</span><br><span class="CustServ">Have they been trained on customer service?<br> ' + value.CustServ + '</span><br><span class="CSDate">' + value.CSDate + '</span><br><span class="GM">Have they been trained on general merchandise?<br> ' + value.GM + '</span><br><span class="GMDate">' + value.GMDate + '</span><br><span class="TextDepart"> Have they been trained in textbooks?<br> ' + value.TextDepart + '</span><br><span class="TXDate">' + value.TXDate + '</span><br><button class="submitChecklistButton">Submit Changes</button></p></div></div>')


                    });


                    $('.employeeList').on('click', 'div p button.showChecklist', function(e) {
                    	
                        $('.traininglist div p').hide();
                        var idToShow = $(this).parent('p').attr('class')
                        console.log(idToShow)
                        $('.traininglist div p.' + idToShow).show();
                         var modal = document.getElementById('trainModal');
							modal.style.display = "block";
						var span = document.getElementsByClassName("close")[0];
						// When the user clicks on <span> (x), close the modal
						span.onclick = function() {
    						modal.style.display = "none";
						}

						window.onclick = function(event) {
    					if (event.target == modal) {
        				modal.style.display = "none";
    						}
								}

                    });

                    $('.employeeList').on('click', 'div p i.deleteButton', function(e) {
                        console.log('OW')

                        var buttonId = $(this).attr('id');
                        console.log(buttonId)
                        $.ajax({
                            url: "https://localhost:8080/employees/" + buttonId,
                            type: "Delete",
                            success: function() {
                                console.log($('i#' + buttonId).parent('p').parent('div'));
                                $('i#' + buttonId).closest('div').remove();

                                console.log("item deleted");

                            }
                        })

                    });
                    $('.employeeList').on('click', 'div p i.editButton', function(e) {
						
 						$(this).parent("p").children('.showChecklist').hide()
                        $(this).parent("p").children('.updateButton').show();

                        var first = $(this).parent("p").children("span.firstName").text();
                        $(this).parent("p").children('span.firstName').html("<input id='editName' name='editName' type='text' value='" + first + "'>")
                        var last = $(this).parent("p").children("span.lastName").text();
                        $(this).parent("p").children('span.lastName').html("<input id='editLastName' name='editLastName' type='text' value='" + last + "'>")
                        var email = $(this).parent("p").children("span.employeeEmail").text();
                        $(this).parent("p").children('span.employeeEmail').html("<input id='editEmail' name='editEmail' type='text' value='" + email + "'>")
                        var phone = $(this).parent("p").children("span.employeePhone").text();
                        $(this).parent("p").children('span.employeePhone').html("<input id='editPhone' name='editPhone' type='text' value='" + phone + "'>")
                        var start = $(this).parent("p").children("span.startdate").text();
                        $(this).parent("p").children('span.startdate').html("<input id='editStartDate' name='editStartDate' type='text' value='" + start + "'>")


                        $('.updateButton').click(function() {
                        	console.log("CLERCKED")
                            var buttonClassUpdate = $(this).parent('p').attr('class')
                            var editedFirst = $('p.' + buttonClassUpdate).children('span').children('input#editName').val();
                            var editedLast = $('p.' + buttonClassUpdate).children('span').children('input#editLastName').val();
                            var editedEmail = $('p.' + buttonClassUpdate).children('span').children('input#editEmail').val();
                            var editedPhone = $('p.' + buttonClassUpdate).children('span').children('input#editPhone').val();
                            var editedStart = $('p.' + buttonClassUpdate).children('span').children('input#editStartDate').val();



                            var updateObject = new Object();
                            updateObject._id = buttonClassUpdate;
                            updateObject.first = editedFirst;
                            updateObject.last = editedLast;
                            updateObject.email = editedEmail;
                            updateObject.phone = editedPhone;
                            updateObject.start = editedStart;

                            console.log(updateObject);

                            $.ajax({
                                url: "https://localhost:8080/employees/" + buttonClassUpdate,
                                type: "PUT",
                                data: updateObject,
                                success: function() {

                                    console.log(buttonClassUpdate);

                                }


                            });
                        });

                    });


				$('.updateChecklistButton').click(function(){
					$('.submitChecklistButton').show()

                        var i9 = $(this).parent("p").children("span.I9").text();
                        
                        if (i9 == ' I9 Complete? yes '){
                        $(this).parent("p").children('span.I9').html('<label for="editi9">I-9 form complete?</label><select name="editi9" class="checklistDropDown" id="editi9"><option value="yes" name="yes" selected>Yes</option><option value="no" name="no">No</option><option value="incomplete" name="incomplete">Incomplete documents</option></select>')
                    	} else if (i9 == ' I9 Complete? no '){
                    	$(this).parent("p").children('span.I9').html('<label for="editi9">I-9 form complete?</label><select name="editi9" class="checklistDropDown" id="editi9"><option value="no" name="no" selected >No</option><option value="yes" name="yes">Yes</option><option value="incomplete" name="incomplete">Incomplete documents</option></select>')
                    	} else {
                    		$(this).parent("p").children('span.I9').html('<label for="editi9">I-9 form complete?</label><select name="editi9" class="checklistDropDown" id="editi9"><option value="incomplete" name="incomplete" selected>Incomplete documents</option><option value="no" name="no">No</option><option value="yes" name="yes">Yes</option></select>')
                    		}

                        var w4 = $(this).parent("p").children("span.W4").text();
                        
                        if (w4 == ' W4 Complete? yes '){
                        $(this).parent("p").children('span.W4').html('<label for="editw4">W-4 form complete?</label><select class="checklistDropDown" id="editw4" name="editw4"><option value="yes" name="yes" selected>Yes</option><option value="no" name="no">No</option><option value="incomplete" name="incomplete">Incomplete documents</option></select><br>')
                    	} else if (w4 == ' W4 Complete? no '){
                    	$(this).parent("p").children('span.W4').html('<label for="editw4">W-4 form complete?</label><select class="checklistDropDown" id="editw4" name="editw4"><option value="no" name="no" selected>No</option><option value="yes" name="yes">Yes</option><option value="incomplete" name="incomplete">Incomplete documents</option></select><br>')
                    	}else {
                    	$(this).parent("p").children('span.W4').html('<label for="editw4">W-4 form complete?</label><select class="checklistDropDown" id="editw4" name="editw4"><option value="incomplete" name="incomplete" selected>Incomplete documents</option><option value="no" name="no">No</option><option value="yes" name="yes">Yes</option></select><br>')
                    	}

                        var intl = $(this).parent("p").children("span.International").text();
                       
                        if (intl == ' Are they an international student? yes'){
                        $(this).parent("p").children('span.International').html('<label for="editintl">International Student?</label><select name="editintl" class="checklistDropDown" id="editintl"><option value="yes" name="yes" selected>Yes</option><option value="no" name="no">No</option></select><br>')
                    	} else {
                    	$(this).parent("p").children('span.International').html('<label for="editintl">International Student?</label><select name="editintl" class="checklistDropDown" id="editintl"><option value="no" name="no" selected>No</option><option value="yes" name="yes">Yes</option></select><br>')
                    	}

                        var payopt = $(this).parent("p").children("span.PayOption").text();
                        console.log(payopt)
                        if (payopt == ' Which pay option did they choose? Paycard'){
                        $(this).parent("p").children('span.PayOption').html('<label for="editPay">Pay Method</label><select name="editPay" class="checklistDropDown" id="editPay"><option value="PayCard" name="PayCard" selected>Paycard</option><option value="directd" name="directd">Direct Deposit</option></select><br>')
                    } else {
                    	$(this).parent("p").children('span.PayOption').html('<label for="editPay">Pay Method</label><select name="editPay" class="checklistDropDown" id="editPay"><option value="directd" name="directd" selected>Direct Deposit</option><option value="PayCard" name="PayCard">Paycard</option></select><br>')
                    }

                        var reg = $(this).parent("p").children("span.Register").text();
                        
                        if (reg == 'Have they been register trained? Complete'){
                        $(this).parent("p").children('span.Register').html('<label for="editRegister">Register Training</label><select name="editRegister" class="checklistDropDown" id="editRegister"><option value="Complete" name="Complete" selected>Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    } else if (reg == 'Have they been register trained? Incomplete'){
                    	$(this).parent("p").children('span.Register').html('<label for="editRegister">Register Training</label><select name="editRegister" class="checklistDropDown" id="editRegister"><option value="Complete" name="Complete">Complete</option><option value="incomplete" name="incomplete" selected>Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    }else {
                    	$(this).parent("p").children('span.Register').html('<label for="editRegister">Register Training</label><select name="editRegister" class="checklistDropDown" id="editRegister"><option value="Complete" name="Complete">Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice" selected >Needs Practice</option></select><br>')
                    }

                        var regDate = $(this).parent("p").children("span.RegisterDate").text();

                        $(this).parent("p").children('span.RegisterDate').html("<input id='editRegDate' name='editRegDate' type='date' value='" + regDate + "'>")

                        var refunds = $(this).parent("p").children("span.Refunds").text();
                        console.log(refunds)
                        if (refunds == ' Have they been trained on returns? Complete'){
                        $(this).parent("p").children('span.Refunds').html('<label for="editreturns">Returns Training</label><select name="editreturns" class="checklistDropDown" id="editreturns"><option value="Complete" name="Complete" selected>Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    } else if (refunds == ' Have they been trained on returns? incomplete'){
                    	 $(this).parent("p").children('span.Refunds').html('<label for="editreturns">Returns Training</label><select name="editreturns" class="checklistDropDown" id="editreturns"><option value="Complete" name="Complete">Complete</option><option value="incomplete" name="incomplete" selected>Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    	} else {
                    		 $(this).parent("p").children('span.Refunds').html('<label for="editreturns">Returns Training</label><select name="editreturns" class="checklistDropDown" id="editreturns"><option value="Complete" name="Complete" >Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice" selected>Needs Practice</option></select><br>')
                    	}

                        var refundsDate = $(this).parent("p").children("span.ReturnsDate").text();
                        $(this).parent("p").children('span.ReturnsDate').html("<input id='editRefDate' name='editRefDate' type='date' value='" + refundsDate + "'>")

                        var custoserv = $(this).parent("p").children("span.CustServ").text();
                        
                        if (custoserv == 'Have they been trained on customer service? Complete'){
                        $(this).parent("p").children('span.CustServ').html('<label for="editCS">Customer Service Training</label><select name="editCS" class="checklistDropDown" id="editCS"><option value="Complete" name="Complete" selected>Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    } else if (custoserv == 'Have they been trained on customer service? Incomplete'){
                    	$(this).parent("p").children('span.CustServ').html('<label for="editCS">Customer Service Training</label><select name="editCS" class="checklistDropDown" id="editCS"><option value="Complete" name="Complete">Complete</option><option value="incomplete" name="incomplete" selected>Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    } else {
                    	$(this).parent("p").children('span.CustServ').html('<label for="editCS">Customer Service Training</label><select name="editCS" class="checklistDropDown" id="editCS"><option value="Complete" name="Complete">Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice" selected>Needs Practice</option></select><br>')
                    }

                        var custservDate = $(this).parent("p").children("span.CSDate").text();
                        $(this).parent("p").children('span.CSDate').html("<input id='editCSdate' name='editCSdate' type='date' value='" + custservDate + "'>")

                        var genmerch = $(this).parent("p").children("span.GM").text();
                       
                        if (genmerch == 'Have they been trained on general merchandise? Complete'){
                        $(this).parent("p").children('span.GM').html('<label for="editGM">General Merchandise Training</label><select name="editGM" class="checklistDropDown" id="editGM"><option value="Complete" name="Complete" selected>Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    } else if (genmerch == 'Have they been trained on general merchandise? Incomplete'){
                    	 $(this).parent("p").children('span.GM').html('<label for="editGM">General Merchandise Training</label><select name="editGM" class="checklistDropDown" id="editGM"><option value="Complete" name="Complete">Complete</option><option value="incomplete" name="incomplete" selected>Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    } else {
                    	 $(this).parent("p").children('span.GM').html('<label for="editGM">General Merchandise Training</label><select name="editGM" class="checklistDropDown" id="editGM"><option value="Complete" name="Complete">Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice" selected>Needs Practice</option></select><br>')
                    }

                        var genmerchdate = $(this).parent("p").children("span.GMDate").text();
                        $(this).parent("p").children('span.GMDate').html("<input id='editGMDate' name='editGMDate' type='date' value='" + genmerchdate + "'>")

                        var txt = $(this).parent("p").children("span.TextDepart").text();
                        console.log(txt)
                        if (txt == ' Have they been trained in textbooks? Complete'){
                        $(this).parent("p").children('span.TextDepart').html('<label for="editTX">Text Training</label><select name="editTX" class="checklistDropDown" id="editTX"><option value="Complete" name="Complete" selected>Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    } else if (txt == ' Have they been trained in textbooks? incomplete'){
                    	$(this).parent("p").children('span.TextDepart').html('<label for="editTX">Text Training</label><select name="editTX" class="checklistDropDown" id="editTX"><option value="Complete" name="Complete">Complete</option><option value="incomplete" name="incomplete" selected>Incomplete</option><option value="practice" name="practice">Needs Practice</option></select><br>')
                    } else {
                    		$(this).parent("p").children('span.TextDepart').html('<label for="editTX">Text Training</label><select name="editTX" class="checklistDropDown" id="editTX"><option value="Complete" name="Complete">Complete</option><option value="incomplete" name="incomplete">Incomplete</option><option value="practice" name="practice" selected>Needs Practice</option></select><br>')
                    }

                        var txtDate = $(this).parent("p").children("span.TXDate").text();
                        $(this).parent("p").children('span.TXDate').html("<input id='editTXdate' name='editTXdate' type='date' value='" + txtDate + "'>")
                      

                        $('.submitChecklistButton').click(function() {

                            var buttonClassUpdate = $(this).parent('p').attr('class')
                            var editedi9 = $('p.' + buttonClassUpdate).children('span').children('select#editi9').val();
                            var editedw4 = $('p.' + buttonClassUpdate).children('span').children('select#editw4').val();
                            var editedintl = $('p.' + buttonClassUpdate).children('span').children('select#editintl').val();
                            var editedpay = $('p.' + buttonClassUpdate).children('span').children('select#editPay').val();
                            var editedregister = $('p.' + buttonClassUpdate).children('span').children('select#editRegister').val();
                            var editedregdate = $('p.' + buttonClassUpdate).children('span').children('input#editRegDate').val();
                            var editedreturns = $('p.' + buttonClassUpdate).children('span').children('select#editreturns').val();
                            var editedreturnsdate = $('p.' + buttonClassUpdate).children('span').children('input#editRefDate').val();
                            var editedcs = $('p.' + buttonClassUpdate).children('span').children('select#editCS').val();
                            var editedcsdate = $('p.' + buttonClassUpdate).children('span').children('input#editCSdate').val();
                            var editedgm = $('p.' + buttonClassUpdate).children('span').children('select#editGM').val();
                            var editedgmdate = $('p.' + buttonClassUpdate).children('span').children('input#editGMDate').val();
                            var editedtxt = $('p.' + buttonClassUpdate).children('span').children('select#editTX').val();
                            var editedtxtdate = $('p.' + buttonClassUpdate).children('span').children('input#editTXdate').val();



                            var updateObject = new Object();
                            updateObject._id = buttonClassUpdate;
                            updateObject.I9 = editedi9;
                            updateObject.W4 = editedw4;
                            updateObject.International = editedintl;
                            updateObject.Payment = editedpay;
                            updateObject.Register = editedregister;
                            updateObject.RegisterDate = editedregdate;
                            updateObject.Refunds = editedreturns;
                            updateObject.ReturnsDate = editedreturnsdate;
                            updateObject.CustServ = editedcs;
                            updateObject.CSDate = editedcsdate;
                            updateObject.GM = editedgm;
                            updateObject.GMDate = editedgmdate;
                            updateObject.TextDepart = editedtxt;
                            updateObject.TXDate = editedtxtdate;
                            console.log(updateObject);

                            $.ajax({
                                url: "https://localhost:8080/employees/" + buttonClassUpdate,
                                type: "PUT",
                                data: updateObject,
                                success: function() {

                                    console.log(buttonClassUpdate);

                                }


                            });
                      

                    });

				});

				});


                    $('.formtoggle').click(function() {
                        // $('#formWrapper').toggle();
                        // $('.trainingChecklist').toggle();
                        var modal = document.getElementById('myModal');
							modal.style.display = "block";
						var span = document.getElementsByClassName("close")[0];
						// When the user clicks on <span> (x), close the modal
						span.onclick = function() {
    						modal.style.display = "none";
						}

						window.onclick = function(event) {
    					if (event.target == modal) {
        				modal.style.display = "none";
    						}
								}
                    });

// email code
                    $('.employeeList').on('click', 'div p i.sendMail', function(e) {
                    	$('.employeeList').hide();
                           $('#emailcontainer').show();
                          var emailspan = document.getElementsByClassName("closeEmail")[0];
						// When the user clicks on <span> (x), close the modal
							emailspan.onclick = function() {
								console.log("OUCH")
    							$('#emailcontainer').hide();
    							$('.employeeList').show()
								}

                           to = $(this).parent('span.employeeEmail').text();
                           name = $(this).parent('div p span.firstName').text();
                           $('input#to').val(to)
                            console.log(to);
                            
                            console.log(name)
                            $('#messageTitle').text('Message to'+name);
                            var from, subject, text;
                            $("#sendemail").click(function() {
                            	console.log("mail meh")
                              

                                    subject = $("#subject").val();
                                    text = $("#content").val();
                                    $("#message").text("Sending E-mail...Please wait");
                                    $.get("https://localhost:8080/send", {
                                            to: to,
                                            subject: subject,
                                            text: text
                                        }, 
                                        function(data) {
                                            if (data == "sent") {
                                                $("#message").empty().html("Email has been sent to "+to+".");
                                                setTimeout(function(){ 
                                                	$('#emailcontainer').hide()
                                                	$('.employeeList').show() 
                                                }, 2000);
                                                }

                                            });
                                    });
                            });

	$('.resourceButton').click(function(){
		$('.navMenu').toggle()
	})


            });