package chenaurj.appointment_manager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import chenaurj.appointment_manager.BasePackageTarget;

@Configuration
@ComponentScan(basePackageClasses = {BasePackageTarget.class})
@EnableTransactionManagement
public class JdbcConfig {
	
	@Bean
	public DriverManagerDataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://localhost:3306/appointment_manager");
		dataSource.setUsername("root");
		dataSource.setPassword("replaceMe");
		
		return dataSource;
	}
	
	@Bean
	public DataSourceTransactionManager transactionManager(DriverManagerDataSource dataSource) {
		DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
		transactionManager.setDataSource(dataSource);
		return transactionManager;
		
	}
	
	@Bean
	public JdbcTemplate jdbcTemplate(DriverManagerDataSource dataSource) {
		JdbcTemplate jdbcTemplate = new JdbcTemplate();
		jdbcTemplate.setDataSource(dataSource);
		
		return jdbcTemplate;
	}
	
}
