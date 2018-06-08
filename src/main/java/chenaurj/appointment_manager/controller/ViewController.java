package chenaurj.appointment_manager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

	@RequestMapping("/")
	public String renderPage() {
		return "resources/index.html";
	}
	
}
