package chenaurj.appointment_manager.repository.util;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import chenaurj.appointment_manager.model.Appointment;

public class AppointmentRowMapper implements RowMapper<Appointment> {

	@Override
	public Appointment mapRow(ResultSet rs, int rowNum) throws SQLException {
		Appointment appointment = new Appointment();
		appointment.setId(rs.getString("id"));
		appointment.setDescription(rs.getString("description"));
		appointment.setDate(rs.getDate("time"));
		appointment.setTime(rs.getTime("time"));
		return appointment;
	}

}
