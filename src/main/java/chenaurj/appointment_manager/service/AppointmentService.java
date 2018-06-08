package chenaurj.appointment_manager.service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chenaurj.appointment_manager.model.Appointment;
import chenaurj.appointment_manager.repository.AppointmentRepository;

@Service("appointmentService")
public class AppointmentService {

	@Autowired
	private AppointmentRepository appointmentRepository;
	
	public List<Appointment> getAppointments(String filter) {
		
		return appointmentRepository.getAppointments(filter);
	}

	public void createAppointment(String description, Date date, Time time) {
		Appointment appointment = new Appointment();
		appointment.setId(UUID.randomUUID().toString());
		appointment.setDate(date);
		appointment.setTime(time);
		appointment.setDescription(description);
		appointmentRepository.createAppointment(appointment);
	}

}
