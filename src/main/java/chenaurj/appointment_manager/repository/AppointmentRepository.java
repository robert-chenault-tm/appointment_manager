package chenaurj.appointment_manager.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import chenaurj.appointment_manager.model.Appointment;
import chenaurj.appointment_manager.repository.util.AppointmentRowMapper;

@Repository("appointmentRepository")
public class AppointmentRepository {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	public List<Appointment> getAppointments(String filter) {
		if(filter != "") {
			filter = "%" + filter + "%";
			return jdbcTemplate.query("select * from appointment where description like ? order by time ASC", new AppointmentRowMapper(), filter);
		} else {
			return jdbcTemplate.query("select * from appointment order by time ASC", new AppointmentRowMapper());
		}
		

	}

	public void createAppointment(Appointment appointment) {
		String dateTime = appointment.getDate().toString() + " " + appointment.getTime().toString();
		jdbcTemplate.update("insert into appointment (id, time, description) values (?, ?, ?)", appointment.getId(), dateTime, appointment.getDescription());
	}

}
