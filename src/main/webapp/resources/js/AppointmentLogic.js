var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function showNewAppointmentForm() {
	$('#newAppointmentForm').show();
	$('#newButton').hide();
}

function hideNewAppointmentForm() {
	$('#newButton').show();
	$('#newAppointmentForm').hide();
	$('#newDate').val('');
	$('#newTime').val('');
	$('#newDesc').val('');
	$('#errorMsgContainer').html('');
}

function validateNewAppointmentForm() {
	$('#errorMsgContainer').html('');
	var now = moment();
	var dateFormatErrorMsg = '<label class="d-block text-danger">Date must be in the format YYYY-MM-DD, for example 1990-05-10.</label>';
	var dateContentErrorMsg = '<label class="d-block text-danger">The year must be a value between the current year and 9999, the month must be a value between 01 and 12, the day must be a value between 01 and 31</label>';
	var descriptionErrorMsg = '<label class="d-block text-danger">Description cannot be blank.</label>';
	var timeFormatErrorMsg = '<label class="d-block text-danger">Time must be in the format HH:MM PP, for example 03:30 PM.</label>';
	var timeContentErrorMsg = '<label class="d-block text-danger">The hour must be a value between 01 and 12, the minute must be a value between 00 and 59 and the period must be either AM or PM</label>';
	var unrealDateErrorMsg = '<label class="d-block text-danger">Date must be a real date.</label>';
	var pastErrorMsg = '<label class="d-block text-danger">Appointments cannot be made in the past.</label>';
	
	var dateComponents = $('#newDate').val().replace(/\./g, '').split('-');
	var timeComponents = $('#newTime').val().replace(/\./g, '').split(':');
	
	if(dateComponents.length != 3) {
		$('#errorMsgContainer').append(dateFormatErrorMsg);
	}
	
	if(timeComponents.length != 2) {
		$('#errorMsgContainer').append(timeFormatErrorMsg);
	}
	
	if($('#errorMsgContainer').html() == '') {
		var year = parseInt(dateComponents[0], 10);		
		var month = parseInt(dateComponents[1], 10);
		var day = parseInt(dateComponents[2], 10);
		var hour = parseInt(timeComponents[0], 10);
		var minutesAndPeriod = timeComponents[1].split(' ');
		var sMinute = minutesAndPeriod[0];
		var minute = parseInt(sMinute, 10);
		var period = minutesAndPeriod[1].toUpperCase();
		
		if(minutesAndPeriod.length != 2) {
			$('#errorMsgContainer').append(timeFormatErrorMsg);
		} else if(isNaN(year) || isNaN(month) || isNaN(day) || year > 9999 || year < 1753 || month > 12  || month < 1|| day > 31 || day < 1) {
			$('#errorMsgContainer').append(dateContentErrorMsg);
		} else if(isNaN(hour) || isNaN(minute) || (period != 'AM' && period != 'PM') || hour < 1 || hour > 12 || minute < 0 || minute > 59) {
			$('#errorMsgContainer').append(timeContentErrorMsg);
		} else {
			var hour24;
			if(hour == 12 && period == 'AM') {
				hour24 = '00'
			} else if(period == 'PM' && hour != 12) {
				hour24 = hour + 12;
			} else{
				if(hour < 10) {
					hour24 = '0' + hour;
				} else {
					hour24 = hour;
				}
			}
			var fullDate = dateComponents[0] + '-' + dateComponents[1] + '-' + dateComponents[2] + ' ' + hour24 + ':' + sMinute +':59.997';
			var appointmentTime = moment(fullDate);
			if(!appointmentTime.isValid()) {
				$('#errorMsgContainer').append(unrealDateErrorMsg);
			} else {
				if(appointmentTime.diff(now, 'minutes') < 0) {
					$('#errorMsgContainer').append(pastErrorMsg);
				}
			}
		}
	}
	
	if($('#newDesc').val() == '') {
		$('#errorMsgContainer').append(descriptionErrorMsg);
	}
	
	if($('#errorMsgContainer').html() == '') {
		$("#newAppointmentForm").submit();
	}
}

function getAppointments() {
	var searchTerms = $('#searchTerms').val();
	$.ajax({
		url: 'http://localhost:8080/appointment_manager/getAppointments',
		data: {
			filter: searchTerms
		},
		method: 'GET',
		success: function(data, status, jqXHR) {
			$('#resultsTable').html('');
			$('#resultsTable').append('<thead><tr><th>Date</th><th>Time</th><th>Description</th></tr></thead><tbody>');
			$.each(data, function(index, value) {
				$('#resultsTable').append('<tr><td>' + formatDate(value.date) + '</td><td>' + formatTime(value.time) + '</td><td>' + value.description + '</td></tr>');
			});
			$('#resultsTable').append('</tbody>');
			
		},
		error: function(jqXHR, status, error) {
			console.log(error);
		}
	});
}

function createNewAppointment() {
	var newDate = $('#newDate').val();
	var newDesc = $('#newDesc').val();
	var timeComponents = $('#newTime').val().replace(/\./g, '').split(':');
	var minutesAndPeriod = timeComponents[1].split(' ');
	var minute = minutesAndPeriod[0];
	var period = minutesAndPeriod[1].toUpperCase();
	var hour = parseInt(timeComponents[0], 10);
	var hour24;
	if(hour == 12 && period == 'AM') {
		hour24 = '00'
	} else if(period == 'PM' && hour != 12) {
		hour24 = hour + 12;
	} else{
		if(hour < 10) {
			hour24 = '0' + hour;
		} else {
			hour24 = hour;
		}
	}
	var newTime = hour24 + ':' + minute + ':00';
	
	$.ajax({
		url: 'http://localhost:8080/appointment_manager/createAppointment',
		data: {
				description: newDesc,
				date: newDate,
				time: newTime
		},
		method: 'POST'
	});
}

function formatDate(date) {
	var components = date.split('-');
	
	return months[parseInt(components[1], 10) -1] + ' ' + parseInt(components[2], 10);
}

function formatTime(time) {
	var components = time.split(':');
	var hour = parseInt(components[0], 10);
	var period = 'AM';
	if(hour > 12) {
		hour -= 12;
		period = 'PM'
	}
	if(hour == 0) {
		hour = 12;
	}
	
	return hour + ':' + components[1] + ' ' + period;
}

$(document).ready(function() {
	getAppointments();
	$("#newDate").datepicker({minDate: 0, dateFormat: 'yy-mm-dd'});
});