package chenaurj.appointment_manager.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chenaurj.appointment_manager.model.Appointment;
import chenaurj.appointment_manager.service.AppointmentService;

@RestController
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;
	
	@RequestMapping(value = "/getAppointments", method = RequestMethod.GET)
	public List<Appointment> getAppointments(@RequestParam(value = "filter") String filter) {
		return appointmentService.getAppointments(filter);
	}
	
	@RequestMapping(value = "/createAppointment", method = RequestMethod.POST)
	public void createAppointment(@RequestBody Appointment appointment) {
		appointmentService.createAppointment(appointment);
	}
	
}
